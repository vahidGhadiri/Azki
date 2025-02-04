import { useContent } from "@hooks"

import useSignUpForm from "../../hooks/use-signup-form"
import { Button, Input } from "@components"
import strings from "./strings"

const SignUp = () => {
  const { formik, isSubmitLoading } = useSignUpForm()
  const { content } = useContent()

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-6 w-full max-w-md mx-auto">
      <Input
        name="name"
        description={formik.touched.name && formik.errors.name}
        placeholder={content(strings.namePlaceholder)}
        hasError={!!formik.errors.name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.name}
      />
      <Input
        name="lastName"
        description={formik.touched.lastName && formik.errors.lastName}
        placeholder={content(strings.lastNamePlaceholder)}
        hasError={!!formik.errors.lastName}
        value={formik.values.lastName}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      <Input
        description={formik.touched.phoneNumber && formik.errors.phoneNumber}
        placeholder={content(strings.phoneNumberPlaceholder)}
        hasError={!!formik.errors.phoneNumber}
        value={formik.values.phoneNumber}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        name="phoneNumber"
      />
      <Input
        type="password"
        name="password"
        description={formik.touched.password && formik.errors.password}
        placeholder={content(strings.passwordPlaceholder)}
        hasError={!!formik.errors.password}
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      <Button
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
        label={content(strings.submitButton)}
        isSubmitLoading={isSubmitLoading}
        isDisabled={isSubmitLoading}
        type="submit"
      />
    </form>
  )
}

export default SignUp
