import { DataDecorator } from "@components"
import useGetThirdDiscountInsurance from "src/adapters/insurance/use-get-third-discount-insurance"

//TODO: Add compound design pattern to handle different pages 
const ThirdDiscount = () => {
  const { data, status } = useGetThirdDiscountInsurance()

  return (
    <DataDecorator status={status}>
      THIRD_DOSCOUNT
    </DataDecorator>
  )
}

export default ThirdDiscount