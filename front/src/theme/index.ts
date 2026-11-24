import { createTheme,alpha } from "@mui/material/styles";
import { bronze, sky,skyDark,tomato,tomatoDark,amber, blueDark,blue } from "@radix-ui/colors";

export type ColorMode = "light" | "dark";

const colorTokens = {
  light: {
    primaryMain: tomato.tomato1,
    primaryContrastText: skyDark.sky1,
    backgroundDefault: amber.amber1,
    textPrimary: sky.sky12,
		cancelBtnBg: skyDark.sky4,
		modalBackground: sky.sky1,
		modalShadow: skyDark.sky12
  },
  dark: {
    primaryMain: skyDark.sky3,
    primaryContrastText: bronze.bronze1,
    backgroundDefault: skyDark.sky1,
    textPrimary: bronze.bronze2,
		cancelBtnBg: tomatoDark.tomato3,
		modalBackground: blueDark.blue1,
		modalShadow: skyDark.sky4
  },
} as const;

const createAppTheme = (mode: ColorMode) => {
  const tokens = colorTokens[mode];
	console.log('tokens',tokens);
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
							"--cancel-button-bg": tokens.cancelBtnBg,
							"--add-patient-modal-background": tokens.modalBackground,
							"--modal-shadow": tokens.modalShadow
						}
					}	
				}
			}
  });
};

export default createAppTheme;
