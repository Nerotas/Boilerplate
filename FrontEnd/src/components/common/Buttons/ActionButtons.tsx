import 'components/Styles/Components.scss';

import { Button } from '@mui/material';

export const ActionButton = (props: any) => <Button {...props} className="ModalButton applyButton" variant="contained" />;

export const InfoButton = (props: any) => <Button {...props} className="ModalButton infoButton" variant="contained" />;

export const ClearButton = (props: any) => <Button {...props} className="ModalButton clearButton" variant="text" />;

export const DangerButton = (props: any) => <Button {...props} className="ModalButton dangerButton" variant="contained" />;
