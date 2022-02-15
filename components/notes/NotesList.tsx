import { Box, Button, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import { FC } from 'react';
import { Note } from '../../interfaces';
import Card from '../ui/Card';
import BasicButton from '../ui/BasicButton';

interface Props {
    notes: Note[];
}

const NotesList: FC<Props> = ({ notes }) => {
    const router = useRouter();
    const folderId = router.query.folderId;

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

                    <NextLink
                        href={`/create-note?folderId=${folderId}`}
                        passHref
                    >
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
    return <Box sx={{ marginTop: 2 }}>NotesList</Box>;
};

export default NotesList;