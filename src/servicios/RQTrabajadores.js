import axios from "axios";
import Entorno from "./Entorno";

export const LeerUsuariosTrabajadores = () => {
    const ent = Entorno.getEnv();
    const url_base = ent.API_URL;
    const url = `${url_base}/v1/trabajadores`;

    return axios.get(url, {
        headers: {
            'api-key': 'Nz&V*M_9,bfjS5-<L:K'
        }
    });
};
export const CrearUsuarioTrabajador = (usuario) => {
    const ent = Entorno.getEnv();
    const url_base = ent.API_URL;
    const url = `${url_base}/v1/trabajadores`;
    return axios.post(url, usuario, {
        headers: {
            'api-key': 'Nz&V*M_9,bfjS5-<L:K'
        }
    });
};
export const LeerUsuarioTrabajador = (trabajadorId) => {
    const ent = Entorno.getEnv();
    const url_base = ent.API_URL;
    const url = `${url_base}/v1/trabajadores/${trabajadorId}`;
    return axios.get(url, {
        headers: {
            'api-key': 'Nz&V*M_9,bfjS5-<L:K'
        }
    });
};
export const LeerGrupoTrabajador = (trabajadorId) => {
    const ent = Entorno.getEnv();
    const url_base = ent.API_URL;
    const url = `${url_base}/v1/trabajadores/${trabajadorId}/grupo`;
    return axios.get(url, {
        headers: {
            'api-key': 'Nz&V*M_9,bfjS5-<L:K'
        }
    });
};
export const ActualizarUsuarioTrabajador = (trabajadorId) => {
    const ent = Entorno.getEnv();
    const url_base = ent.API_URL;
    const url = `${url_base}/v1/trabajadores`;
    return axios.put(url, trabajadorId, {
        headers: {
            'api-key': 'Nz&V*M_9,bfjS5-<L:K'
        }
    });
};
export const eliminarUsuarioTrabajador = (trabajadorId) => {
    const ent = Entorno.getEnv();
    const url_base = ent.API_URL;
    const url = `${url_base}/v1/trabajadores/${trabajadorId}`;
    return axios.delete(url, {
        headers: {
            'api-key': 'Nz&V*M_9,bfjS5-<L:K'
        }
    });
};