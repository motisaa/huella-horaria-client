import React, { useState } from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { AlertTitle } from '@mui/material';

export const MensajeAviso = () => {
    const [mostrarMensaje, setMostrarMensaje] = useState(true);

    const handleClose = () => {
        setMostrarMensaje(false);
    };

    return (
        <Stack sx={{ width: '70%', marginTop:5, marginLeft: 2}} autoHideDuration={6000} spacing={2}>
            {mostrarMensaje && (
                <Alert severity="warning" onClose={handleClose}>
                <AlertTitle>Aviso Importante</AlertTitle>
                Para obtener las coordenadas geográficas y ver la ubicación actual en el mapa, es necesario habilitar el acceso a la ubicación en su navegador.
              </Alert>
            )}
        </Stack>
    );
}
