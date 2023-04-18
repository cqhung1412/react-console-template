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

async function signup(email: string, password: string): Promise<IUser> {
  const response = await axios.post("/users/signup", {
    email,
    password,
  });

  if (response.status !== 201)
    throw new Error(`Failed on signup request: ${response.status}`);

  return response.data as IUser;
}

type IUseSignup = UseMutateFunction<
  IUser,
  unknown,
  {
    email: string;
    password: string;
  },
  unknown
>;

export function useSignup(): IUseSignup {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const { mutate: signupMutation } = useMutation<
    IUser,
    unknown,
    { email: string; password: string },
    unknown
  >(({ email, password }) => signup(email, password), {
    onSuccess: (data) => {
      queryClient.invalidateQueries([config.QUERY_KEYS.USER]);
      navigate("/auth/login");
    },
    onError: (error) => {
      enqueueSnackbar("Oops.. Error on sign in. Try again!", {
        variant: "error",
      });
      console.error(error);
    },
  });

  return signupMutation;
}
