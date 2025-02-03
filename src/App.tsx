import { useEffect } from "react"
import colors from "./config/tailwind/colors/index.json"
import useTheme from "./hooks/use-theme"

const App = () => {
  const { setColors } = useTheme(colors, "light")

  useEffect(() => {
    setColors("light")
  }, [setColors])

  return (
    <div className={`w-screen h-screen flex justify-center items-center bg-primitive-teal-500`}>
      <p>Whydrf</p>
    </div>
  )
}





export default App
