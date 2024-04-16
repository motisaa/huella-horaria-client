import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import { useMutation, useQuery } from "react-query";
import { initialValues, validationSchema } from "./FichajesFunciones";
import { useNavigate } from "react-router-dom";
import { MensajeError } from "../../servicios/TratamientoErrores";
import { ErrorGeneral } from "../../componentes/ErrorGeneral/ErrorGeneral";
import { MensajeInformativo } from "../../componentes/MensajeInformativo/MensajeInformativo";
import { Button, TextField, Typography, Grid, Autocomplete } from "@mui/material";
import { GeneralCtx } from "../../contextos/GeneralContext";
import { ActualizarFichaje, CrearFichaje, LeerFichaje } from "../../servicios/RQFichajes";
import { MenuLateral } from "../../componentes/MenuLateral/MenuLateral";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import {LeerUsuariosTrabajadores } from "../../servicios/RQTrabajadores";
import "moment/locale/es";
import moment from "moment";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { ConvertirAFechaEs, FormatoFechaEs } from "../../servicios/TratamientoFechas";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export const FichajePagina = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [hayError, setHayError] = useState(false);
    const [mensajeError, setMensajeError] = useState("");
    const [hayMensaje, setHayMensaje] = useState(false);
    const [mensaje, setMensaje] = useState("");
    const { getSession } = useContext(GeneralCtx);
    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleSubmit = async (values) => {
        values.fechaHora = moment(selectedDate).format("YYYY-MM-DD HH:mm:ss");
        if (!values.fichajeId) {
            await crearFichaje.mutateAsync(values);
        } else {
            await actualizarFichaje.mutateAsync(values);
        }
        navigate("/fichajes");
    };

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchema(),
        onSubmit: handleSubmit,
    });

    const salirForm = (e) => {
        if (e) e.preventDefault();
        navigate("/fichajes");
    };

    const actualizarFichaje = useMutation(
        (fichaje) => {
            return ActualizarFichaje(fichaje);
        },
        {
            onError: (error) => {
                console.error(error);
                setMensajeError(MensajeError(error));
                setHayError(true);
            },
        }
    );

    const crearFichaje = useMutation(
        (fichaje) => {
            return CrearFichaje(fichaje);
        },
        {
            onError: (error) => {
                console.error(error);
                setMensajeError(MensajeError(error));
                setHayError(true);
            },
        }
    );

    useQuery(
        ["fichajes", params.fichajeId],
        () => {
            return LeerFichaje(params.fichajeId);
        },
        {
            onSuccess: (data) => {
                formik.setValues({ ...formik.values, ...data.data });
                setSelectedDate(ConvertirAFechaEs(data.data.fechaHora));
            },
            onError: (error, variables, context) => {
                console.error(error);
                setMensajeError(MensajeError(error));
                setHayError(true);
            },
            enabled: params.fichajeId !== "0",
        }
    );
    const [trabajadores, setTrabajadores] = useState([]);
    let trabajadorSeleccionado = null;
    let session = getSession();

    const getTrabajadorIdValue = () => {
        if (session.usuario.tipo === 'TRABAJADOR') {
            trabajadorSeleccionado = trabajadores.find(
                (i) => i.trabajadorId === session.usuario.trabajadorId
             
            );
        } else {
            trabajadorSeleccionado = trabajadores.find(
                (i) => i.trabajadorId === formik.values.trabajadorId
            );
        }

        return trabajadorSeleccionado || null;
    };



    useQuery(
        "trabajadores",
        async () => {
            try {
                let data = await LeerUsuariosTrabajadores();
                return data;
            } catch (error) {
                throw error
            }
        },
        {
            onSuccess: (data) => {
                let opcionesTrabajadores = data.data;
                setTrabajadores(opcionesTrabajadores);
            },
            onError: (error) => {
                console.error(error);
                setMensajeError(MensajeError(error));
                setHayError(true);
            },
        }
    );


    useEffect(() => {
        // let session = getSession()
        // if (session.usuario.tipo === 'TRABAJADOR') {
        //     formik.setValues('trabajadorId', session.usuario.trabajadorId)
        // }
        if (params.fichajeId === "0") {
            if ("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition(
                    function (position) {
                        formik.setFieldValue('latitud', position.coords.latitude);
                        formik.setFieldValue('longitud', position.coords.longitude);
                    },
                    function (error) {
                        console.error("Error getting geolocation: ", error.message);
                    },
                    {
                        enableHighAccuracy: true,
                        timeout: 5000,
                        /* If set to 0, it means that the device
                         cannot use a cached position and must attempt
                         to retrieve the real current position. */
                        maximumAge: 0
                    }
                );
            } else {
                console.log("Geolocation is not available in your browser.");
            }
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // // Para los tipos
    // const [tipos, setTipos] = useState(['ENTRADA', 'SALIDA']);
    // let tipoSeleccionado = null;
    // const getTipoValue = () => {
    //     tipoSeleccionado = tipos.find(
    //         (tipo) => tipo === formik.values.tipo
    //     );
    //     return tipoSeleccionado || null;
    // };

    return (
        <>
            <MenuLateral>
                <form onSubmit={formik.handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={6} mt={4}>
                            <Typography variant="h6">Datos de Fichaje:</Typography>
                        </Grid>
                        <Grid item xs={6} sx={{ textAlign: "right" }} mt={4}>
                            <Button color="success"
                                variant="contained" onClick={salirForm}>
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
                        <Grid item xs={2}>
                            <TextField
                                fullWidth
                                id="fichajeId"
                                name="fichajeId"
                                label="ID"
                                disabled
                                value={formik.values.fichajeId}
                                onChange={formik.handleChange}
                                error={
                                    formik.touched.fichajeId
                                    && Boolean(formik.errors.fichajeId)
                                }
                                helperText={
                                    formik.touched.fichajeId
                                    && formik.errors.fichajeId
                                }
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Autocomplete
                                label="Trabajador"
                                options={trabajadores}
                                value={getTrabajadorIdValue()}
                                disabled={session.usuario.tipo === 'TRABAJADOR'}
                                getOptionLabel={(option) => option.nombre + ' ' + option.apellido1 + ' ' +
                                    // si apellido2 es null o undefined, se muestra cadena vacia
                                    (option.apellido2 ?? "")}
                                onChange={(e, value) => {
                                    session.usuario.tipo === 'TRABAJADOR' 
                                    ? formik.setFieldValue("trabajadorId", session.usuario.trabajadorId)
                                    : formik.setFieldValue("trabajadorId", value.trabajadorId);
                                }}
                                fullWidth
                                id="trabajadorId"
                                name="trabajadorId"
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Elija un trabajador"
                                        error={
                                            formik.touched.trabajadorId &&
                                            Boolean(formik.errors.trabajadorId)
                                        }
                                        helperText={
                                            formik.touched.trabajadorId &&
                                            formik.errors.trabajadorId
                                        }
                                    ></TextField>
                                )}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <LocalizationProvider
                                dateAdapter={AdapterMoment}
                                adapterLocale="es-ES"
                            >
                                <DateTimePicker
                                    renderInput={(props) =>
                                        <TextField {...props} />}
                                    label="Fecha de fichaje"
                                    disabled={session.usuario.tipo === 'TRABAJADOR'}
                                    value={selectedDate}
                                    onChange={(newValue) => {
                                        setSelectedDate(newValue);
                                    }}
                                />
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={4}>
                            {/* <Autocomplete
                                label="Tipo"
                                options={tipos}
                                value={getTipoValue()}
                                getOptionLabel={(option) => option}
                                onChange={(e, value) => {
                                    formik.setFieldValue("tipo", value);
                                }}
                                fullWidth
                                id="tipo"
                                name="tipo"
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Elija un tipo"
                                        error={
                                            formik.touched.tipo &&
                                            Boolean(formik.errors.tipo)
                                        }
                                        helperText={
                                            formik.touched.tipo &&
                                            formik.errors.tipo
                                        }
                                    ></TextField>
                                )}
                            /> */}
                            <FormControl>
                                <FormLabel id="tipo">Elija el tipo</FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby="tipo"
                                    name="tipo"
                                    onChange={(e, value) => {
                                        formik.setFieldValue("tipo", value);
                                    }}
                                >
                                    <FormControlLabel value="ENTRADA"
                                        control={<Radio />} label="ENTRADA" />
                                    <FormControlLabel value="SALIDA"
                                        control={<Radio />} label="SALIDA" />
                                </RadioGroup>
                            </FormControl>

                        </Grid>
                        <Grid item xs={4}>

                            <TextField
                                fullWidth
                                id="latitud"
                                name="latitud"
                                label="Latitud"
                                value={formik.values.latitud}
                                onChange={formik.handleChange}
                                disabled={session.usuario.tipo === 'TRABAJADOR'}
                                error={formik.touched.latitud
                                    && Boolean(formik.errors.latitud)}
                                helperText={formik.touched.latitud
                                    && formik.errors.latitud}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                fullWidth
                                id="longitud"
                                name="longitud"
                                label="Longitud"
                                value={formik.values.longitud}
                                onChange={formik.handleChange}
                                disabled={session.usuario.tipo === 'TRABAJADOR'}
                                error={formik.touched.longitud
                                    && Boolean(formik.errors.longitud)}
                                helperText={formik.touched.longitud
                                    && formik.errors.longitud}
                            />
                        </Grid>
                        <Grid item xs={12}></Grid>
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
                    </Grid>
                </form>
                <Grid item xs={12}>
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
                </Grid>
            </MenuLateral>
        </>
    );
};