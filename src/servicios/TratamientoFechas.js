//codigo de empresa

import moment from "moment-timezone";

export const FormatoFechaEs = (fechaMysql) => {
  if (!fechaMysql) return "";
  const dateInUTC = moment.utc(fechaMysql);
  const dateInLocal = dateInUTC.local("Europe/Madrid");
  let fr = moment(fechaMysql).format("DD/MM/YYYY HH:mm:ss");
  // return dateInLocal.format("DD/MM/YYYY HH:mm:ss");
  return fr;
};

export const FormatoFechaCortaEs = (fechaMysql) => {
  if (!fechaMysql) return "";
  const dateInUTC = moment.utc(fechaMysql);
  const dateInLocal = dateInUTC.local("Europe/Madrid");
  return dateInLocal.format("DD/MM/YYYY");
};

export const FormatoHoraCortaEs = (fechaMysql) => {
  if (!fechaMysql) return "";
  const dateInUTC = moment.utc(fechaMysql, "HH:mm:ss");
  const dateInLocal = dateInUTC.local("Europe/Madrid");
  return dateInLocal.format("HH:mm");
};

export const ConvertirAFechaEs = (fechaMysql) => {
  //   const dateInUTC = moment.utc(fechaMysql);
  //   const dateInLocal = dateInUTC.local("Europe/Madrid");
  //   return dateInLocal.format();
  return fechaMysql;
};

export const FechaContinuaISO = (fechaMysql) => {
  const dateInUTC = moment.utc(fechaMysql);
  const dateInLocal = dateInUTC.local("Europe/Madrid");
  return dateInLocal.format("YYYYMMDDHHmmss");
};

export const FechaLocalES = () => {
  const dateInUTC = moment.utc();
  const dateInLocal = dateInUTC.local("Europe/Madrid");
  return dateInLocal;
};