import React, {FC, useState, useRef} from 'react'
import {Link, useHistory} from 'react-router-dom'

//Material imports
import {AppBar, IconButton, Toolbar, Button, Avatar} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles'
import {UserStoreImpl} from '../../stores/UserStore'
import logo from '../../assets/static/Logo.png'
import {observer} from 'mobx-react-lite'
import HeaderMenu from '../components/HeaderMenu'

import Typography from '../components/Typography'

const useStyles = makeStyles((theme: Theme) => createStyles({
    bar: {
        backgroundColor: '#28282a',
    },
    login: {
        color: 'white'
    },
    root: {
        flexGrow: 1,
    },
    menuButton: {
        cursor: 'pointer',
        marginRight: theme.spacing(2),
    },
    logo: {
        cursor: 'pointer',
        flexGrow: 1,
        height: '50px',
        backgroundImage: `url(${logo})`,
        backgroundColor: 'transparent', // Average color of the background image.
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'contain'
    },
    title: {
        flexGrow: 1,
    },
}))

const AppHeader: FC = observer(() => {
    const classes = useStyles()
    const history = useHistory()
    const button = useRef(null)
    const [menu, setMenu] = useState(false)

    const handleMenu = () => {
        setMenu(!menu)
    }

    const handleAvatarClick = () => {
        history.push('/profile')
    }

    return (
        <AppBar position='relative' className={classes.bar}>
            <Toolbar>
                <IconButton ref={button} edge="start" className={classes.menuButton} color="inherit" aria-label="menu"
                            aria-controls="header-menu" onClick={handleMenu}>
                    <MenuIcon/>
                    <HeaderMenu menu={menu} anchor={button.current}/>
                </IconButton>
                <div className={classes.logo} onClick={() => history.push('/')}/>
                {UserStoreImpl.authenticated && UserStoreImpl.user ?
                    <Avatar alt="Profile Image"
                            src={UserStoreImpl.user.photoUrl}
                            className={classes.menuButton}
                            color="inherit"
                            onClick={handleAvatarClick}/>
                    :
                    <Button className={classes.login} component={Link} to='/login'>
                        <Typography>
                            Login
                        </Typography>
                    </Button>}

            </Toolbar>
        </AppBar>
    )
})

export default AppHeader