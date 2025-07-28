import React from 'react';
import mockCustomTestComponent from './CustomTestComponent';

export const mockMuiSelectOnchange = jest.fn();
export const mockMuiPaginationOnchange = jest.fn();
export const mockAutocompleteOnChange = jest.fn();
export const mockInputBaseOnChange = jest.fn();
export const mockInputBaseOnKeyUp = jest.fn();

const mockTheme = {
    breakpoints: {
        up: (val: any) => val,
        down: (val: any) => val,
    },
    transitions: {
        create: jest.fn(),
        easing: {
            sharp: 'theme.transitions.easing.sharp',
        },
        duration: {
            enteringScreen: 'theme.transitions.duration.enteringScreen',
        },
    },
    spacing: () => 10,
    palette: {
        action: { selectedOpacity: 0.5 },
        common: { white: 'paletteCommonWhite' },
        text: { secondary: 'theme.palette.text.secondary' },
        grey: { 800: 'grey800' },
        getContrastText: (val: any) => `contrastColor-${val}`,
        primary: {
            main: '#111111',
        },
    },
    shadows: ['theme.shadow-0', 'theme.shadow-1'],
    typography: { body2: 'theme.typography.body2' },
};

jest.mock('@mui/material', () => {
    const React = require('react');
    const originalMui = jest.requireActual('@mui/material');
    const CustomComponent = mockCustomTestComponent;

    const Button = ({ children, onClick, onClose, ...rest }: any) => {
        let innerLabel = '';
        React.Children.map(children, (child: string | React.ReactNode) => {
            if (typeof child === 'string') {
                innerLabel += child;
            }
        });
        return (
            <>
                <CustomComponent data-testid={`mui-button-click-${innerLabel}`} onClick={onClick} {...rest}>
                    {children}
                </CustomComponent>
                <CustomComponent data-testid={`mui-button-close-${innerLabel}`} onClick={onClose} />
            </>
        );
    };

    const Select = ({ children, label, MenuProps = {}, onChange, renderValue = () => {}, sx = {}, ...rest }: any) => {
        React.useEffect(() => {
            mockMuiSelectOnchange(onChange);
        }, []);
        return (
            <>
                <CustomComponent data-testid={`mui-select-${label}-renderValue`}>{renderValue(rest.value)}</CustomComponent>
                <CustomComponent
                    data-onChange={onChange}
                    data-testid={`mui-select-${label}`}
                    menuprops={JSON.stringify(MenuProps)}
                    sx={JSON.stringify(sx)}
                    {...rest}
                >
                    {children}
                </CustomComponent>
            </>
        );
    };

    const ClickAwayListener = ({ children, onClickAway, ...props }: any) => {
        const onClickHandler = () => onClickAway();
        return (
            <CustomComponent data-testid="mock-clickAwayListener" {...props} onClick={onClickHandler}>
                {children}
            </CustomComponent>
        );
    };

    const Tooltip = ({ children, ...props }: any) => (
        <CustomComponent data-testid="mock-mui-tooltip" {...props}>
            {children}
        </CustomComponent>
    );

    const AppBar = ({ children, sx, ...props }: any) => (
        <CustomComponent data-testid="mock-mui-appbar" sx={JSON.stringify(sx)} {...props}>
            {children}
        </CustomComponent>
    );

    const Badge = ({ anchorOrigin, children, sx, ...props }: any) => (
        <CustomComponent anchorOrigin={JSON.stringify(anchorOrigin)} data-testid="mock-mui-badge" sx={JSON.stringify(sx)} {...props}>
            {children}
        </CustomComponent>
    );

    const Menu = ({ children, open, ...props }: any) => (
        <CustomComponent data-testid="mock-mui-menu" {...props}>
            {children}
        </CustomComponent>
    );

    const MenuItem = ({ children, className = {}, ...props }: any) => (
        <CustomComponent className={JSON.stringify(className)} data-testid="mock-mui-menuItem" {...props}>
            {children}
        </CustomComponent>
    );

    const Divider = () => <CustomComponent data-testid="mock-mui-divider" />;

    const Dialog = ({ children, onClose, open, ...props }: any) =>
        open ? (
            <CustomComponent data-testid="mock-mui-dialog" {...props}>
                {children}
                <div data-testid="mock-mui-dialog-closer" onClick={onClose} />
            </CustomComponent>
        ) : null;

    const Drawer = ({ children, classes = {}, open, style, ...props }: any) =>
        open ? (
            <CustomComponent classes={JSON.stringify(classes)} data-style={JSON.stringify(style)} data-testid="mock-mui-drawer" {...props}>
                {children}
            </CustomComponent>
        ) : null;

    const List = ({ children }: any) => <CustomComponent data-testid="mock-mui-list">{children}</CustomComponent>;

    const IconButton = ({ children, onClick, ...rest }: any) => (
        <CustomComponent data-testid={`mock-mui-iconButton${rest['data-testid'] ? `-${rest['data-testid']}` : ''}`} onClick={onClick}>
            {children}
        </CustomComponent>
    );

    const ListItem = ({ children, sx, ...props }: any) => (
        <CustomComponent data-testid="mock-mui-listItem" sx={JSON.stringify(sx)} {...props}>
            {children}
        </CustomComponent>
    );

    const ListItemButton = ({ children, onClick, sx, ...props }: any) => (
        <CustomComponent data-testid="mock-mui-listItemButton" onClick={onClick} sx={JSON.stringify(sx)} {...props}>
            {children}
        </CustomComponent>
    );

    const ListItemIcon = ({ children, sx, ...props }: any) => (
        <CustomComponent data-testid="mock-mui-listItemIcon" sx={JSON.stringify(sx)} {...props}>
            {children}
        </CustomComponent>
    );

    const ListItemText = ({ sx, ...props }: any) => <CustomComponent data-testid="mock-mui-listItemText" sx={JSON.stringify(sx)} {...props} />;

    const Box = ({ children, id, sx, ...props }: any) => (
        <CustomComponent data-testid="mock-mui-box" id={id} sx={JSON.stringify(sx)} {...props}>
            {children}
        </CustomComponent>
    );

    const FormControl = ({ children, sx, ...props }: any) => (
        <CustomComponent data-testid="mock-mui-formControl" sx={JSON.stringify(sx)} {...props}>
            {children}
        </CustomComponent>
    );

    const TextField = ({ sx = {}, ...props }: any) => <CustomComponent data-testid="mock-mui-textField" sx={JSON.stringify(sx)} {...props} />;

    const Grid2 = ({ children, component, sx, ...props }: any) => {
        const Component = component;
        return component ? (
            <Component sx={JSON.stringify(sx)} {...props}>
                {children}
            </Component>
        ) : (
            <CustomComponent data-testid="mock-mui-grid" sx={JSON.stringify(sx)} {...props}>
                {children}
            </CustomComponent>
        );
    };

    const Pagination = ({ onChange, ...props }: any) => {
        React.useEffect(() => {
            mockMuiPaginationOnchange(onChange);
        }, []);
        return <CustomComponent data-testid="mock-mui-pagination" {...props} />;
    };

    const Autocomplete = ({ classes = {}, onChange, options = {}, ref, renderInput, value = {}, ...props }: any) => {
        React.useEffect(() => {
            mockAutocompleteOnChange(onChange);
        }, []);
        return (
            <>
                <CustomComponent
                    classes={JSON.stringify(classes)}
                    data-testid="mock-mui-autocomplete"
                    onChange={onChange}
                    options={JSON.stringify(options)}
                    value={JSON.stringify(value)}
                    {...props}
                />
                {renderInput({ inputProps: {}, InputProps: { ref: {} } })}
            </>
        );
    };

    const InputBase = ({ classes = {}, onChange = () => {}, onKeyUp = () => {}, placeholder, ref, sx = {}, value = {} }: any) => {
        React.useEffect(() => {
            mockInputBaseOnChange(onChange);
            mockInputBaseOnKeyUp(onKeyUp);
        }, []);
        return (
            <CustomComponent classes={JSON.stringify(classes)} data-testid="mock-mui-inputBase" sx={JSON.stringify(sx)} value={JSON.stringify(value)}>
                {placeholder}
            </CustomComponent>
        );
    };

    const useTheme = () => mockTheme;

    const Checkbox = ({ inputProps = {}, onChange, ...rest }: any) => (
        <CustomComponent data-testid="mock-mui-checkbox" inputProps={JSON.stringify(inputProps)} onClick={onChange} {...rest} />
    );

    const Fab = ({ className, onClick }: any) => <CustomComponent className={className} data-testid="mock-mui-fab" onClick={onClick} />;

    const FormControlLabel = ({ control, label }: any) => (
        <>
            {control}
            {label}
        </>
    );

    const Switch = ({ onChange, sx = {}, ...props }: any) => (
        <CustomComponent data-testid={`mock-mui-switch-${props.name}`} onClick={onChange} sx={JSON.stringify(sx)} {...props} />
    );

    const LinearProgress = ({ value, ...props }: any) => <CustomComponent data-testid="mui-linear-progress" value={value} {...props} />;

    const Chip = ({ onDelete, ...props }: any) => <CustomComponent data-testid={`mock-mui-chip-${props.label}`} onClick={onDelete} {...props} />;

    const Container = ({ children, classes, ...props }: any) => (
        <CustomComponent classes={JSON.stringify(classes)} data-testid="mock-mui-container" {...props}>
            {children}
        </CustomComponent>
    );

    const Alert = ({ action, children, classes, ...props }: any) => (
        <CustomComponent classes={JSON.stringify(classes)} data-testid="mock-mui-alert" {...props}>
            {action}
            {children}
        </CustomComponent>
    );

    const Card = ({ children, ...props }: any) => (
        <CustomComponent data-testid="mock-mui-card" {...props}>
            {children}
        </CustomComponent>
    );

    const CardContent = ({ children, ...props }: any) => (
        <CustomComponent data-testid="mock-mui-card-content" {...props}>
            {children}
        </CustomComponent>
    );

    return {
        ...originalMui,
        Alert,
        AppBar,
        Autocomplete,
        Badge,
        Box,
        Button,
        Card,
        CardContent,
        Checkbox,
        Chip,
        ClickAwayListener,
        Container,
        Dialog,
        Divider,
        Drawer,
        Fab,
        FormControl,
        FormControlLabel,
        Grid2,
        IconButton,
        InputBase,
        List,
        ListItem,
        ListItemButton,
        ListItemIcon,
        ListItemText,
        LinearProgress,
        Menu,
        MenuItem,
        Pagination,
        Select,
        Switch,
        TextField,
        Tooltip,
        useTheme,
    };
});

jest.mock('@mui/material/TableCell', () => {
    const originalMui = jest.requireActual('@mui/material/TableCell');
    const CustomComponent = mockCustomTestComponent;

    const TableCell = ({ children, classes, className, style, ...props }: any) => (
        <CustomComponent
            classes={JSON.stringify(classes)}
            className={JSON.stringify(className)}
            data-style={style ? JSON.stringify(style) : undefined}
            data-testid="mock-mui-tableCell"
            {...props}
        >
            {children}
        </CustomComponent>
    );

    return {
        __esModule: true,
        ...originalMui,
        default: TableCell,
    };
});

jest.mock('@mui/material/styles', () => {
    const originalMui = jest.requireActual('@mui/material/styles');
    const styled = (component: any, options: any) => (styleGeneratorCb: any) => (props: any) => {
        const styles = styleGeneratorCb({ ...props, theme: mockTheme });
        const Component = component;
        return <Component style={styles} {...props} />;
    };
    return {
        ...originalMui,
        styled,
    };
});

jest.mock('@mui/styles', () => {
    const originalMui = jest.requireActual('@mui/styles');

    const makeStyles = (styleGeneratorCb: any) => () =>
        typeof styleGeneratorCb === 'function' ? styleGeneratorCb({ spacing: (val: any) => val }) : styleGeneratorCb;
    const styled = (component: any, options: any) => (styleGeneratorCb: any) => (props: any) => {
        const mockTheme = {
            breakpoints: {
                up: (val: any) => val,
            },
            transitions: {
                create: jest.fn(),
                easing: {
                    sharp: 'theme.transitions.easing.sharp',
                },
                duration: {
                    enteringScreen: 'theme.transitions.duration.enteringScreen',
                },
            },
            spacing: () => 10,
            palette: {
                action: { selectedOpacity: 0.5 },
                common: { white: 'paletteCommonWhite' },
                text: { secondary: 'theme.palette.text.secondary' },
                grey: { 800: 'grey800' },
                getContrastText: (val: any) => `contrastColor-${val}`,
                primary: {
                    main: '#111111',
                },
            },
            shadows: ['theme.shadow-0', 'theme.shadow-1'],
            typography: { body2: 'theme.typography.body2' },
        };
        const styles = styleGeneratorCb({ ...props, theme: mockTheme });
        const Component = component;
        return <Component style={styles} {...props} />;
    };
    return {
        ...originalMui,
        makeStyles,
        styled,
    };
});

jest.mock('@mui/material/Tooltip', () => {
    const originalMui = jest.requireActual('@mui/material/Tooltip');
    const CustomComponent = mockCustomTestComponent;

    const Tooltip = ({ children, ...props }: any) => (
        <CustomComponent data-testid="mock-mui-tooltip" {...props}>
            {children}
        </CustomComponent>
    );

    return {
        __esModule: true,
        ...originalMui,
        default: Tooltip,
    };
});

jest.mock('@mui/material/TableContainer', () => {
    const originalMui = jest.requireActual('@mui/material/TableContainer');
    const CustomComponent = mockCustomTestComponent;

    const TableContainer = ({ children, style = {}, ...props }: any) => (
        <CustomComponent data-style={JSON.stringify(style)} data-testid="mock-mui-tableContainer" {...props}>
            {children}
        </CustomComponent>
    );

    return {
        __esModule: true,
        ...originalMui,
        default: TableContainer,
    };
});

jest.mock('@mui/material/Menu', () => {
    const originalMui = jest.requireActual('@mui/material/Menu');
    const CustomComponent = mockCustomTestComponent;

    const Menu = ({ children, open, ...props }: any) =>
        open ? (
            <CustomComponent data-testid="mock-mui-menu" {...props}>
                {children}
            </CustomComponent>
        ) : null;

    return {
        __esModule: true,
        ...originalMui,
        default: Menu,
    };
});

jest.mock('@mui/material/CardHeader', () => {
    const CustomComponent = mockCustomTestComponent;

    const CardHeader = ({ title }: any) => <CustomComponent data-testid={`mui-card-header-${title}`} />;

    return {
        __esModule: true,
        default: CardHeader,
    };
});

jest.mock('@mui/material/Checkbox', () => {
    const Checkbox = ({ checked, onChange }: any) => <input checked={checked} data-testid="mock-mui-checkbox" onChange={onChange} type="checkbox" />;

    return {
        __esModule: true,
        default: Checkbox,
    };
});
