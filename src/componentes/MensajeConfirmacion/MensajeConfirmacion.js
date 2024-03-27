import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'

export const MensajeConfirmacion = (props) => {
    return (
        <Dialog
            open={props.hayConfirmacion}
            onClose={props.cerrarConfirmacion}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {"Confirme la acción"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {props.mensaje}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button variant='contained' color='success' onClick={props.cerrarConfirmacion}>Salir</Button>
                <Button variant='contained' color='error' onClick={props.confirmar} autoFocus>
                    Aceptar
                </Button>
            </DialogActions>
        </Dialog>
    )
}
