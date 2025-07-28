import permissionChecker from 'helpers/permissionChecker';
import { useSelector } from 'redux-state/store';

interface TPermissionGuard {
    permission: string;
    children: JSX.Element;
}

const PermissionGuard = ({ children, permission }: TPermissionGuard) => {
    const { roles } = useSelector((state) => state.oauth);

    return permissionChecker(permission, roles) ? <>{children}</> : null;
};

export default PermissionGuard;
