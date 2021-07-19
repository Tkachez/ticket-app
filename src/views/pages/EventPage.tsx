import React, {FC, FormEventHandler, PropsWithChildren, useEffect, useRef, useState} from 'react'
import {RouteComponentProps} from 'react-router-dom'
import {EventStoreImpl} from '../../stores/EventStore'
import {UserStoreImpl} from '../../stores/UserStore'
import {observer} from 'mobx-react-lite'
import Typography from '../components/Typography'

import {
    createStyles,
    makeStyles,
    Theme,
    Grid,
    Card,
    CardHeader,
    CardActions,
    CircularProgress,
    Avatar,
    Button,
    TextField,
    Tooltip,
    Fade
} from '@material-ui/core'
import DateFnsUtils from '@date-io/date-fns';
import {MuiPickersUtilsProvider, KeyboardDateTimePicker} from '@material-ui/pickers';
import moment from "moment";
import {Alert} from "@material-ui/lab";
import AppForm from "../layout/AppForm";

interface Props extends RouteComponentProps {
    match: {
        isExact: boolean,
        path: string,
        url: string,
        params: {
            id: string,
        }
    }
}

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        marginBottom: theme.spacing(4),
        marginLeft: theme.spacing(4),
        marginRight: theme.spacing(4),
    },
    card: {
        display: 'flex',
        flexDirection: 'column'
    },
    cardHeader: {
        display: 'flex',
        margin: 'auto'
    },
    actionsWrapper: {
        display: 'flex'
    },
    form: {
        marginTop: theme.spacing(6),
        marginLeft: theme.spacing(6),
        marginRight: theme.spacing(6),
    },
    edit: {
        margin: 'auto'
    },
    title: {
        marginBottom: theme.spacing(4),
    },
    loader: {
        margin: 'auto'
    },
    avatar: {
        display: 'flex',
        margin: 'auto',
        cursor: 'pointer',
        width: theme.spacing(30),
        height: theme.spacing(30),
    },
    buttonContainer: {
        display: 'flex'
    },
    description: {
        marginBottom: theme.spacing(6),
        textAlign: 'center'
    },
    submit: {
        margin: 'auto',
        minWidth: 200,
    },
}))

const EventPage: FC<PropsWithChildren<Props>> = observer(({match}) => {
    const classes = useStyles()
    const [locked, setLocked] = useState<boolean>(true)
    const [disabled, setDisabled] = useState<boolean>(true)
    const [message, setMessage] = useState<string | null>(null)
    const [messageType, setMessageType] = useState<any>('success')
    const [startDate, setStartDate] = useState<any>(null)
    const [endDate, setEndDate] = useState<any>(null)
    const name = useRef<any>()
    const eventLink = useRef<any>()

    useEffect(() => {
        EventStoreImpl.setEvent(match.params.id)
    }, [match.params.id])

    const editPhoto = () => {

    }

    const redirectEventSourcePage = () => {

    }

    const handleNameChange = () => {
        EventStoreImpl.editEvent('name', name.current.value)
    }

    const handleLinkChange = () => {
        EventStoreImpl.editEvent('link', eventLink.current.value)
    }

    const handleStartDateChange = () => {
        EventStoreImpl.editEvent('start_time', moment(startDate).format())
    }

    const handleEndDateChange = () => {
        EventStoreImpl.editEvent('finish_time', moment(endDate).format())
    }
    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault()

        setDisabled(true)
        EventStoreImpl.updateEvent().then(() => {
            setDisabled(false)
            setMessageType('success')
            setMessage('Successfully updated event')
        }).then(() => {
            setTimeout(() => {
                setMessage(null)
            }, 1500)
        }).catch(err => {
            setDisabled(false)
            setMessageType('error')
            setMessage(err.message)
        })
    }

    return (
        <section className={classes.root}>
            <AppForm>
                <Typography variant="h4" marked="center" align="center" component="h2" className={classes.title}>
                    Event page
                </Typography>


                <Card elevation={0} className={classes.card}>
                    <CardHeader className={classes.cardHeader} classes={{avatar: classes.avatar}} avatar={
                        EventStoreImpl.event ?
                            <Avatar alt='Event Image'
                                    src={EventStoreImpl.event.logo_uri}
                                    className={classes.avatar}
                                    onClick={UserStoreImpl.user && UserStoreImpl.user.role === 'admin' ?
                                        editPhoto : redirectEventSourcePage}/> :
                            <CircularProgress className={classes.loader} color="secondary"/>
                    }/>
                    <CardActions>
                        {UserStoreImpl.user && UserStoreImpl.user.role === 'admin' &&
                        <Button className={classes.edit}
                                color='secondary'
                                onClick={() => setLocked(!locked)}>Edit event</Button>}
                    </CardActions>
                </Card>
                <Card elevation={0}>
                    <Fade in={!!message} timeout={1500}>
                        <Alert severity={messageType}>{message}</Alert>
                    </Fade>
                    {EventStoreImpl.event && UserStoreImpl.user && UserStoreImpl.user.role === 'admin' ?
                        <form onSubmit={handleSubmit} className={classes.form}>
                            <Grid container spacing={3}>
                                <Grid item xs={6}>
                                    <TextField
                                        inputProps={{ref: name}}
                                        value={EventStoreImpl.event.name}
                                        onChange={handleNameChange}
                                        autoComplete="event_name"
                                        autoFocus
                                        disabled={locked}
                                        fullWidth
                                        label="Event Name"
                                        margin="normal"
                                        name="event"
                                        required
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <Tooltip title="Field can't be edited">
                                        <TextField
                                            value={EventStoreImpl.event.organizer.name}
                                            autoComplete="organizer"
                                            autoFocus
                                            disabled={true}
                                            fullWidth
                                            label="organizer"
                                            margin="normal"
                                            name="organizer"
                                            required
                                        />
                                    </Tooltip>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        inputProps={{ref: eventLink}}
                                        value={EventStoreImpl.event.uri}
                                        onChange={handleLinkChange}
                                        autoComplete="link"
                                        autoFocus
                                        disabled={locked}
                                        fullWidth
                                        label="Link"
                                        margin="normal"
                                        name="link"
                                        required
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <KeyboardDateTimePicker
                                            value={EventStoreImpl.event.start_time}
                                            onClose={handleStartDateChange}
                                            onChange={setStartDate}
                                            variant="inline"
                                            format="MM/dd/yyyy hh:mm a"
                                            disabled={locked}
                                            autoOk
                                            label="Start Date"
                                            margin="normal"
                                            name="start_date"
                                            required
                                        />
                                    </MuiPickersUtilsProvider>
                                </Grid>
                                <Grid item xs={6}>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <KeyboardDateTimePicker
                                            value={EventStoreImpl.event.finish_time}
                                            onClose={handleEndDateChange}
                                            onChange={setEndDate}
                                            variant="inline"
                                            format="MM/dd/yyyy hh:mm a"
                                            autoOk
                                            disabled={locked}
                                            label="End Date"
                                            margin="normal"
                                            name="end_date"
                                            required
                                        />
                                    </MuiPickersUtilsProvider>
                                </Grid>
                                <Grid item xs={12} className={classes.buttonContainer}>
                                    <Button
                                        type="submit"
                                        color="secondary"
                                        variant="contained"
                                        size="large"
                                        disabled={disabled && locked}
                                        className={classes.submit}
                                    >
                                        Save changes
                                    </Button>
                                </Grid>
                            </Grid>
                        </form> : <div className={classes.description}>
                            {EventStoreImpl.event && <Typography>
                                {EventStoreImpl.event && EventStoreImpl.event.name}
                            </Typography>}

                        </div>}
                    {EventStoreImpl.event && UserStoreImpl.user && UserStoreImpl.user.role === 'user' &&
                    <CardActions className={classes.actionsWrapper}>
                        <Button className={classes.submit}>Buy Ticket</Button>
                        <Button className={classes.submit} color="secondary">Add To Wishlist</Button>
                    </CardActions>}
                </Card>
            </AppForm>
        </section>
    )
})

export default EventPage