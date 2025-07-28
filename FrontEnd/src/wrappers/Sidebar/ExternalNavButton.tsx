import './NavButton.scss';

import { ListItem, ListItemButton, ListItemIcon, ListItemText, Tooltip } from '@mui/material';
import { IExternalNav, NavBarButtonStatus } from 'models/navigations/Sidebar';

import { NavLink } from 'react-router-dom';
import { SetStateAction } from 'react';
import { styled } from '@mui/material/styles';

const StyledNavLink = styled(NavLink)(() => ({
    '&.Mui-selected': {
        backgroundColor: 'var(--selected-color) !important',
    },
    fontSize: '16px !important',
}));

interface IExternalNavButton {
    handleListItemClick: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, index: SetStateAction<number>) => void;
    index: number;
    item: IExternalNav;
    open: boolean;
    selectedIndex: number;
}

const ExternalNavButton = ({ handleListItemClick, index, item, open, selectedIndex }: IExternalNavButton) => (
    <>
        {item.status === NavBarButtonStatus.INVISIBLE ? (
            <></>
        ) : (
            <Tooltip placement="right-end" title={item.label}>
                <ListItem
                    disablePadding
                    key={index}
                    sx={{
                        display: 'block',
                        mt: '15px',
                        mb: '15px',
                        borderRadius: '8px',
                        '&:hover': { backgroundColor: 'rgba(242, 249, 251, 0.85)' },
                    }}
                >
                    <ListItemButton
                        component={StyledNavLink}
                        data-cy={item.redirectTo}
                        data-testid="navbar-item"
                        disabled={item.status === NavBarButtonStatus.GREYED}
                        onClick={(e) => handleListItemClick(e, index)}
                        selected={selectedIndex === index}
                        sx={{
                            padding: '8px',
                            minHeight: 48,
                            borderRadius: '8px',
                        }}
                        target={item.newTab ? '_blank' : undefined}
                        to={item.redirectTo}
                    >
                        <ListItemIcon
                            sx={{
                                minWidth: 0,
                                justifyContent: 'center',
                                color: '#000',
                                padding: '5px',
                                borderRadius: '4px',
                            }}
                        >
                            <item.icon />
                        </ListItemIcon>
                        {open && <ListItemText primary={item.label} sx={{ ml: '8px' }} />}
                    </ListItemButton>
                </ListItem>
            </Tooltip>
        )}
    </>
);

export default ExternalNavButton;
