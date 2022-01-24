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
            main: '#253449',
        },
        secondary: {
            main: '#768299',
        },
        bg: {
            main: 'rgba(255, 255, 255, 0.6)',
            dark: '#333',
        },
    },
    spacing: 8,
    typography: {
        fontSize: 16,
    },
});

export default theme;
