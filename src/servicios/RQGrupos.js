import axios from "axios";
import Entorno from "./Entorno";

export const LeerGrupos = () => {
  const ent = Entorno.getEnv();
  const url_base = ent.API_URL;
  const url = `${url_base}/v1/grupos_trabajadores`;

  return axios.get(url);
};