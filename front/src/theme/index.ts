import { createTheme } from "@mui/material/styles";
import { slate, bronze, sky,skyDark,tomato,tomatoDark,amber, blueDark,blue,grass,grassDark,red,redDark } from "@radix-ui/colors";

export type ColorMode = "light" | "dark";

// A color, a group of colors, or a group that holds one nested color group (entries.chips).
type ColorGroup = { [key: string]: string };
type ColorToken = string | ColorGroup | { [key: string]: string | ColorGroup };

type Same<T> = { [K in keyof T]: T[K] };
// Infer the shape from light. Dark must match that shape key for key.
function colorModes<T extends Record<string, ColorToken>>(
	light: T,
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
			headerBorder:blueDark.blue4,
			mainRatingIcon: blueDark.blue4
		},
		modalBackground: sky.sky1,
		modalShadow: skyDark.sky12,
		entries: {
			background: slate.slate4,
			chips: {
				hospital: tomato.tomato3,
				occupational: blue.blue3,
				health: grass.grass3
			},
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
			headerBorder: tomatoDark.tomato3,
			mainRatingIcon: redDark.red7
		},
		modalBackground: blueDark.blue1,
		modalShadow: skyDark.sky4,
		entries: {
			background: skyDark.sky2,
			chips: {
				hospital: tomatoDark.tomato3,
				occupational: blueDark.blue3,
				health: grassDark.grass3
			},
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
							"--occupational-chip": tokens.entries.chips.occupational,
							"--hospital-chip": tokens.entries.chips.hospital,
							"--healthcheck-chip": tokens.entries.chips.health,
							"--header-bg": tokens.main.headerBackground,
							"--header-border-bottom": tokens.main.headerBorder,
							"--main-health-rating-icon": tokens.main.mainRatingIcon,
							"--entries-bg": tokens.entries.background
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
