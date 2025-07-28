import { GridToolbarColumnsButton, GridToolbarDensitySelector, GridToolbarFilterButton, GridToolbarQuickFilter } from '@mui/x-data-grid';
import { Grid2 as Grid } from '@mui/material';

import ToggleDeprecatedButton from './FilterButtons';
import { GridApiPro } from '@mui/x-data-grid-pro';

interface CustomToolbar {
    apiRef: React.MutableRefObject<GridApiPro>;
    deprecatedButton: boolean;
}

const GridToolbar = ({ apiRef, deprecatedButton = true }: CustomToolbar) => (
    <>
        <Grid container data-testid="DataGridToolbar" justifyContent="space-between" px={2} py={1} sx={{ backgroundColor: '#EBF6F9' }}>
            <Grid sx={{ backgroundColor: '#EBF6F9' }}>
                <GridToolbarColumnsButton data-testid="DataGridToolbarColumnsButton" />
                <GridToolbarDensitySelector data-testid="DataGridToolbarDensitySelector" />
                <GridToolbarFilterButton data-testid="DataGridToolbarFilterButton" />
                {deprecatedButton && <ToggleDeprecatedButton apiRef={apiRef} />}
            </Grid>
            <Grid>
                <GridToolbarQuickFilter data-testid="DataGridToolbarQuickFilter" />
            </Grid>
        </Grid>
    </>
);

export default GridToolbar;
