import { Route, Routes } from "react-router-dom"
import { FC } from "react"

import SignUp from "./pages/signup"

import { routes } from "@config"

const AuthenticationRouter: FC = () => {
  return (
    <Routes>
      <Route path={routes.authenticationRoutes.signUp.root} element={<SignUp />} />
    </Routes>
  )
}

export default AuthenticationRouter
