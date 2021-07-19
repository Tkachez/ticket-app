import React, {FormEventHandler, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Typography, TextField, Button, Fade} from '@material-ui/core';
import {Link , useHistory} from 'react-router-dom'
import AppForm from '../layout/AppForm'
import {useAuth} from '../../context/AuthContext'
import {Alert} from "@material-ui/lab";

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

function SignIn() {
    const classes = useStyles()
    const history = useHistory()
    const [emailValue, setEmailValue] = useState('')
    const [passwordValue, setPasswordValue] = useState('')
    const [disabled, setDisabled] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const {login} = useAuth()

    const handlePasswordChange = (e: any) => {
        setPasswordValue(e.target.value)
    }

    const handleEmailChange = (e: any) => {
        setEmailValue(e.target.value)
    }

    const handleSubmit: FormEventHandler = async (e )=> {
        e.preventDefault()

        setDisabled(true)

        return login(emailValue, passwordValue).then(() => {
            setDisabled(false)
            history.push('/')
        }).catch(err => {
            setError(err.message)
            setDisabled(false)
        })
    };

    return (
        <>
            <AppForm>
                <>
                    <Typography gutterBottom>
                        Sign In
                    </Typography>
                    <Typography variant="body2" align="center">
                        {'Not a member yet? '}
                        <Button component={Link} to="/signup">
                            Sign Up here
                        </Button>
                    </Typography>
                </>
                <Fade in={!!error} timeout={1500}>
                    <Alert severity='error'>{error}</Alert>
                </Fade>
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
                    <TextField
                        value={passwordValue}
                        onChange={handlePasswordChange}
                        fullWidth
                        disabled={disabled}
                        required
                        name="password"
                        autoComplete="current-password"
                        label="Password"
                        type="password"
                        margin="normal"
                    />
                    <Typography component={Link} to='/forgot-password'>
                        Forgot password?
                    </Typography>
                    <Button
                        type="submit"
                        className={classes.button}
                        disabled={disabled}
                        size="large"
                        color="secondary"
                        fullWidth
                    >
                        {disabled ? 'In progress…' : 'Sign In'}
                    </Button>
                </form>
            </AppForm>
        </>
    );
}

export default SignIn