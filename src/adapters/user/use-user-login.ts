import { useQuery } from "@tanstack/react-query"
import { UserDetail, userUseCaseProvider } from "src/use-cases/user"
import { USER_LOGIN } from "./keys"


const useUserLogin = (options?: AdapterOptionType<UserDetail>) =>
  useQuery<UserDetail, ErrorResponse>({
    queryFn: () => userUseCaseProvider().login(),
    queryKey: [USER_LOGIN],
    ...options
  })


export default useUserLogin
