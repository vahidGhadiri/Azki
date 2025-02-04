import { useMutation } from "@tanstack/react-query";
import { UserDetail, userUseCaseProvider } from "../../use-cases/user";

const useUserLogin = () =>
  useMutation<UserDetail, ErrorResponse>({
    mutationFn: () => userUseCaseProvider().login(),
  });

export default useUserLogin;
