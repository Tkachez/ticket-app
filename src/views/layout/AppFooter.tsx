import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {Link} from 'react-router-dom'
import {Button, Container, Typography} from '@material-ui/core';
import logo from '../../assets/static/Logo_black.png'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        backgroundColor: '#f50057',
    },
    container: {
        marginTop: theme.spacing(8),
        marginBottom: theme.spacing(8),
        display: 'flex',
    },
    iconsWrapper: {
        height: 120,
    },
    icons: {
        display: 'flex',
    },
    icon: {
        width: 48,
        height: 48,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.palette.warning.main,
        marginRight: theme.spacing(1),
        '&:hover': {
            backgroundColor: theme.palette.warning.dark,
        },
    },
    logo: {
        width: '100%',
        flexGrow: 1,
        height: '50px',
        margin: 'auto',
        backgroundImage: `url(${logo})`,
        backgroundColor: 'transparent', // Average color of the background image.
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'contain'
    },
    list: {
        margin: 0,
        listStyle: 'none',
        padding: 0,
    },
    listItem: {
        paddingTop: theme.spacing(0.5),
        paddingBottom: theme.spacing(0.5),
    },
    language: {
        marginTop: theme.spacing(1),
        width: 150,
    },
}))

export default function AppFooter() {
    const classes = useStyles();

    return (
        <Typography component="footer" className={classes.root}>
            <Container className={classes.container}>
                <Grid container spacing={5}>
                    <Grid item xs={6} sm={4} md={2}>
                        <ul className={classes.list}>
                            <li className={classes.listItem}>
                                <Button component={Link} to='/legal'>Legal</Button>
                            </li>
                            <li className={classes.listItem}>
                                <Button component={Link} to='/terms'>Terms</Button>
                            </li>
                            <li className={classes.listItem}>
                                <Button component={Link} to='/privacy'>Privacy</Button>
                            </li>
                        </ul>
                    </Grid>
                </Grid>
            </Container>
            <Container className={classes.container}>
                <div className={classes.logo}/>
            </Container>
        </Typography>
    );
}