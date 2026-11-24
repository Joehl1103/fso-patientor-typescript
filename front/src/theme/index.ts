import { createTheme } from "@mui/material/styles";
import { bronze, sky,skyDark,tomato,tomatoDark,amber } from "@radix-ui/colors";

export type ColorMode = "light" | "dark";

const colorTokens = {
  light: {
    primaryMain: tomato.tomato1,
    primaryContrastText: skyDark.sky1,
    backgroundDefault: amber.amber1,
    textPrimary: sky.sky12,
  },
  dark: {
    primaryMain: skyDark.sky3,
    primaryContrastText: bronze.bronze1,
    backgroundDefault: skyDark.sky1,
    textPrimary: bronze.bronze2,
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
      },
      text: {
        primary: tokens.textPrimary,
      },
    },
		components: {
				MuiCssBaseline: {
					styleOverrides: {
						body: {
						}
					}	
				}
			}
  });
};

export default createAppTheme;

