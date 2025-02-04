import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { useEffect } from "react"

import { AuthenticationRouter, InsuranceRouter } from "./presentations"
import colors from "./config/tailwind/colors/index.json"
import useTheme from "./hooks/use-theme"
import { AppLayout } from "./components"

const App = () => {
  const { setColors } = useTheme(colors, "light")

  useEffect(() => {
    setColors("light")
  }, [setColors])



  return (
    <AppLayout>
      <Router>
        <Routes>
          <Route path="/*" element={<AuthenticationRouter />} />
          <Route path="/insurance/*" element={<InsuranceRouter />} />
        </Routes>
      </Router>
    </AppLayout>
  )
}

export default App
