import React, {useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component'
// material
import {Container, CircularProgress} from '@material-ui/core'
// components
import {EventsList} from './EventsList'
import {EventStoreImpl} from '../../../stores/EventStore'
import {observer} from 'mobx-react-lite'

import Typography from '../Typography'
import {makeStyles, createStyles, Theme} from '@material-ui/core/styles';
import {UserStoreImpl} from "../../../stores/UserStore";

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        marginTop: theme.spacing(8),
        marginBottom: theme.spacing(4),
    },
    title: {
        marginBottom: theme.spacing(4),
    },
    loaderWrapper: {
        height: '200px',
        display: 'flex'
    },
    loader: {
        margin: 'auto',
    }
}))

export const EventsGrid = observer(() => {
    const classes = useStyles()
    const history = useHistory()

    useEffect(() => {
        if (!UserStoreImpl.authenticated) {
            history.push('/login')
        }

        EventStoreImpl.setTotalEvents()
        EventStoreImpl.setEvents()
    }, [history])

    useEffect(() => () => {
        EventStoreImpl.clearEvents()
    }, [])

    const fetchMore = () => {
        EventStoreImpl.setEvents()
    }

    return (
        <Container className={classes.root}>
            <Typography variant="h4" marked="center" align="center" component="h2" className={classes.title}>
                For all tastes and all desires
            </Typography>
            <InfiniteScroll dataLength={EventStoreImpl.events.length}
                            hasMore={EventStoreImpl.hasMore}
                            loader={<div className={classes.loaderWrapper}>
                                <CircularProgress color={'secondary'} className={classes.loader}/>
                            </div>}
                            next={fetchMore}>
                <EventsList events={EventStoreImpl.events}/>
            </InfiniteScroll>
        </Container>
    )
})