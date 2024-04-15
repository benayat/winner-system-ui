import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";

const LogoutConfirmationModal = ({show, closeModal, handleConfirm}) => {
    return (
        <div>
            <Dialog open={show} onClose={closeModal}>
                <DialogTitle>Logout Confirmation</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to logout?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeModal}>Cancel</Button>
                    <Button onClick={handleConfirm} color="error">Logout</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
export default LogoutConfirmationModal;