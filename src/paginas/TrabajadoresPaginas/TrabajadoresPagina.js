import React, {
    //useContext,
     useState
  } from "react";
  import { useQuery } from "react-query";
  import { useNavigate } from "react-router-dom";
  import { MenuLateral } from "../../componentes/MenuLateral/MenuLateral";
  import { MensajeError } from "../../servicios/TratamientoErrores";
  import { ErrorGeneral } from "../../componentes/ErrorGeneral/ErrorGeneral";
  import { LeerUsuariosTrabajadores} from "../../servicios/RQTrabajadores";
  import AddIcon from "@mui/icons-material/Add";
  import {AppBar, Grid, IconButton, Toolbar, Tooltip, Typography,} from "@mui/material";
  import { MensajeInformativo } from "../../componentes/MensajeInformativo/MensajeInformativo";
  import { DataGrid, GridToolbar} from "@mui/x-data-grid";
  //import { GeneralCtx } from "../../contextos/GeneralContext";
  
  export const TrabajadoresPagina = () => {
      const navigate = useNavigate();
      const [hayError, setHayError] = useState(false);
      const [mensajeError, setMensajeError] = useState("");
      const [hayMensaje, setHayMensaje] = useState(false);
      const [mensaje,
          //setMensaje
      ] = useState("");
      const [usuariosTrabajador, setUsuariosTrabajador] = useState([]);
      //const { getSession } = useContext(GeneralCtx);

      const nuevoUsuarioTrabajador = () => {
        navigate(`/trabajador/0`);
      };
     
      //const session = getSession();
 
      const queryUsuariosAdmin = useQuery(
        "administradores",
        () => {
          return LeerUsuariosTrabajadores();
        },
        {
          onSuccess: (data) => {
            setUsuariosTrabajador(data.data);
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
        { field: "usuario", headerName: "username", flex: 0.4 },
        { field: "email", headerName: "email", flex: 1},
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
                    <Typography variant="h6" component="h6">
                      Trabajadores
                    </Typography>
                    <span className="toolbarButtons">
                      <IconButton
                        size="large"
                        aria-label="Nuevo usuario trabajador"
                        color="inherit"
                        onClick={nuevoUsuarioTrabajador}
                      >
                        <Tooltip title="Nuevo usuario trabajador">
                          <AddIcon />
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
                  components={{ Toolbar: GridToolbar }}
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
            
          </MenuLateral>
        </>
      );
    };