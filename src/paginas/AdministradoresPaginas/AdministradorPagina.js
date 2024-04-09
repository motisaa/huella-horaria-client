import React, {
  useContext,
  useState
} from "react";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import { useMutation, useQuery } from "react-query";
import { initialValues, validationSchema } from "./AdministradorFunciones";
import { useNavigate } from "react-router-dom";
import { GeneralCtx } from "../../contextos/GeneralContext";
import { MensajeError } from "../../servicios/TratamientoErrores";
import { ErrorGeneral } from "../../componentes/ErrorGeneral/ErrorGeneral";
import { MensajeInformativo } from "../../componentes/MensajeInformativo/MensajeInformativo";
import { Autocomplete, Button, TextField, Typography, Grid} from "@mui/material";
import { ActualizarUsuarioAdmin, CrearUsuarioAdmin, LeerUsuarioAdmin } from "../../servicios/RQAdministradores";
import { LeerEmpresas } from "../../servicios/RQEmpresas";
import { MenuLateral } from "../../componentes/MenuLateral/MenuLateral";

export const AdministradorPagina = () => {
  const params = useParams();
  const navigate = useNavigate();
 const { getSession } = useContext(GeneralCtx);
  const [hayError, setHayError] = useState(false);
  const [mensajeError, setMensajeError] = useState("");
  const [hayMensaje, setHayMensaje] = useState(false);
  const [mensaje, setMensaje ] = useState("");

  const [empresas, setEmpresas] = useState([]);
  let empresaSeleccionado = null;
  const getEmpresaIdValue = () => {
    empresaSeleccionado = empresas.find(
      (i) => i.empresaId === formik.values.empresaId
    );
    return empresaSeleccionado || null;
  };
  useQuery(
    "empresas",
    () => {
      return LeerEmpresas();
    },
    {
      onSuccess: (data) => {
        let opcionesEmpresas = data.data;
        setEmpresas(opcionesEmpresas);
      },
      onError: (error) => {
        console.error(error);
        setMensajeError(MensajeError(error));
        setHayError(true);
      },
    }
  );
  const session = getSession();
  const handleSubmit = async (values) => {
    if (!values.adminId) {
      await crearUsuarioAdmin.mutateAsync(values);
    } else {
      await actualizarUsuarioAdmin.mutateAsync(values);
    }
    navigate("/administradores");
  };

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
            <Grid item xs={6} sx={{ textAlign: "right" }}  mt={3}>
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
            <Grid item xs={1}>
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
            <Grid item xs={10} md={4}>
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
             <Grid item xs={3}>
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
                label="username"
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
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />
            </Grid>
            <Grid item xs={4}>
              <Autocomplete
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
                    label="Elija una empresa"
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