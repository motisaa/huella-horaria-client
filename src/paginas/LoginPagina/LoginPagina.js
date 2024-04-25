import { Grid, Typography, useMediaQuery } from "@mui/material";
import React, { useEffect, useState } from 'react';
import { leerVersion } from '../../servicios/ApiLib';
import { LoginForm } from './LoginForm';

export const LoginPagina = () => {
    const mobileMediaQuery = useMediaQuery('(max-width: 37.5em)'); // 600px / 16px = 37.5em
    const [version, setVersion] = useState('0.0.0');
    const consultarVersion = async () => {
        const { data: versionData } = await leerVersion()
        setVersion(versionData.version)
    };
    useEffect(() => {
        consultarVersion();
    }, [])

    return (
        <>
            <Grid container>
                <Grid item sm={6} md={8} className="fondoImagenLogin">
                    <Typography variant='h3'>
                        Huella Horaria
                    </Typography>
                    <Typography variant='h6'>
                        Gestión de fichajes
                    </Typography>
                    <Typography>
                        versión: {version}
                    </Typography>
                </Grid>
                {mobileMediaQuery
                    ? ( <Grid item xs={12} sm={6} md={4} 
                          sx={{marginTop: 5, marginLeft:  12}}>
                         <Typography variant='h5'>
                            Huella Horaria
                         </Typography>
                         <Typography variant='h6'>
                            Gestión de fichajes
                         </Typography>
                         <Typography>
                            versión: {version}
                         </Typography>
                         </Grid> )
                    : ''}
                <Grid item xs={12} sm={6} md={4} className="loginForm">
                    <div className='recuadro'>
                        <LoginForm />
                    </div>
                </Grid>
            </Grid>
        </>
    );
};
