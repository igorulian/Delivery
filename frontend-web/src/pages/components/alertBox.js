import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function AlertBox(props) {

    const {title, message, open : openProps, onClick} = props

    const [open, setOpen] = React.useState(openProps);

      const handleClose = () => {
        setOpen(false);
      };

    const teste = () => {
      setOpen(false)
      this.onClick()
    }
    

    return(
        <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent style={{minWidth: '300px'}}>
          <DialogContentText id="alert-dialog-description">
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClick}  style={{color: '#fff', backgroundColor: '#e3552f', paddingRight: '20px'}}>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    )

}