import sliceNavbarTitle from './reducers';
import { AppThunk } from 'redux-state/store';
import { NavbarTitle } from 'models/NavbarTitle/NavbarTitle';

export const setNavbarTitle =
    (title: string = ''): AppThunk =>
    async (dispatch): Promise<void> => {
        dispatch(sliceNavbarTitle.actions.setTitle(`|  ${title}`));
    };
