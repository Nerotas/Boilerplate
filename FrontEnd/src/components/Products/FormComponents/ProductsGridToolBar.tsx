import {
    GridSlots,
    GridToolbarColumnsButton,
    GridToolbarDensitySelector,
    GridToolbarFilterButton,
    GridToolbarQuickFilter,
    PropsFromSlot,
} from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import { ActionButton, DangerButton } from 'components/common/Buttons/ActionButtons';
import { Grid2 as Grid, Tooltip } from '@mui/material';
import { useState } from 'react';
import AddProductModal from './AddProductModal';
import { useSelector } from 'redux-state/store';
import permissionChecker from 'helpers/permissionChecker';
import ToggleDeprecatedButton from 'components/common/DataGridDefaults/FilterButtons';
import { NavLink } from 'react-router-dom';
import HelpIcon from '@mui/icons-material/Help';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { size } from 'lodash';
import BulkDeleteModal from './BulkDeactivateProductModal';

const ProductsGridToolBar = ({ apiRef, refreshTable, rows }: PropsFromSlot<GridSlots['toolbar']>) => {
    const { roles } = useSelector((state) => state.oauth);
    const readWriteUser: boolean = permissionChecker('writer', roles);
    const [addModal, setAddModal] = useState<boolean>(false);
    const [bulkDeleteModal, setBulkDeleteModal] = useState<boolean>(false);

    const openAddModal = () => {
        setAddModal(true);
    };

    const closeAddModal = () => {
        setAddModal(false);
    };

    const openBulkDeleteModal = () => {
        setBulkDeleteModal(true);
    };

    const closeBulkDeleteModal = () => {
        setBulkDeleteModal(false);
    };

    return (
        <>
            <Grid container data-testid="DataGridToolbar" justifyContent="space-between" px={3} py={1} sx={{ backgroundColor: '#EBF6F9' }}>
                <Grid size="grow">
                    <GridToolbarColumnsButton data-testid="DataGridToolbarColumnsButton" />
                    <GridToolbarFilterButton data-testid="DataGridToolbarFilterButton" />
                    <GridToolbarDensitySelector data-testid="DataGridToolbarDensitySelector" />
                    <ToggleDeprecatedButton apiRef={apiRef} />
                </Grid>
                <Grid size="grow">
                    <GridToolbarQuickFilter data-testid="DataGridToolbarQuickFilter" />
                </Grid>
                <Grid container size="auto" spacing={2}>
                    <Grid size="auto">
                        <Tooltip title="Select desired rows. CMD or CTRL + C to copy.">
                            <ActionButton data-testid="DataGridCopy" startIcon={<HelpIcon />}>
                                How To Copy
                            </ActionButton>
                        </Tooltip>
                    </Grid>
                    <Grid>
                        <ActionButton
                            color="primary"
                            data-testid="DataGridAddButton"
                            disabled={!readWriteUser}
                            onClick={openAddModal}
                            startIcon={<AddIcon />}
                        >
                            Add Product
                        </ActionButton>
                    </Grid>
                    <Grid>
                        <ActionButton
                            color="primary"
                            component={NavLink}
                            data-testid="DataGridAddBulkButton"
                            disabled={!readWriteUser}
                            startIcon={<AddIcon />}
                            to="bulk"
                        >
                            Bulk Add Products
                        </ActionButton>
                    </Grid>
                    <Grid size="auto">
                        <DangerButton
                            color="primary"
                            data-testid="DataGridBulkDeleteButton"
                            disabled={!readWriteUser || size(rows) === 0}
                            onClick={openBulkDeleteModal}
                            startIcon={<DeleteIcon />}
                        >
                            Bulk Deprecate
                        </DangerButton>
                    </Grid>
                </Grid>
            </Grid>
            {addModal && <AddProductModal handleClose={closeAddModal} open={addModal} refreshTable={refreshTable} />}
            {bulkDeleteModal && <BulkDeleteModal handleClose={closeBulkDeleteModal} open={bulkDeleteModal} refreshTable={refreshTable} rows={rows} />}
        </>
    );
};

export default ProductsGridToolBar;
