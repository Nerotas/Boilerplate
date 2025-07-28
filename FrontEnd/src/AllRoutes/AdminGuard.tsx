import { lazy, ReactNode } from 'react';

import Loadable from './Loadable';
import { useSelector } from 'redux-state/store';
import permissionChecker from 'helpers/permissionChecker';

const NotPermitted = Loadable(lazy(() => import('../components/401NoPermission')));

interface AuthGuardProps {
    children?: ReactNode;
}

const AdminGuard = ({ children }: AuthGuardProps) => {
    const { roles } = useSelector((state) => state.oauth);
    const isAdmin = permissionChecker('admin', roles);
    if (isAdmin) {
        return <>{children}</>;
    } else {
        return <NotPermitted />;
    }
};

export default AdminGuard;
