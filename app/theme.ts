import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "dark",
};

const colors = {
  primary: {
    50: "#FFF1EC",
    100: "#FFE2D7",
    200: "#FFC3AE",
    300: "#FFA586",
    400: "#FF875D",
    500: "#FF6934",
    600: "#FB4200",
    700: "#C33300",
    800: "#8B2400",
    900: "#531600",
    950: "#370E00",
  },
  gray: {
    700: "#1f2937",
    800: "#111827",
  },
  // gray: {
  //   700: "#2C353D",
  //   800: "#262D34",
  //   900: "#1E252B",
  // },
};

const theme = extendTheme({ config, colors });

export default theme;
