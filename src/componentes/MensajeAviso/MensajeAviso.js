import React, { useState } from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { AlertTitle, useMediaQuery } from '@mui/material';

export const MensajeAviso = () => {
    const [mostrarMensaje, setMostrarMensaje] = useState(true);
    const isMobile = useMediaQuery('(max-width: 37.5em)');
    const handleClose = () => {
        setMostrarMensaje(false);
    };

    return (
        <Stack sx={{
            width: isMobile ? '100%' :'70%', 
            marginLeft: 2,
            marginTop: isMobile ? 0 : 15}}
            spacing={2}>
            {mostrarMensaje && (
                <Alert severity="warning" onClose={handleClose}>
                <AlertTitle>Aviso Importante</AlertTitle>
                Para obtener las coordenadas geográficas y ver la ubicación actual en el mapa, es necesario habilitar el acceso a la ubicación en su navegador.
              </Alert>
            )}
        </Stack>
    );
}
