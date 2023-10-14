"use client";

import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider as ReduxProvider } from "react-redux";
import LoadingBarRedux from "@/components/common/LoadingBarRedux";
import { store } from "@/states";
import theme from "./theme";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider store={store}>
      <CacheProvider>
        <ChakraProvider theme={theme}>
          <LoadingBarRedux />
          {children}
        </ChakraProvider>
      </CacheProvider>
    </ReduxProvider>
  );
}
