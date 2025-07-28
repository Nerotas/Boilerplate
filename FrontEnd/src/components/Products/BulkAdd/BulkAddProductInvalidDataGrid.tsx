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

import { useCallback, useEffect, useState } from 'react';
import { ColumnHeader, EmptyOverlay } from 'components/common/DataGridDefaults';
import { getPaginationOptions } from 'helpers/DataGrid';
import { DEFAULT_PAGINATION } from 'constants/DataGridDefaults';
import { v4 } from 'uuid';
import { useDispatch, useSelector } from 'redux-state/store';
import { Box, Chip, Typography } from '@mui/material';
import { CreateProduct, ProductsAndSectionsForProducts } from 'models/Products/Products';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { removeInvalidProduct } from 'redux-state/bulkAddProducts/actions';
import { size } from 'lodash';
import * as Yup from 'yup';
import { DisplayName } from 'models/common/DisplayName';
import { acceptExportNameExpression, acceptProductsExpression } from 'constants/Regex';
import { useGet } from 'hooks';

declare module '@mui/x-data-grid' {
    interface FooterPropsOverrides {
        disabled: boolean;
    }
}

interface BulkAddProductInvalidDataGridProps {
    personTypes: DisplayName[];
    products: DisplayName[];
    productSections: ProductsAndSectionsForProducts[];
}

const RenderNameCell = (params: GridCellParams<CreateProduct>) => {
    const [existingProduct, setExistingProduct] = useState(false);

    const { data: names } = useGet<string[]>({
        url: `${process.env.REACT_APP_EROTAS_CONSOLE_API}/products/names`,
        apiLabel: 'getAllProductNames',
    });

    const checkExistingProduct = async (name: string) => {
        const nameOptions = names ? [...names] : [];
        setExistingProduct(nameOptions.some((product) => product === name));
    };

    useEffect(() => {
        checkExistingProduct(params.row.name);
    }, []);

    return (
        <Box className={existingProduct ? 'deprecatedCellBG' : ''}>
            <Typography>{params.row.name}</Typography>
            {existingProduct && (
                <Typography sx={{ fontSize: '0.75rem' }} variant="subtitle1">
                    *Product Name Already Exist*
                </Typography>
            )}
        </Box>
    );
};

const BulkAddProductInvalidDataGrid = ({ personTypes = [], products = [], productSections = [] }: BulkAddProductInvalidDataGridProps) => {
    const dispatch = useDispatch();
    const { invalidRows, loading } = useSelector((state) => state.bulkAddProducts);

    const [paginationModel, setPaginationModel] = useState<GridPaginationModel>(DEFAULT_PAGINATION);

    const handleRemoveProduct = (productName: string) => {
        dispatch(removeInvalidProduct(productName));
    };

    const columns: GridColDef[] = [
        {
            field: 'name',
            headerName: 'Name',
            flex: 0.75,
            renderHeader: (params: GridColumnHeaderParams) => <ColumnHeader columnName={params.colDef.headerName as string} />,
            headerClassName: 'columnBlue',
            renderCell: RenderNameCell,
            cellClassName: (params: GridCellParams<CreateProduct>) => {
                const schema = Yup.string().max(255).matches(acceptProductsExpression, 'Invalid charaters');
                return schema.isValidSync(params.row.name) ? '' : 'deprecatedCellBG';
            },
        },
        {
            field: 'defaultClientName',
            headerName: 'Export Name',
            flex: 0.75,
            renderHeader: (params: GridColumnHeaderParams) => <ColumnHeader columnName={params.colDef.headerName as string} />,
            headerClassName: 'columnBlue',
            cellClassName: (params: GridCellParams<CreateProduct>) => {
                const schema = Yup.string().max(255).matches(acceptExportNameExpression, 'Invalid charaters');
                return schema.isValidSync(params.row.defaultClientName) ? '' : 'deprecatedCellBG';
            },
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
            cellClassName: (params: GridCellParams<CreateProduct>) => {
                const schema = Yup.object()
                    .shape({ name: Yup.string(), defaultClientName: Yup.string() })
                    .required()
                    .test('is-valid-productSection', 'Invalid productSection', function (value) {
                        return productSections.some(
                            (section) => section.name === value.name && section.defaultClientName === value.defaultClientName
                        );
                    });
                return schema.isValidSync(params.row.productSection) ? '' : 'deprecatedCellBG';
            },
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
            cellClassName: (params: GridCellParams<CreateProduct>) => {
                const schema = Yup.array()
                    .of(
                        Yup.object()
                            .shape({ name: Yup.string(), displayName: Yup.string() })
                            .test('is-valid-personType', 'Invalid personType', function (value) {
                                return personTypes.some((person) => person.displayName === value.displayName);
                            })
                    )
                    .required();
                return schema.isValidSync(params.row.personTypes) ? '' : 'deprecatedCellBG';
            },
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
            cellClassName: (params: GridCellParams<CreateProduct>) => {
                const schema = Yup.array()
                    .of(
                        Yup.object()
                            .shape({ name: Yup.string(), displayName: Yup.string() })
                            .test('is-valid-productType', 'Invalid productType', function (value) {
                                return products.some((product) => product.displayName === value.displayName);
                            })
                    )
                    .required();
                return schema.isValidSync(params.row.productTypes) ? '' : 'deprecatedCellBG';
            },
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
            cellClassName: (params: GridCellParams<CreateProduct>) => {
                const schema = Yup.array().of(Yup.string());
                return schema.isValidSync(params.row.synonyms) ? '' : 'deprecatedCellBG';
            },
        },
        {
            field: 'rolloutToAll',
            headerName: 'All Retailers',
            flex: 0.4,
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
                data-testid="BulkInvalidAddProduct-daproductrid"
                getRowId={() => v4()}
                loading={loading}
                onPaginationModelChange={setPaginationModel}
                pageSizeOptions={getPaginationOptions(invalidRows)}
                paginationModel={paginationModel}
                rows={invalidRows}
                slotProps={{ footer: { disabled: size(invalidRows) === 0 } }}
                slots={{
                    loadingOverlay: GridLoadingOverlay,
                    noRowsOverlay: EmptyOverlay,
                    headerFilterMenu: null,
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

export default BulkAddProductInvalidDataGrid;
