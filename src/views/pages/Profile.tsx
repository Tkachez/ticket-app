import React, {FormEventHandler, MouseEvent, useRef, useState, useEffect} from "react";
// @material-ui/core components
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles'
import {
    Grid,
    Card,
    CardHeader,
    CardActions,
    Button,
    Avatar,
    Tooltip,
    Fade,
    CircularProgress,
    TextField
} from '@material-ui/core'
import {Alert} from '@material-ui/lab'
import {useHistory} from 'react-router-dom'

import {useAuth} from '../../context/AuthContext'

// core components
import Typography from '../components/Typography'
import {observer} from 'mobx-react-lite'
import {UserStoreImpl} from '../../stores/UserStore'
import {UserData} from '../../types'
import AppForm from "../layout/AppForm";

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        marginBottom: theme.spacing(4),
    },
    form: {
        marginTop: theme.spacing(6),
        marginLeft: theme.spacing(6),
        marginRight: theme.spacing(6),
    },
    card: {
        display: 'flex',
        flexDirection: 'column'
    },
    cardHeader: {
        display: 'flex',
        margin: 'auto',
    },
    loader: {
        margin: 'auto'
    },
    cardActions: {
        display: 'flex',
        margin: 'auto',
    },
    action: {
        display: 'flex'
    },
    actionBtn: {
        margin: 'auto'
    },
    button: {
        margin: 'auto',
        minWidth: 200,
    },
    buttonContainer: {
        display: 'flex'
    },
    title: {
        marginBottom: theme.spacing(4),
    },
    loading: {
        width: theme.spacing(12),
        height: theme.spacing(12),
    },
    avatar: {
        margin: 'auto',
        cursor: 'pointer',
        display: 'flex',
        width: theme.spacing(14),
        height: theme.spacing(14),
    },
    upload: {
        height: 0,
        visibility: 'hidden'
    },
    cardCategoryWhite: {
        color: "rgba(255,255,255,.62)",
        margin: "0",
        fontSize: "14px",
        marginTop: "0",
        marginBottom: "0",
    },
    cardTitleWhite: {
        color: "#FFFFFF",
        marginTop: "0px",
        minHeight: "auto",
        fontWeight: 300,
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: "3px",
        textDecoration: "none",
    },
}));

const UserProfile = observer(() => {
    const [disabled, setDisabled] = useState(true)
    const [locked, setLocked] = useState(true)
    const [message, setMessage] = useState<string | null>(null)
    const [messageType, setMessageType] = useState<any>('success')
    const firstName = useRef<HTMLInputElement>()
    const lastName = useRef<HTMLInputElement>()
    const classes = useStyles()
    const history = useHistory()
    const {logout} = useAuth()
    const upload = useRef<any>(null)

    useEffect(() => {
        if (!UserStoreImpl.authenticated) {
            history.push('/')
        }
    })

    const handleFileInputChange = () => {
        UserStoreImpl.uploadAvatar(upload.current.files[0])
        setDisabled(false)
    }

    const handleFirstNameChange = () => {
        UserStoreImpl.editUser('firstName', firstName?.current?.value as keyof UserData)
    }

    const handleLastNameChange = () => {
        UserStoreImpl.editUser('lastName', lastName?.current?.value as keyof UserData)
    }

    const handleAvatarClick = (e: MouseEvent) => {
        e.preventDefault()

        upload.current.click()
    }

    const handleLogout = () => {
        logout().then(() => {
            history.push('/')
        }).catch(err => console.log(err))
    }

    const handleSubmit: FormEventHandler = (e: MouseEvent) => {
        e.preventDefault()

        UserStoreImpl.updateUser().then(() => {
            setMessageType('success')
            setMessage('User successfully updated')
        }).then(() => {
            setTimeout(() => {
                setMessage(null)
            }, 1500)
        }).catch(err => {
            setMessageType('error')
            setMessage(err)
        })
    }

    return (
        <section className={classes.root}>
            <AppForm>
                <input type={'file'} ref={upload} onChange={handleFileInputChange} className={classes.upload}/>
                <Typography variant="h4" marked="center" align="center" component="h2" className={classes.title}>
                    User Profile page
                </Typography>
                <Fade in={!!message} timeout={1500}>
                    <Alert severity={messageType}>{message}</Alert>
                </Fade>
                <Card elevation={0} className={classes.card}>
                    <CardHeader className={classes.cardHeader}
                                classes={{avatar: classes.avatar}}
                                avatar={
                                    <Tooltip title={'edit avatar'} placement="left">
                                        {!UserStoreImpl.avatarLoading ? <Avatar alt="User Image"
                                                                                src={UserStoreImpl.user ?
                                                                                    UserStoreImpl.user.photoUrl :
                                                                                    ''}
                                                                                className={classes.avatar}
                                                                                onClick={handleAvatarClick}>
                                            </Avatar> :
                                            <CircularProgress className={classes.loader} color="secondary"/>}
                                    </Tooltip>
                                }/>
                    <CardActions className={classes.cardActions}>
                        <Grid container justifyContent="center">
                            <Grid item xs={12} className={classes.action}>
                                <Button className={classes.actionBtn} color='secondary' onClick={() => {
                                    setLocked(!locked)
                                }}>
                                    <Typography aligned='center'>
                                        {`${disabled ? 'Edit' : 'Lock'} Profile`}
                                    </Typography>
                                </Button>
                            </Grid>
                            <Grid item xs={12} className={classes.action}>
                                <Button className={classes.actionBtn} color='primary'
                                        onClick={handleLogout}>
                                    <Typography aligned='center'>
                                        Logout
                                    </Typography>
                                </Button>
                            </Grid>
                        </Grid>
                    </CardActions>
                </Card>
                <Card elevation={0}>
                    {UserStoreImpl.user && <form onSubmit={handleSubmit} className={classes.form}>
                        <Grid container spacing={3}>
                            <Grid item xs={6}>
                                <TextField
                                    value={UserStoreImpl.user.firstName || ''}
                                    inputProps={{ref: firstName}}
                                    onChange={handleFirstNameChange}
                                    autoComplete="first_name"
                                    autoFocus
                                    disabled={locked}
                                    fullWidth
                                    label="First Name"
                                    margin="normal"
                                    name="first_name"
                                    required
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    value={UserStoreImpl.user.lastName || ''}
                                    inputProps={{ref: lastName}}
                                    onChange={handleLastNameChange}
                                    autoComplete="last_name"
                                    autoFocus
                                    disabled={locked}
                                    fullWidth
                                    label="Last Name"
                                    margin="normal"
                                    name="last_name"
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} className={classes.buttonContainer}>
                                <Button
                                    type="submit"
                                    color="secondary"
                                    variant="contained"
                                    size="large"
                                    disabled={disabled && locked}
                                    className={classes.button}
                                >
                                    Save changes
                                </Button>
                            </Grid>
                        </Grid>
                    </form>}
                </Card>
            </AppForm>
        </section>
    );
})

export default UserProfile
