import React from 'react'
import {Button} from '@material-ui/core'
import {makeStyles, createStyles} from '@material-ui/styles'
import {Link} from 'react-router-dom'
import BannerLayout from '../layout/BannerLayout'

import Typography from '../components/Typography'

const backgroundImage = 'https://www.rollingstone.com/wp-content/uploads/2020/03/empty-concert-hall.jpg'

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


const PageNotFoundBanner = () => {
    const classes = useStyles()

    return (
        <BannerLayout backgroundClassName={classes.background}>
            {/* Increase the network loading priority of the background image. */}
            <img style={{display: 'none'}} src={backgroundImage} alt="increase priority"/>
            <Typography color="inherit" align="center" variant="h2">
                Hold on buddy... You're lost? There is no such page
            </Typography>
            <Button
                component={Link}
                color="secondary"
                variant="contained"
                size="large"
                className={classes.button}
                to="/"
            >
                Back Home
            </Button>
        </BannerLayout>
    )
}

export default PageNotFoundBanner