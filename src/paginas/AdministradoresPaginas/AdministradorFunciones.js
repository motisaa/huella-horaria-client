import * as yup from "yup";

export const initialValues = () => {
  return {
    adminId: 0,
    email: "",
    nombre: "",
    apellido1: "",
    apellido2: "",
    usuario: "",
    password: "",
    confirmPassword: "",
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

/*
More restrictions for password
https://code.pieces.app/blog/react-form-validation-formik-yup
matches(/(?=.*[a-z])(?=.*[A-Z])\w+/, "Password ahould contain at least one " +
 "uppercase and lowercase character")
      .matches(/\d/, "Password should contain at least one number")
      .matches(/[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/, "Password should " +
      "contain at least one special character")
*/