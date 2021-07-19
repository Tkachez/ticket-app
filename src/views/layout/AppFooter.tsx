import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {Link} from 'react-router-dom'
import {Button, Container, Typography} from '@material-ui/core';
import logo from '../../assets/static/Logo.png'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        backgroundColor: '#28282a',
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
    link: {
        color: "white",
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
                                <Button component={Link} to='/legal' className={classes.link}>Legal</Button>
                            </li>
                            <li className={classes.listItem}>
                                <Button component={Link} to='/terms' className={classes.link}>Terms</Button>
                            </li>
                            <li className={classes.listItem}>
                                <Button component={Link} to='/privacy' className={classes.link}>Privacy</Button>
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