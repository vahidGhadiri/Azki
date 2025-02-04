import { useNavigate } from "react-router-dom"
import { useFormik } from "formik"
import * as Yup from "yup"

import { passwordRegex, persianRegex, phoneRegex } from "@constants"
import { useUserLogin, USER_DATA } from "@adapters/user"
import { queryClient, routes } from "@config"
import { useContent } from "@hooks"

import strings from "../pages/signup/strings"

const useSignUpForm = () => {
  const { content } = useContent()
  const { mutate, isLoading: isSubmitLoading } = useUserLogin()
  const navigate = useNavigate()

  const validationSchema = Yup.object({
    name: Yup.string()
      .matches(persianRegex, content(strings.nameValidation))
      .required(content(strings.requiredFieldError)),
    lastName: Yup.string()
      .matches(persianRegex, content(strings.lastNameValidation))
      .required(content(strings.requiredFieldError)),
    phoneNumber: Yup.string()
      .matches(phoneRegex, content(strings.phoneNumberValidation))
      .required(content(strings.requiredFieldError)),
    password: Yup.string()
      .matches(passwordRegex, content(strings.passwordValidation))
      .required(content(strings.requiredFieldError)),
  })

  const formik = useFormik({
    initialValues: {
      name: "",
      lastName: "",
      phoneNumber: "",
      password: "",
    },
    validationSchema,
    onSubmit: () => {
      mutate(null, {
        onSuccess: (data) => {
          navigate(routes.insuranceRoutes.chooseMethod)
          queryClient.setQueryData([USER_DATA], data)
        },
        onError: (error) => {
          // TODO: Add toast to handle error
          console.log("SIGN_UP FAILURE", error)
        },
      })
    },
  })

  return { formik, isSubmitLoading }
}

export default useSignUpForm
