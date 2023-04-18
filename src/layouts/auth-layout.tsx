import React from "react";
import { AppShell } from "@mantine/core";
import { Outlet, useNavigate } from "react-router-dom";
import { useUser } from "../services/auth/useUser";

const AuthLayout: React.FC = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  if (user) navigate("/");

  return (
    <AppShell padding={0}>
      <Outlet />
    </AppShell>
  );
};

export default AuthLayout;
