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
        // con ayuda de ChatGPT
            .test('no-zero', "Para registrar el fichaje, es necesario que el navegador pueda acceder a su ubicación actual."
            + "Por favor, otorgue el permiso correspondiente",
             value => value !== 0),
               /* 
            Accept NaN
            .transform((value) => Number.isNaN(value) ? null : value )
            .nullable() */
        latitud: yup.number().required("Requerido")
            // con ayuda de ChatGPT
            .test('no-zero', "Para registrar el fichaje, es necesario que el navegador pueda acceder a su ubicación actual.  "
            +"Por favor, otorgue el permiso correspondiente", 
                value => value !== 0)
            /* 
            Accept NaN
            .transform((value) => Number.isNaN(value) ? null : value )
            .nullable() */
      //  trabajadorId:  yup.number().required("Debe elegir un trabajador")
    });
};
