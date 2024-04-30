import * as yup from "yup";

// Define initial form field values
export const initialValues = () => {
    return {
        fichajeId: 0,
        trabajadorId: null,
        fechaHora: "",
        longitud: 0,
        latitud: 0,
        tipo: "",
    };
};

// Define validation schema using Yup
export const validationSchema = () => {
    // Define validation rules for form fields
    return yup.object({
        tipo: yup.string().required("Requerido"),
      //  trabajadorId:  yup.number().required("Debe elegir un trabajador")
    });
};
