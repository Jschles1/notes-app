import * as React from 'react';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import { Box, Button, Grid, Typography } from '@mui/material';
import { Note } from '../../interfaces';
import Card from '../ui/Card';
import NoteCard from './NoteCard';
import BasicButton from '../ui/BasicButton';

interface Props {
    notes: Note[];
}

const NotesList: React.FC<Props> = ({ notes }) => {
    const router = useRouter();
    const folderId = router.query.folderId as string;

    if (!notes.length) {
        return (
            <Box
                sx={{
                    marginTop: 2,
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Card
                    sx={{
                        width: 450,
                        height: 250,
                        textAlign: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                    }}
                >
                    <Typography
                        variant="h6"
                        sx={{
                            marginY: 2,
                        }}
                    >
                        This Folder Has No Notes!
                    </Typography>

                    <NextLink href={`/create-note?folderId=${folderId}`} passHref>
                        <BasicButton
                            sx={{
                                display: 'block',
                                marginLeft: 'auto',
                                marginRight: 'auto',
                                marginTop: 1,
                                marginBottom: 1,
                            }}
                        >
                            Create Note
                        </BasicButton>
                    </NextLink>
                </Card>
            </Box>
        );
    }

    return (
        <Card sx={{ marginTop: 2 }}>
            <Box
                sx={{
                    marginBottom: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                <Typography variant="h5">Notes:</Typography>
                <BasicButton>Create Note</BasicButton>
            </Box>

            <Grid container spacing={2}>
                {notes.map((note) => (
                    <Grid item key={note._id} xs={3}>
                        <NoteCard
                            folderId={folderId}
                            noteId={note._id}
                            name={note.name}
                            description={note.description}
                        />
                    </Grid>
                ))}
            </Grid>
        </Card>
    );
};

export default React.memo(NotesList);
