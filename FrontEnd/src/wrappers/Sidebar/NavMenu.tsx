import { IExternalNav, NavBarButtonStatus, TNavButton } from 'models/navigations/Sidebar';
import { useSelector } from 'redux-state/store';
import permissionChecker from 'helpers/permissionChecker';
import { RoutePaths } from 'AllRoutes/RoutePaths';

import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import ErotasIcon from 'assets/images/ErotasIcon.png';
const NavMenu = () => {
    const { roles } = useSelector((state) => state.oauth);
    const isAdmin = permissionChecker('admin', roles);

    const registryManagement: TNavButton[] = [
        {
            label: 'Products',
            icon: LocalOfferIcon,
            redirectTo: `${RoutePaths.Products}`,
            status: NavBarButtonStatus.CLICKABLE,
        },
    ];

    const erotasApp: IExternalNav[] = [
        {
            label: 'Erotas Github',
            icon: () => <img alt="Erotas" src={ErotasIcon} style={{ width: 24, height: 24 }} />, // <-- Fix here
            redirectTo: `https://github.com/Nerotas`,
            newTab: true,
            status: NavBarButtonStatus.CLICKABLE,
        },
    ];

    return { registryManagement, erotasApp };
};

export default NavMenu;
