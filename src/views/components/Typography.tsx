import React from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import { capitalize } from '@material-ui/core/utils'
import MuiTypography from '@material-ui/core/Typography'

const useStyles = makeStyles((theme: Theme) => createStyles({
    markedH2Center: {
        height: 4,
        width: 73,
        display: 'block',
        margin: `${theme.spacing(1)}px auto 0`,
        backgroundColor: theme.palette.secondary.main,
    },
    markedH3Center: {
        height: 4,
        width: 55,
        display: 'block',
        margin: `${theme.spacing(1)}px auto 0`,
        backgroundColor: theme.palette.secondary.main,
    },
    markedH4Center: {
        height: 4,
        width: 55,
        display: 'block',
        margin: `${theme.spacing(1)}px auto 0`,
        backgroundColor: theme.palette.secondary.main,
    },
    markedH6Left: {
        height: 2,
        width: 28,
        display: 'block',
        marginTop: theme.spacing(0.5),
        background: 'currentColor',
    },
}))

const variantMapping = {
    h1: 'h1',
    h2: 'h1',
    h3: 'h1',
    h4: 'h1',
    h5: 'h3',
    h6: 'h2',
    subtitle1: 'h3',
};

function Typography(props: any) {
    const classes: any = useStyles()
    const { children, marked = false, variant, ...other } = props;

    return (
        <MuiTypography variantMapping={variantMapping} variant={variant} {...other}>
            {children}
            {marked ? (
                <span className={classes[`marked${capitalize(variant) + capitalize(marked)}`]} />
            ) : null}
        </MuiTypography>
    );
}

export default Typography