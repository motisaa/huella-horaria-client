import React, { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { MenuLateral } from "../../componentes/MenuLateral/MenuLateral";
import { MensajeError } from "../../servicios/TratamientoErrores";
import { ErrorGeneral } from "../../componentes/ErrorGeneral/ErrorGeneral";
import { LeerUsuariosTrabajadores, eliminarUsuarioTrabajador } from "../../servicios/RQTrabajadores";
import AddIcon from "@mui/icons-material/Add";
import { AppBar, Grid, IconButton, Toolbar, Tooltip, useMediaQuery } from "@mui/material";
import { MensajeInformativo } from "../../componentes/MensajeInformativo/MensajeInformativo";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { esES } from '@mui/x-data-grid/locales';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { MensajeConfirmacion } from "../../componentes/MensajeConfirmacion/MensajeConfirmacion";

export const TrabajadoresPagina = () => {
  const navigate = useNavigate();
  const [hayError, setHayError] = useState(false);
  const [mensajeError, setMensajeError] = useState("");
  const [hayMensaje, setHayMensaje] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [usuariosTrabajador, setUsuariosTrabajadores] = useState([]);
  const [usuarioTrabajador, setUsuarioTrabajador] = useState();
  const [mensajeConfirmacion, setMensajeConfirmacion] = useState("");
  const [hayConfirmacion, setHayConfirmacion] = useState(false);
  const mobileMediaQuery = useMediaQuery('(max-width: 37.5em)'); // 600px / 16px = 37.5em
  const tabletMediaQuery = useMediaQuery('(max-width: 64em)'); // 1024px / 16px  = 64em


  const nuevoUsuarioTrabajador = () => {
    navigate(`/trabajador/0`);
  };

  const editUsuarioTrabjador = (trabajadorId) => {
    return () => {
      navigate(`/trabajador/${trabajadorId}`);
    };
  };

  const eliminaUsuario = useMutation(({ trabajadorId }) => {
    return eliminarUsuarioTrabajador(trabajadorId);
  },
    {
      onError: (error) => {
        // si ocurre un error, se imprime en la consola (console.error(error)),
        console.error(error);
        // se establece un mensaje de error
        setMensajeError("No es posible eliminar a este trabajador debido a que tiene fichajes registrados");
        setHayError(true);
      },
    }
  );
  const deleteUsuarioTrabajador = (row) => {
    return () => {
      setUsuarioTrabajador(row);
      setMensajeConfirmacion(
        `¿Realmente desea eliminar el/la empleado/a ${row.nombre} ${row.apellido1}?`
      );
      setHayConfirmacion(true);
    };
  };

  const deleteConfirmado = async () => {
    await eliminaUsuario.mutateAsync({ trabajadorId: usuarioTrabajador.trabajadorId });
    queryUsuariosTrabajadores.refetch();
    setHayConfirmacion(false);
    setMensaje(
      `El trabajador ${usuarioTrabajador.nombre} ha sido eliminado de la base de datos`
    );
    setHayMensaje(true);
  };



  const queryUsuariosTrabajadores = useQuery(
    "trabajadores",
    () => {
      return LeerUsuariosTrabajadores();
    },
    {
      onSuccess: (data) => {
        setUsuariosTrabajadores(data.data);
      },
      onError: (error) => {
        console.error(error);
        setMensajeError(MensajeError(error));
        setHayError(true);
      },
    }
  );
  
  const columnsMobile = [
    { field: "nombre", headerName: "Nombre", flex: 0.5 },
    { field: "apellido1", headerName: "Apellido 1", flex: 0.4 },
    {
      field: "actions",
      type: "actions",
      headerName: "Acciones",
      flex: 0.3,
      getActions: ({ row }) => {
        return [
          <IconButton onClick={deleteUsuarioTrabajador(row)}>
            <DeleteIcon />
          </IconButton>,
          <IconButton onClick={editUsuarioTrabjador(row.trabajadorId)}>
            <EditIcon />
          </IconButton>,
        ];
      },
    },
  ]
   
  const columnsTablet = [
    { field: "nombre", headerName: "Nombre", flex: 0.5 },
    { field: "apellido1", headerName: "Apellido 1", flex: 0.4 },
    { field: "usuario", headerName: "Nombre de usuario", flex: 0.4 },
    {
      field: "actions",
      type: "actions",
      headerName: "Acciones",
      flex: 0.3,
      getActions: ({ row }) => {
        return [
          <IconButton onClick={deleteUsuarioTrabajador(row)}>
            <DeleteIcon />
          </IconButton>,
          <IconButton onClick={editUsuarioTrabjador(row.trabajadorId)}>
            <EditIcon />
          </IconButton>,
        ];
      },
    },
  ]
   //for bigger screens laptop or desktop
  const columns = [
    { field: "trabajadorId", headerName: "ID", width: 50 },
    { field: "nombre", headerName: "Nombre", flex: 0.5 },
    { field: "apellido1", headerName: "Primer Apellido", flex: 0.4 },
    { field: "apellido2", headerName: "Segundo Apellido", flex: 0.4 },
    { field: "usuario", headerName: "Nombre de usuario", flex: 0.4 },
    { field: "email", headerName: "Email", flex: 1 },
    // Fixed (now shows group name not groupId)
    { field: 'nombreGrupo', headerName: "Grupo", flex: 0.4 },
    {
      field: "actions",
      type: "actions",
      headerName: "Acciones",
      width: 80,
      getActions: ({ row }) => {
        return [
          <IconButton onClick={deleteUsuarioTrabajador(row)}>
            <DeleteIcon />
          </IconButton>,
          <IconButton onClick={editUsuarioTrabjador(row.trabajadorId)}>
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
            }} >
              <Toolbar>
                <span className="toolbarButtons">
                  <IconButton
                    size="large"
                    aria-label="Nuevo usuario trabajador"
                    color="inherit"
                    onClick={nuevoUsuarioTrabajador}
                  >
                    <Tooltip title="Nuevo usuario trabajador">
                      <span style={{ fontSize: "smaller" }}>Crear trabajador nuevo <AddIcon /></span>
                    </Tooltip>
                  </IconButton>
                </span>
              </Toolbar>
            </AppBar>
          </Grid>
          <Grid item xs={12} style={{ height: "80vh", width: "100%" }}>
            <DataGrid
              rows={usuariosTrabajador}
              columns={
                mobileMediaQuery ? columnsMobile :
                tabletMediaQuery ? columnsTablet :
                columns
              }
              getRowId={(row) => row.trabajadorId}
              localeText={esES.components.MuiDataGrid.defaultProps.localeText}
              slots={{ toolbar: GridToolbar }}
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