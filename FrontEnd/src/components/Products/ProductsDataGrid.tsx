import { DataGridPro as DataGrid, GridApiPro, useGridApiRef } from '@mui/x-data-grid-pro';
import {
    GridColDef,
    GridRowSpacingParams,
    GridPaginationModel,
    GridColumnHeaderParams,
    GridSortModel,
    GridActionsCellItem,
    GridRowModes,
    GridLoadingOverlay,
    GridRowModel,
    GridEventListener,
    GridRowParams,
    MuiEvent,
    GridRowModesModel,
    GridRowId,
    GridRenderCellParams,
    GridCellParams,
    GRID_CHECKBOX_SELECTION_COL_DEF,
    GridRowSelectionModel,
} from '@mui/x-data-grid';

import { useCallback, useEffect, useState } from 'react';
import { ProductsForTable } from 'models/Products/Products';
import { size } from 'lodash';
import { v4 } from 'uuid';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import axiosInstance from 'helpers/AxiosInstance';
import { openSuccessGlobalSnackbar, openErrorGlobalSnackbar } from 'redux-state/globalSnackbar/actions';
import { ProductsGridToolBar, DeactivateProductModal } from './FormComponents';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'redux-state/store';
import permissionChecker from 'helpers/permissionChecker';
import { ClickAwayListener, Grid2 as Grid, IconButton, Tooltip } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { ColumnHeader, EmptyOverlay } from 'components/common/DataGridDefaults';
import { getCreated, getPaginationOptions } from 'helpers/DataGrid';
import { DEFAULT_PAGINATION, DEFAULT_SORTING } from 'constants/DataGridDefaults';
import EditStringCell from 'components/common/DataGridDefaults/EditCells/EditStringCell';
import { replaceCommaInStringWithLine } from 'helpers/replaceCommaInString';
import { capitalizeFirstOfEachItem } from 'helpers/arrayToStringListHandler';
import AccordionCell from 'components/common/DataGridDefaults/AccordionCell';

dayjs.extend(utc);
export interface DefaultDataGridOptions {
    rows: ProductsForTable[];
    isLoading: boolean;
    refreshTable: () => void;
}

// augment the props for the toolbar slot
declare module '@mui/x-data-grid' {
    interface ToolbarPropsOverrides {
        refreshTable: () => void;
        apiRef: React.MutableRefObject<GridApiPro>;
        rows: GridRowSelectionModel;
    }
}

const ProductsDataGrid = ({ isLoading, refreshTable, rows }: DefaultDataGridOptions) => {
    const dispatch = useDispatch();
    const { roles } = useSelector((state) => state.oauth);
    const readWriteUser: boolean = permissionChecker('writer', roles);
    const [currentRows, setRows] = useState<ProductsForTable[]>(rows);
    const apiRef = useGridApiRef();

    const [selectedRow, setSelectedRow] = useState<ProductsForTable>(new ProductsForTable());
    const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
    const [sortModel, setSortModel] = useState<GridSortModel>(DEFAULT_SORTING);
    const [deleteModal, setDeleteModal] = useState<boolean>(false);
    const [paginationModel, setPaginationModel] = useState<GridPaginationModel>(DEFAULT_PAGINATION);
    const [rowSelectionModel, setRowSelectionModel] = useState<GridRowSelectionModel>([]);

    const [openTooltip, setOpenToolTip] = useState(false);

    const handleTooltipClose = () => {
        setOpenToolTip(false);
    };

    const handleTooltipOpen = () => {
        setOpenToolTip(true);
    };

    const openDeleteModal = (newRow: ProductsForTable) => {
        setSelectedRow(newRow);
        setDeleteModal(true);
    };

    const closeDeleteModal = () => {
        setDeleteModal(false);
    };

    const getRowSpacing = useCallback(
        (params: GridRowSpacingParams) => ({
            top: params.isFirstVisible ? 0 : 5,
            bottom: params.isLastVisible ? 0 : 5,
        }),
        []
    );

    const handleRowEditStart = (_params: GridRowParams, event: MuiEvent<React.SyntheticEvent>) => {
        event.defaultMuiPrevented = true;
    };

    //stop default call when row editing stops
    const handleRowEditStop: GridEventListener<'rowEditStop'> = (_params, event) => {
        event.defaultMuiPrevented = true;
    };

    const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };

    //enable edit mode for row based on ID
    const handleEditClick = (id: GridRowId) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };

    const handleSaveClick = (id: GridRowId) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    };

    //cancel edit mode for row based on ID
    const handleCancelClick = (id: GridRowId) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });
        setRows(rows);
    };

    //handle new row
    const processRowUpdate = async (newRow: GridRowModel) => {
        const { defaultClientName, id, name, rolloutToAll, tier } = newRow;
        const payload = {
            name,
            defaultClientName,
        };

        const validationSchema = Yup.object({
            name: Yup.string().max(255).required(),
            defaultClientName: Yup.string().max(255).required(),
        });

        const isValid = await validationSchema.validate(payload);

        if (isValid) {
            axiosInstance
                .put(`${process.env.REACT_APP_EROTAS_CONSOLE_API}/products/${id}`, payload)
                .then((response) => {
                    const editMessage: string = name ? `${name} has been updated.` : 'Product updated';
                    dispatch(openSuccessGlobalSnackbar({ message: response.data.message ? response.data.message : editMessage }));
                })
                .catch((response) =>
                    dispatch(openErrorGlobalSnackbar({ message: response.data.message ? response.data.message : `An error has occured` }))
                )
                .finally(() => {
                    refreshTable();
                });
        } else {
            dispatch(openErrorGlobalSnackbar({ message: `Invalid Product` }));
        }

        return newRow;
    };

    const columns: GridColDef[] = [
        {
            ...GRID_CHECKBOX_SELECTION_COL_DEF,
            flex: 0.2,
        },
        {
            field: 'id',
            renderHeader: (params: GridColumnHeaderParams) => <ColumnHeader columnName={params.colDef.headerName as string} />,
            headerName: 'ID',
            flex: 0.3,
            headerClassName: 'columnBlue',
            cellClassName: (params: GridCellParams<ProductsForTable>) => (params.row.deprecatedByEmail ? 'deprecatedCell' : ''),
        },
        {
            field: 'name',
            headerName: 'Name',
            flex: 0.75,
            editable: false,
            renderHeader: (params: GridColumnHeaderParams) => <ColumnHeader columnName={params.colDef.headerName as string} />,
            headerClassName: 'columnBlue',
            cellClassName: (params: GridCellParams<ProductsForTable>) => (params.row.deprecatedByEmail ? 'deprecatedCell' : ''),
        },
        {
            field: 'defaultClientName',
            headerName: 'Default Export Name',
            flex: 0.75,
            editable: true,
            hideable: false,
            cellClassName: (params: GridCellParams<ProductsForTable>) => (params.row.deprecatedByEmail ? 'deprecatedCell' : ''),
            renderEditCell: (params: GridRenderCellParams) => <EditStringCell fieldname="defaultClientName" row={params.row as ProductsForTable} />,
            renderHeader: (params: GridColumnHeaderParams) => <ColumnHeader columnName={params.colDef.headerName as string} />,
            headerClassName: 'columnBlue',
        },
        {
            field: 'applicableProductSections',
            headerName: 'Applicable Product Sections',
            flex: 1,
            editable: false,
            renderHeader: (params: GridColumnHeaderParams) => <ColumnHeader columnName={params.colDef.headerName as string} />,
            headerClassName: 'columnBlue',
            cellClassName: (params: GridCellParams<ProductsForTable>) => (params.row.deprecatedByEmail ? 'deprecatedCell' : ''),
            valueFormatter: replaceCommaInStringWithLine,
        },
        {
            field: 'applicableProductTypes',
            headerName: 'Applicable Product Types',
            flex: 2.25,
            editable: true,
            renderCell: (params: GridCellParams<ProductsForTable>) => (
                <AccordionCell row={capitalizeFirstOfEachItem(`${params.row.applicableProductTypes}`)} selected={params.hasFocus} />
            ),
            renderHeader: (params: GridColumnHeaderParams) => <ColumnHeader columnName={params.colDef.headerName as string} />,
            headerClassName: 'columnBlue',
            renderEditCell: (params: GridRenderCellParams) => (
                <Grid container direction="row">
                    <Grid>
                        <AccordionCell row={capitalizeFirstOfEachItem(`${params.row.applicableProductTypes}`)} selected={params.hasFocus} />
                    </Grid>
                    <Grid>
                        <ClickAwayListener onClickAway={handleTooltipClose}>
                            <div>
                                <Tooltip
                                    arrow
                                    disableFocusListener
                                    disableHoverListener
                                    disableTouchListener
                                    onClose={handleTooltipClose}
                                    open={openTooltip}
                                    placement="top-end"
                                    title="Product types can be updated in Registry"
                                >
                                    <IconButton onClick={handleTooltipOpen}>
                                        <InfoIcon />
                                    </IconButton>
                                </Tooltip>
                            </div>
                        </ClickAwayListener>
                    </Grid>
                </Grid>
            ),
            cellClassName: (params: GridCellParams<ProductsForTable>) => (params.row.deprecatedByEmail ? 'deprecatedCell' : ''),
            valueFormatter: capitalizeFirstOfEachItem,
        },

        {
            field: 'createdByEmail',
            headerName: 'Created',
            flex: 1,
            valueGetter: getCreated,
            renderHeader: (params: GridColumnHeaderParams) => <ColumnHeader columnName={params.colDef.headerName as string} />,
            headerClassName: 'columnBlue',
            cellClassName: (params: GridCellParams<ProductsForTable>) => (params.row.deprecatedByEmail ? 'deprecatedCell' : ''),
        },
        {
            field: 'deprecatedByEmail',
            headerName: 'Deprecated',
            flex: 1,
            cellClassName: (params: GridCellParams<ProductsForTable>) => (params.row.deprecatedByEmail ? 'deprecatedCell' : ''),

            renderHeader: (params: GridColumnHeaderParams) => <ColumnHeader columnName={params.colDef.headerName as string} />,
            headerClassName: 'columnBlue',
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            flex: 0.5,
            headerClassName: 'columnBlue',
            cellClassName: 'actions',
            getActions: (params) => {
                const isInEditMode = rowModesModel[params.row.id]?.mode === GridRowModes.Edit;
                const isDeprecated = size(params.row.deprecatedByEmail) > 0;
                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            data-testid={`productsEditSubmitButton-${params.row.id}`}
                            icon={<SaveIcon />}
                            key={v4()}
                            label="Save"
                            onClick={handleSaveClick(params.row.id)}
                        />,
                        <GridActionsCellItem
                            className="textPrimary"
                            color="inherit"
                            data-testid={`productsEditCancelButton-${params.row.id}`}
                            icon={<CancelIcon />}
                            key={v4()}
                            label="Cancel"
                            onClick={handleCancelClick(params.row.id)}
                        />,
                    ];
                }

                return [
                    <GridActionsCellItem
                        className="textPrimary"
                        color="inherit"
                        data-testid={`productsEditButton-${params.row.id}`}
                        disabled={isDeprecated}
                        icon={<EditIcon />}
                        key={v4()}
                        label="Edit"
                        onClick={handleEditClick(params.row.id)}
                    />,
                    <Tooltip key={v4()} placement="top" title={!readWriteUser && 'Deprecated currently not available'}>
                        <>
                            <span>
                                <GridActionsCellItem
                                    className="textPrimary"
                                    color="inherit"
                                    data-testid={`productsDeleteButton-${params.row.id}`}
                                    disabled={isDeprecated || !readWriteUser}
                                    icon={<DeleteIcon />}
                                    label="Delete"
                                    onClick={() => openDeleteModal(params.row)}
                                />
                            </span>
                        </>
                    </Tooltip>,
                ];
            },
        },
    ];

    useEffect(() => {
        setRows(rows);
    }, [rows]);

    return (
        <>
            <DataGrid
                apiRef={apiRef}
                checkboxSelection={readWriteUser}
                columns={columns}
                data-testid="Products-daproductrid"
                editMode="row"
                getRowHeight={() => 'auto'}
                getRowSpacing={getRowSpacing}
                headerFilters
                initialState={{
                    filter: {
                        filterModel: {
                            items: [{ field: 'deprecatedByEmail', operator: 'isEmpty' }],
                        },
                    },
                    columns: {
                        columnVisibilityModel: {
                            deprecatedByEmail: false,
                            mergedWith: false,
                            tier: false,
                            id: false,
                        },
                    },
                }}
                loading={isLoading}
                onClipboardCopy={(text) => {
                    dispatch(openSuccessGlobalSnackbar({ message: 'Rows copied' }));
                    return text;
                }}
                onPaginationModelChange={setPaginationModel}
                onRowSelectionModelChange={(newRowSelectionModel) => {
                    setRowSelectionModel(newRowSelectionModel);
                }}
                onSortModelChange={(newSortModel) => setSortModel(newSortModel)}
                pageSizeOptions={getPaginationOptions(currentRows)}
                pagination
                paginationModel={paginationModel}
                processRowUpdate={processRowUpdate}
                rowModesModel={rowModesModel}
                rows={currentRows}
                rowSelectionModel={rowSelectionModel}
                slotProps={{
                    toolbar: {
                        refreshTable,
                        apiRef,
                        rows: rowSelectionModel,
                    },
                }}
                slots={{
                    toolbar: ProductsGridToolBar,
                    loadingOverlay: GridLoadingOverlay,
                    noRowsOverlay: EmptyOverlay,
                    headerFilterMenu: null,
                }}
                sortModel={sortModel}
                sx={{
                    '& .MuiDataGrid-footerContainer': {
                        backgroundColor: '#ebf6f9',
                    },
                }}
            />
            {deleteModal && (
                <DeactivateProductModal handleClose={closeDeleteModal} open={deleteModal} refreshTable={refreshTable} row={selectedRow} />
            )}
        </>
    );
};

export default ProductsDataGrid;
