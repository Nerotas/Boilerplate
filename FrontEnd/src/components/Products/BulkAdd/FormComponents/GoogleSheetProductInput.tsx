import { Stack, TextField, Dialog, DialogTitle, DialogContent, Container, CircularProgress, Slide, IconButton } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { ActionButton } from 'components/common/Buttons/ActionButtons';
import axiosInstance from 'helpers/AxiosInstance';
import { DisplayName } from 'models/common/DisplayName';
import { CreateProduct, ProductsAndSectionsForProducts } from 'models/Products/Products';
import React, { forwardRef, useState } from 'react';
import { addInvalidProducts, addProducts } from 'redux-state/bulkAddProducts/actions';
import { useDispatch } from 'redux-state/store';
import HowToModal from '../HowToModal';
import HelpOutlinedIcon from '@mui/icons-material/HelpOutlined';
import { useGet } from 'hooks';
import { openErrorGlobalSnackbar } from 'redux-state/globalSnackbar/actions';
import { bulkProductsValidation } from 'helpers/BulkValidators';

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

interface GoogleSheetInputProps {
    personTypes: DisplayName[];
    products: DisplayName[];
    productSections: ProductsAndSectionsForProducts[];
}

const GoogleSheetInput = ({ personTypes = [], products = [], productSections = [] }: GoogleSheetInputProps) => {
    const [URL, setURL] = useState('');
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const { data: names } = useGet<string[]>({
        url: `${process.env.REACT_APP_EROTAS_CONSOLE_API}/products/names`,
        apiLabel: 'getAllProductNames',
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const dispatch = useDispatch();

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get(`${process.env.REACT_APP_EROTAS_CONSOLE_API}/google-sheet/products?url=${URL}`);
            const { invalidRows, validRows } = bulkProductsValidation(response.data as CreateProduct[], productSections, products, personTypes);
            dispatch(addProducts(validRows));
            dispatch(addInvalidProducts(invalidRows));
        } catch (error) {
            dispatch(openErrorGlobalSnackbar({ message: `An error has occured` }));
        }
        setLoading(false);
    };
    return (
        <>
            <Stack alignItems="center" direction="row" justifyContent="flex-start" spacing={2}>
                <TextField
                    fullWidth
                    id="outlined-controlled"
                    label="Google Sheet URL"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setURL(event.target.value);
                    }}
                    sx={{ py: 1 }}
                    value={URL}
                />
                <IconButton onClick={handleClickOpen}>
                    <HelpOutlinedIcon />
                </IconButton>
                <ActionButton disabled={!URL} onClick={handleSubmit} variant="contained">
                    Submit
                </ActionButton>
            </Stack>
            <Dialog keepMounted open={loading} slots={{ transition: Transition }} sx={{ m: 10 }}>
                <DialogTitle>Fetching Data...</DialogTitle>
                <DialogContent>
                    <Container>
                        <CircularProgress />
                    </Container>
                </DialogContent>
            </Dialog>
            <HowToModal handleClose={handleClose} open={open} />
        </>
    );
};

export default GoogleSheetInput;
