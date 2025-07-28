import { cloneDeep, uniqBy } from 'lodash';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CreateProduct } from 'models/Products/Products';

interface IBulkAddProducts {
    rows: CreateProduct[];
    invalidRows: CreateProduct[];
    loading: boolean;
}

const initialState: IBulkAddProducts = {
    rows: [],
    invalidRows: [],
    loading: false,
};

const sliceProductChecker = createSlice({
    name: 'BulkAddProducts',
    initialState,
    reducers: {
        initializeState() {
            return initialState;
        },

        addProduct(state: IBulkAddProducts, action: PayloadAction<CreateProduct>): void {
            state.loading = true;
            const uniqueRows = cloneDeep(state.rows);
            uniqueRows.push(action.payload);
            state.rows = uniqueRows;
            state.loading = false;
        },

        addProducts(state: IBulkAddProducts, action: PayloadAction<CreateProduct[]>): void {
            state.loading = true;
            const uniqueRows = uniqBy([...state.rows, ...action.payload], 'name');
            state.rows = uniqueRows;
            state.loading = false;
        },

        addInvalidProducts(state: IBulkAddProducts, action: PayloadAction<CreateProduct[]>): void {
            state.loading = true;
            const uniqueRows = uniqBy([...state.invalidRows, ...action.payload], 'name');
            state.invalidRows = uniqueRows;
            state.loading = false;
        },

        removeProduct(state: IBulkAddProducts, action: PayloadAction<string>): void {
            state.loading = true;
            const removedRows = state.rows.filter((row) => row.name !== action.payload);
            state.rows = removedRows;
            state.loading = false;
        },

        removeInvalidProduct(state: IBulkAddProducts, action: PayloadAction<string>): void {
            state.loading = true;
            const removedRows = state.invalidRows.filter((row) => row.name !== action.payload);
            state.invalidRows = removedRows;
            state.loading = false;
        },

        clearProducts(state: IBulkAddProducts): void {
            state.rows = [];
        },

        setLoading(state: IBulkAddProducts, action: PayloadAction<boolean>): void {
            state.loading = action.payload;
        },
    },
});

export const { reducer } = sliceProductChecker;

export default sliceProductChecker;
