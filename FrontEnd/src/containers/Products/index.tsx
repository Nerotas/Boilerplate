import { Box, Grid2 as Grid, Typography } from '@mui/material';

import 'components/Styles/DataGrid/DefaultDataGrid.scss';
import Header from 'wrappers/Header/BasicHeader';
import ProductSelect from 'components/common/DropDowns/ProductSelect';
import { size } from 'lodash';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch } from 'redux-state/store';
import { setNavbarTitle } from 'redux-state/navbarTitle/actions';
import ProductsTableContainer from 'components/Products/ProductsContainer';
import { DisplayName } from 'models/common/DisplayName';

const ProductsTable = () => {
    const [searchParams] = useSearchParams();

    const defaultProduct = {
        displayName: size(searchParams.get('displayName')) > 0 ? (searchParams.get('displayName') as string) : 'Dresses',
        name: size(searchParams.get('name')) > 0 ? (searchParams.get('name') as string) : 'dresses',
        id: searchParams.get('id') !== null ? (searchParams.get('id') as unknown as number) : 0,
    };

    const [productType, setProductType] = useState<DisplayName>(defaultProduct);

    const newProductSelect = (product: DisplayName) => {
        setProductType(product);
    };
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setNavbarTitle('Products'));
    }, []);
    return (
        <Box style={{ backgroundColor: '#fff', marginTop: '3rem' }}>
            <Grid pb={2} px={1} style={{ display: 'flex', flexDirection: 'column', overflowX: 'hidden', overflowY: 'scroll', height: '93vh' }}>
                <Header title="Products" />
                <Grid alignItems="center" container direction="row" justifyContent="flex-start" spacing={0}>
                    <ProductSelect newProductSelect={newProductSelect} productType={productType} />
                </Grid>
                <Grid
                    alignItems="center"
                    container
                    data-testid="productsGridContainer"
                    direction="row"
                    justifyContent="center"
                    sx={{ overflow: 'hidden' }}
                >
                    <ProductsTableContainer productType={productType} />
                </Grid>
            </Grid>
        </Box>
    );
};

export default ProductsTable;
