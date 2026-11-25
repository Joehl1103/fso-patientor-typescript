import { createTheme } from "@mui/material/styles";
import { bronze, sky,skyDark,tomato,tomatoDark,amber, blueDark,blue,grass,grassDark,red,redDark } from "@radix-ui/colors";

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
		buttons: {
			backgroundDefault: amber.amber1,
			primaryContrastText: skyDark.sky1,
			buttonHover: tomato.tomato2,
			cancelBtnBg: skyDark.sky4,
			cancelBtnBgHover: skyDark.sky5,
		},
		main: {
			primaryMain: tomato.tomato1,
			textPrimary: sky.sky12,
			headerBackground: "#DE9481",		
			headerBorder:blueDark.blue4
		},
		modalBackground: sky.sky1,
		modalShadow: skyDark.sky12,
		chips: {
			hospital: tomato.tomato3,
			occupational: blue.blue3,
			health: grass.grass3
		},
	},
	{
		buttons: {
			backgroundDefault: skyDark.sky1,
			primaryContrastText: bronze.bronze1,
			buttonHover: skyDark.sky4,
			cancelBtnBg: tomatoDark.tomato3,
			cancelBtnBgHover: redDark.red6,
		},
		main: {
			primaryMain: skyDark.sky3,
			textPrimary: bronze.bronze2,
			headerBackground: skyDark.sky4,
			headerBorder:tomatoDark.tomato3
		},
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
		typography: {
			fontSize: 15,
			body1: {
				fontSize: 15
			},
		},
    palette: {
      mode,
      primary: {
        main: tokens.main.primaryMain,
        contrastText: tokens.buttons.primaryContrastText,
      },
      background: {
        default: tokens.buttons.backgroundDefault,
      },
      text: {
        primary: tokens.main.textPrimary,
      },
    },
		components: {
				MuiCssBaseline: {
					styleOverrides: {
						body: {
							"--background-color-main": tokens.main.primaryMain,
							"--cancel-button-bg": tokens.buttons.cancelBtnBg,
							"--cancel-button-bg-hover": tokens.buttons.cancelBtnBgHover,
							"--add-patient-modal-background": tokens.modalBackground,
							"--modal-shadow": tokens.modalShadow,
							"--occupational-chip": tokens.chips.occupational,
							"--hospital-chip": tokens.chips.hospital,
							"--healthcheck-chip": tokens.chips.health,
							"--header-bg": tokens.main.headerBackground,
							"--header-border-bottom": tokens.main.headerBorder
						}

					}	
				},
			MuiButton: {
				styleOverrides: {
					root: {
						"&:hover": {
							backgroundColor: tokens.buttons.buttonHover,
						}
					}
				}
			}
		}
  });
};

export default createAppTheme;
