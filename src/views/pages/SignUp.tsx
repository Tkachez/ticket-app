import React, {FC, FormEventHandler, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles'
import {Grid, Button, Typography, TextField} from '@material-ui/core'
import AppForm from '../components/AppForm'
import {Link, useHistory} from 'react-router-dom'
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

const SignUp: FC = () => {
    const classes = useStyles()
    const history = useHistory()
    const [emailValue, setEmailValue] = useState('')
    const [passwordValue, setPasswordValue] = useState('')
    const [firstNameValue, setFirstNameValue] = useState('')
    const [lastNameValue, setLastNameValue] = useState('')
    const [age, setAge] = useState('')
    const [sex, setSex] = useState('')
    const [disabled, setDisabled] = useState(false)
    const {signup} = useAuth()

    const handleEmailChange = (e: any) => {
        setEmailValue(e.target.value)
    }

    const handlePasswordChange = (e: any) => {
        setPasswordValue(e.target.value)
    }

    const handleFirstNameChange = (e: any) => {
        setFirstNameValue(e.target.value)
    }

    const handleLastNameChange = (e: any) => {
        setLastNameValue(e.target.value)
    }

    const handleAgeChange = (e: any) => {
        setAge(e.target.value)
    }

    const handleSexChange = (e: any) => {
        setSex(e.target.value)
    }

    const handleSubmit: FormEventHandler = async (e) => {
        e.preventDefault()
        setDisabled(true)

        return signup(emailValue, passwordValue, {
            firstName: firstNameValue,
            lastName: lastNameValue,
            role: 'user',
            sex,
            age,
            photoUrl: '',
        }).then(() => {
            setDisabled(false)
            history.push('/')
        }).catch(err => {
            console.log(err)
            setDisabled(false)
        })
    }

    return (
        <>
            <AppForm>
                <React.Fragment>
                    <Typography gutterBottom>
                        Sign Up
                    </Typography>
                    <Typography variant="body2" align="center">
                        <Button component={Link} to="/login">
                            Already have an account?
                        </Button>
                    </Typography>
                </React.Fragment>
                <form onSubmit={handleSubmit} className={classes.form}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                onChange={handleFirstNameChange}
                                value={firstNameValue}
                                autoFocus
                                fullWidth
                                label="First name"
                                name="firstName"
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                value={lastNameValue}
                                onChange={handleLastNameChange}
                                fullWidth
                                label="Last name"
                                name="lastName"
                                required
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                onChange={handleSexChange}
                                value={sex}
                                autoFocus
                                fullWidth
                                label="Sex"
                                name="sex"
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                type='number'
                                value={age}
                                onChange={handleAgeChange}
                                fullWidth
                                label="Age"
                                name="age"
                                required
                            />
                        </Grid>
                    </Grid>
                    <TextField
                        value={emailValue}
                        onChange={handleEmailChange}
                        autoComplete="email"
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
                    <Button
                        type='submit'
                        className={classes.button}
                        disabled={disabled}
                        color="secondary"
                        fullWidth
                    >
                        {disabled ? 'In progress…' : 'Sign Up'}
                    </Button>
                </form>
            </AppForm>
        </>
    )
}

export default SignUp