/**
 * This module provides a `UrlBuilder` class for constructing dynamic URLs with support for:
 * - Query parameters.
 * - Path parameters.
 * - A configurable base URL.
 *
 * The `UrlBuilder` class implements the `IUrlBuilder` interface, ensuring a consistent API for building URLs.
 *
 * Key features:
 * - Replaceable path parameters using a dictionary of key-value pairs.
 * - Flexible query parameter support as a string or an object.
 * - Automatic URL encoding for safe transmission.
 *
 * This utility simplifies URL generation, making it ideal for API service integrations or dynamic link generation in applications.
 */

export interface BuildUrlParams {
  query?: string | Record<string, QueryValueType>
  pathParams?: PathParams
  serviceEndpoint: string
  baseUrl?: string
}
export interface IUrlBuilder {
  buildUrl: (args: BuildUrlParams) => string
}
export default class UrlBuilder implements IUrlBuilder {
  public buildUrl({ serviceEndpoint, pathParams, query, baseUrl = import.meta.env.VITE_APP_BASE_URL }: BuildUrlParams): string {
    let servicePath = serviceEndpoint
    let queryParams = ""

    if (pathParams) {
      Object.entries(pathParams).forEach(([key, value]) => {
        servicePath = servicePath.replace(
          `:${key}`,
          encodeURIComponent(String(value))
        )
      })
    }

    if (typeof query === "string") {
      queryParams = `/${query}`
    } else if (typeof query === "object" && query !== null) {
      const stringifiedQuery = Object.entries(query).reduce(
        (acc, [key, value]) => {
          acc[key] = String(value)
          return acc
        },
        {} as Record<string, string>
      )
      queryParams = `?${new URLSearchParams(stringifiedQuery).toString()}`
    }

    return new URL(`${baseUrl}/${servicePath}${queryParams}`).toString()
  }
}
