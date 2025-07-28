import { Box, CircularProgress } from '@mui/material';

const Loader = () => (
    <Box
        data-testid="loading"
        sx={{
            position: 'fixed',
            zIndex: 9999,
            left: '50vw',
            top: '50vh',
        }}
    >
        <CircularProgress size="4rem" style={{ color: '#ec3266' }} />
    </Box>
);

export default Loader;
