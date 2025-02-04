import { useGetVehicleTypes } from "./adapters/vehicles"
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
    <div className={`w-screen h-screen flex justify-center items-center bg-primitive-teal-500`}>
      {status === "error" && "ERRROR"}
      {status === "loading" && "LOADING"}

      {data?.[0]?.title}
      <p>Whydrf</p>
    </div>
  )
}





export default App
