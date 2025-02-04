import type { UserDetail } from "../entities"
import type { IUserRepository } from "../repository"

interface IUserInteractor {
  login: () => Promise<UserDetail>
}

export default class UserInteractor implements IUserInteractor {
  private UserRepository: IUserRepository

  constructor(UserRepository: IUserRepository) {
    this.UserRepository = UserRepository
  }

  login: IUserInteractor["login"] = () => {
    return this.UserRepository.login()
  }
}
