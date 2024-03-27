import { Typography, IconButton, Grid, Paper } from "@mui/material";
import React from "react";
import { MenuLateral } from "../../componentes/MenuLateral/MenuLateral";
import MenuIcon from '@mui/icons-material/Menu';

export const InicioPagina = () => {
    return (
        <>
            <MenuLateral>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Paper variant='outlined' sx={{ padding: 12 }}>
                            <Typography variant='h3'> Huella Horaria </Typography>
                            <Typography>
                                ¡Bienvenido a nuestra aplicación! Para explorar todas las funciones
                                disponibles, simplemente utiliza el menú lateral.
                                Para maximizar tu espacio de trabajo, el menú está oculto por defecto, pero puedes mostrarlo u ocultarlo
                                con un simple clic en el icono <IconButton><MenuIcon /></IconButton>
                                de la parte superior izquierda de la barra de tareas.
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </MenuLateral>
        </>

    )
};
