import { Button, Typography } from '@mui/material';

import { MSLogo } from 'assets/icons/MSLogo';
import { useNavigate } from 'react-router';

const LoginButton = () => {
    const navigate = useNavigate();
    const handleLoginRedirect = async () => {
        navigate('/products');
    };

    return (
        <Button
            data-testid="-login-button"
            fullWidth={false}
            onClick={handleLoginRedirect}
            startIcon={<MSLogo />}
            sx={{ border: '1px solid rgba(60, 64, 67, .2)', width: 'fit-content', padding: '0 20px 0 10px' }}
        >
            <Typography sx={{ color: '#3c4043', textDecoration: 'unset', textTransform: 'none' }}>Sign in</Typography>
        </Button>
    );
};

export default LoginButton;
