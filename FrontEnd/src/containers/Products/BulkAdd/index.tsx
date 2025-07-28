import { Box, Grid2 as Grid, Typography } from '@mui/material';
import BulkAddProductContainer from 'components/Products/BulkAdd/BulkAddProductContainer';

import 'components/Styles/DataGrid/DefaultDataGrid.scss';
import { useEffect } from 'react';
import { setNavbarTitle } from 'redux-state/navbarTitle/actions';
import { useDispatch } from 'redux-state/store';
import Header from 'wrappers/Header/BasicHeader';

const BulkAddProduct = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setNavbarTitle('Bulk Add Products'));
    }, []);

    return (
        <Box style={{ backgroundColor: '#fff', marginTop: '3rem' }}>
            <Header title="Bulk Add Products" />

            <Grid pb={2} px={1} style={{ display: 'flex', flexDirection: 'column', overflowX: 'hidden', overflowY: 'scroll', height: '93vh' }}>
                <Grid
                    alignItems="center"
                    container
                    data-testid="BulkAddProductGridUpperContainer"
                    direction="row"
                    justifyContent="center"
                    sx={{ overflowY: 'scroll', overflowX: 'hidden' }}
                >
                    <BulkAddProductContainer />
                </Grid>
            </Grid>
        </Box>
    );
};

export default BulkAddProduct;
