import { Grid2 } from '@mui/material';
import { GridFooter, GridFooterContainer, GridSlotsComponentsProps } from '@mui/x-data-grid';
import { AxiosError } from 'axios';
import { ActionButton, DangerButton } from 'components/common/Buttons/ActionButtons';
import axiosInstance from 'helpers/AxiosInstance';
import permissionChecker from 'helpers/permissionChecker';
import { BasicResponse } from 'models/common/Response';
import { clearProducts, removeProduct } from 'redux-state/bulkAddProducts/actions';
import { openSuccessGlobalSnackbar, openErrorGlobalSnackbar, openInfoGlobalSnackbar } from 'redux-state/globalSnackbar/actions';
import { useDispatch, useSelector } from 'redux-state/store';

const BulkAddProductsFooter = ({ disabled }: NonNullable<GridSlotsComponentsProps['footer']>) => {
    const { roles } = useSelector((state) => state.oauth);
    const { rows } = useSelector((state) => state.bulkAddProducts);
    const readWriteUser: boolean = permissionChecker('writer', roles);
    const dispatch = useDispatch();
    const handleClear = () => {
        dispatch(clearProducts);
    };

    const handleSubmit = () => {
        const promise = axiosInstance
            .post(`${process.env.REACT_APP_EROTAS_CONSOLE_API}/products/bulkAdd`, rows)
            .then((response) => {
                dispatch(openSuccessGlobalSnackbar({ message: response.data.message }));
                rows.forEach((newProduct) => {
                    dispatch(removeProduct(newProduct.name));
                });
            })
            .catch((error: AxiosError<BasicResponse>) =>
                dispatch(openErrorGlobalSnackbar({ message: error.response?.data.message ? error.response?.data.message : `An error has occurred` }))
            );
        Promise.resolve(promise)
            .then(() => {
                dispatch(openInfoGlobalSnackbar({ message: 'All successfully added products that have been removed from the table below.' }));
            })
            .catch(() => {
                dispatch(openErrorGlobalSnackbar({ message: 'An error occurred while adding products.' }));
            });
    };

    return (
        <GridFooterContainer>
            <Grid2 container direction="row">
                <Grid2>
                    <ActionButton disabled={disabled || !readWriteUser} onClick={handleSubmit} sx={{ ml: 1 }}>
                        SUBMIT
                    </ActionButton>
                </Grid2>
                <Grid2>
                    <DangerButton onClick={handleClear} sx={{ ml: 1 }}>
                        CLEAR
                    </DangerButton>
                </Grid2>
            </Grid2>
            <GridFooter />
        </GridFooterContainer>
    );
};

export default BulkAddProductsFooter;
