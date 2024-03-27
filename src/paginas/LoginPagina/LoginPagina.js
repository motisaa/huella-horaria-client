import { Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from 'react'
import { leerVersion } from '../../servicios/ApiLib';
import { LoginForm } from "./LoginForm";

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
            {/* center de login box */}
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
                sx={{ minHeight: "100vh" }}
            >
                <Grid item xs={8} className="fondoImagenLogin">
                    <Typography variant='h3'>
                        Huella Horaria
                    </Typography>
                    <Typography variant='h6'>
                        Gestión de fichajes
                    </Typography>
                    <Typography>
                        Versión {version}
                    </Typography>
                </Grid>
                <Grid item xs={4}>
                    <div className="recuadro">
                        <LoginForm />
                    </div>
                </Grid>
            </Grid>
        </>
    );
};
