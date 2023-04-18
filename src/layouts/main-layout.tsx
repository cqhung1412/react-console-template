import React from "react";
import { AppShell } from "@mantine/core";
import { NavbarSimple } from "../components/navbar";
import HeaderSearch from "../components/header";
import { Outlet, useNavigate } from "react-router-dom";
import { useUser } from "../services/auth/useUser";

const MainLayout: React.FC = () => {
  const { user } = useUser()
  if (!user) console.log(user)

  return (
    <AppShell
      padding={"md"}
      navbar={<NavbarSimple />}
      header={<HeaderSearch />}
    >
      <Outlet />
    </AppShell>
  );
};

export default MainLayout;
