import { createTheme } from '@mui/material';

const ErotasGlobalTheme = createTheme({
    palette: {
        primary: {
            main: '#ec3266',
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#11cb5f',
        },
    },
    typography: {
        fontFamily: 'proxima-nova',
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: `
            @font-face {
                font-family: 'proxima-nova';
                font-style: normal;
                font-weight: 100;
                src: local('Proxima Nova Thin'), url('./assets/fonts/proximanova/proximanova-thin.otf') format('opentype');
            }

            @font-face {
                font-family: 'proxima-nova';
                font-style: normal;
                font-weight: 300;
                src: local('Proxima Nova Light'), url('./assets/fonts/proximanova/proximanova-light.otf') format('opentype');
            }

            @font-face {
                font-family: 'proxima-nova';
                font-style: normal;
                font-weight: 400;
                src: local('proxima-nova'), url('/assets/fonts/proximanova/proximanova-regular.otf') format('opentype');
            }

            @font-face {
                font-family: 'proxima-nova';
                font-style: normal;
                font-weight: 500;
                src: local('proxima-nova'), url('/assets/fonts/proximanova/proximanova-medium.otf') format('opentype');
            }

            @font-face {
                font-family: 'proxima-nova';
                font-weight: 600;
                font-style: normal;
                src: local('proxima-nova Semi Bold'), url('./assets/fonts/proximanova/proximanova-semibold.otf') format('opentype');
            }

            @font-face {
                font-family: 'proxima-nova';
                font-weight: 700;
                font-style: normal;
                src: local('proxima-nova Bold'), url('./assets/fonts/proximanova/proximanova-bold.otf') format('opentype');
            }

            @font-face {
                font-family: 'proxima-nova';
                font-weight: 800;
                font-style: normal;
                src: local('proxima-nova Extra Bold'), url('./assets/fonts/proximanova/proximanova-extrabold.otf') format('opentype');
            }

            @font-face {
                font-family: 'proxima-nova';
                font-weight: 900;
                font-style: normal;
                src: local('proxima-nova Bold'), url('./assets/fonts/proximanova/proximanova-black.otf') format('opentype');
            }


          `,
        },
    },
});

export default ErotasGlobalTheme;
