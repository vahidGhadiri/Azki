import { useFormik } from "formik"
import * as Yup from "yup"
import { Button, Input } from "@components"
import strings from "./strings"
import { useContent } from "@hooks"
import { passwordRegex, persianRegex, phoneRegex } from "@constants"
import { useUserLogin } from "../../../adapters/user/"

const SignUp = () => {
  const { content } = useContent()
  const { mutate } = useUserLogin()

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
    validationSchema: validationSchema,
    onSubmit: () => {
      mutate(null, {
        onSuccess: (data) => {
          console.log('data', data)
        },
        onError: (error) => {
          //TODO: Add toast to handle error
          console.log("SIGN_UP FAILURE", error)
        },
      })
    },
  })

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-6 w-full max-w-md mx-auto">
      <Input
        name="name"
        description={formik.touched.name && formik.errors.name}
        placeholder={content(strings.namePlaceholder)}
        value={formik.values.name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      <Input
        name="lastName"
        description={formik.touched.lastName && formik.errors.lastName}
        placeholder={content(strings.lastNamePlaceholder)}
        value={formik.values.lastName}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      <Input
        name="phoneNumber"
        description={formik.touched.phoneNumber && formik.errors.phoneNumber}
        placeholder={content(strings.phoneNumberPlaceholder)}
        value={formik.values.phoneNumber}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      <Input
        type="password"
        name="password"
        description={formik.touched.password && formik.errors.password}
        placeholder={content(strings.passwordPlaceholder)}
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      <Button
        type="button"
        label={content(strings.submitButton)}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
        isDisabled={!!formik.isSubmitting} />
    </form>
  )
}

export default SignUp
