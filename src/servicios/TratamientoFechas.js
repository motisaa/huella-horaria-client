//Usamos metodos de libreria moment time zone
import moment from "moment-timezone";

export const FormatoFechaEs = (fechaMysql) => {
  if (!fechaMysql) return "";
  return moment(fechaMysql).tz("Europe/Madrid").format('DD/MM/YYYY HH:mm:ss');
  // const dateInUTC = moment.utc(fechaMysql);
  // const dateInLocal = dateInUTC.local('Europe/Madrid');
  // return dateInLocal.format('DD/MM/YYYY HH:mm:ss')
  // el siguiente codigo funciona bien en localhost pero no en la página web hosteada
  // const formatted = moment.utc(fechaMysql)
   //convertir a la zona horaria de España
  // .tz("Europe/Madrid")
  // //formateamos a la fecha española
  // .format("DD/MM/YYYY HH:mm:ss");
  // return formatted;
};

export const ConvertirAFechaEs = (fechaMysql) => {
  return moment.utc(fechaMysql).tz("Europe/Madrid").format()
  // const dateInUTC = moment.utc(fechaMysql);
  // const dateInLocal = dateInUTC.local('Europe/Madrid');
  // return dateInLocal.format()
};