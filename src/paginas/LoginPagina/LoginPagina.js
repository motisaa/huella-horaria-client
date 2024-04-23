import { Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from 'react';
import { leerVersion } from '../../servicios/ApiLib';
import { LoginForm } from './LoginForm';

export const LoginPagina = () => {
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
                <Grid item xs={12} sm={6} md={4} className="loginForm">
                    <div className='recuadro'>
                        <LoginForm />
                    </div>
                </Grid>
            </Grid>
        </>
    );
};
