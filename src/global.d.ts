import type { UseQueryOptions } from "@tanstack/react-query"

declare global {

  type ErrorResponse = {
    httpStatusCode: string
    status?: number
    message: string
  }

  type AdapterOptionType<ResponseType, T = ResponseType> = Omit<
    UseQueryOptions<ResponseType, ErrorResponse, T>,
    'queryKey' | 'queryFn'
  >

  type QueryValueType = string | number | boolean

  type Query = string | Record<string, QueryValueType>

  type PathParams = Record<string, string | number>

  type AllowedKeys = "pathParams" | "query" | "requestBody";

  type Data<T extends Partial<Record<AllowedKeys, unknown>>> = {
    [K in keyof T as K extends AllowedKeys ? (T[K] extends undefined ? never : K) : never]: T[K];
  };
}
