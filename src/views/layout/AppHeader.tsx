import React from 'react';

//Material imports
import {AppBar, Typography, IconButton, Toolbar} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";


const useStyles = makeStyles((theme: Theme) => createStyles({
    bar: {
        backgroundColor: 'purple',
    },
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}))

const AppHeader = () => {
    const classes = useStyles()

    return (
        <AppBar position='relative' className={classes.bar}>
            <Toolbar>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                    Ticket App
                </Typography>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                    <AccountCircleIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
    )
}

export default AppHeader