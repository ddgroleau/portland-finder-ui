import { createTheme } from '@mui/material/styles';
import { Roboto } from '@next/font/google';

export const roboto = Roboto({
    weight: ['300', '400', '500', '700'],
    subsets: ['latin'],
    display: 'swap',
    fallback: ['Helvetica', 'Arial', 'sans-serif'],
});

// Create a theme instance.
const theme = createTheme({
    components : {
        MuiSlider: {
            styleOverrides: {
                markLabel: {
                    color: '#FFFFFF',
                    textIndent: '2rem'
                }
            } 
        }
    },
    palette: {
        primary: {
            main: '#0C1618',
        },
        secondary: {
            main: '#FFFFFF',
        },
        error: {
            main: "#FF101F",
        },
    },
    
    typography: {
        fontFamily: roboto.style.fontFamily,
        h1: {
            fontSize: "xxx-large",
            paddingBlock: "1rem"
        },
        h2: {
            fontSize: "xx-large",
            paddingBlock: "1rem"
        },
        h3: {
            fontSize: "x-large",
            paddingBlock: "0.5rem"
        },
        h4: {
            fontSize: "large",
        }
    },
});

export default theme;