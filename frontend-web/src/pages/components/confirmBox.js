import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function ConfirmBox(props) {

    const {title, open: openProps, message, onClick} = props

    const [open, setOpen] = React.useState(openProps);

    
      const handleClose = () => {
        setOpen(false);
      };
    

    return(
        <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClick(false)} color="#e3552f">
            Cancelar
          </Button>
          <Button onClick={onClick(true)} style={{color: '#333'}} autoFocus>
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    )

}