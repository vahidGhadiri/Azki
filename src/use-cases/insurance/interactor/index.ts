import type { IInsuranceRepository } from "../repository";
import type { Insurance, InsureCompany } from "../entities"


export interface IInsuranceInteractor {
  getThirdDiscountInsurance: () => Promise<Insurance[]>
  getInsureCompanyList: () => Promise<InsureCompany[]>
}

export default class InsuranceInteractor implements IInsuranceInteractor {
  private InsuranceRepository: IInsuranceRepository


  constructor(InsuranceRepository: IInsuranceRepository) {
    this.InsuranceRepository = InsuranceRepository
  }

  getThirdDiscountInsurance: IInsuranceInteractor['getThirdDiscountInsurance'] = () => {
    return this.InsuranceRepository.getThirdDiscountInsurance()
  };

  getInsureCompanyList: IInsuranceInteractor["getInsureCompanyList"] = () => {
    return this.InsuranceRepository.getInsureCompanyList()
  }
}
