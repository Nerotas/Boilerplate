import { Box, Divider, IconButton, List, Typography } from '@mui/material';
import { encryptLocalData, getEncyptedLocalData } from 'helpers/EncryptLocalStorage';
import { IExternalNav, TNavButton } from 'models/navigations/Sidebar';
import { SetStateAction, useEffect, useState } from 'react';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { makeStyles } from '@mui/styles';
import NavButton from './NavButton';
import { Outlet } from 'react-router-dom';
import { Drawer, DrawerHeader } from './Styles/StyledComponents';
import SignOutBar from 'components/AuthorizationBar/SignOutBar';
import { useSelector } from 'redux-state/store';
import permissionChecker from 'helpers/permissionChecker';
import NavMenu from './NavMenu';
import { size } from 'lodash';
import ExternalNavButton from './ExternalNavButton';

interface ISideBar {
    defaultOpen?: boolean;
}

const UniversalSidebar = ({ defaultOpen = false }: ISideBar) => {
    const [open, setOpen] = useState(defaultOpen);
    const [selectedIndex, setSelectedIndex] = useState<number>(0);
    const { roles } = useSelector((state) => state.oauth);
    const isAdmin = permissionChecker('admin', roles);
    const { erotasApp, registryManagement } = NavMenu();
    const useStyles = makeStyles({
        drawerPaper: {
            marginTop: '40px',
            height: '95vh',
            boxSizing: 'border-box',
            width: '280px',
        },
    });

    const classes = useStyles();

    const handleDrawer = () => {
        setOpen(!open);
    };

    const handleListItemClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, index: SetStateAction<number>) => {
        setSelectedIndex(index);
        encryptLocalData('index', index);
    };

    useEffect(() => {
        setSelectedIndex(getEncyptedLocalData('index') || 0);
    }, [selectedIndex]);

    return (
        <Box data-testid="Navbar" sx={{ display: 'flex', height: '100%' }}>
            <Box sx={{ zIndex: 1300, marginBottom: '50px' }}>
                <SignOutBar />
            </Box>
            <Box>
                <Drawer
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    open={open}
                    variant="permanent"
                >
                    <List sx={{ padding: open ? '8px 15px' : '8px 7px' }}>
                        <DrawerHeader sx={{ padding: 0 }}>
                            <IconButton data-testid="drawerButton" onClick={handleDrawer}>
                                {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                            </IconButton>
                        </DrawerHeader>
                        {open && <Typography gutterBottom>Registry Management</Typography>}
                        <Divider />
                        {registryManagement.map((item: TNavButton, index: number) => (
                            <NavButton
                                handleListItemClick={handleListItemClick}
                                index={index}
                                item={item}
                                key={item.label}
                                open={open}
                                selectedIndex={selectedIndex}
                            />
                        ))}

                        {open && <Typography gutterBottom>Automation Configurations</Typography>}

                        {open && <Typography gutterBottom>Erotas App</Typography>}
                        <Divider />
                        {erotasApp.map((item: IExternalNav, index: number) => (
                            <ExternalNavButton
                                handleListItemClick={handleListItemClick}
                                index={index + size(registryManagement)}
                                item={item}
                                key={item.label}
                                open={open}
                                selectedIndex={selectedIndex}
                            />
                        ))}

                        {isAdmin && <>{open && <Typography gutterBottom>Admin Portal</Typography>}</>}
                    </List>
                </Drawer>
            </Box>
            <Box component="main" sx={{ flexGrow: 1, px: 1, overflow: 'hidden' }}>
                <Outlet />
            </Box>
        </Box>
    );
};

export default UniversalSidebar;
