import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { AxiosError } from 'axios';
import { ClearButton, ActionButton } from 'components/common/Buttons/ActionButtons';
import axiosInstance from 'helpers/AxiosInstance';
import permissionChecker from 'helpers/permissionChecker';
import { IDeactivateModal } from 'models/common/Modals';
import { BasicResponse } from 'models/common/Response';
import { ProductsForTable } from 'models/Products/Products';
import { openSuccessGlobalSnackbar, openErrorGlobalSnackbar } from 'redux-state/globalSnackbar/actions';
import { useDispatch, useSelector } from 'redux-state/store';

interface IDeactivateProductModal extends IDeactivateModal {
    row: ProductsForTable;
}

const DeactivateProductModal = ({ handleClose, open, refreshTable, row }: IDeactivateProductModal) => {
    const dispatch = useDispatch();
    const { roles } = useSelector((state) => state.oauth);
    const readWriteUser: boolean = permissionChecker('writer', roles);

    const deleteRow = async () => {
        if (readWriteUser) {
            const response = await axiosInstance.delete<BasicResponse>(`${process.env.REACT_APP_EROTAS_CONSOLE_API}/products/${row.id}`, { data: row });
            if (response.status === 200) {
                dispatch(openSuccessGlobalSnackbar({ message: response.data.message }));
            } else {
                dispatch(openErrorGlobalSnackbar({ message: response?.data.message ? response?.data.message : `An error has occured` }));
            }
        }
        refreshTable();
        handleClose();
    };

    return (
        <Dialog
            aria-describedby="alert-dialog-description"
            aria-labelledby="alert-dialog-title"
            data-testid="DeleteProductModal"
            onClose={handleClose}
            open={open}
        >
            <DialogTitle>Deprecate this product?</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">Are you sure you want to deprecate this product?</DialogContentText>
            </DialogContent>
            <DialogActions>
                <ClearButton data-testid="DeleteProductModalCancel" onClick={handleClose}>
                    Cancel
                </ClearButton>
                <ActionButton autoFocus data-testid="DeleteProductSubmit" disabled={!readWriteUser} onClick={deleteRow}>
                    APPLY
                </ActionButton>
            </DialogActions>
        </Dialog>
    );
};

export default DeactivateProductModal;
