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
            main: '#060606',
            light: '#676767',
        },
        secondary: {
            main: '#C0BEC0',
            // light: '#F7FBE7',
        },
        bg: {
            main: '#eee',
            // dark: '#333',
        },
    },
    spacing: 8,
    typography: {
        fontSize: 16,
        fontFamily: [
            'Nunito',
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
    },
    components: {
        MuiAlert: {
            styleOverrides: {
                root: {
                    display: 'flex',
                    alignItems: 'center',
                },
                action: {
                    fontSize: '12px',
                    padding: 0,
                    '& svg': {
                        width: '12px',
                        height: '12px',
                    },
                },
                message: {
                    fontSize: '12px',
                    padding: 0,
                    marginRight: '4px',
                },
                icon: {
                    fontSize: '12px',
                    padding: 0,
                },
            },
        },
    },
});

export default theme;
