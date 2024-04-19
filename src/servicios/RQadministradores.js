import axios from "axios";
import Entorno from "./Entorno";

export const LeerUsuariosAdmin = () => {
    const ent = Entorno.getEnv();
    const url_base = ent.API_URL;
    const url = `${url_base}/v1/administradores`;

    return axios.get(url);
};
export const CrearUsuarioAdmin = (usuario) => {
    const ent = Entorno.getEnv();
    const url_base = ent.API_URL;
    const url = `${url_base}/v1/administradores`;
    return axios.post(url, usuario);
};

export const ActualizarUsuarioAdmin = (adminId) => {
    const ent = Entorno.getEnv();
    const url_base = ent.API_URL;
    const url = `${url_base}/v1/administradores`;
    return axios.put(url, adminId);
};

export const LeerUsuarioAdmin = (adminId) => {
    const ent = Entorno.getEnv();
    const url_base = ent.API_URL;
    const url = `${url_base}/v1/administradores/${adminId}`;
    return axios.get(url);
};

export const eliminarUsuarioAdmin = (adminId) => {
    const ent = Entorno.getEnv();
    const url_base = ent.API_URL;
    const url = `${url_base}/v1/administradores/${adminId}`;
    return axios.delete(url);
};