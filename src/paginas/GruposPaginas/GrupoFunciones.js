import * as yup from "yup";

export const initialValues = () => {
  return {
    grupoId: "",
    nombre: "",
    empresaId: "",
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