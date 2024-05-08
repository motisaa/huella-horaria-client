import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { MensajeError } from "../../servicios/TratamientoErrores";
import { ErrorGeneral } from "../../componentes/ErrorGeneral/ErrorGeneral";
import { MensajeInformativo } from "../../componentes/MensajeInformativo/MensajeInformativo";
import { Button, TextField, Typography, Grid, Autocomplete, InputAdornment, IconButton } from "@mui/material";
import { ActualizarUsuarioTrabajador, CrearUsuarioTrabajador, LeerUsuarioTrabajador}
    from "../../servicios/RQTrabajadores";
import { MenuLateral } from "../../componentes/MenuLateral/MenuLateral";
import { initialValues, validationSchema } from "./TrabajadoresFunciones";
import { LeerGrupos } from "../../servicios/RQGrupos";
import { Visibility, VisibilityOff } from "@mui/icons-material";


export const TrabajadorPagina = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [hayError, setHayError] = useState(false);
    const [mensajeError, setMensajeError] = useState("");
    const [hayMensaje, setHayMensaje] = useState(false);
    const [mensaje, setMensaje] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [antPassword, setAntPassword] = useState()
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const [grupos, setGrupos] = useState([]);
    let grupoSeleccionado = null;
    const getGrupoIdValue = () => {
        grupoSeleccionado = grupos.find(
            (i) => i.grupoId === formik.values.grupoId
        );
        return grupoSeleccionado || null;
    };
    useQuery(
        "grupos",
        () => {
            return LeerGrupos();
        },
        {
            onSuccess: (data) => {
                let opcionesGrupos = data.data;
                setGrupos(opcionesGrupos);
            },
            onError: (error) => {
                console.error(error);
                setMensajeError(MensajeError(error));
                setHayError(true);
            },
        }
    );

    const handleSubmit = async (values) => {
        // we save the value of confirmPass in another variable,
        // so we can recuperate it after deleting its value
        let confirmPassword2 = values.confirmPassword
        try {
            // Crear un nuevo usuario
            if (!values.trabajadorId) {
                // Verificar si se está creando un nuevo usuario y las contraseñas no son iguales
                if (values.confirmPassword !== values.password) {
                    setHayError(true);
                    setMensajeError("Las contraseñas deben coincidir.");
                    return;
                } else {
                    // Eliminar campo de confirmación para enviar al backend
                    delete values.confirmPassword;
                    await crearUsuarioTrabajador.mutateAsync(values);
                    // Navegar solo si no hay errores
                    navigate("/trabajadores");
                }
            } else {
                // Actualizar un usuario existente
                /* Verificar si se está actualizando la contraseña de un usuario
                     Si la contraseña actual no es igual que la contraseña anterior */
                if (values.password !== antPassword) {
                    if (values.confirmPassword !== values.password) {
                        setHayError(true);
                        setMensajeError("Las contraseñas deben coincidir.");
                        return;
                    }
                    setHayMensaje(true);
                    setMensaje('La contraseña ha cambiado con éxito');
                }
                // Eliminar campo de confirmación para enviar al backend
                // because this confirmPass does not exits in Mysql
                delete values.confirmPassword;
                await actualizarUsuarioTrabajador.mutateAsync(values);
                // Navegar solo si no hay errores
                navigate("/trabajadores");
            }
        } catch (error) {
            /*fixed: if there is any error in edit and create, we recuperate
             deleted confirmPassword field, so we can resend it to backEnd without
             having error: Las contraseñas deben coincidir. Because of deleting
             confirmPassword, before creating and editing its value
             becomes undefined */
            formik.setFieldValue('confirmPassword',confirmPassword2)
            setHayError(true);
            setMensajeError(MensajeError(error));
        }
    }

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
        navigate("/trabajadores");
    };

    const crearUsuarioTrabajador = useMutation(
        // Función de mutación que define la lógica para crear un usuario trabajador
        (usuario) => {
            return CrearUsuarioTrabajador(usuario);
        },
        {
            // Configuración adicional para el manejo de errores
            onError: (error) => {
                // Si hay un error durante la mutación
                console.error(error);
                setMensajeError(MensajeError(error));
                setHayError(true);
            },
        }
    );


    useQuery(
        ["trabajador", params.trabajadorId],
        () => {
            return LeerUsuarioTrabajador(params.trabajadorId);
        },
        {
            onSuccess: (data) => {
                formik.setValues({ ...formik.values, ...data.data });
                setAntPassword(data.data.password)
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
                                Datos de Trabajador:
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sx={{ textAlign: "right" }}>
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
                        <Grid item xs={3} md={1}>
                            <TextField
                                fullWidth
                                id="trabajadorId"
                                name="trabajadorId"
                                label="ID"
                                disabled
                                value={formik.values.trabajadorId}
                                onChange={formik.handleChange}
                                error={
                                    formik.touched.trabajadorId
                                    && Boolean(formik.errors.trabajadorId)
                                }
                                helperText={formik.touched.trabajadorId
                                    && formik.errors.trabajadorId}
                            />
                        </Grid>
                        <Grid item xs={9} md={3}>
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
                        <Grid item xs={12} md={3}>
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
                        <Grid item xs={12} md={3}>
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
                            <Autocomplete
                                label="Grupo"
                                options={grupos}
                                value={getGrupoIdValue()}
                                getOptionLabel={(option) => option.nombre}
                                onChange={(e, value) => {
                                    formik.setFieldValue("grupoId", value.grupoId);
                                }}
                                // fixed: clear button(x) desaperece cuando ya está elegido un grupo
                                disableClearable={formik.values.grupoId !== null} 
                                fullWidth
                                id="grupoId"
                                name="grupoId"
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Elija un grupo"
                                        error={
                                            formik.touched.grupoId &&
                                            Boolean(formik.errors.grupoId)
                                        }
                                        helperText={
                                            formik.touched.grupoId &&
                                            formik.errors.grupoId
                                        }
                                    ></TextField>
                                )}
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
                        <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                id="password"
                                name="password"
                                label="Contraseña"
                                type={showPassword ? "text" : "password"}
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
                                onChange={formik.handleChange}
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
                                label="Repita la contraseña"
                                type={showPassword ? "text" : "password"}
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
                                onChange={formik.handleChange}
                                error={
                                    formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)
                                }
                                helperText={formik.touched.confirmPassword &&
                                    formik.errors.confirmPassword}
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
