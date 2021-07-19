import React, {FC, ReactElement} from 'react'
import {Link} from 'react-router-dom'

//Material imports
import {makeStyles, createStyles, Theme} from '@material-ui/core/styles'
import {Typography, Button} from '@material-ui/core'

//Component imports
import BannerLayout from '../../layout/BannerLayout'

const backgroundImage =
    'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F6%2F2015%2F08%2Frage-against-the-machine.jpg';

const useStyles = makeStyles((theme: Theme) => createStyles({
    background: {
        backgroundImage: `url(${backgroundImage})`,
        backgroundColor: '#7fc7d9', // Average color of the background image.
        backgroundPosition: 'center 15%',
    },
    button: {
        minWidth: 200,
    },
    h5: {
        marginBottom: theme.spacing(4),
        marginTop: theme.spacing(4),
        [theme.breakpoints.up('sm')]: {
            marginTop: theme.spacing(10),
        },
    },
    more: {
        marginTop: theme.spacing(2),
    },
}))

const HomeBanner: FC = (): ReactElement => {
    const classes = useStyles()

    return (
        <BannerLayout backgroundClassName={classes.background}>
            {/* Increase the network loading priority of the background image. */}
            <img style={{display: 'none'}} src={backgroundImage} alt="increase priority"/>
            <Typography color="inherit" align="center" variant="h2">
                Upgrade your emotions
            </Typography>
            <Typography color="inherit" align="center" variant="h5" className={classes.h5}>
                Enjoy best concerts, best festivals, ...best everything!
            </Typography>
            <Button
                component={Link}
                color="secondary"
                variant="contained"
                size="large"
                className={classes.button}
                to="/signup"
            >
                Register
            </Button>
            <Typography variant="body2" color="inherit" className={classes.more}>
                Discover the experience
            </Typography>
        </BannerLayout>
    )
}

export default HomeBanner