import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NavbarTitle } from 'models/NavbarTitle/NavbarTitle';

const initialState = {
    title: '',
};

const sliceNavbarTitle = createSlice({
    name: 'NavbarTitle',
    initialState,
    reducers: {
        setTitle(state: NavbarTitle, action: PayloadAction<string>): void {
            state.title = action.payload;
        },
    },
});

export const { reducer } = sliceNavbarTitle;

export default sliceNavbarTitle;
