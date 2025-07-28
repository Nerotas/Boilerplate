import sliceProductChecker from './reducers';
import { AppThunk } from 'redux-state/store';
import { CreateProduct } from 'models/Products/Products';

export const addProduct =
    (newProduct: CreateProduct): AppThunk =>
    async (dispatch): Promise<void> => {
        dispatch(sliceProductChecker.actions.addProduct(newProduct));
    };

export const addProducts =
    (newProducts: CreateProduct[]): AppThunk =>
    async (dispatch): Promise<void> => {
        dispatch(sliceProductChecker.actions.addProducts(newProducts));
    };

export const addInvalidProducts =
    (newProducts: CreateProduct[]): AppThunk =>
    async (dispatch): Promise<void> => {
        dispatch(sliceProductChecker.actions.addInvalidProducts(newProducts));
    };

export const removeProduct =
    (productName: string): AppThunk =>
    async (dispatch): Promise<void> => {
        dispatch(sliceProductChecker.actions.removeProduct(productName));
    };

export const removeInvalidProduct =
    (productName: string): AppThunk =>
    async (dispatch): Promise<void> => {
        dispatch(sliceProductChecker.actions.removeInvalidProduct(productName));
    };

export const clearProducts =
    (): AppThunk =>
    async (dispatch): Promise<void> => {
        dispatch(sliceProductChecker.actions.initializeState());
    };
