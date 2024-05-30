import * as yup from "yup";

export const initialValues = () => {
  return {
    grupoId: 0,
    nombre: "",
    // el valor es 2 porque es la única empresa que tenemos ahora
    // si hay más empresas el valor debe ser 0
    empresaId: 2,
  };
};
/* This function defines the validation rules for the form fields using Yup.
 It returns a Yup schema object. In this case, it defines 
 validation rules for the nombre field */
export const validationSchema = () => {
  return yup.object({
    nombre: yup.string().required("Requerido"),
  });
};