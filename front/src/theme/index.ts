import { createTheme } from "@mui/material/styles";
import { bronze, sky,skyDark,tomato,tomatoDark,amber, blueDark,blue,grass,grassDark } from "@radix-ui/colors";

export type ColorMode = "light" | "dark";

// ColorToken can be either a string or an object where each key is a string and the value is also a string
type ColorToken = string | { [key: string]: string };

type Same<T> = { [K in keyof T]: T[K] };
// extends: T must at least have the type of <Record<string,ColorToken>>, where
// light or dark are the string and the object is the ColorToken
function colorModes<T extends Record<string,ColorToken>>(
	light: Same<T>,
	dark: Same<T>
) {
	return { light, dark };
}

const colorTokens = colorModes(
	{
    primaryMain: tomato.tomato1,
		buttonHover: tomato.tomato2,
    primaryContrastText: skyDark.sky1,
    backgroundDefault: amber.amber1,
    textPrimary: sky.sky12,
		cancelBtnBg: skyDark.sky4,
		cancelBtnBgHover: skyDark.sky5,
		modalBackground: sky.sky1,
		modalShadow: skyDark.sky12,
		chips: {
			hospital: tomato.tomato3,
			occupational: blue.blue3,
			health: grass.grass3
		},
	},
	{
    primaryMain: skyDark.sky3,
		buttonHover: skyDark.sky4,
    primaryContrastText: bronze.bronze1,
    backgroundDefault: skyDark.sky1,
    textPrimary: bronze.bronze2,
		cancelBtnBg: tomatoDark.tomato3,
		cancelBtnBgHover: tomatoDark.tomato4,
		modalBackground: blueDark.blue1,
		modalShadow: skyDark.sky4,
		chips: {
			hospital: tomatoDark.tomato3,
			occupational: blueDark.blue3,
			health: grassDark.grass3
		},
	},
);

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
							"--cancel-button-bg-hover": tokens.cancelBtnBgHover,
							"--add-patient-modal-background": tokens.modalBackground,
							"--modal-shadow": tokens.modalShadow,
							"--occupational-chip": tokens.chips.occupational,
							"--hospital-chip": tokens.chips.hospital,
							"--healthcheck-chip": tokens.chips.health
						}

					}	
				},
			MuiButton: {
				styleOverrides: {
					root: {
						"&:hover": {
							backgroundColor: tokens.buttonHover,
						}
					}
				}
			}
		}
  });
};

export default createAppTheme;
