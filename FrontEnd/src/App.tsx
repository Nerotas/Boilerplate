import { Box, CssBaseline, StyledEngineProvider, ThemeProvider } from '@mui/material';
import { VersionInfo } from 'components/VersionInfo/VersionInfo';
import ErotasGlobalTheme from 'theme/theme';
import UniversalSidebar from 'wrappers/Sidebar';
import RoleProvider from 'wrappers/RoleProvider';

const App = () => (
    <>
        <RoleProvider>
            <StyledEngineProvider injectFirst>
                <ThemeProvider theme={ErotasGlobalTheme}>
                    <CssBaseline />
                    <Box sx={{ background: '#FCF7F8', minHeight: '100vh', width: '100%' }}>
                        <UniversalSidebar />
                    </Box>
                </ThemeProvider>
            </StyledEngineProvider>
        </RoleProvider>
        <VersionInfo />
    </>
);

export default App;
