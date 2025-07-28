import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { GridApiPro, GridFilterItem, gridFilterModelSelector, useGridApiContext } from '@mui/x-data-grid-pro';
import { GridBaseColDef, useGridSelector } from '@mui/x-data-grid/internals';
import { useGet } from 'hooks';
import { DisplayName } from 'models/common/DisplayName';
import React from 'react';

interface IProductSelectForDataGridProps {
    colDef: GridBaseColDef<any, any, any>;
    apiRef: React.MutableRefObject<GridApiPro>;
}

export const getDefaultFilter = (field: string) => ({ field, operator: 'is' });

const ProductSelectForDataGrid = ({ apiRef, colDef }: IProductSelectForDataGridProps) => {
    const { data: productTypeOptions } = useGet<DisplayName[]>({
        url: `${process.env.REACT_APP_EROTAS_CONSOLE_API}/productTypes/names`,
        apiLabel: 'getAllProductTypesNames',
    });
    const filterModel = useGridSelector(apiRef, gridFilterModelSelector);
    const currentFieldFilters = React.useMemo(
        () => filterModel.items?.filter(({ field }) => field === colDef.field),
        [colDef.field, filterModel.items]
    );

    const handleChange = React.useCallback(
        (event: SelectChangeEvent) => {
            if (!event.target.value) {
                if (currentFieldFilters[0]) {
                    apiRef.current.deleteFilterItem(currentFieldFilters[0]);
                }
                return;
            }
            apiRef.current.upsertFilterItem({
                ...(currentFieldFilters[0] || getDefaultFilter(colDef.field)),
                value: event.target.value,
            });
        },
        [apiRef, colDef.field, currentFieldFilters]
    );

    const value = currentFieldFilters[0]?.value ?? 'ALL';

    return (
        <FormControl data-testid="productSelect" sx={{ m: 1, minWidth: 150 }} variant="standard">
            <InputLabel id="product-select-autowidth-label">Product</InputLabel>
            <Select autoWidth defaultValue="ALL" label="Product" onChange={handleChange} value={value}>
                <MenuItem key="all_product_dropdown" value="ALL">
                    ALL
                </MenuItem>
                {productTypeOptions &&
                    productTypeOptions.map((product) => (
                        <MenuItem key={`${product.name}_product_dropdown`} value={product.name}>{`${product.name}`}</MenuItem>
                    ))}
            </Select>
        </FormControl>
    );
};

export default ProductSelectForDataGrid;
