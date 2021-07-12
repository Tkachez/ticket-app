import React, {ReactElement, FC} from 'react';
import clsx from 'clsx';
import MuiPaper from '@material-ui/core/Paper';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

type Props = {
    children: ReactElement[],
    background?: string
    className: string
    padding?: boolean
}

const useStyles = makeStyles((theme: Theme) => createStyles({
    backgroundLight: {
        backgroundColor: theme.palette.secondary.light,
    },
    backgroundMain: {
        backgroundColor: theme.palette.secondary.main,
    },
    backgroundDark: {
        backgroundColor: theme.palette.secondary.dark,
    },
    padding: {
        padding: theme.spacing(1),
    },
}))

const Paper: FC<Props> = (props): ReactElement => {
    const classes = useStyles()
    const { className, padding = false, ...children } = props

    return (
        <MuiPaper
            elevation={0}
            square
            className={clsx(
                {
                    [classes.padding]: padding,
                },
                className,
            )}
            {...children}
        />
    )
}


export default Paper