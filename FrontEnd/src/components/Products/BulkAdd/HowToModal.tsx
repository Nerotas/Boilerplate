import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, List, ListItem, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

interface HowToModalProps {
    handleClose: () => void;
    open: boolean;
}

const HowToModal = ({ handleClose, open }: HowToModalProps) => (
    <Dialog aria-describedby="alert-dialog-description" aria-labelledby="alert-dialog-title" onClose={handleClose} open={open}>
        <DialogTitle id="alert-dialog-title">How do I use a Google Sheet to add multiple products?</DialogTitle>
        <DialogContent>
            <DialogContentText id="alert-dialog-description">
                <List>
                    <ListItem>Make a copy of this template: &nbsp;</ListItem>
                    <ListItem>
                        <Typography
                            component={Link}
                            style={{ fontWeight: 'bold' }}
                            target="_blank"
                            to="https://docs.google.com/spreadsheets/d/exampleGoogleSheet"
                        >
                            Bulk Products Template
                        </Typography>
                    </ListItem>
                    <ListItem>You can create a fill under the "File" menu in top left. There is an option called "Make a copy"</ListItem>
                    <ListItem>Share with the console service email:</ListItem>
                    <Typography sx={{ color: 'black', fontWeight: 'bold' }}>serviceAccount@email.com</Typography>
                    <ListItem>Fill out the sheet</ListItem>
                    <ListItem>Copy the URL and paste here in the Erotas Console.</ListItem>
                    <ListItem>Console will validate the sheet and let you know what errors need to be fixed before submitting.</ListItem>
                    <ListItem>We are working on improving this processes.</ListItem>
                </List>
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button autoFocus onClick={handleClose}>
                Close
            </Button>
        </DialogActions>
    </Dialog>
);

export default HowToModal;
