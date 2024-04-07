import axios from "axios";
import Entorno from "./Entorno";

export const LeerUsuariosTrabajadores = () => {
    const ent = Entorno.getEnv();
    const url_base = ent.API_URL;
    const url = `${url_base}/v1/trabajadores`;

    return axios.get(url);
};
export const CrearUsuarioTrabajador = (usuario) => {
    const ent = Entorno.getEnv();
    const url_base = ent.API_URL;
    const url = `${url_base}/v1/trabajadores`;
    return axios.post(url, usuario);
};
export const LeerUsuarioTrabajador = (id) => {
    const ent = Entorno.getEnv();
    const url_base = ent.API_URL;
    const url = `${url_base}/v1/administradores/${id}`;
    return axios.get(url);
};