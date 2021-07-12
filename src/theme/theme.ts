import {createTheme, ThemeOptions} from '@material-ui/core/styles'
import {Palette} from '@material-ui/core/styles/createPalette'
import {Typography} from '@material-ui/core/styles/createTypography'
import {Color} from '@material-ui/core'

declare module '@material-ui/core/styles/createTypography' {
    interface Typography {
        typography: {
            fontFamily: string,
            fontSize: number,
            fontWeightLight: number,
            fontWeightRegular: number,
            fontWeightMedium: number,
            fontFamilySecondary: string
        }
    }
}

declare module '@material-ui/core/styles/createPalette' {
    interface Palette {
        pallete: {
            primary: {
                light: string,
                main: string,
                dark: string,
            },
            secondary: {
                light: string,
                main: string,
                dark: string,
            },
            warning: {
                main: string,
                dark: string,
            },
            error: {
                xLight: Color,
                main: string,
                dark: string,
            },
            success: {
                xLight: Color,
                main: string,
                dark: string,
            },
        },
    }
}

declare module '@material-ui/core/styles/createTheme' {
    interface Theme {
        fontHeader: Header,
    }

    interface ThemeOptions {
        fontHeader?: Header,
    }
}

interface Header {
    color: {
        light: string,
        main: string,
        dark: string,
    },
    fontWeight: number,
    fontFamily: string,
    textTransform: string,
}

export const createMyTheme = (pallete: Palette, typography: Typography, fontHeader: Header) => createTheme({
    ...pallete,
    ...typography,
    ...fontHeader
} as ThemeOptions)