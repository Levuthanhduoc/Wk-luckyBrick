import * as React from 'react';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Context } from '../base/ContextWarper';
import { contextInterface } from '../../AppTyscript';

export default function SnackNotification() {
  const {snack ,setSnack} = React.useContext(Context) as contextInterface;
  const handleClose = (
    _event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnack({...snack,isOpen:false});
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
      <Snackbar
        open={snack.isOpen}
        autoHideDuration={6000}
        onClose={handleClose}
        message={snack.message}
        action={action}
      />
  );
}