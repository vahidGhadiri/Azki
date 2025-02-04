import type { IHttp } from "@infrastructure/http"

import type { InsuranceServices } from "../domain-services"
import type { Insurance, InsureCompany } from "../entities"


export interface IInsuranceRepository {
  getThirdDiscountInsurance: () => Promise<Insurance[]>
  getInsureCompanyList: () => Promise<InsureCompany[]>
}

export class InsuranceRepository implements IInsuranceRepository {
  private http: IHttp<InsuranceServices>

  constructor(http: IHttp<InsuranceServices>) {
    this.http = http
  }

  getThirdDiscountInsurance: IInsuranceRepository['getThirdDiscountInsurance'] = async () => {
    return this.http.request({
      serviceName: "getThirdDiscountInsurance",
      method: "GET",
    })
  }

  getInsureCompanyList: IInsuranceRepository["getInsureCompanyList"] = () => {
    return this.http.request({
      serviceName: "getInsureCompanyList",
      method: "GET",
    })
  };
}
