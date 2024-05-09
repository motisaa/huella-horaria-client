import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import { useMutation, useQuery } from "react-query";
import { initialValues, validationSchema } from "./AdministradorFunciones";
import { useNavigate } from "react-router-dom";
import { MensajeError } from "../../servicios/TratamientoErrores";
import { ErrorGeneral } from "../../componentes/ErrorGeneral/ErrorGeneral";
import { MensajeInformativo } from "../../componentes/MensajeInformativo/MensajeInformativo";
import { Button, TextField, Typography, Grid, InputAdornment, IconButton } from "@mui/material";
import { ActualizarUsuarioAdmin, CrearUsuarioAdmin, LeerUsuarioAdmin } from "../../servicios/RQAdministradores";
//import { LeerEmpresas } from "../../servicios/RQEmpresas";
import { MenuLateral } from "../../componentes/MenuLateral/MenuLateral";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export const AdministradorPagina = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [hayError, setHayError] = useState(false);
  const [mensajeError, setMensajeError] = useState("");
  const [hayMensaje, setHayMensaje] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [antPassword, setAntPassword] = useState()
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

 

  const handleSubmit = async (values) => {
    // we save the value of confirmPass in another variable,
    // so we can recuperate it after deleting its value
    let confirmPassword2 = values.confirmPassword 
    try {
        // significa que queremos actualizar un usuario, ya tiene su id
        if (values.adminId) {
          // Validación de contraseñas al editar un usuario
          /*
          Si la contraseña ingresada no coincide con la de actual
          Significa que el usuario quiere cambiar la contraseña
          */
          if (values.password !== antPassword) {
            // si las contraseñas no son iguales(pass y confirm pass)
            if (values.confirmPassword !== values.password) {
              setHayError(true);
              setMensajeError("Las contraseñas deben coincidir.");
              return;
            }
            setHayMensaje(true);
            setMensaje('La contraseña ha cambiado con exito');
          }
          delete values.confirmPassword;
          await actualizarUsuarioAdmin.mutateAsync(values);
          // Navigate only if there are no errors
          navigate("/administradores");
        } else {
          // si no tine id significa que queremos crear un usuario admin
          /*  Validación de contraseñas al crear un nuevo usuario.
             Si la contraseña y su confirmación no coinciden  */
          if (values.confirmPassword !== values.password) {
            setHayError(true);
            setMensajeError("Las contraseñas deben coincidir.");
            return;
          } else {
            // Eliminar campo de confirmPassword anted de enviar al backend
            delete values.confirmPassword;
            await crearUsuarioAdmin.mutateAsync(values);
            // Navegar solo si no hay errores
            navigate("/administradores");
          }
        }
    } catch (error) {
      /*fixed: if there is any error in edit and create, we recuperate
             deleted confirmPassword field, so we can resend it to backEnd without
             having error: Las contraseñas deben coincidir. Because of deleting
             confirmPassword, before creating and editing its value
             becomes undefined */
      formik.setFieldValue('confirmPassword', confirmPassword2)
      setHayError(true);
      setMensajeError(MensajeError(error));
    }
  }


  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    onSubmit: handleSubmit,
  });

  const salirForm = (e) => {
    if (e) e.preventDefault();
    navigate("/administradores");
  };

  const actualizarUsuarioAdmin = useMutation(
    (admin) => {
      return ActualizarUsuarioAdmin(admin);
    },
    {
      onError: (error) => {
        console.error(error);
        setMensajeError(MensajeError(error));
        setHayError(true);
      },
    }
  );

  const crearUsuarioAdmin = useMutation(
    (usuario) => {
      return CrearUsuarioAdmin(usuario);
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
    ["administrador", params.adminId],
    () => {
      return LeerUsuarioAdmin(params.adminId);
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
      enabled: params.adminId !== "0",
    }
  );

  return (
    <>
      <MenuLateral>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={6} mt={4}>
              <Typography variant="h6">Datos de administrador:</Typography>
            </Grid>
            <Grid item xs={12} md={6} sx={{ textAlign: "right", marginBottom: 2 }} mt={2}>
              <Button color="success" variant="contained" onClick={salirForm}>
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
            <Grid item xs={3} md={2}>
              <TextField
                fullWidth
                id="adminId"
                name="adminId"
                label="ID"
                disabled
                value={formik.values.adminId}
                onChange={formik.handleChange}
                error={
                  formik.touched.adminId && Boolean(formik.errors.adminId)
                }
                helperText={formik.touched.adminId && formik.errors.adminId}
              />
            </Grid>
            <Grid item xs={9} md={4}>
              <TextField
                fullWidth
                id="nombre"
                name="nombre"
                label="Nombre"
                value={formik.values.nombre}
                onChange={formik.handleChange}
                error={formik.touched.nombre && Boolean(formik.errors.nombre)}
                helperText={formik.touched.nombre && formik.errors.nombre}
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
                error={formik.touched.apellido1 && Boolean(formik.errors.apellido1)}
                helperText={formik.touched.apellido1 && formik.errors.apellido1}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                id="apellido2"
                name="apellido2"
                label="Segundo Apellido"
                value={formik.values.apellido2}
                onChange={formik.handleChange}
                error={formik.touched.apellido2 && Boolean(formik.errors.apellido2)}
                helperText={formik.touched.apellido2 && formik.errors.apellido2}
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
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
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
                error={formik.touched.usuario && Boolean(formik.errors.usuario)}
                helperText={formik.touched.usuario && formik.errors.usuario}
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
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
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
            <Grid item xs={12} md={6}></Grid>
            <Grid item xs={12} sx={{ textAlign: "right" }}>
              <Button color="success" variant="contained" onClick={salirForm}>
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