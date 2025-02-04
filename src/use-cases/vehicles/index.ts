
import type { VehicleServices } from "./domain-services"
import { vehicleServices } from "./domain-services"

import { VehicleRepository } from "./repository"
import VehicleInteractor from "./interactor"
import { Http } from "@infrastructure/http"

export * from "./domain-services"
export * from "./entities"

export function VehicleUseCaseProvider() {
  const http = new Http<VehicleServices>(vehicleServices)
  const vehicleRepository = new VehicleRepository(http)
  const vehicleInteractor = new VehicleInteractor(vehicleRepository)
  return vehicleInteractor
}
