"use client";

import { Square, useColorMode } from "@chakra-ui/react";
import { BsFillSunFill } from "react-icons/bs";
import { MdDarkMode } from "react-icons/md";

const ToggleTheme = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Square as="button" type="button" onClick={toggleColorMode} size="40px" color="white" bgColor="gray.600" rounded="lg" _dark={{}}>
      {colorMode === "light" ? <BsFillSunFill /> : <MdDarkMode />}
    </Square>
  );
};

export default ToggleTheme;
