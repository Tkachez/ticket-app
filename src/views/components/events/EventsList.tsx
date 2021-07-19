import React, {FC} from 'react'
import {useHistory} from 'react-router-dom'
// material
import {Grid} from '@material-ui/core'
import {EventCard} from './EventCard'
import {makeStyles, createStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(() => createStyles({
    link: {
        cursor: 'pointer'
    }
}))

export const EventsList: FC<any> = ({events,...other}) => {
    const history = useHistory()
    const classes = useStyles()

    return (
        <Grid container spacing={3} {...other}>
            {events && events.length && events.map((event: any) => {
                return (
                    <Grid className={classes.link} key={event.id} item xs={12} sm={6} md={3} onClick={() => history.push(`/events/${event.id}`)}>
                        <EventCard event={event}/>
                    </Grid>
                )
            })}
        </Grid>
    );
}