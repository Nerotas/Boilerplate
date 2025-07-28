export enum GlobalSnackbarSeverity {
    ERROR = 'error',
    INFO = 'info',
    SUCCESS = 'success',
    WARNING = 'warning',
}

export class GlobalSnackbar {
    open: boolean = false;
    message: string = '';
    title?: string = '';
    severity: GlobalSnackbarSeverity = GlobalSnackbarSeverity.INFO;
    autohideDuration: number | null = 5000;
}

export interface GlobalSnackbarProps {
    title?: string;
    message: string;
    severity: GlobalSnackbarSeverity;
    autohideDuration: number | null;
}

export interface GlobalSnackbarInput {
    title?: string;
    message: string;
    autohideDuration?: number | null;
}
