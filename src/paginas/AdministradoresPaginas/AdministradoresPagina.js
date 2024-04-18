import React, {
  useContext,
   useState
} from "react";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { MenuLateral } from "../../componentes/MenuLateral/MenuLateral";
import { MensajeError } from "../../servicios/TratamientoErrores";
import { ErrorGeneral } from "../../componentes/ErrorGeneral/ErrorGeneral";
import { GeneralCtx } from "../../contextos/GeneralContext";
import { LeerUsuariosAdmin, eliminarUsuarioAdmin } from "../../servicios/RQAdministradores";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import {AppBar, Grid, IconButton, Toolbar, Tooltip, Typography,} from "@mui/material";
import { MensajeConfirmacion } from "../../componentes/MensajeConfirmacion/MensajeConfirmacion";
import { MensajeInformativo } from "../../componentes/MensajeInformativo/MensajeInformativo";
import { DataGrid, GridToolbar} from "@mui/x-data-grid";


export const AdministradoresPagina = () => {
    const navigate = useNavigate();
    const [hayError, setHayError] = useState(false);
    const [mensajeError, setMensajeError] = useState("");
    const [hayMensaje, setHayMensaje] = useState(false);
    const [mensaje, setMensaje] = useState("");
    const [hayConfirmacion, setHayConfirmacion] = useState(false);
    const [mensajeConfirmacion, setMensajeConfirmacion] = useState("");
    const [usuariosAdmin, setUsuariosAdmin] = useState([]);
    const [usuarioAdmin, setUsuarioAdmin] = useState();
    const { getSession } = useContext(GeneralCtx);

    /* useQuery: Esta función toma tres argumentos:

          El primer argumento es identificador único para esta consulta.
          En este caso, es'administradores'.
          El segundo argumento es una función que realiza la consulta.
          En este caso, llama a una función LeerUsuariosAdmin */

        /* Este código define una consulta llamada queryUsuariosAdmin
          que llama a la función LeerUsuariosAdmin para obtener la lista de administradores.
          Si la consulta tiene éxito, los resultados se establecen usando setUsuariosAdmin.
          Si ocurre un error durante la consulta, se maneja mostrando
          un mensaje de error y estableciendo un indicador de error.
          */
    const queryUsuariosAdmin = useQuery(
      "administradores",
      () => {
        return LeerUsuariosAdmin();
      },
      {
        onSuccess: (data) => {
          setUsuariosAdmin(data.data);
        },
        onError: (error) => {
          console.error(error);
          setMensajeError(MensajeError(error));
          setHayError(true);
        },
      }
    );
    /* La función useMutation toma un argumentos:
      Una función que realiza la mutación. En este caso, la función recibe adminId y
      luego llama a otra función llamada eliminarUsuarioAdmin con este parámetro.

      Un objeto de opciones que puede tener diferentes propiedades, como onError,
      que se ejecuta cuando ocurre un error durante la mutación. En este caso,
       )
      */
    const eliminaUsuario = useMutation(({ adminId }) => {
        return eliminarUsuarioAdmin(adminId);
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
    // esta función newUsuarioAdmin se encarga de redirigir al usuario a la página
    //donde puede crear un nuevo usuario Administrador en la aplicación.
    const newUsuarioAdmin = () => {
      navigate(`/administrador/0`);
    };
    const editUsuarioAdmin = (adminId) => {
      return () => {
        navigate(`/administrador/${adminId}`);
      };
    };

    const deleteUsuarioAdmin = (row) => {
      return () => {
        setUsuarioAdmin(row);
        setMensajeConfirmacion(
          `¿Realmente desea eliminar el administrador ${row.nombre}?`
        );
        setHayConfirmacion(true);
      };
    };

    const deleteConfirmado = async () => {
      await eliminaUsuario.mutateAsync({ adminId: usuarioAdmin.adminId });
      queryUsuariosAdmin.refetch();
      setHayConfirmacion(false);
      setMensaje(
        `El administrador ${usuarioAdmin.nombre} ha sido eliminado de la base de datos`
      );
      setHayMensaje(true);
    };

    const columns = [
      { field: "adminId", headerName: "ID", width: 50 },
      { field: "nombre", headerName: "Nombre", flex: 0.5 },
      { field: "apellido1", headerName: "Primer Apellido", flex: 0.4 },
      { field: "apellido2", headerName: "Segundo Apellido", flex: 0.4 },
      { field: "usuario", headerName: "Nombre de Usuario", flex: 0.4 },
      { field: "email", headerName: "Email", flex: 1},
      {
        field: "actions",
        type: "actions",
        headerName: "Acciones",
        width: 80,
        getActions: ({ row }) => {
          return [
            <IconButton onClick={deleteUsuarioAdmin(row)}>
              <DeleteIcon />
            </IconButton>,
            <IconButton onClick={editUsuarioAdmin(row.adminId)}>
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
              <AppBar position="static" sx={{ bgcolor: '#ff7b00', marginTop: '1em' }} >
                <Toolbar>
                  {/* <Typography variant="h6" component="h6">
                    Administradores
                  </Typography> */}
                  <span className="toolbarButtons">
                    <IconButton
                      size="large"
                      aria-label="Nuevo usuario administrador"
                      color="inherit"
                      onClick={newUsuarioAdmin}
                    >
                      <Tooltip title="Nuevo usuario administrador">
                        <span style={{ fontSize: "smaller" }}>Crear administrador nuevo <AddIcon /></span>
                      </Tooltip>
                    </IconButton>
                  </span>
                </Toolbar>
              </AppBar>
            </Grid>
            <Grid item xs={12} style={{ height: "80vh", width: "100%" }}>
              <DataGrid
                rows={usuariosAdmin}
                columns={columns}
                getRowId={(row) => row.adminId}
                //components={{ Toolbar: GridToolbar }}
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