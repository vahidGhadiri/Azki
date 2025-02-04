import { useGetVehicleTypes } from "./adapters/vehicles"
import { AppLayout, DataDecorator } from "./components"
import colors from "./config/tailwind/colors/index.json"
import useTheme from "./hooks/use-theme"
import { useEffect } from "react"

const App = () => {
  const { setColors } = useTheme(colors, "light")
  const { data, status } = useGetVehicleTypes()

  useEffect(() => {
    setColors("light")
  }, [setColors])

  return (
    <AppLayout>
      <DataDecorator status={[status]}>
        ...
      </DataDecorator>
    </AppLayout>
  )
}





export default App
