export interface Modal {
    id: string;
    props?: ModalProps;
}

export interface ModalProps {
    description?: string;
    onReject?: () => void;
    onSubmit?: () => void;
}

export interface CustomerClientsWarnModalProps extends ModalProps {
    clients?: string[];
}

export interface CustomerClientsWarnModalType {
    id: string;
    props?: CustomerClientsWarnModalProps;
}
