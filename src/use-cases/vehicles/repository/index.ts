
import type { VehicleServices } from "../domain-services"
import type { VehicleType } from "../entities"
import { IHttp } from "@infrastructure/http"

export interface IVehicleRepository {
  getVehicleTypes: () => Promise<VehicleType[]>
}

export class VehicleRepository implements IVehicleRepository {
  private http: IHttp<VehicleServices>

  constructor(http: IHttp<VehicleServices>) {
    this.http = http
  }

  getVehicleTypes: IVehicleRepository["getVehicleTypes"] = async () => {
    return await this.http.request({
      serviceName: "getVehicleTypes",
      method: "GET",
    })
  }
}
