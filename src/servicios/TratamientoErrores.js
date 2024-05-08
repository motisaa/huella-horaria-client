//esta función maneja los errores que pueden surgir 
//cuando se hacen solicitudes a través del protocolo HTTP
export const MensajeError = (err) => {
  let mens = "";
  if (err.response && err.response.data) {
    if (typeof err.response.data === "string") {
      mens += `${err.response.data}`;
    } else if (err.response.data.error) {
      mens += ` ${err.response.data.error}`;
    }
    else if (err.response.data.message) {
      mens += ` ${err.response.data.message}`;
    }
  }
  return mens;
};
