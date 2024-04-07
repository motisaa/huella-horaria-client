import * as yup from "yup";

export const initialValues = () => {
  return {
    trabajadorId: "",
    email: "",
    nombre: "",
    apellido1: "",
    apellido2: "",
    usuario: "",
    password: "",
    grupoId: "",
  };
};
/* This function defines the validation rules for the form fields using Yup.
 It returns a Yup schema object. In this case, it defines
 validation rules for the nombre, usuario, apellido1, usuario, password, 
 email and grupoId fields */
export const validationSchema = () => {
  return yup.object({
      nombre: yup.string().required("Requerido"),
      apellido1: yup.string().required("Requerido"),
      usuario: yup.string().required("Requerido"),
      password: yup.string().required("Requerido"),
      email: yup.string().required("Requerido"),
      grupoId: yup.string().required("Requerido"),
  });
};