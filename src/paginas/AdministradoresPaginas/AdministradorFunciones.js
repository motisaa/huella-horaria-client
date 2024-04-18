import * as yup from "yup";

export const initialValues = () => {
  return {
    adminId: "",
    email: "",
    nombre: "",
    apellido1: "",
    apellido2: "",
    usuario: "",
    password: "",
    // we set de initial value with the id of only one existing company
    /* Pongo el valor 2 porque es la única empresa existente ahora
      En caso de de tener más empresas se pone el valor 0 
      y en la página de administrador página se usa empresas useState
    */
    empresaId: 2,
  };
};
/* This function defines the validation rules for the form fields using Yup.
 It returns a Yup schema object. In this case, it defines
 validation rules for the nombre, usuario, apellido1, password, and email fields */
export const validationSchema = () => {
  return yup.object({
      nombre: yup.string().required("Requerido"),
      apellido1: yup.string().required("Requerido"),
      usuario: yup.string().required("Requerido"),
      password: yup.string()
      .required("Requerido")
      .min(5, 'Por favor, elija una contraseña con al menos 5 caracteres'),
  });
};