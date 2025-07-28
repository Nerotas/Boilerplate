import { OverridableComponent } from '@mui/types';
import { SvgIconTypeMap } from '@mui/material';

export enum NavBarButtonStatus {
    CLICKABLE = 'Clickable',
    GREYED = 'Greyed',
    INVISIBLE = 'Invisible',
}

export interface TNavButton {
    label: string;
    icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>;
    redirectTo: string;
    status: NavBarButtonStatus;
}

export interface IExternalNav extends TNavButton {
    newTab: boolean;
}
