import React, {FormEventHandler, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Typography, TextField, Button} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert'
import {Link} from 'react-router-dom'
import AppForm from '../layout/AppForm'
import {useAuth} from '../../context/AuthContext'

const useStyles = makeStyles((theme) => ({
    form: {
        marginTop: theme.spacing(6),
    },
    button: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(2),
    },
    feedback: {
        marginTop: theme.spacing(2),
    },
}));

const ForgotPassword = () => {
    const classes = useStyles()
    const [emailValue, setEmailValue] = useState('')
    const [disabled, setDisabled] = useState(false)
    const [message, setMessage] = useState('')
    const [messageType, setMessageType] = useState<'error' | 'success' | 'info' | 'warning' | any>('')

    const {resetPassword} = useAuth()

    const handleEmailChange = (e: any) => {
        setEmailValue(e.target.value)
    }

    const handleSubmit: FormEventHandler = async (e) => {
        e.preventDefault()

        setDisabled(true)

        resetPassword(emailValue).then(() => {
            setDisabled(false)
            setMessageType('success')
            setMessage('Email sent, see your email box for further instructions')
        }).catch(() => {
            setDisabled(false)
            setMessageType('error')
            setMessage('User with this email was not found')
        })
    };

    return (
        <>
            <AppForm>
                <>
                    <Typography variant="body2" align="center">
                        {'Not a member yet? '}
                        <Button component={Link} to="/signup">
                            Sign Up here
                        </Button>
                    </Typography>
                </>
                <>
                    <Alert severity={messageType}>{message}</Alert>
                </>
                <form onSubmit={handleSubmit} className={classes.form} noValidate>
                    <TextField
                        value={emailValue}
                        onChange={handleEmailChange}
                        autoComplete="email"
                        autoFocus
                        disabled={disabled}
                        fullWidth
                        label="Email"
                        margin="normal"
                        name="email"
                        required
                    />
                    <Button
                        type="submit"
                        className={classes.button}
                        disabled={disabled}
                        size="large"
                        color="secondary"
                        fullWidth
                    >
                        {disabled ? 'In progress…' : 'Send Reset Password Link'}
                    </Button>
                </form>
            </AppForm>
        </>
    );
}

export default ForgotPassword