import { ErrorMessages } from "../../constants"

export interface IErrorBuilder {
  generateError(errorObject: ErrorResponse): never
}

export default class ErrorBuilder implements IErrorBuilder {
  generateError(errorObject: ErrorResponse): never {
    if (!errorObject?.message?.trim()) {
      errorObject.message = ErrorMessages.GeneralService
    }
    throw errorObject
  }
}
