import type { IHttp } from "@infrastructure/http"

import type { UserServices } from "../domain-services"
import type { UserDetail } from "../entities"


export interface IUserRepository {
  login: () => Promise<UserDetail>
}

export class UserRepository implements IUserRepository {
  private http: IHttp<UserServices>

  constructor(http: IHttp<UserServices>) {
    this.http = http
  }

  login: IUserRepository["login"] = () => {
    return this.http.request({
      serviceName: "userLogin",
      method: "GET",
    }, {
      responseBody: {
        displayName: "vahid",
        email: "vahid.ghadiri@gmail.com",
        fullName: "whydrf",
        id: "12312",
        avatar: "12312",
        createdAt: "123123"
      }
    })
  }
}
