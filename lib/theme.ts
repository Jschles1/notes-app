import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
    interface Palette {
        bg: Palette['primary'];
    }

    // allow configuration using `createTheme`
    interface PaletteOptions {
        bg?: PaletteOptions['primary'];
    }
}

// Create a theme instance.
const theme = createTheme({
    palette: {
        primary: {
            main: '#C5C6C7',
        },
        secondary: {
            main: '#66FCF1',
            dark: '#45A29E',
        },
        bg: {
            main: '#1F2833',
            dark: '#0B0C10',
        },
    },
    spacing: 8,
    typography: {
        fontSize: 16,
    },
});

export default theme;
