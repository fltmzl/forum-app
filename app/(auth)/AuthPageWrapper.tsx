"use client";

import { redirect } from "next/navigation";
import { Box } from "@chakra-ui/react";
import { useAppSelector } from "@/hooks/useAppSelector";

type AuthPageWrapperProps = {
  children: React.ReactNode;
};

const AuthPageWrapper: React.FC<AuthPageWrapperProps> = ({ children }) => {
  const authUser = useAppSelector((states) => states.authUser);

  if (authUser) redirect("/");

  return <Box h="full">{children}</Box>;
};

export default AuthPageWrapper;
