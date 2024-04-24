import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { GeneralCtx } from "../../contextos/GeneralContext";
import { MensajeError } from "../../servicios/TratamientoErrores";
import { ErrorGeneral } from "../../componentes/ErrorGeneral/ErrorGeneral";
import { MensajeInformativo } from "../../componentes/MensajeInformativo/MensajeInformativo";
import { Button, TextField, Typography, Grid, IconButton, InputAdornment } from "@mui/material";
import { ActualizarUsuarioTrabajador, LeerUsuarioTrabajador, LeerUsuariosTrabajadores } from "../../servicios/RQTrabajadores";
import { MenuLateral } from "../../componentes/MenuLateral/MenuLateral";
import { initialValues, validationSchema } from "./PerfilFunciones";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';


export const EditarPerfilPagina = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [hayError, setHayError] = useState(false);
    const [mensajeError, setMensajeError] = useState("");
    const [hayMensaje, setHayMensaje] = useState(false);
    const [mensaje, setMensaje] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [usernames, setUsernames] = useState([]);
    const [antPassword, setAntPassword] = useState()
    /* he sacado este useEffect con la ayuda de chatGPT
 This useEffect is set up to handle username input, using setTimeout
 and clearTimeout. It's designed to manage when a user types a username
 that already exists, so when user changes the username to the one that
  doesnt exist in base de datos, requires a cleanup of the previous timeout.
  So it will work fine as expected(user wil be created o editted).
 */
    useEffect(() => {
        // Inside this useEffect, a timer is set using setTimeout, delaying for 0.5 seconds.
        const timerId = setTimeout(async () => {
            try {
                const data = await LeerUsuariosTrabajadores();
                let usernames = data.data;
                setUsernames(usernames);
            } catch (error) {
                console.error(error);
                setMensajeError(MensajeError(error));
                setHayError(true);
            }
            // a timeout is set with a 0.5s delay.
        }, 500);

        return () => {
            // It clears the timer previously set by setTimeout
            clearTimeout(timerId);
        };
    }, []);

    const handleSubmit = async (values) => {
        let usernameActual = formik.values.usuario;
        try {
            let nombreUsuarioExistente = usernames.find(
                (user) => user.usuario === values.usuario
                    && user.usuario !== usernameActual
            );
            if (nombreUsuarioExistente) {
                setHayError(true);
                setMensajeError("El nombre de usuario ya existe. Por favor, elija otro.");
            } else {
                if (values.password !== antPassword) {
                    // si las contraseñas no son iguales(pass y confirm pass)
                    if (values.confirmPassword !== values.password) {
                        setHayError(true);
                        setMensajeError("Las contraseñas deben coincidir.");
                        return;
                    }
                }
                delete values.confirmPassword;
                await actualizarUsuarioTrabajador.mutateAsync(values);
                navigate("/perfil");
            }
        } catch (error) {
            console.error(error);
            setMensajeError(MensajeError(error));
            setHayError(true);
        }
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const formik = useFormik({
        // Configuración del formulario usando Formik
        // Valores iniciales del formulario
        initialValues: initialValues(),
        // Esquema de validación para los campos del formulario
        validationSchema: validationSchema(),
        // Función que se ejecuta cuando se envía el formulario
        onSubmit: handleSubmit,
    });


    const salirForm = (e) => {
        // Verifica si hay un evento
        // Si hay un evento, previene su comportamiento
        // Cancela el evento si este es cancelable
        if (e) e.preventDefault();
        // Navega a la pagina de trabajadores
        navigate("/perfil");
    };


    useQuery(
        ["trabajador", params.trabajadorId],
        () => {
            return LeerUsuarioTrabajador(params.trabajadorId);
        },
        {
            onSuccess: (data) => {
                formik.setValues({ ...formik.values, ...data.data });
                setAntPassword(data.data.password);
            },

            onError: (error) => {
                console.error(error);
                setMensajeError(MensajeError(error));
                setHayError(true);
            },
            enabled: params.trabajadorId !== "0",
        }
    );
    const actualizarUsuarioTrabajador = useMutation(
        (usuario) => {
            return ActualizarUsuarioTrabajador(usuario);
        },
        {
            onError: (error) => {
                console.error(error);
                setMensajeError(MensajeError(error));
                setHayError(true);
            },
        }
    );

    return (
        <>
            <MenuLateral>
                <form onSubmit={formik.handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={6} mt={4}>
                            <Typography variant="h6">
                                Editar Perfil <ManageAccountsIcon />
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={6} sx={{ textAlign: "right" }} mt={3}>
                            <Button color="success" variant="contained"
                                onClick={salirForm}>
                                Salir
                            </Button>
                            <Button
                                color="primary"
                                variant="contained"
                                type="submit"
                                sx={{ marginLeft: 2 }}
                            >
                                Aceptar
                            </Button>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                id="nombre"
                                name="nombre"
                                label="Nombre"
                                value={formik.values.nombre}
                                onChange={(formik.handleChange)}
                                error={formik.touched.nombre
                                    && Boolean(formik.errors.nombre)}
                                helperText={formik.touched.nombre
                                    && formik.errors.nombre}
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                id="apellido1"
                                name="apellido1"
                                label="Primer Apellido"
                                value={formik.values.apellido1}
                                onChange={formik.handleChange}
                                error={formik.touched.apellido1
                                    && Boolean(formik.errors.apellido1)}
                                helperText={formik.touched.apellido1
                                    && formik.errors.apellido1}
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                id="apellido2"
                                name="apellido2"
                                label="Segundo Apellido"
                                value={formik.values.apellido2}
                                onChange={formik.handleChange}
                                error={formik.touched.apellido2
                                    && Boolean(formik.errors.apellido2)}
                                helperText={formik.touched.apellido2
                                    && formik.errors.apellido2}
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                id="email"
                                name="email"
                                label="Email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                error={formik.touched.email
                                    && Boolean(formik.errors.email)}
                                helperText={formik.touched.email
                                    && formik.errors.email}
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                id="usuario"
                                name="usuario"
                                label="Nombre de usuario"
                                value={formik.values.usuario}
                                onChange={formik.handleChange}
                                error={formik.touched.usuario
                                    && Boolean(formik.errors.usuario)}
                                helperText={formik.touched.usuario
                                    && formik.errors.usuario}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography>Cambiar la contraseña: </Typography>
                        </Grid>

                        <Grid item xs={12} md={4}>
                            {/* source code for have eye icon toggle:
                            https://medium.com/@sumsourabh14/how-i-created-toggle-password-visibility-with-material-ui-b3fb975b5ce4
                             */}
                            <TextField
                                fullWidth
                                id="password"
                                name="password"
                                label="Contraseña nueva"
                                type={showPassword ? "text" : "password"}
                                onChange={formik.handleChange}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                                error={
                                    formik.touched.password
                                    && Boolean(formik.errors.password)
                                }
                                helperText={formik.touched.password
                                    && formik.errors.password}
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                id="confirmPassword"
                                name="confirmPassword"
                                label="Repita la contraseña nueva"
                                type={showPassword ? "text" : "password"}
                                onChange={formik.handleChange}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                                error={
                                    formik.touched.confirmPassword
                                    && Boolean(formik.errors.confirmPassword)
                                }
                                helperText={formik.touched.confirmPassword
                                    && formik.errors.confirmPassword}
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={6}></Grid>
                    <Grid item xs={12} sx={{ textAlign: "right", marginTop: 3 }}>
                        <Button color="success" variant="contained"
                            onClick={salirForm}>
                            Salir
                        </Button>
                        <Button
                            color="primary"
                            variant="contained"
                            type="submit"
                            sx={{ marginLeft: 2 }}
                        >
                            Aceptar
                        </Button>
                    </Grid>
                </form>
                <ErrorGeneral
                    hayError={hayError}
                    mensajeError={mensajeError}
                    cerrarError={() => setHayError(false)}
                />
                <MensajeInformativo
                    hayMensaje={hayMensaje}
                    mensaje={mensaje}
                    cerrarMensaje={() => setHayMensaje(false)}
                />
            </MenuLateral>
        </>
    );
};
