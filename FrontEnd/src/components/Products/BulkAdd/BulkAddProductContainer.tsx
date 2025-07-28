import Box from '@mui/material/Box';

import { Container, Grid2, Stack, Tab, Tabs, Typography } from '@mui/material';
import { useGet } from 'hooks';
import { DisplayName } from 'models/common/DisplayName';
import { IndexCSVProduct, ProductsAndSectionsForProducts } from 'models/Products/Products';
import { useDispatch, useSelector } from 'redux-state/store';
import BulkAddProductInvalidDataGrid from './BulkAddProductInvalidDataGrid';
import { size } from 'lodash';
import { CSVImporter } from 'csv-import-react';
import React, { useState } from 'react';
import { ActionButton } from 'components/common/Buttons/ActionButtons';
import { convertIndexCSVProductsToCreateProducts } from 'helpers/csvConvertors';
import { bulkProductsValidation } from 'helpers/BulkValidators';
import { addProducts, addInvalidProducts } from 'redux-state/bulkAddProducts/actions';
import { a11yProps, CustomTabPanel } from 'components/common/Tabs';
import BulkAddProductDataGrid from './BulkAddProductDataGrid';
import GoogleSheetInput from './FormComponents/GoogleSheetProductInput';
import ProductCSVTemplate from './FormComponents/ProductCSVTemplate';
import AddProductForm from './FormComponents/AddProductForm';

const BulkAddProductTableContainer = () => {
    const { invalidRows } = useSelector((state) => state.bulkAddProducts);
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();
    const [value, setValue] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const {
        data: productSections,
        isFetching: isFetchingProductSections,
        isLoading: isLoadingProductSections,
    } = useGet<ProductsAndSectionsForProducts[]>({
        url: `${process.env.REACT_APP_EROTAS_CONSOLE_API}/productSections/names`,
        apiLabel: 'getProductsSectionsNames',
    });

    const {
        data: products,
        error,
        isFetching: isFetchingProducts,
        isLoading: isLoadingProducts,
    } = useGet<DisplayName[]>({
        url: `${process.env.REACT_APP_EROTAS_CONSOLE_API}/productTypes/names`,
        apiLabel: 'getAllProductTypes',
    });

    const {
        data: personTypes,
        isFetching: isFetchingPersons,
        isLoading: isLoadingPersons,
    } = useGet<DisplayName[]>({
        url: `${process.env.REACT_APP_EROTAS_CONSOLE_API}/persontypes/names`,
        apiLabel: 'getAllPersonTypes',
    });

    return (
        <>
            <Stack direction="column" spacing={2} width="100%">
                <Box
                    data-testid="BulkAddProductStackContainer"
                    sx={{ height: '100%', overflow: 'scroll', width: 'calc(100% - 10px)', minHeight: '30vh' }}
                >
                    <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                        <Tabs aria-label="basic tabs example" onChange={handleChange} value={value}>
                            <Tab label="Form" {...a11yProps(0)} />
                            <Tab label="Google" {...a11yProps(1)} />
                            <Tab label="CSV" {...a11yProps(2)} />
                        </Tabs>
                    </Container>
                    <CustomTabPanel index={0} value={value}>
                        <AddProductForm
                            isFetchingPersons={isFetchingPersons}
                            isFetchingProducts={isFetchingProducts}
                            isFetchingProductSections={isFetchingProductSections}
                            isLoadingPersons={isLoadingPersons}
                            isLoadingProducts={isLoadingProducts}
                            isLoadingProductSections={isLoadingProductSections}
                            personTypes={personTypes || []}
                            products={products || []}
                            productSections={productSections || []}
                        />
                    </CustomTabPanel>
                    <CustomTabPanel index={1} value={value}>
                        <GoogleSheetInput personTypes={personTypes || []} products={products || []} productSections={productSections || []} />
                    </CustomTabPanel>
                    <CustomTabPanel index={2} value={value}>
                        <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                            <ActionButton onClick={() => setIsOpen(true)}>Open CSV Importer</ActionButton>
                        </Container>

                        <CSVImporter
                            modalIsOpen={isOpen}
                            modalOnCloseTriggered={() => setIsOpen(false)}
                            onComplete={(data) => {
                                const { rows }: { rows: IndexCSVProduct[] } = data;
                                const formattedRows = convertIndexCSVProductsToCreateProducts(rows);
                                const { invalidRows, validRows } = bulkProductsValidation(
                                    formattedRows,
                                    productSections || [],
                                    products || [],
                                    personTypes || []
                                );
                                dispatch(addProducts(validRows));
                                dispatch(addInvalidProducts(invalidRows));
                                setIsOpen(false);
                            }}
                            skipHeaderRowSelection
                            template={ProductCSVTemplate}
                        />
                    </CustomTabPanel>

                    <Grid2 container direction="column" spacing={2}>
                        <BulkAddProductDataGrid />
                        {size(invalidRows) > 0 && (
                            <>
                                <Typography sx={{ ml: 1 }} variant="h6">
                                    Invalid Rows{' '}
                                </Typography>
                                <BulkAddProductInvalidDataGrid
                                    personTypes={personTypes || []}
                                    products={products || []}
                                    productSections={productSections || []}
                                />
                            </>
                        )}
                    </Grid2>
                </Box>
            </Stack>
        </>
    );
};

export default BulkAddProductTableContainer;
