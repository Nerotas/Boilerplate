import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { DataGrid } from '@mui/x-data-grid';
import GridToolBar from 'components/common/DataGridDefaults/GridToolBar';
import EmptyOverlay from 'components/common/DataGridDefaults/EmptyOverlay';
import ColumnHeader from 'components/common/DataGridDefaults/ColumnHeader';

describe('Common DataGridDefaults components', () => {
    it('renders GridToolBar in DataGrid', () => {
        render(
            <DataGrid
                columns={[
                    { field: 'id', headerName: 'ID', width: 90 },
                    { field: 'name', headerName: 'Name', width: 150 },
                ]}
                rows={[]}
                slots={{ toolbar: GridToolBar }}
            />
        );
        waitFor(() => {
            expect(screen.getByTestId('DataGridToolbar')).toBeInTheDocument();
        });
    });

    it('renders EmptyOverlay when no rows', () => {
        render(<DataGrid columns={[{ field: 'id', headerName: 'ID', width: 90 }]} rows={[]} slots={{ noRowsOverlay: EmptyOverlay }} />);
        waitFor(() => {
            expect(screen.getByTestId('emptyOverlay')).toBeInTheDocument();
        });
    });

    it('renders custom ColumnHeader', async () => {
        render(
            <DataGrid
                columns={[
                    {
                        field: 'custom',
                        headerName: 'Custom',
                        width: 120,
                        renderHeader: (params) => <ColumnHeader columnName="Test Title" {...params} data-testid="dataGridHeader" />,
                    },
                ]}
                rows={[]}
            />
        );
        await waitFor(() => {
            expect(screen.getByTestId('dataGridHeader')).toBeInTheDocument();
            expect(screen.getByText('Test Title')).toBeInTheDocument();
        });
    });
});
