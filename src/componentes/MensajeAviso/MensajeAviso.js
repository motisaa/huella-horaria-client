import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import Checkbox from '@mui/material/Checkbox';
import { GeneralCtx } from '../../contextos/GeneralContext';
import { FormControlLabel } from '@mui/material';

export const WarnMsg = (props) => {
    const navigate = useNavigate();
    const [noMostrarMasChecked, setNoMostrarMasChecked] = useState(false)
    const { setNoMostrarCookie } = useContext(GeneralCtx);

     // Handler for the "Ok" button click
     const handleOkClick = () => {
         if (noMostrarMasChecked) {
            setNoMostrarCookie(true);
        }
         props.cerrarAviso(); // Close the modal
         navigate(`/fichaje/0`);
    };

    // Handler for the "No mostrar más" checkbox change
    const handleCheckboxChange = () => {

        /* FIXED:
        Actualiza el estado del checkbox "No mostrar más"
        con el valor opuesto de noMostrarMasChecked.
        Porque el usuario podría marcar y luego desmarcar la casilla, 
        y luego hace clic en en botón de ok
        Si establecemos el valor en true( setNoMostrarMasChecked(true); ),
        el mensaje de aviso no se mostrará la próxima vez. (en el caso de marcar y desmarcar la casila) */
        setNoMostrarMasChecked(!noMostrarMasChecked); 
        
    };

    return (
        <Dialog
            open={props.aviso}
            onClose={props.cerrarAviso}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {"De el permiso al navegador cuando vaya al fichar "}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Para obtener las coordenadas geográficas y ver la ubicación
                    actual en el mapa, es necesario habilitar el acceso a
                    la ubicación en su navegador.
                </DialogContentText>
            </DialogContent>
            <FormControlLabel
                control={<Checkbox checked={props.noMostrarMas}
                onChange={handleCheckboxChange} />}
                label="No mostrar más"
                sx={{marginLeft: 1}}
            />
            <DialogActions>
                <Button variant='contained' 
                style={{ backgroundColor: '#ff7b00',
                color: 'white',
                fontSize: 16,
                marginRight: 5,
                marginBottom:5 }}
                    onClick={handleOkClick} autoFocus>
                    Ok
                </Button>
            </DialogActions>
        </Dialog>
    );
};

/* These imports are for MensajeAviso and should be  uncommented 
and placed at the beginning of the file if MensajeAviso is activated//uncommented. */

// import Alert from '@mui/material/Alert';
// import Stack from '@mui/material/Stack';
// import { AlertTitle, FormControlLabel, useMediaQuery } from '@mui/material';


// export const MensajeAviso = () => {
//     const [mostrarMensaje, setMostrarMensaje] = useState(true);
//     const isMobile = useMediaQuery('(max-width: 37.5em)');
//     const handleClose = () => {
//         setMostrarMensaje(false);
//     };

//     return (
//         <Stack sx={{
//             width: isMobile ? '100%' : '70%',
//             marginLeft: 2,
//             marginTop: isMobile ? 0 : 15
//         }}
//             spacing={2}>
//             {mostrarMensaje && (
//                 <Alert severity="warning" onClose={handleClose}>
//                     <AlertTitle>Aviso Importante</AlertTitle>
//                     Para obtener las coordenadas geográficas y ver la ubicación actual en el mapa, es necesario habilitar el acceso a la ubicación en su navegador.
//                 </Alert>
//             )}
//         </Stack>
//     );
// }
