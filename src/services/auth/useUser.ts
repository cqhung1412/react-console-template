import { useQuery } from "@tanstack/react-query";
import axios from "../../axios";
import config from "../../config";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export interface IUser {
  id: string;
  email: string;
}

async function getUser(noUserCb: () => void): Promise<IUser | null> {
  return axios
    .get("/users/current")
    .then((response) => response?.data as IUser)
    .catch((error) => {
      noUserCb();
      throw new Error(`Failed on get user request: ${error.message}`);
    });
}

interface IUseUser {
  user: IUser | null;
}

export function useUser(): IUseUser {
  const navigate = useNavigate();
  const { data: user } = useQuery<IUser | null>(
    [config.QUERY_KEYS.USER],
    async (): Promise<IUser | null> => getUser(() => navigate("/auth/login")),
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: false,
      onError: (error) => console.error(error),
    }
  );

  useEffect(() => {
    console.info("User changed", user);
  }, [user]);

  return {
    user: user ?? null,
  };
}
