import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';

import './errorboundary.module.scss';
import { Typography } from '@mui/material';

function ErrorBoundaryPage() {
    const navigate = useNavigate();
    const backToHome = () => {
        navigate('/');
    };

    return (
        <Box
            data-testid="ErrorBoundaryPage"
            sx={{
                height: '100vh',
                width: '100vw',
                backgroundColor: '#ebf6f9',
                backgroundImage: `url('static/images/error-background.png')`,
                padding: '60px',
                display: 'flex',
                flexDirection: 'column',
                backgroundSize: '800px',
                backgroundRepeat: 'no-repeat',
                backgroundPositionX: 'right',
                backgroundPositionY: 'bottom',
            }}
        >
            <Box>
                <img alt="Erotas.test" className="" height="60px" src="static/images/erotas.png" />
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    flex: 1,
                    alignSelf: 'stretch',
                    marginTop: '-100px',
                }}
            >
                <Typography sx={{ mt: 2, mb: 2, fontWeight: 'bold', fontSize: '94px' }} variant="h1">
                    Oops!
                </Typography>
                <Typography sx={{ mb: 2, fontSize: '26px', fontWeight: 'bold' }}>Sorry, something went wrong.</Typography>
                <Typography sx={{ mb: 2, fontSize: '20px' }}>This page is currently unavailable.</Typography>
                <Button id="backHomeButton" onClick={backToHome} sx={{ mt: 2 }} variant="contained">
                    Try again
                </Button>
            </Box>
        </Box>
    );
}

export default ErrorBoundaryPage;
