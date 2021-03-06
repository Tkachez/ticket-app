import React, {FC, ReactElement} from 'react'
import clsx from 'clsx';
import {makeStyles, createStyles, Theme} from '@material-ui/core/styles'
import {Container} from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        color: theme.palette.common.white,
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        [theme.breakpoints.up('sm')]: {
            height: '80vh',
            maxHeight: 1300,
        },
    },
    container: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(14),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    backdrop: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: theme.palette.common.black,
        opacity: 0.5,
        zIndex: -1,
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        zIndex: -2,
    },
    arrowDown: {
        position: 'absolute',
        bottom: theme.spacing(4),
    },
}))

interface Props {
    children: ReactElement[],
    backgroundClassName: string,
}

const BannerLayout: FC<Props> = (props): ReactElement => {
    const classes = useStyles()
    const {children, backgroundClassName} = props

    return (
        <section className={classes.root}>
            <Container className={classes.container}>
                {children}
                <div className={classes.backdrop}/>
                <div className={clsx(classes.background, backgroundClassName)}/>
            </Container>
        </section>
    )
}

export default BannerLayout