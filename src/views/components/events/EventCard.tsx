import React, {FC} from 'react'
import {Link as RouterLink} from 'react-router-dom';
// material
import {Box, Card, Link, Grid} from '@material-ui/core';

import Typography from '../Typography'
import {makeStyles, createStyles} from "@material-ui/styles";

const useStyles = makeStyles(() => createStyles({
    img: {
        top: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        position: 'absolute'
    }
}))

export const EventCard: FC<any> = ({event}) => {
    const classes = useStyles()
    const {name, logo_uri} = event

    return (
        <Card elevation={0}>
            <Box sx={{pt: '100%', position: 'relative'}}>
                <img alt={name} src={logo_uri} className={classes.img}/>
            </Box>

            <Grid>
                <Link to="#" color="inherit" underline="hover" component={RouterLink}>
                    <Typography variant="subtitle2" noWrap>
                        {name}
                    </Typography>
                </Link>
            </Grid>
        </Card>
    );
}