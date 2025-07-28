import { DataGridPro as DataGrid } from '@mui/x-data-grid-pro';
import {
    GridColDef,
    GridRowSpacingParams,
    GridPaginationModel,
    GridColumnHeaderParams,
    GridLoadingOverlay,
    GridCellParams,
    GridActionsCellItem,
} from '@mui/x-data-grid';

import { useCallback, useState } from 'react';
import { ColumnHeader, EmptyOverlay } from 'components/common/DataGridDefaults';
import { getPaginationOptions } from 'helpers/DataGrid';
import { DEFAULT_PAGINATION } from 'constants/DataGridDefaults';
import { v4 } from 'uuid';
import { useDispatch, useSelector } from 'redux-state/store';
import { Box, Chip, Typography } from '@mui/material';
import { CreateProduct } from 'models/Products/Products';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { removeProduct } from 'redux-state/bulkAddProducts/actions';
import { size } from 'lodash';
import BulkAddProductsFooter from './FormComponents/BulkAddProductFooter';

declare module '@mui/x-data-grid' {
    interface FooterPropsOverrides {
        disabled: boolean;
    }
}

const BulkAddProductDataGrid = () => {
    const dispatch = useDispatch();
    const { loading, rows } = useSelector((state) => state.bulkAddProducts);

    const [paginationModel, setPaginationModel] = useState<GridPaginationModel>(DEFAULT_PAGINATION);

    const handleRemoveProduct = (productName: string) => {
        dispatch(removeProduct(productName));
    };

    const columns: GridColDef[] = [
        {
            field: 'name',
            headerName: 'Name',
            flex: 0.7,
            renderHeader: (params: GridColumnHeaderParams) => <ColumnHeader columnName={params.colDef.headerName as string} />,
            headerClassName: 'columnBlue',
        },
        {
            field: 'defaultClientName',
            headerName: 'Export Name',
            flex: 0.7,
            renderHeader: (params: GridColumnHeaderParams) => <ColumnHeader columnName={params.colDef.headerName as string} />,
            headerClassName: 'columnBlue',
        },
        {
            field: 'productSection',
            headerName: 'Product Section',
            flex: 1,
            editable: false,
            renderCell: (params: GridCellParams<CreateProduct>) => (
                <Typography>{`${params.row.productSection?.name} (${params.row.productSection?.defaultClientName})`}</Typography>
            ),
            renderHeader: (params: GridColumnHeaderParams) => <ColumnHeader columnName={params.colDef.headerName as string} />,
            headerClassName: 'columnBlue',
        },
        {
            field: 'personTypes',
            headerName: 'Person Types',
            flex: 1,
            editable: false,
            renderCell: (params: GridCellParams<CreateProduct>) => {
                const allPersons = params.row.personTypes.map((person) => person.displayName);
                return allPersons.map((value) => <Chip key={`${value}_product_chipArray`} label={value} />);
            },
            renderHeader: (params: GridColumnHeaderParams) => <ColumnHeader columnName={params.colDef.headerName as string} />,
            headerClassName: 'columnBlue',
        },
        {
            field: 'productTypes',
            headerName: 'Product Types',
            flex: 1,
            editable: false,
            renderCell: (params: GridCellParams<CreateProduct>) => {
                const allProducts = params.row.productTypes.map((product) => product.displayName);
                return allProducts.map((value) => <Chip key={`${value}_person_chipArray`} label={value} />);
            },
            renderHeader: (params: GridColumnHeaderParams) => <ColumnHeader columnName={params.colDef.headerName as string} />,
            headerClassName: 'columnBlue',
        },

        {
            field: 'tier',
            headerName: 'Tier',
            flex: 0.3,
            editable: true,
            renderHeader: (params: GridColumnHeaderParams) => <ColumnHeader columnName={params.colDef.headerName as string} />,
            headerClassName: 'columnBlue',
        },
        {
            field: 'objectivity',
            headerName: 'Objectivity',
            flex: 0.6,
            editable: true,
            renderHeader: (params: GridColumnHeaderParams) => <ColumnHeader columnName={params.colDef.headerName as string} />,
            headerClassName: 'columnBlue',
        },

        {
            field: 'synonyms',
            headerName: 'Synonyms',
            flex: 1,
            editable: false,
            renderCell: (params: GridCellParams<CreateProduct>) =>
                params.row.synonyms.map((value) => <Chip key={`${value}_synonym_chipArray`} label={value} />),
            renderHeader: (params: GridColumnHeaderParams) => <ColumnHeader columnName={params.colDef.headerName as string} />,
            headerClassName: 'columnBlue',
        },
        {
            field: 'rolloutToAll',
            headerName: 'All Retailers',
            flex: 0.5,
            renderHeader: (params: GridColumnHeaderParams) => <ColumnHeader columnName={params.colDef.headerName as string} />,
            type: 'boolean',
            editable: true,
            headerClassName: 'columnBlue',
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            flex: 0.5,
            headerClassName: 'columnBlue',
            cellClassName: 'actions',
            getActions: (params) => [
                <GridActionsCellItem
                    className="textPrimary"
                    color="inherit"
                    data-testid={`bulkProductsDeleteButton-${params.row.name}`}
                    icon={<DeleteIcon />}
                    key={v4()}
                    label="Delete"
                    onClick={() => handleRemoveProduct(params.row.name)}
                />,
            ],
        },
    ];

    return (
        <Box height="55vh">
            <DataGrid
                columns={columns}
                data-testid="BulkAddProduct-daproductrid"
                getRowId={() => v4()}
                loading={loading}
                onPaginationModelChange={setPaginationModel}
                pageSizeOptions={getPaginationOptions(rows)}
                paginationModel={paginationModel}
                rows={rows}
                slotProps={{ footer: { disabled: size(rows) === 0 } }}
                slots={{
                    loadingOverlay: GridLoadingOverlay,
                    noRowsOverlay: EmptyOverlay,
                    headerFilterMenu: null,
                    footer: BulkAddProductsFooter,
                }}
                sx={{
                    '& .MuiDataGrid-footerContainer': {
                        backgroundColor: '#ebf6f9',
                    },
                }}
            />
        </Box>
    );
};

export default BulkAddProductDataGrid;
