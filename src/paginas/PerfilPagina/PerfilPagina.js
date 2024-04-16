import React, { useContext, useState, useEffect } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { MenuLateral } from "../../componentes/MenuLateral/MenuLateral";
import { MensajeError } from "../../servicios/TratamientoErrores";
import { LeerUsuarioTrabajador } from "../../servicios/RQTrabajadores";
import { AppBar, Grid, IconButton, Toolbar, Typography } from "@mui/material";
import { GeneralCtx } from "../../contextos/GeneralContext";
import Button from '@mui/material/Button';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export const PerfilPagina = () => {
  const navigate = useNavigate();
  const [hayError, setHayError] = useState(false);
  const [mensajeError, setMensajeError] = useState("");
  const [usuarioTrabajador, setUsuarioTrabajador] = useState();
  const { getSession } = useContext(GeneralCtx);

  useEffect(() => {
    const queryTrabajador = async () => {
      try {
        let session = getSession();
          let trabajadorID = session.usuario.trabajadorId;
        const data = await LeerUsuarioTrabajador(trabajadorID);
        setUsuarioTrabajador(data.data);
        console.log(usuarioTrabajador);
      } catch (error) {
        console.error(error);
        setMensajeError(MensajeError(error));
        setHayError(true);
      }
    };
    queryTrabajador();
  }, []);

  const editUsuarioTrabajador = (trabajadorId) => {
    return () => {
      navigate(`/perfil/${trabajadorId}`);
    };
  };


  return (
    <>
      <MenuLateral>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <AppBar
              position="static"
              sx={{
                bgcolor: "#ff7b00",
                marginTop: "1em",
              }}
            >
              <Toolbar>
                <Typography variant="h6" component="h6">
                  Perfil <AccountCircleIcon></AccountCircleIcon>
                </Typography>
              </Toolbar>
            </AppBar>
          </Grid>
            <Grid item xs={12}>
            {/* Conditionally render user information if available */}
            {usuarioTrabajador && (
              <div>
                              <p> <strong>Nombre: </strong>
                                  {usuarioTrabajador.nombre}</p>
                              <p> <strong>Primer Apellido: </strong>
                                  {usuarioTrabajador.apellido1}</p>
                              <p> <strong>Segundo Apellido:</strong>
                                  {usuarioTrabajador.apellido2}</p>
                              <p> <strong>Nombre de usuario: </strong>
                                  {usuarioTrabajador.usuario}</p>
                              <p> <strong>Email: </strong>
                                  {usuarioTrabajador.email}</p>
              </div>
            )}
          </Grid>
                  
                  <Button variant="contained" sx={{ marginLeft: "3rem" }}
                      onClick={() =>
                          editUsuarioTrabajador(usuarioTrabajador.trabajadorId)}>
                      Editar
                  </Button>
        </Grid>
      </MenuLateral>
    </>
  );
};
