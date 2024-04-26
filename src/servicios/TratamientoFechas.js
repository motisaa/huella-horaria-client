//codigo de empresa

import moment from "moment-timezone";

export const FormatoFechaEs = (fechaMysql) => {
  if (!fechaMysql) return "";
  const dateInUTC = moment.utc(fechaMysql);
  const dateInLocal = moment(dateInUTC).tz("Europe/Madrid").format();
  let formatted = moment(dateInLocal).format("DD/MM/YYYY HH:mm:ss");

  return formatted;
};

export const ConvertirAFechaEs = (fechaMysql) => {
  return moment(fechaMysql).tz("Europe/Madrid").format();
};