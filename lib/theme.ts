import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
    palette: {
        primary: {
            main: '#282c34',
        },
        secondary: {
            main: '#000080',
        },
    },
    spacing: 8,
    typography: {
        fontSize: 16,
    },
});

export default theme;