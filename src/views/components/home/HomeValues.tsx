import React, {FC, ReactElement} from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import {Grid, Container} from '@material-ui/core'
import Typography from '../Typography'

//assets
import productCurvyLines from '../../../assets/static/productCurvyLines.png'
import festival from '../../../assets/static/festival.svg'
import moneySavings from '../../../assets/static/money-saving.svg'
import smiley from '../../../assets/static/smiley.svg'


const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        display: 'flex',
        overflow: 'hidden',
    },
    container: {
        marginTop: theme.spacing(15),
        marginBottom: theme.spacing(30),
        display: 'flex',
        position: 'relative',
    },
    item: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(0, 5),
    },
    image: {
        height: 55,
    },
    title: {
        textAlign: 'center',
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(5),
    },
    curvyLines: {
        pointerEvents: 'none',
        position: 'absolute',
        top: -180,
    },
}))

const HomeValues: FC = (): ReactElement => {
    const classes = useStyles()

    return (
        <section className={classes.root}>
            <Container className={classes.container}>
                <img
                    src={productCurvyLines}
                    className={classes.curvyLines}
                    alt="curvy lines"
                />
                <Grid container spacing={5}>
                    <Grid item xs={12} md={4}>
                        <div className={classes.item}>
                            <img
                                className={classes.image}
                                src={festival}
                                alt="suitcase"
                            />
                            <Typography variant="h6" className={classes.title}>
                                Best events
                            </Typography>
                            <Typography variant="h5">
                                {'From small local concerts and secret open airs, to large festivals featuring artists from all over the world.'}
                            </Typography>
                        </div>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <div className={classes.item}>
                            <img
                                className={classes.image}
                                src={smiley}
                                alt="graph"
                            />
                            <Typography variant="h6" className={classes.title}>
                                New experiences
                            </Typography>
                            <Typography variant="h5">
                                {'Believe it or not, but each event will change you and our life... '}
                                {'your Sundays will not be alike.'}
                            </Typography>
                        </div>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <div className={classes.item}>
                            <img
                                className={classes.image}
                                src={moneySavings}
                                alt="clock"
                            />
                            <Typography variant="h6" className={classes.title}>
                                Exclusive rates
                            </Typography>
                            <Typography variant="h5">
                                {'By registering, you will access specially negotiated rates '}
                                {'that you will not find anywhere else.'}
                            </Typography>
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </section>
    );
}

export default HomeValues