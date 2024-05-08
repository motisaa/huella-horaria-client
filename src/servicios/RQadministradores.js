import axios from "axios";
import Entorno from "./Entorno";

export const LeerUsuariosAdmin = () => {
    const ent = Entorno.getEnv();
    const url_base = ent.API_URL;
    const url = `${url_base}/v1/administradores`;
    return axios.get(url, {
        headers: {
            'api-key': 'gdYUQ4Muxhq*_Hk83ySml'
        }
    });
};
export const CrearUsuarioAdmin = (usuario) => {
    const ent = Entorno.getEnv();
    const url_base = ent.API_URL;
    const url = `${url_base}/v1/administradores`;
    return axios.post(url, usuario, {
        headers: {
            'api-key': 'gdYUQ4Muxhq*_Hk83ySml'
        }
    });
};

export const ActualizarUsuarioAdmin = (adminId) => {
    const ent = Entorno.getEnv();
    const url_base = ent.API_URL;
    const url = `${url_base}/v1/administradores`;
    return axios.put(url, adminId, {
        headers: {
            'api-key': 'gdYUQ4Muxhq*_Hk83ySml'
        }
    });
};

export const LeerUsuarioAdmin = (adminId) => {
    const ent = Entorno.getEnv();
    const url_base = ent.API_URL;
    const url = `${url_base}/v1/administradores/${adminId}`;
    return axios.get(url, {
        headers: {
            'api-key': 'gdYUQ4Muxhq*_Hk83ySml'
        }
    });
};

export const eliminarUsuarioAdmin = (adminId) => {
    const ent = Entorno.getEnv();
    const url_base = ent.API_URL;
    const url = `${url_base}/v1/administradores/${adminId}`;
    return axios.delete(url, {
        headers: {
            'api-key': 'gdYUQ4Muxhq*_Hk83ySml'
        }
    });
};