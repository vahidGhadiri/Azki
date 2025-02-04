import { parse as uuidParse, v4 as uuid, stringify as uuidStringify } from 'uuid'
import { CONNECTION_PROBLEM_RESPONSE, REQUEST_DURATION, TIMEOUT_RESPONSE } from './constants'
import { ErrorBuilder, HeadersBuilder, UrlBuilder } from './builders'
import { MockResponseFactory } from './builders/mock-factory'

export interface IHttp<DomainService extends GeneralDomainService> {
  request<Service extends GeneralService, MockResponse = unknown>(
    pathParams: RequestParams<DomainService>,
    mockDataOptions?: { responseBody: MockResponse }
  ): Promise<Service["response"] | MockResponse>
}

export interface HttpOptions {
  requestId?: Uint8Array
  baseUrl?: string
}

interface RequestParams<DomainService, RequestBody = unknown> {
  method: "POST" | "GET" | "DELETE" | "PUT" | "UPDATE"
  serviceName: keyof DomainService
  baseUrl?: HttpOptions["baseUrl"]
  requestBody?: RequestBody
  pathParams?: PathParams
  query?: Query
}

export interface GeneralService {
  serviceName: string
  request: Request
  response: any
  url: string
}

interface GeneralDomainService {
  [key: string]: GeneralService["serviceName"]
}

export class Http<DomainService extends GeneralDomainService> implements IHttp<DomainService> {
  private mockResponseFactory: MockResponseFactory
  private headersBuilder: HeadersBuilder
  private domainService: DomainService
  private errorBuilder: ErrorBuilder
  private urlBuilder: UrlBuilder
  private options: HttpOptions
  private url: string = ''

  constructor(
    domainService: DomainService,
    options: HttpOptions = {}
  ) {
    this.mockResponseFactory = new MockResponseFactory()
    this.headersBuilder = new HeadersBuilder()
    this.errorBuilder = new ErrorBuilder()
    this.urlBuilder = new UrlBuilder()
    this.domainService = domainService
    this.options = options
  }

  private async handleResponse(res: Response): Promise<Response> {
    if (res.type === "opaque") {
      const mockResponse = this.mockResponseFactory.getMockResponse(this.url)
      if (mockResponse) {
        return mockResponse
      }
    }
    if (res.ok) {
      return res.json()
    } else {
      const errorResponse: ErrorResponse = {
        httpStatusCode: res.statusText,
        message: await res.text(),
        status: res.status,
      }
      this.errorBuilder.generateError(errorResponse)
    }
  }

  async request<Service extends GeneralService, MockResponse = unknown>(
    { query, method, requestBody, pathParams, baseUrl, serviceName }: RequestParams<DomainService>, mockDataOptions?: { responseBody: MockResponse }): Promise<Service["response"] | MockResponse> {

    if (mockDataOptions && mockDataOptions.responseBody) return mockDataOptions.responseBody

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_DURATION)
    const requestId = uuidStringify(this.options?.requestId || new Uint8Array(uuidParse(uuid())))
    const serviceEndpoint = this.domainService[serviceName]

    this.url = this.urlBuilder.buildUrl({
      baseUrl: this.options.baseUrl || baseUrl,
      serviceEndpoint,
      pathParams,
      query,
    })

    try {
      const response = await fetch(this.url, {
        body: JSON.stringify(requestBody),
        method,
        headers: this.headersBuilder
          .add("Content-Type", "application/json")
          .add("x-request-id", requestId)
          .build(),
        signal: controller.signal,
        mode: "no-cors"
      })
      return this.handleResponse(response)
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === "AbortError") {
          return TIMEOUT_RESPONSE
        } else {
          return CONNECTION_PROBLEM_RESPONSE
        }
      } else {
        return CONNECTION_PROBLEM_RESPONSE
      }
    } finally {
      clearTimeout(timeoutId)
    }
  }
}
