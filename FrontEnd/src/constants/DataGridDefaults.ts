import { GridColumnHeaderParams, GridPaginationModel, GridSortModel } from '@mui/x-data-grid/models';

export const DEFAULT_PAGE_SIZE: number = 100;

export const DEFAULT_SORTING: GridSortModel = [{ field: 'id', sort: 'asc' }];

export const DEFAULT_PAGINATION: GridPaginationModel = {
    pageSize: DEFAULT_PAGE_SIZE,
    page: 0,
};
