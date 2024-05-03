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
        longitud: yup.number().required("Requerido")
            .test('no-zero', "Por favor permite al navegador localizar su ubicación",
             value => value !== 0),
        latitud: yup.number().required("Requerido")
            .test('no-zero', "Por favor permite al navegador localizar su ubicación", 
            value => value !== 0)
      //  trabajadorId:  yup.number().required("Debe elegir un trabajador")
    });
};
