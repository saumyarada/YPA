import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
        main: '#00557f', // A dark blue shade for the header
        },
        background: {
        default: '#f5f5f5', // Light gray for the backgrounds
        },
    },
    typography: {
        fontFamily: 'Roboto, sans-serif',
    },
});

export default theme;