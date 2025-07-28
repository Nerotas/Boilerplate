import { useMsal } from '@azure/msal-react';
import { IconButton, Typography, AppBar, Grid2 as Grid, Tooltip } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import InfoIcon from '@mui/icons-material/Info';
import { clearAllDataOnUserLogout } from 'helpers/loginHelpers';
import { capitalize } from 'lodash';
import { useSelector } from 'redux-state/store';

const SignOutBar = () => {
    const { instance } = useMsal();
    const signOut = () => {
        sessionStorage.clear();
        clearAllDataOnUserLogout();
        instance.logoutRedirect();
    };

    const navbarTitle = useSelector((state) => state.navbarTitle.title);

    return (
        <AppBar
            position="fixed"
            style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid rgba(232, 232, 237, 1)',
            }}
            sx={{ boxShadow: 0 }}
        >
            <Grid
                alignItems="center"
                container
                direction="row"
                justifyContent="space-between"
                sx={{ borderBottom: '1px solid rgba(60, 64, 67, .2)', padding: '0 10px', background: '#fff' }}
            >
                <Grid container direction="row" size="grow">
                    <Grid pr={1} size="auto">
                        <img height="30px" src="static/images/erotasAi.png" />
                    </Grid>
                    <Grid>
                        <Typography color="#3c4043" fontWeight="600" variant="h6">
                            Console {`(${capitalize(`${process.env.REACT_APP_ENV_NAME}`)})`} {navbarTitle}
                        </Typography>
                    </Grid>
                </Grid>

                <Grid container size="auto">
                    <Tooltip placement="bottom-start" title="Issue? Submit a ticket here.">
                        <IconButton href="https://erotasai.atlassian.net/jira/software/projects/LCD/boards/139/backlog" target="_blank">
                            <InfoIcon />
                        </IconButton>
                    </Tooltip>
                    <IconButton onClick={signOut}>
                        <LogoutIcon />
                    </IconButton>
                </Grid>
            </Grid>
        </AppBar>
    );
};

export default SignOutBar;
