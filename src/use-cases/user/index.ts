
import type { UserServices } from "./domain-services"
import { userServices } from "./domain-services";
import { UserRepository } from "./repository";
import { Http } from "@infrastructure/http";
import UserInteractor from "./interactor";



export * from "./domain-services"
export * from "./entities"


export function userUseCaseProvider() {
  const http = new Http<UserServices>(userServices)
  const userRepository = new UserRepository(http)
  const userInteractor = new UserInteractor(userRepository)
  return userInteractor
}