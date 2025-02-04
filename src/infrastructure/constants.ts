export enum ErrorMessages {
  ConnectionProblem = "مشکلی در برقراری ارتباط وجود دارد",
  Timeout = "هیچ پاسخی در زمان مجاز از سرور دریافت نشد",
  GeneralService = "متاسفانه خطایی رخ داده است"
}

export enum ErrorStatusCode {
  ConnectionProblem = 503,
  InternalServer = 500,
  Timeout = 408
}

export const REQUEST_DURATION = 30000

const headers = new Headers()
headers.set('Content-Type', 'application/json')

export const TIMEOUT_RESPONSE = new Response(
  JSON.stringify({
    message: ErrorMessages.Timeout,
    status: ErrorStatusCode.Timeout,
  }),
  {
    status: ErrorStatusCode.Timeout,
    headers,
  },
)

export const CONNECTION_PROBLEM_RESPONSE = new Response(
  JSON.stringify({
    status: ErrorStatusCode.ConnectionProblem,
    message: ErrorMessages.ConnectionProblem,
  }),
  {
    status: ErrorStatusCode.ConnectionProblem,
    headers,
  },
)
