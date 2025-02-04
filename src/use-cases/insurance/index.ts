import { Http } from "@infrastructure/http"

import type { InsuranceServices } from "./domain-services"
import { insuranceServices } from "./domain-services"
import { InsuranceRepository } from "./repository"
import InsuranceInteractor from "./interactor"

export * from "./domain-services"
export * from "./entities"

export function insuranceUseCaseProvider() {
  const http = new Http<InsuranceServices>(insuranceServices)
  const insuranceRepository = new InsuranceRepository(http)
  const insuranceInteractor = new InsuranceInteractor(insuranceRepository)
  return insuranceInteractor
}