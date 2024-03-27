export const MensajeError = (err) => {
  console.log("Tratamiento de errores (error):", err);
  let mens = "";
  if (err.message) mens += `Error: ${err.message}`;
  if (err.response && err.response.data) {
    if (typeof err.response.data === "string") {
      mens += ` (${err.response.data})`;
    } else {
      mens += ` (${err.response.data.error})`;
    }
  }
  return mens;
};
