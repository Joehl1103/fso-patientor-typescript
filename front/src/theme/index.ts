import { createTheme } from "@mui/material/styles";
import { bronze, sky } from "@radix-ui/colors";

export type ColorMode = "light" | "dark";

const colorTokens = {
  light: {
    primaryMain: bronze.bronze12,
    primaryContrastText: "#ffffff",
    backgroundDefault: sky.sky1,
    backgroundPaper: "#ffffff",
    textPrimary: "rgba(0, 0, 0, 0.87)",
    textSecondary: "rgba(0, 0, 0, 0.6)",
    divider: "rgba(0, 0, 0, 0.12)",
  },
  dark: {
    primaryMain: "#90caf9",
    primaryContrastText: "#003258",
    backgroundDefault: "#0d1117",
    backgroundPaper: "#161b22",
    textPrimary: "#ffffff",
    textSecondary: "rgba(255, 255, 255, 0.7)",
    divider: "rgba(255, 255, 255, 0.12)",
  },
} as const;

const createAppTheme = (mode: ColorMode) => {
  const tokens = colorTokens[mode];

  return createTheme({
    palette: {
      mode,
      primary: {
        main: tokens.primaryMain,
        contrastText: tokens.primaryContrastText,
      },
      background: {
        default: tokens.backgroundDefault,
        paper: tokens.backgroundPaper,
      },
      text: {
        primary: tokens.textPrimary,
        secondary: tokens.textSecondary,
      },
      divider: tokens.divider,
    },
  });
};

export default createAppTheme;
