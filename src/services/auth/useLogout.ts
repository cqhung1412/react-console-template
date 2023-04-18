import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import config from "../../config";
import axios from "../../axios";
import { useCallback } from "react";

async function logout(): Promise<void> {
  const response = await axios.post("/users/logout");

  if (response.status !== 200)
    throw new Error(`Failed on logout request: ${response.status}`);

  return;
}

type IUseLogout = () => void;

export function useLogout(): IUseLogout {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const onLogout = useCallback(() => {
    logout();
    queryClient.setQueryData([config.QUERY_KEYS.user], null);
    navigate("/auth/login");
  }, [navigate, queryClient]);

  return onLogout;
}
