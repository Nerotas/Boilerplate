import { IconButton, Snackbar, Stack, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'redux-state/store';
import { closeGlobalSnackbar } from 'redux-state/globalSnackbar/actions';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import { Error, Success, Info, Warning } from './SeverityIcons';
import Slide, { SlideProps } from '@mui/material/Slide';
import { useMemo } from 'react';
import { GlobalSnackbarSeverity } from 'models/globalSnackbar/GlobalSnackbar';

type TransitionProps = Omit<SlideProps, 'direction'>;

function TransitionDown(props: TransitionProps) {
    return <Slide {...props} direction="down" />;
}

const GlobalSnackbar = () => {
    const dispatch = useDispatch();
    const { autohideDuration, message, open, severity, title } = useSelector((state) => state.GlobalSnackbar);
    const handleClose = () => {
        dispatch(closeGlobalSnackbar());
    };

    const icon = useMemo(() => {
        switch (severity) {
            case GlobalSnackbarSeverity.ERROR:
                return <Error />;
            case GlobalSnackbarSeverity.SUCCESS:
                return <Success />;
            case GlobalSnackbarSeverity.INFO:
                return <Info />;
            case GlobalSnackbarSeverity.WARNING:
                return <Warning />;
            default:
                break;
        }
    }, [severity]);

    return (
        <Snackbar
            action={
                <IconButton onClick={handleClose}>
                    <HighlightOffRoundedIcon sx={{ color: '#ffffff' }} />
                </IconButton>
            }
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            autoHideDuration={autohideDuration}
            data-testid="globalsnackbar"
            message={
                <>
                    <Stack alignItems="center" direction="row">
                        {icon}
                        <Stack direction="column" pl={2}>
                            {title && <Typography fontWeight="bold">{title}</Typography>}
                            <Typography>{message}</Typography>
                        </Stack>
                    </Stack>
                </>
            }
            onClose={handleClose}
            open={open}
            TransitionComponent={TransitionDown}
        />
    );
};

export default GlobalSnackbar;
