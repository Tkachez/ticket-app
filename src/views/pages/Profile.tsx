import React from 'react'
import {useHistory} from 'react-router-dom'

//material imports
import {Link} from '@material-ui/core'
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles'

import {useAuth} from '../../context/AuthContext'

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        color: theme.palette.common.white,
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        [theme.breakpoints.up('sm')]: {
            height: '80vh',
            minHeight: 500,
            maxHeight: 1300,
        },
    },
}))

const Profile = () => {
    const classes = useStyles()
    const history = useHistory()
    const {logout} = useAuth()

    const handleLogout = () => {
        logout().then(() => {
            history.push('/')
        }).catch(err => console.log(err))
    }

    return (
        <section className={classes.root}>
           <div>
               <Link onClick={handleLogout}>Logout</Link>
           </div>
        </section>
    )
}

export default Profile