import { Box } from '@mui/system';
import { Typography, Grid } from '@mui/material';
import { FC } from 'react';
import Card from './Card';
import Link from './Link';
import { User } from '../interfaces';

type Props = {
    user: User;
};

const WelcomeUser: FC<Props> = ({ user }) => {
    console.log('user', user);
    const firstName = user.name.split(' ')[0];

    return (
        <Card
            sx={{
                margin: '0 auto',
                maxWidth: '80%',
            }}
        >
            <Typography variant="h5">Hello {firstName} 👋</Typography>
            <Grid container>
                <Grid item xs={6} my={2}>
                    <Link href="/folders">View All Folders</Link>
                </Grid>
                <Grid item xs={6} my={2}>
                    <Link href="/folders">Create Folder</Link>
                </Grid>
                <Grid item xs={6} my={2}>
                    <Link href="/folders">View All Notes</Link>
                </Grid>
                <Grid item xs={6} my={2}>
                    <Link href="/folders">Create Note</Link>
                </Grid>
            </Grid>
        </Card>
    );
};

export default WelcomeUser;
