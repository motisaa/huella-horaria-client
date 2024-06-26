import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import { useMutation, useQuery } from "react-query";
import { initialValues, validationSchema } from "./FichajesFunciones";
import { useNavigate } from "react-router-dom";
import { MensajeError } from "../../servicios/TratamientoErrores";
import { ErrorGeneral } from "../../componentes/ErrorGeneral/ErrorGeneral";
import { MensajeInformativo } from "../../componentes/MensajeInformativo/MensajeInformativo";
import { Button, TextField, Typography, Grid, Autocomplete, InputAdornment } from "@mui/material";
import { GeneralCtx } from "../../contextos/GeneralContext";
import { ActualizarFichaje, CrearFichaje, GetServerDate, LeerFichaje } from "../../servicios/RQFichajes";
import { MenuLateral } from "../../componentes/MenuLateral/MenuLateral";
import { LeerUsuariosTrabajadores } from "../../servicios/RQTrabajadores";
import "moment/locale/es";
import moment from "moment";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { ConvertirAFechaEs } from "../../servicios/TratamientoFechas";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormHelperText from '@mui/material/FormHelperText';
import { Mapa } from "../../componentes/Mapa/Mapa";
//import { MensajeAviso } from "../../componentes/MensajeAviso/MensajeAviso";
import momentTZ from "moment-timezone"
import PersonSearchIcon from '@mui/icons-material/PersonSearch';

export const FichajePagina = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [hayError, setHayError] = useState(false);
    const [mensajeError, setMensajeError] = useState("");
    const [hayMensaje, setHayMensaje] = useState(false);
    const [mensaje, setMensaje] = useState("");
    const { getSession } = useContext(GeneralCtx);
    const [selectedDate, setSelectedDate] = useState('2001-01-01 22:00:00');
    const [isAdmin, setIsAdmin] = useState(false);
    const [latitud, setLatitud] = useState(0)
    const [longitud, setLongitud] = useState(0)
    // const [noGeo, setNoGeo] = useState(false)
    const [tipoAnt, setTipoAnt] = useState('');
    const [accuracy, setAccuracy] = useState(0);
    const handleSubmit = async (values) => {
        //guardamos la fecha y hora en formato utc en la base de datos
        values.fechaHora = moment(selectedDate).utc().format("YYYY-MM-DD HH:mm:ss");
        if (!selectedDate) {
            setHayError(true);
            setMensajeError("Por favor, elija la fecha y hora");
            return;
        }
        // Si el usuario es un trabajador, asignar su ID al fichaje
        if (session.usuario.tipo === 'TRABAJADOR') {
            values.trabajadorId = session.usuario.trabajadorId;
        }
        if (!values.trabajadorId) {
            setHayError(true);
            setMensajeError("Por favor, elija un trabajador");
            return;
        }
        if (!values.fichajeId) {
            await crearFichaje.mutateAsync(values);
        } else {
            /* Si el usuario no es un administrador y está tratando de cambiar
              el tipo de fichaje, mostrar un error */
            if (!isAdmin && values.tipo !== tipoAnt) {
                setHayError(true);
                setMensajeError('No se puede cambiar el tipo de fichaje');
                return;
            }
            // Si el usuario es un administrador, actualiza el fichaje existente
            if (isAdmin) await actualizarFichaje.mutateAsync(values);
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
            let session = getSession();
            if (session.usuario.tipo === 'ADMINISTRADOR') {
                setIsAdmin(true);
            } else {
                setIsAdmin(false);
            }
            return LeerFichaje(params.fichajeId);
        },
        {
            onSuccess: (data) => {
                formik.setValues({ ...formik.values, ...data.data });
                setSelectedDate(ConvertirAFechaEs(data.data.fechaHora));
                setLatitud(data.data.latitud)
                setLongitud(data.data.longitud)
                setTipoAnt(data.data.tipo)
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
                // data.data es la respuesta de API y es Array de objetos
                /* fix ChatGPT for this this error: 0 is read-only
                This copy can be modified without affecting the original array, thus avoiding the "read-only property" error.
                */
               /* It is because sort() sorts the array in place and data.data is read-only we need to create a copy of it. */
                let opcionesTrabajadores = [...data.data]; // Create a shallow copy of the array
                opcionesTrabajadores.sort((a, b) => a.nombre.localeCompare(b.nombre));
                setTrabajadores(opcionesTrabajadores);
            },
            onError: (error) => {
                console.error(error);
                setMensajeError(MensajeError(error));
                setHayError(true);
            },
        }
    );

    const AsignarFechaServidor = async () => {
        try {
            let serverDate = await GetServerDate()
            let localTime = momentTZ(serverDate).tz("Europe/Madrid")
            setSelectedDate(localTime);
            console.log('Fecha sistema', serverDate, localTime)
        } catch (error) {
            console.error("Error: " + error);
        }

    }


    useEffect(() => {
        /* 
        Asignamos la fecha del servidor, que está en UTC, pero la mostramos en la hora local de España
         para que el usuario vea la fecha y la hora correctas al fichar.
         Luego, en handle submit de formulario guardamos la fecha y hora en UTC.
        */
        AsignarFechaServidor()

        //Uso de geolocalización de navegador
        //las funciones de geolocalization son de MDN: https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition
        if (params.fichajeId === "0") {
            if ("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition(
                    function (position) {
                        // instance properties: https://developer.mozilla.org/en-US/docs/Web/API/GeolocationCoordinates
                        formik.setFieldValue('latitud', position.coords.latitude);
                        formik.setFieldValue('longitud', position.coords.longitude);
                        setLatitud(position.coords.latitude)
                        setLongitud(position.coords.longitude)
                        /* MDN:
                        A positive double representing the accuracy, with a 
                        95% confidence level, of the GeolocationCoordinates.latitude 
                        and GeolocationCoordinates.longitude properties expressed 
                        in meters.
                        */
                        setAccuracy(position.coords.accuracy)
                    },
                    function (error) {
                        console.error("Error getting geolocation: ", error.message);
                        setHayError(true);
                        // setNoGeo(true)
                        setMensajeError("No se pudo encontrar la localización. " +
                            "Por favor, intente refrescar la página o habilite " +
                            "la ubicación en la configuración de su navegador");
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
                setHayError(true);
                //  setNoGeo(true)
                setMensajeError("No se pudo encontrar su ubicación. Por favor, actualice su navegador");
            }
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Para los tipos
    const [tipos, setTipos] = useState(['ENTRADA', 'SALIDA']);
    let tipoSeleccionado = null;
    const getTipoValue = () => {
        tipoSeleccionado = tipos.find(
            (tipo) => tipo === formik.values.tipo
        );
        return tipoSeleccionado || null;
    };

    return (
        <>
            <MenuLateral>
                {/* {((!latitud && !longitud) && !noGeo) ? <MensajeAviso/> : ''}  */}
                <form onSubmit={formik.handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={6} mt={3}>
                            <Typography variant="h6">Datos de Fichaje:</Typography>
                        </Grid>

                        <Grid item xs={12} md={6} sx={{
                            textAlign: "right",
                            marginBottom: 2
                        }} mt={4}>
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


                        <Grid item xs={3} md={3}>
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
                        <Grid item xs={9} md={4}>
                            <Autocomplete
                                label="Trabajador"
                                options={trabajadores}
                                value={getTrabajadorIdValue()}
                                disabled={session.usuario.tipo === 'TRABAJADOR'}
                                getOptionLabel={(option) => option.nombre + ' ' + option.apellido1 + ' ' +
                                    // si apellido2 es null o undefined, se muestra cadena vacia
                                    (option.apellido2 ?? "")}
                                onChange={(e, value) => {
                                    formik.setFieldValue("trabajadorId", value.trabajadorId);
                                }}
                                fullWidth
                                id="trabajadorId"
                                name="trabajadorId"
                                // fixed: clear button(x) desaperece cuando se elige un trabajador
                                disableClearable={formik.values.trabajadorId !== null}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        // Add search icon
                                        InputProps={{
                                            ...params.InputProps,
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <PersonSearchIcon />
                                                </InputAdornment>
                                            )
                                        }}
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
                        <Grid item xs={12} md={4}>
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
                        <Grid item xs={10} md={3}>
                            {/* Desplegable */}
                            {/*
                            <Autocomplete
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
                            {/* Radio button */}
                            <FormControl>
                                <FormLabel id="tipo">Elija el tipo</FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby="tipo"
                                    name="tipo"
                                    id="tipo"
                                    value={getTipoValue()}
                                    onChange={(e, value) => {
                                        formik.setFieldValue("tipo", value);
                                    }}
                                >
                                    <FormControlLabel value="ENTRADA"
                                        control={<Radio />} label="ENTRADA" />
                                    <FormControlLabel value="SALIDA"
                                        control={<Radio />} label="SALIDA" />
                                </RadioGroup>
                                {formik.errors.tipo && formik.touched.tipo && (
                                    <FormHelperText error>{formik.errors.tipo}</FormHelperText>
                                )}
                            </FormControl>

                        </Grid>
                        <Grid item xs={12} md={4}>

                            <TextField
                                fullWidth
                                id="latitud"
                                name="latitud"
                                label="Latitud"
                                value={formik.values.latitud}
                                onChange={(event) => {
                                    const value = event.target.value;
                                    if (!isNaN(value)) {
                                        formik.setFieldValue('latitud', value);
                                        setLatitud(value);
                                    } else {
                                        // Manejo del error si el valor no es un número
                                        setHayError(true);
                                        setMensajeError("El valor de latitud debe ser un número. No debe contener caracteres o símbolos.");
                                    }
                                }}

                                disabled={session.usuario.tipo === 'TRABAJADOR'}
                                error={formik.touched.latitud
                                    && Boolean(formik.errors.latitud)}
                                helperText={formik.touched.latitud
                                    && formik.errors.latitud}
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                id="longitud"
                                name="longitud"
                                label="Longitud"
                                value={formik.values.longitud}
                                onChange={(event) => {
                                    const value = event.target.value;
                                    if (!isNaN(value)) {
                                        formik.setFieldValue('longitud', value);
                                        setLongitud(value);
                                    } else {
                                        // Manejo del error si el valor no es un número
                                        setHayError(true);
                                        setMensajeError("El valor de longitud debe ser un número. No debe contener caracteres o símbolos");
                                    }
                                }}

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
                {
                    latitud && longitud ?
                        <Mapa
                            lat={latitud}
                            lon={longitud}
                            accuracy={
                                /* si no hay accuracy no muestra nada
                                 en el caso que usuario está editando 
                                 un fichaje, le sale acurracy 0. En este caso
                                 no lo mostramos */
                                !accuracy ? ''
                                    :
                                    (accuracy >= 1000)
                                        ? 'Precisión: ' + (accuracy / 1000).toFixed(2) + ' km'
                                        : 'Precisión: ' + accuracy.toFixed(2) + ' m'}

                        >

                        </Mapa>
                        :
                        ''
                }
            </MenuLateral>
        </>
    );
};