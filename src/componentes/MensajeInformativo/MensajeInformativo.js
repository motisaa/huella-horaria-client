import { Alert, Snackbar } from '@mui/material'
import React from 'react'
import { v4 as uuid } from "uuid";

export const MensajeInformativo = (props) => {
    return (
        <>
            <Snackbar key={uuid()} open={props.hayMensaje} autoHideDuration={9000} onClose={props.cerrarMensaje}
                anchorOrigin={{ vertical: 'top', horizontal: 'right', }}>
                <Alert onClose={props.cerrarMensaje} severity="success" sx={{ width: '100%' }}>
                    {props.mensaje}
                </Alert>
            </Snackbar>
        </>
    )
}