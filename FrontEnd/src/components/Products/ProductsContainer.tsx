/* eslint-disable no-constant-condition */
import { useEffect, useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useGet } from 'hooks';
import { ProductsForTable } from 'models/Products/Products';
import { isArray } from 'lodash';
import ProductsDataGrid from './ProductsDataGrid';
import { DisplayName } from 'models/common/DisplayName';

const ProductsTableContainer = ({ productType }: { productType: DisplayName }) => {
    const [rows, setRows] = useState<ProductsForTable[]>([]);
    const url = useMemo(
        () =>
            productType.displayName === 'ALL'
                ? `${process.env.REACT_APP_EROTAS_CONSOLE_API}/products`
                : `${process.env.REACT_APP_EROTAS_CONSOLE_API}/products/product?name=${productType.name}`,
        [productType]
    );

    const { data, error, isFetching, isLoading, refetch } = useGet<ProductsForTable[]>({
        url,
        apiLabel: 'getAllProducts',
        id: productType.displayName,
    });

    useEffect(() => {
        if (!data || !isArray(data)) return;
        setRows(data);
    }, [data]);

    return (
        <Box sx={{ height: '100%', overflow: 'hidden', width: 'calc(100% - 10px)' }}>
            {error ? (
                <Stack alignItems="center" direction="column" gap="10px" justifyContent="center">
                    <Typography variant="body1">Auth Token Expired. Please refresh.</Typography>
                </Stack>
            ) : (
                <ProductsDataGrid isLoading={isFetching || isLoading} refreshTable={refetch} rows={rows || []} />
            )}
        </Box>
    );
};

export default ProductsTableContainer;
