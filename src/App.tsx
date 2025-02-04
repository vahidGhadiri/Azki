import { useGetVehicleTypes } from "./adapters/vehicles"
import { AppLayout, DataDecorator } from "./components"
import colors from "./config/tailwind/colors/index.json"
import useTheme from "./hooks/use-theme"
import { useEffect } from "react"
import SignUp from "./presentations/authentication/pages"
import image from "../src/assets/images/car-green.svg"

const App = () => {
  const { setColors } = useTheme(colors, "light")
  const { status } = useGetVehicleTypes()

  useEffect(() => {
    setColors("light")
  }, [setColors])

  return (
    <AppLayout >
      <DataDecorator status={[status]}>
        <SignUp />
      </DataDecorator>
      <img src={image} alt="" />
    </AppLayout>
  )
}





export default App
