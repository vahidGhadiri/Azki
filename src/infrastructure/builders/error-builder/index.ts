/**
 * This module provides an `ErrorBuilder` class for handling and throwing 
 * standardized error objects in the application. It ensures that all errors 
 * have a default message if none is provided and enforces a consistent error-handling approach.
 * The `ErrorBuilder` class implements the `IErrorBuilder` interface, which defines 
 * the structure for generating and throwing errors.
 */

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
