import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import { useMutation, useQuery } from "react-query";
import { initialValues, validationSchema } from "./AdministradorFunciones";
import { useNavigate } from "react-router-dom";
import { MensajeError } from "../../servicios/TratamientoErrores";
import { ErrorGeneral } from "../../componentes/ErrorGeneral/ErrorGeneral";
import { MensajeInformativo } from "../../componentes/MensajeInformativo/MensajeInformativo";
import {
 // Autocomplete,
  Button, TextField, Typography, Grid,
  InputAdornment,
  IconButton
} from "@mui/material";
import { ActualizarUsuarioAdmin, CrearUsuarioAdmin, LeerUsuarioAdmin, LeerUsuariosAdmin } from "../../servicios/RQAdministradores";
//import { LeerEmpresas } from "../../servicios/RQEmpresas";
import { MenuLateral } from "../../componentes/MenuLateral/MenuLateral";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export const AdministradorPagina = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [hayError, setHayError] = useState(false);
  const [mensajeError, setMensajeError] = useState("");
  const [hayMensaje, setHayMensaje] = useState(false);
  const [mensaje, setMensaje ] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };


  // const [empresas, setEmpresas] = useState([]);
  // let empresaSeleccionado = null;
  // const getEmpresaIdValue = () => {
  //   empresaSeleccionado = empresas.find(
  //     (i) => i.empresaId === formik.values.empresaId
  //   );
  //   return empresaSeleccionado || null;
  // };
  // useQuery(
  //   "empresas",
  //   () => {
  //     return LeerEmpresas();
  //   },
  //   {
  //     onSuccess: (data) => {
  //       let opcionesEmpresas = data.data;
  //       setEmpresas(opcionesEmpresas);
  //     },
  //     onError: (error) => {
  //       console.error(error);
  //       setMensajeError(MensajeError(error));
  //       setHayError(true);
  //     },
  //   }
  // );

  const [usernames, setUsernames] = useState([]);

  /* he sacado este useEffect con la ayuda de chatGPT
  This useEffect is set up to handle username input, using setTimeout and clearTimeout. 
  It's designed to manage when a user types a username that already exists, 
  so when user changes the username to the one that doesnt exist in base de datos, requires a cleanup of the previous timeout.
   So it will work fine as expected(user wil be created o editted).
  */
  useEffect(() => {
    // Inside this useEffect, a timer is set using setTimeout, delaying for 0.5 seconds.
    const timerId = setTimeout(async () => {
      try {
        const data = await LeerUsuariosAdmin();
        let usernames = data.data;
        setUsernames(usernames);
      } catch (error) {
        console.error(error);
        setMensajeError(MensajeError(error));
        setHayError(true);
      }
      // a timeout is set with a 0.5s delay.
    }, 500);

    return () => {
      // It clears the timer previously set by setTimeout to avoid memory leaks.
      clearTimeout(timerId);
    };
  }, []);

  const handleSubmit = async (values) => {
    try {
      // Exclude password field if it hasn't changed from default value
      if(!values.confirmPassword) delete values.password
      // Delete confirmation password field because does not exist in backend
      delete values.confirmPassword;
      let nombreUsuarioExistente = usernames.find( 
        (admin) => admin.usuario === values.usuario
        /* fixed: I added the next line to ensure that if we want to edit the admin
        profile without changing its username, we won't encounter the error
        stating that the username already exists. */
        //excluyendo el caso en que el nombre de usuario sea igual al nombre de usuario actual
          && admin.usuario !== formik.values.usuario
      );

      if (nombreUsuarioExistente) {
        setHayError(true);
        setMensajeError("El nombre de usuario ya existe. Por favor, elija otro.");
      } else {
        if (values.adminId) {
          await actualizarUsuarioAdmin.mutateAsync(values);
        } else {
          await crearUsuarioAdmin.mutateAsync(values);
        }
        navigate("/administradores");
      }
    } catch (error) {
      setHayError(true);
      setMensajeError("Error en la solicitud ");
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
            <Grid item xs={6}  mt={4}>
              <Typography variant="h6">Datos de administrador:</Typography>
            </Grid>
            <Grid item xs={12} md={6} sx={{ textAlign: "right", marginBottom: 2 }}  mt={2}>
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
            <Grid item xs={6} md={2}>
              <TextField
                fullWidth
                id="empresaId"
                name="empresaId"
                label="Empresa"
                value={"InnovaFutura"}
                defaultValue={formik.values.empresaId}
                disabled
                onChange={formik.handleChange}
                error={formik.touched.empresaId && Boolean(formik.errors.empresaId)}
                helperText={formik.touched.empresaId && formik.errors.empresaId}
              />
              {/* <Autocomplete
                label="Empresa"
                options={empresas}
                value={getEmpresaIdValue()}
                getOptionLabel={(option) => option.nombre}
                onChange={(e, value) => {
                  formik.setFieldValue("empresaId", value.empresaId);
                }}
                fullWidth
                id="empresaId"
                name="empresaId"
                renderInput={(params) => (
                  <TextField
                    {...params}

                    error={
                      formik.touched.empresaId &&
                      Boolean(formik.errors.empresaId)
                    }
                    helperText={
                      formik.touched.empresaId &&
                      formik.errors.empresaId
                    }
                  ></TextField>
                )}
              /> */}
            </Grid>
            <Grid item xs={12} md={4}>
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
                error={formik.touched.confirmPassword}
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