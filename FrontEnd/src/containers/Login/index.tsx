import { getEncyptedLocalData } from 'helpers/EncryptLocalStorage';
import React, { useEffect } from 'react';

import Header from 'wrappers/Header/BasicHeader';
import InitialScreen from 'components/InitialScreen';
import { useDispatch, useSelector } from 'redux-state/store';
import { openWarningGlobalSnackbar } from 'redux-state/globalSnackbar/actions';

const LoginComponent = React.memo(() => {
    const dispatch = useDispatch();

    // state for open and close the snackbar
    const { isLoginFailure, isLogInSuccess } = useSelector((state) => state.oauth);

    useEffect(() => {
        if (isLoginFailure && isLogInSuccess && getEncyptedLocalData('isValid') === 'true') {
            dispatch(openWarningGlobalSnackbar({ message: `Access Denied` }));
        }
    }, [isLoginFailure]);

    return (
        <>
            <Header title="Login" />
            <InitialScreen />
        </>
    );
});

export default LoginComponent;
