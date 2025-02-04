import { useQuery } from "@tanstack/react-query"
import { INSURE_COMPANY_LIST } from "./keys"
import { insuranceUseCaseProvider, InsureCompany } from "src/use-cases/insurance"


const useGetInsureCompanyList = (options?: AdapterOptionType<InsureCompany[]>) =>
  useQuery<InsureCompany[], ErrorResponse>({
    queryFn: () => insuranceUseCaseProvider().getInsureCompanyList(),
    queryKey: [INSURE_COMPANY_LIST],
    ...options
  })


export default useGetInsureCompanyList
