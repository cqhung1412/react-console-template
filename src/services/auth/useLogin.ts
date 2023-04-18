import {
  UseMutateFunction,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

import { IUser } from "./useUser";
import config from "../../config";
import axios from "../../axios";

async function login(email: string, password: string): Promise<IUser> {
  const response = await axios.post("/users/login", {
    email,
    password,
  });

  if (response.status !== 200)
    throw new Error(`Failed on login request: ${response.status}`);

  return response.data as IUser;
}

type IUseLogin = UseMutateFunction<
  IUser,
  unknown,
  {
    email: string;
    password: string;
  },
  unknown
>;

export function useLogin(): IUseLogin {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const { mutate: loginMutation } = useMutation<
    IUser,
    unknown,
    { email: string; password: string },
    unknown
  >(({ email, password }) => login(email, password), {
    onSuccess: (data) => {
      queryClient.setQueryData([config.QUERY_KEYS.USER], data);
      navigate("/");
    },
    onError: (error) => {
      enqueueSnackbar("Oops.. Error on login. Try again!", {
        variant: "error",
      });
      console.error(error);
    },
  });

  return loginMutation;
}
