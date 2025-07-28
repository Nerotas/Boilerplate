import { Stack, Typography, AppBar, capitalize } from '@mui/material';
import { MSLogo } from 'assets/icons/MSLogo';
import LoginButton from './LoginButton';

const AuthorizationBar = () => (
    <AppBar
        position="fixed"
        style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid rgba(232, 232, 237, 1)',
        }}
        sx={{ height: '80px', boxShadow: 0 }}
    >
        <Stack
            alignItems="center"
            direction="row"
            gap="30px"
            justifyContent="space-between"
            sx={{ borderBottom: '1px solid rgba(60, 64, 67, .2)', padding: '0 20px', background: '#fff' }}
        >
            <MSLogo />
            <Typography color="#3c4043" fontWeight="600" sx={{ flex: '1 0 auto', textAlign: 'left' }} variant="h6">
                Erotas Console
                <Typography sx={{ color: '#3c4043', textDecoration: 'unset', textTransform: 'none' }}>
                    {capitalize(`${process.env.REACT_APP_ENV_NAME}`)}
                </Typography>
            </Typography>

            <LoginButton />
        </Stack>
    </AppBar>
);

export default AuthorizationBar;
