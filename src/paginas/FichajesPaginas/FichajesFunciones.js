import * as yup from "yup";

// Define initial form field values
export const initialValues = () => {
    return {
        fichajeId: "",
        trabajadorId: "",
        fechaHora: "",
        direccion: "",
        longitud: "",
        latitud: "",
        tipo: "",
    };
};

// Define validation schema using Yup
export const validationSchema = () => {
    // Define validation rules for form fields
    return yup.object({
        fechaHora: yup.string().required("Requerido"),
        longitud: yup.string().required("Requerido"),
        latitud: yup.string().required("Requerido"),
        tipo: yup.string().required("Requerido"),
    });
};
