import React, { useState, useEffect, useContext } from "react";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { MenuLateral } from "../../componentes/MenuLateral/MenuLateral";
import { MensajeError } from "../../servicios/TratamientoErrores";
import { ErrorGeneral } from "../../componentes/ErrorGeneral/ErrorGeneral";
import { LeerFichajes, EliminarFichaje, LeerFichajesTrabajador } from "../../servicios/RQFichajes";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import {
    AppBar, Grid, IconButton, Toolbar, Tooltip, Typography,
} from "@mui/material";
import { MensajeConfirmacion } from "../../componentes/MensajeConfirmacion/MensajeConfirmacion";
import { MensajeInformativo } from "../../componentes/MensajeInformativo/MensajeInformativo";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { FormatoFechaEs } from "../../servicios/TratamientoFechas";
import { GeneralCtx } from "../../contextos/GeneralContext";
import { esES } from '@mui/x-data-grid/locales';
import useMediaQuery from '@mui/material/useMediaQuery';

export const FichajesPagina = () => {
    const navigate = useNavigate();
    const [hayError, setHayError] = useState(false);
    const [mensajeError, setMensajeError] = useState("");
    const [hayMensaje, setHayMensaje] = useState(false);
    const [mensaje, setMensaje] = useState("");
    const [hayConfirmacion, setHayConfirmacion] = useState(false);
    const [mensajeConfirmacion, setMensajeConfirmacion] = useState("");
    const [fichajes, setFichajes] = useState([]);
    const [fichaje, setFichaje] = useState();
    const [sesion, setSesion] = useState()
    const { getSession } = useContext(GeneralCtx);
    const mobileMediaQuery = useMediaQuery('(max-width: 37.5em)'); // 600px / 16px = 37.5em
    const tabletMediaQuery = useMediaQuery('(max-width: 64em)'); // 1024px / 16px  = 64em
    const [isAdmin, setIsAdmin] = useState(false)


    useEffect(() => {
        // Comprobación de que hay una sesión activa
        let session = getSession();
        if (!session) navigate("/");
        setSesion(session)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const queryFichajes = useQuery(
        "fichajes",
        async () => {
            try {
                let data;
                let session = getSession();
                if (session.usuario.tipo === 'ADMINISTRADOR') {
                    data = await LeerFichajes();
                    setIsAdmin(true);
                } else {
                    data = await LeerFichajesTrabajador(session.usuario.trabajadorId);
                    setIsAdmin(false);
                }
                return data;
            } catch (error) {
                throw error
            }
        },
        {
            onSuccess: (data) => {
                setFichajes(data.data);
            },
            onError: (error) => {
                console.error(error);
                setMensajeError(MensajeError(error));
                setHayError(true);
            },
        }
    );

    const eliminaFichaje = useMutation(
        ({ fichajeId }) => {
            return EliminarFichaje(fichajeId);
        },
        {
            onError: (error) => {
                // si ocurre un error, se imprime en la consola (console.error(error)),
                console.error(error);
                // se establece un mensaje de error utilizando la función MensajeError(error
                setMensajeError(MensajeError(error));
                setHayError(true);
            },
        }
    );

    const newFichaje = () => {
        navigate(`/fichaje/0`);
    };

    const editFichaje = (fichajeId) => {
        return () => {
            navigate(`/fichaje/${fichajeId}`);
        };
    };

    const deleteFichaje = (row) => {
        return () => {
            setFichaje(row);
            setMensajeConfirmacion(
                `¿Realmente desea eliminar el registro de ${row.tipo} de ${row.nombreTrabajador}?`
            );
            setHayConfirmacion(true);
        };
    };
    const deleteConfirmado = async () => {
        await eliminaFichaje.mutateAsync({ fichajeId: fichaje.fichajeId });
        queryFichajes.refetch();
        setHayConfirmacion(false);
        setMensaje(
            `El fichaje de ${fichaje.nombreTrabajador} ha sido eliminado de la base de datos`
        );
        setHayMensaje(true);
    };

    const columnsMobileTrabajador = [
        {
            field: "fechaHora", headerName: "Fecha y Hora", flex: 1,
            valueFormatter: params => FormatoFechaEs(params)
        },
        { field: "tipo", headerName: "Tipo", flex: 0.5 },
    ]

    const columnsMobileAdmin = [
        { field: "fichajeId", headerName: "ID", width: 50 },
        {
            field: "fechaHora", headerName: "Fecha y Hora", flex: 0.5,
            valueFormatter: params => FormatoFechaEs(params)
        },
        {
            field: "actions",
            type: "actions",
            headerName: "Acciones",
            flex: 0.3,
            getActions: ({ row }) => {
                return [
                    <IconButton onClick={deleteFichaje(row)}>
                        <DeleteIcon />
                    </IconButton>,
                    <IconButton onClick={editFichaje(row.fichajeId)}>
                        <EditIcon />
                    </IconButton>,
                ];
            },
        },
    ]
    const columnsTabletTrabajador = [
        {
            field: "fechaHora", headerName: "Fecha y Hora", flex: 1,
            valueFormatter: params => FormatoFechaEs(params)
        },
        { field: "tipo", headerName: "Tipo", flex: 0.5 },
        { field: "latitud", headerName: "Latitud", flex: 0.5 },
        { field: "longitud", headerName: "Longitud", flex: 0.5 },
    ]
    const columnsTabletAdmin = [

        { field: "nombreTrabajador", headerName: "Trabajador", flex: 1 },
        {
            field: "fechaHora", headerName: "Fecha y Hora", flex: 1,
            valueFormatter: params => FormatoFechaEs(params)
        },
        { field: "tipo", headerName: "Tipo", flex: 0.5 },
        {
            field: "actions",
            type: "actions",
            headerName: "Acciones",
            flex: 0.3,
            getActions: ({ row }) => {
                return [
                    <IconButton onClick={deleteFichaje(row)}>
                        <DeleteIcon />
                    </IconButton>,
                    <IconButton onClick={editFichaje(row.fichajeId)}>
                        <EditIcon />
                    </IconButton>,
                ];
            },
        },
    ]


    const columns = [
        { field: "fichajeId", headerName: "ID", width: 50 },
        { field: "nombreTrabajador", headerName: "Trabajador", flex: 1 },
        {
            field: "fechaHora", headerName: "Fecha y Hora", flex: 0.5,
            valueFormatter: params => FormatoFechaEs(params)
        },
        { field: "tipo", headerName: "Tipo", flex: 0.5 },
        { field: "latitud", headerName: "Latitud", flex: 0.5 },
        { field: "longitud", headerName: "Longitud", flex: 0.5 },
        {
            field: "actions",
            type: "actions",
            headerName: "Acciones",
            width: 80,
            getActions: ({ row }) => {
                return [
                    <IconButton onClick={deleteFichaje(row)}
                        disabled={sesion.usuario.tipo === 'TRABAJADOR'}>
                        <DeleteIcon />
                    </IconButton>,
                    <IconButton onClick={editFichaje(row.fichajeId)}
                        disabled={sesion.usuario.tipo === 'TRABAJADOR'}>
                        <EditIcon />
                    </IconButton>,
                ];
            },
        },
    ];

    return (
        <>
            <MenuLateral>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <AppBar position="static" sx={{
                            bgcolor: '#ff7b00',
                            marginTop: '1em'
                        }}>
                            <Toolbar>
                                <span className="toolbarButtons">
                                    <IconButton
                                        size="large"
                                        aria-label="Nuevo fichaje"
                                        color="inherit"
                                        onClick={newFichaje}
                                    >
                                        <Tooltip title="Nuevo fichaje">
                                            <span style={{ fontSize: "smaller" }}>Crear nuevo fichaje <AddIcon /></span>
                                        </Tooltip>
                                    </IconButton>
                                </span>
                            </Toolbar>
                        </AppBar>
                    </Grid>
                    <Grid item xs={12} style={{ height: "80vh", width: "100%" }}>
                        <DataGrid
                            rows={fichajes}
                            columns={
                                (mobileMediaQuery && isAdmin) ? columnsMobileAdmin :
                                (mobileMediaQuery && !isAdmin) ? columnsMobileTrabajador :
                                (tabletMediaQuery && isAdmin) ? columnsTabletAdmin:
                                (tabletMediaQuery && !isAdmin) ? columnsTabletTrabajador :
                                columns                                    
                            }
                            getRowId={(row) => row.fichajeId}
                            slots={{ toolbar: GridToolbar }}
                            localeText={esES.components.MuiDataGrid.defaultProps.localeText}
                        />

                    </Grid>
                </Grid>
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
                <MensajeConfirmacion
                    hayConfirmacion={hayConfirmacion}
                    mensaje={mensajeConfirmacion}
                    confirmar={deleteConfirmado}
                    cerrarConfirmacion={() => setHayConfirmacion(false)}
                />
            </MenuLateral>
        </>
    );
};
