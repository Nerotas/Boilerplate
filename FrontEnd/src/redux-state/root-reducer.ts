import { combineReducers } from 'redux';
import { reducer as oauth } from 'redux-state/oauth/reducers';
import { reducer as GlobalSnackbar } from 'redux-state/globalSnackbar/reducers';
import { reducer as bulkAddProducts } from 'redux-state/bulkAddProducts/reducers';
import { reducer as navbarTitle } from 'redux-state/navbarTitle/reducers';

const rootReducer = combineReducers({
    bulkAddProducts,
    GlobalSnackbar,
    oauth,
    navbarTitle,
});

export default rootReducer;
