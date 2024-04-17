import React, {
  useContext,
  useState
} from "react";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { MenuLateral } from "../../componentes/MenuLateral/MenuLateral";
import { MensajeError } from "../../servicios/TratamientoErrores";
import { ErrorGeneral } from "../../componentes/ErrorGeneral/ErrorGeneral";
import { LeerUsuariosTrabajadores, eliminarUsuarioTrabajador, LeerGrupoTrabajador } from "../../servicios/RQTrabajadores";
import AddIcon from "@mui/icons-material/Add";
import { AppBar, Grid, IconButton, Toolbar, Tooltip, Typography, } from "@mui/material";
import { MensajeInformativo } from "../../componentes/MensajeInformativo/MensajeInformativo";
import {
  DataGrid,
  //esES, 
  GridToolbar
} from "@mui/x-data-grid";
import { GeneralCtx } from "../../contextos/GeneralContext";
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

  const { getSession } = useContext(GeneralCtx);

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
        // se establece un mensaje de error utilizando la función MensajeError(error
        setMensajeError(MensajeError(error));
        setHayError(true);
      },
    }
  );
  const deleteUsuarioTrabajador = (row) => {
    return () => {
      setUsuarioTrabajador(row);
      setMensajeConfirmacion(
        `¿Realmente desea eliminar el trabajador ${row.nombre}?`
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
  // eslint-disable-next-line 
  const session = getSession();

  // eslint-disable-next-line no-unused-vars
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
                {/* <Typography variant="h6" component="h6">
                  Trabajadores
                </Typography> */}
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
              columns={columns}
              getRowId={(row) => row.trabajadorId}
              // localeText={esES.components.MuiDataGrid.defaultProps.localeText}
              // components={{ Toolbar: GridToolbar }} 
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