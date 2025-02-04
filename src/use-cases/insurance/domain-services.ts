
export const insuranceServices = {
  getThirdDiscountInsurance: "product/third/third-discounts",
  getInsureCompanyList: "product/third/companies"
} as const

export type InsuranceServices = typeof insuranceServices
