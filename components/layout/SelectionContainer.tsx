import { Box, styled } from '@mui/material';

const SelectionContainer = styled(Box)(({ theme }) => ({
    width: 300,
    padding: `${theme.spacing(3)} ${theme.spacing(2)}`,
    backgroundColor: theme.palette.secondary.light,
    borderRight: `2px solid ${theme.palette.bg.main}`,
    overflowY: 'auto',
    [theme.breakpoints.down('sm')]: {
        flex: 1,
        width: 'auto',
        paddingTop: 0,
        paddingBottom: 0,
        borderRight: 'none',
        height: '100%',
    },
}));

export default SelectionContainer;
