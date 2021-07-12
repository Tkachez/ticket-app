import React, {FC, useState, useRef} from 'react'
import {Link, useHistory} from 'react-router-dom'

//Material imports
import {AppBar, IconButton, Toolbar, Button, Typography} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles'
import {UserStore} from '../../stores/UserStore'
import logo from '../../assets/static/Logo.png'
import {observer} from 'mobx-react-lite'
import HeaderMenu from '../components/HeaderMenu'


interface AppHeaderProps {
    userStore: UserStore
}

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

const AppHeader: FC<AppHeaderProps> = observer(({userStore}) => {
    const classes = useStyles()
    const history = useHistory()
    const button = useRef(null)
    const [menu, setMenu] = useState(false)

    const handleMenu = () => {
        setMenu(!menu)
    }

    return (
        <AppBar position='relative' className={classes.bar}>
            <Toolbar>
                <IconButton ref={button} edge="start" className={classes.menuButton} color="inherit" aria-label="menu" aria-controls="header-menu" onClick={handleMenu}>
                    <MenuIcon/>
                    <HeaderMenu menu={menu} anchor={button.current}/>
                </IconButton>
                <div className={classes.logo} onClick={() => history.push('/')}/>
                {userStore.user ?
                    <IconButton component={Link} to='/profile' edge="start" className={classes.menuButton}
                                color="inherit" aria-label="menu">
                        <AccountCircleIcon/>
                    </IconButton>
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