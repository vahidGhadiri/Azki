import { Route, Routes } from "react-router-dom"
import ThirdDiscount from "./pages/third-discount"

import { routes } from "@config"

import Insurance from "./pages/choose-method"

const InsuranceRouter = () => {
  return (
    <Routes>
      <Route path={routes.insuranceRoutes.chooseMethod} element={<Insurance />} />
      <Route path={routes.insuranceRoutes.thirdDiscount} element={<ThirdDiscount />} />
    </Routes>
  )
}

export default InsuranceRouter
