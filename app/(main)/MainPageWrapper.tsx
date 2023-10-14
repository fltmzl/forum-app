"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { Box } from "@chakra-ui/react";
import { asyncSetIsPreload } from "@/states/isPreload/action";
import { useAppSelector } from "@/hooks/useAppSelector";
import { redirect } from "next/navigation";

type MainPageWrapper = {
  children: React.ReactNode;
};

const MainPageWrapper: React.FC<MainPageWrapper> = ({ children }) => {
  const isPreload = useAppSelector((states) => states.isPreload);
  const authUser: User = useAppSelector((states) => states.authUser);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(asyncSetIsPreload());
  }, [dispatch]);

  if (isPreload) return null;

  if (!authUser) return redirect("/login");

  return <Box h="full">{children}</Box>;
};

export default MainPageWrapper;
