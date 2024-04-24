import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import { useMutation, useQuery } from "react-query";
import { initialValues, validationSchema } from "./GrupoFunciones";
import { useNavigate } from "react-router-dom";
import { MensajeError } from "../../servicios/TratamientoErrores";
import { ErrorGeneral } from "../../componentes/ErrorGeneral/ErrorGeneral";
import { MensajeInformativo } from "../../componentes/MensajeInformativo/MensajeInformativo";
import { Button, TextField, Typography, Grid, Autocomplete } from "@mui/material";
import { GeneralCtx } from "../../contextos/GeneralContext";
import { ActualizarGrupo, CrearGrupo, LeerGrupo } from "../../servicios/RQGrupos";
import { MenuLateral } from "../../componentes/MenuLateral/MenuLateral";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { esES } from '@mui/x-data-grid/locales';

export const GrupoPagina = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [hayError, setHayError] = useState(false);
  const [mensajeError, setMensajeError] = useState("");
  const [hayMensaje, setHayMensaje] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const { getSession } = useContext(GeneralCtx);

  const handleSubmit = async (values) => {
    delete values.trabajadores;
    if (!values.grupoId) {
      await crearGrupo.mutateAsync(values);
    } else {
      await actualizarGrupo.mutateAsync(values);
    }
    navigate("/grupos");
  };

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    onSubmit: handleSubmit,
  });

  const salirForm = (e) => {
    if (e) e.preventDefault();
    navigate("/grupos");
  };

  const actualizarGrupo = useMutation(
    (grupo) => {
      return ActualizarGrupo(grupo);
    },
    {
      onError: (error) => {
        console.error(error);
        setMensajeError(MensajeError(error));
        setHayError(true);
      },
    }
  );

  const crearGrupo = useMutation(
    (grupo) => {
      return CrearGrupo(grupo);
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
    ["grupos", params.grupoId],
    () => {
      return LeerGrupo(params.grupoId);
    },
    {
      onSuccess: (data, variables, context) => {
        formik.setValues({ ...formik.values, ...data.data });
      },
      onError: (error, variables, context) => {
        console.error(error);
        setMensajeError(MensajeError(error));
        setHayError(true);
      },
      enabled: params.grupoId !== "0",
    }
    );
  const columns = [
    { field: "trabajadorId", headerName: "ID", width: 50 },
    { field: "nombre", headerName: "Nombre", flex: 0.4 },
    { field: "apellido1", headerName: "Primer Apellido", flex: 0.4 },
    { field: "apellido2", headerName: "Segundo Apellido", flex: 0.4 },
    { field: "usuario", headerName: "usuario", flex: 0.4 },
    { field: "email", headerName: "email", flex: 1 },
  ];

  return (
    <>
      <MenuLateral>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={6}  mt={4}>
              <Typography variant="h6">Datos de Grupo:</Typography>
            </Grid>
            <Grid item xs={12} sx={{ textAlign: "right" }}  mt={2}>
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
            <Grid item xs={3}>
              <TextField
                fullWidth
                id="grupoId"
                name="grupoId"
                label="ID"
                disabled
                value={formik.values.grupoId}
                onChange={formik.handleChange}
                error={
                  formik.touched.grupoId &&
                  Boolean(formik.errors.grupoId)
                }
                helperText={
                  formik.touched.grupoId && formik.errors.grupoId
                }
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
            <Grid item xs={12} style={{ height: "80vh", width: "100%" }}>
              <DataGrid
                /* verificar si formik.values.trabajadores es undefined antes de asignarlo a rows. */
                rows={formik.values.trabajadores ? formik.values.trabajadores : []}
                columns={columns}
                getRowId={(row) => row.trabajadorId}
                slots={{ toolbar: GridToolbar }}
                localeText={esES.components.MuiDataGrid.defaultProps.localeText}
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