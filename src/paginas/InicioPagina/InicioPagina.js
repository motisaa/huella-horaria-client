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
                                ¡Bienvenido a nuestra aplicación! Para ver el menu
                                o ocultarlo haz clic en el icono <MenuIcon />  
                                que está en la parte izquierda de la
                                barra de navegación. Si estás
                                accediendo desde un dispositivo móvil o tablet
                                o has ajustado la ventanta de navegador
                                para que sea más pequeña, encontrarás el icono
                                del menú ahí.
                                En el caso de que estés accediendo desde un
                                escritorio o portátil tienes los items de menu en
                                la barra de navegación.
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </MenuLateral>
        </>

    )
};
