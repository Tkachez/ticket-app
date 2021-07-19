import React, {ReactElement, FC} from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '../components/Paper';

type Props = {
    children: ReactElement[],
}

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        display: 'flex',
        backgroundRepeat: 'no-repeat',
    },
    paper: {
        padding: theme.spacing(2, 3),
        [theme.breakpoints.up('md')]: {
            padding: theme.spacing(8, 6),
        },
    },
}))

const AppForm: FC<Props> = (props: Props) => {
    const classes = useStyles()
    const { children } = props;

    return (
        <div className={classes.root}>
            <Container maxWidth="sm">
                <Box mt={7} mb={12}>
                    <Paper className={classes.paper}>{children}</Paper>
                </Box>
            </Container>
        </div>
    );
}

export default AppForm