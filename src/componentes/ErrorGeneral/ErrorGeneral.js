import { Alert, Snackbar, useMediaQuery } from '@mui/material';
import React from 'react';


export const ErrorGeneral = (props) => {

    return (
        <>
            <Snackbar
                open={props.hayError}
                autoHideDuration={10000}
                onClose={props.cerrarError}
                // it appears on the top left of the screen
                anchorOrigin={{ vertical: 'top', horizontal: 'left', }}
            >
                <Alert
                    onClose={props.cerrarError}
                    severity="error"
                    sx={{ width: '100%', marginTop: 10 }}
                >
                    {props.mensajeError}
                </Alert>
            </Snackbar>
        </>
    )
}

export const ErrorLogin = (props) => {
    const isMobile = useMediaQuery('(max-width: 37.5em)');
    return (
        <>
            <Snackbar
                open={props.hayError}
                autoHideDuration={10000}
                onClose={props.cerrarError}
                // it appears on the top left of the screen
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert
                    onClose={props.cerrarError}
                    severity="error"
                    sx={{
                        width: isMobile ? '85%' : '80%',
                        marginTop: isMobile ? 20 : 1,
                        marginRight: isMobile ? 1 : 0,
                    }}
                >
                    {props.mensajeError}
                </Alert>
            </Snackbar>

        </>
    )
}