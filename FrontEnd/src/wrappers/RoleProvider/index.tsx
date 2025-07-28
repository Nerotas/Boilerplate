import React, { useEffect } from 'react';

import Loader from 'components/common/Loader';
import { useGet } from 'hooks';
import { useDispatch } from 'react-redux';
import { setRole, resetLoginState } from 'redux-state/oauth';
import { size } from 'lodash';
import { openWarningGlobalSnackbar } from 'redux-state/globalSnackbar/actions';
import { useMsal } from '@azure/msal-react';

interface TRoleProvider {
    children: JSX.Element;
}

const RoleProvider = ({ children }: TRoleProvider) => {
    const dispatch = useDispatch();
    const { instance } = useMsal();

    const {
        data: roles,
        isError,
        isFetching,
        isLoading,
    } = useGet<string[]>({
        url: `${process.env.REACT_APP_EROTAS_CONSOLE_API}/users/me/role`,
        apiLabel: `getRoles`,
    });

    useEffect(() => {
        if (roles && size(roles) > 0) {
            dispatch(setRole(roles));
        } else {
            //BOILERPLATE: If no roles are returned, clear the session storage and redirect to login
            console.warn('No roles found, setting default role to user');
            dispatch(setRole(['user']));
        }

        if ((!isFetching && !isLoading && size(roles) === 0) || isError) {
            sessionStorage.clear();
            dispatch(openWarningGlobalSnackbar({ message: `Access Denied` }));
            dispatch(resetLoginState());
            instance.logoutRedirect();
        }
    }, [roles, isError]);

    switch (true) {
        case isError:
        case size(roles) > 0:
            return React.Children.only(children);
        case isFetching || isLoading:
        default:
            return <Loader />;
    }
};

export default RoleProvider;
