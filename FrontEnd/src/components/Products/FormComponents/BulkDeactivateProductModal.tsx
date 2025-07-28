import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from '@mui/material';
import { AxiosError } from 'axios';
import { ClearButton, ActionButton } from 'components/common/Buttons/ActionButtons';
import axiosInstance from 'helpers/AxiosInstance';
import permissionChecker from 'helpers/permissionChecker';
import { BasicResponse } from 'models/common/Response';
import { openSuccessGlobalSnackbar, openErrorGlobalSnackbar } from 'redux-state/globalSnackbar/actions';
import { useDispatch, useSelector } from 'redux-state/store';

interface IBulkDeleteModal {
    refreshTable: () => void;
    rows: number[];
    handleClose: () => void;
    open: boolean;
}

const BulkDeleteModal = ({ handleClose, open, refreshTable, rows }: IBulkDeleteModal) => {
    const dispatch = useDispatch();
    const { roles } = useSelector((state) => state.oauth);
    const readWriteUser: boolean = permissionChecker('writer', roles);
    const deleteRow = async () => {
        if (readWriteUser) {
            const response = await axiosInstance.post<BasicResponse>(`${process.env.REACT_APP_EROTAS_CONSOLE_API}/product/bulkDelete`, rows);
            if (response.status === 200) {
                dispatch(openSuccessGlobalSnackbar({ message: response.data.message }));
            } else {
                dispatch(openErrorGlobalSnackbar({ message: response?.data.message ? response?.data.message : `An error has occured` }));
            }
            refreshTable();
        }
        handleClose();
    };

    return (
        <Dialog
            aria-describedby="alert-dialog-description"
            aria-labelledby="alert-dialog-title"
            data-testid="DeleteRegistryModal"
            onClose={handleClose}
            open={open}
        >
            <DialogTitle>Bulk Deprecate Registry?</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    <Typography>{`Are you sure you want to deprecate ${rows.length} Registry?`}</Typography>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <ClearButton data-testid="DeleteRegistryModalCancel" onClick={handleClose}>
                    Cancel
                </ClearButton>
                <ActionButton autoFocus data-testid="DeleteRegistrySubmit" disabled={!readWriteUser} onClick={deleteRow}>
                    APPLY
                </ActionButton>
            </DialogActions>
        </Dialog>
    );
};

export default BulkDeleteModal;
