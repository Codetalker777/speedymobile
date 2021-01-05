import { createMuiTheme } from '@material-ui/core/styles';

const themeColor = '#49c5b6';

export const GlobalTheme = createMuiTheme({
	palette: {
		primary: {
			main: themeColor
		},
		secondary: {
			light: themeColor,
			main: '#235f58',
			contrastText: '#ffffff'
		}
	},
	overrides: {
		MuiCheckbox: {
			root: {
				'&:hover': {
					backgroundColor: 'transparent'
				},
				color: themeColor
			},
			icon: {
				borderRadius: 8
			},
			colorSecondary: {
				color: themeColor,
				'&$checked': {
					color: themeColor
				}
			}
		},
		MuiPaper: {
			root: {
				background: themeColor,
				borderRadius: 8
			}
		},
		MuiButton: {
			root: {
				background: themeColor,
				'&:hover': {
					backgroundColor: themeColor,
					'@media (hover: none)': {
						backgroundColor: themeColor
					}
				},
				backgroundColor: themeColor,
				'&:active': {
					boxShadow: 'none',
					backgroundColor: themeColor
				},
				color: 'white',
				borderRadius: 8
			},
			textPrimary: {
				color: 'white',
				'&:hover': {
					backgroundColor: themeColor
				}
			}
		},
		MuiButtonBase: {
			// disableRipple: true
		},
		MuiSlider: {
			root: {
				color: themeColor,
				height: 8
			},
			thumb: {
				height: 24,
				width: 24,
				backgroundColor: '#fff',
				border: '2px solid currentColor',
				marginTop: -8,
				marginLeft: -12,
				'&:focus,&:hover,&$active': {
					boxShadow: 'inherit'
				}
			},
			valueLabel: {
				left: 'calc(-50% + 4px)'
			},
			track: {
				height: 8,
				borderRadius: 4
			},
			rail: {
				height: 8,
				borderRadius: 4
			}
		},
		MuiSnackbarContent: {
			root: {
				backgroundColor: '#1976D3'
			}
		},
		MuiTab: {
			root: {
				'&:hover': {
					backgroundColor: themeColor
				},
				backgroundColor: themeColor,
				color: themeColor,
				borderRadius: 8
			}
		},
		MuiTabs: {
			indicator: { backgroundColor: 'transparent' }
		},
		MuiMobileStepper: {
			dotActive: {
				backgroundColor: themeColor
			}
		},
		MuiStepIcon: {
			root: {
				'&$completed': {
					color: themeColor
				},
				'&$active': {
					color: '#33897f'
				}
			},
			active: {},
			completed: {}
		},
		MuiRadio: {
			root: {
				'&:hover': {
					backgroundColor: 'transparent'
				},
				color: themeColor
			},
			colorSecondary: {
				color: themeColor,
				'&$checked': {
					color: themeColor
				}
			},
			checked: {}
		},
		MuiCssBaseline: {
			'@global': {
				'*': {
					'scrollbar-width': 'thin'
				},
				'&::-webkit-scrollbar-thumb': {
					backgroundColor: themeColor,
					borderRadius: '10px'
				},
				'*::webkit-scrollbar': {
					backgroundColor: themeColor,
					width: '10px',
					height: '4px'
				}
			}
		},
		MuiInput: {
			underline: {
				'&:before': {
					borderBottom: `1px solid ${themeColor}`
				},
				'&:after': {
					borderBottom: `2px solid #000000`
				},
				'&:hover:not($disabled):not($focused):not($error):before': {
					borderBottom: `2px solid ${themeColor}`
				}
			}
		},
		MuiBadge: {
			colorPrimary: {
				backgroundColor: '#b63a49',
				color: 'white'
			}
		},
		MuiTableCell: {
			root: {
				borderBottom: 'none'
			},
			head: {
				backgroundColor: '#ffffff'
			},
			body: {
				fontFamily: 'Roboto',
				color: '#545454',
				paddingTop: 70,
				paddingBottom: 65,
				fontSize: 18
			}
		},
		MuiDivider: {
			root: {
				backgroundColor: '#49c5b6',
				width: '90%',
				alignSelf: 'center',
				height: '2px'
			}
		},
		MuiAutocomplete: {
			inputRoot: {
				backgroundColor: 'white',
				borderRadius: '30px !important'
			}
		}
	}
});
