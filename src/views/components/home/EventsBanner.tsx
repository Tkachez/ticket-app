import React from 'react'
import {Button} from '@material-ui/core'
import {makeStyles, createStyles} from '@material-ui/styles'
import {Link} from 'react-router-dom'
import BannerLayout from '../../layout/BannerLayout'

import Typography from '../Typography'

const backgroundImage = 'https://wallpapercave.com/wp/wp1989191.jpg'

const useStyles = makeStyles(() => createStyles({
    background: {
        backgroundImage: `url(${backgroundImage})`,
        backgroundColor: '#7fc7d9', // Average color of the background image.
        backgroundPosition: 'center 15%',
    },
    button: {
        border: '3px solid',
        marginTop: '50px',
        backgroundColor: 'transparent',
        minWidth: 200,
        '&:hover': {
            background: 'transparent',
        },
    },
}))


const EventsBanner = () => {
    const classes = useStyles()

    return (
        <BannerLayout backgroundClassName={classes.background}>
            {/* Increase the network loading priority of the background image. */}
            <img style={{display: 'none'}} src={backgroundImage} alt="increase priority"/>
            <Typography color="inherit" align="center" variant="h2">
                Are you ready?
            </Typography>
            <Button
                component={Link}
                color="secondary"
                variant="contained"
                size="large"
                className={classes.button}
                to="/events"
            >
                Discover Events
            </Button>
        </BannerLayout>
    )
}

export default EventsBanner