import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { GeneralCtx } from "../../contextos/GeneralContext";
import { MensajeError } from "../../servicios/TratamientoErrores";
import { ErrorGeneral } from "../../componentes/ErrorGeneral/ErrorGeneral";
import { MensajeInformativo } from "../../componentes/MensajeInformativo/MensajeInformativo";
import { Button, TextField, Typography, Grid, IconButton, InputAdornment } from "@mui/material";
import { ActualizarUsuarioTrabajador, LeerUsuarioTrabajador } from "../../servicios/RQTrabajadores";
import { MenuLateral } from "../../componentes/MenuLateral/MenuLateral";
import { initialValues, validationSchema } from "./PerfilFunciones";
import { Visibility, VisibilityOff } from "@mui/icons-material";



export const EditarPerfilPagina = () => {
    const params = useParams();
    const navigate = useNavigate();
    const { getSession } = useContext(GeneralCtx);
    const [hayError, setHayError] = useState(false);
    const [mensajeError, setMensajeError] = useState("");
    const [hayMensaje, setHayMensaje] = useState(false);
    const [mensaje, setMensaje] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (values) => {
        try {
            delete values.confirmPassword;
            await actualizarUsuarioTrabajador.mutateAsync(values);
            navigate("/perfil");
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
        // Si hay un evento, previene su comportamiento(Cancela el evento si este es cancelable)
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
                                Perfil:
                            </Typography>
                        </Grid>
                        <Grid item xs={6} sx={{ textAlign: "right" }} mt={3}>
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
                        <Grid item xs={10} md={4}>
                            <TextField
                                fullWidth
                                id="nombre"
                                name="nombre"
                                label="Nombre"
                                value={formik.values.nombre}
                                onChange={formik.handleChange}
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
                        <Grid item xs={3}>
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
                                label="Repite la contraseña nueva"
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
