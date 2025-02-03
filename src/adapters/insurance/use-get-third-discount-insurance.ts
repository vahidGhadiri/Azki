import { Insurance, insuranceUseCaseProvider } from "src/use-cases/insurance"
import { useQuery } from "@tanstack/react-query"
import { INSURE_COMPANY_LIST } from "./keys"


const useGetThirdDiscountInsurance = (options?: AdapterOptionType<Insurance[]>) =>
  useQuery<Insurance[], ErrorResponse>({
    queryFn: () => insuranceUseCaseProvider().getThirdDiscountInsurance(),
    queryKey: [INSURE_COMPANY_LIST],
    ...options
  })


export default useGetThirdDiscountInsurance
