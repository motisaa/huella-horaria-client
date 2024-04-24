import { Typography, IconButton, Grid, Paper } from "@mui/material";
import React from "react";
import { MenuLateral } from "../../componentes/MenuLateral/MenuLateral";
import MenuIcon from '@mui/icons-material/Menu';

export const InicioPagina = () => {
    return (
        <>
            <MenuLateral>
                <Grid container spacing={2}>
                    <Grid item xs={12} mt={5}>
                        <Paper variant='outlined' sx={{ padding: 12 }}>
                            <Typography variant='h3'> Huella Horaria </Typography>
                            <Typography>
                                ¡Bienvenido a nuestra aplicación! Si estás accediendo desde desde un dispositivo móvil, el menú está oculto por defecto,
                                pero puedes mostrarlo u ocultarlo con un clic en el icono <MenuIcon /> que está en la parte superior izquierda 
                                de la barra de navegación.
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </MenuLateral>
        </>

    )
};
