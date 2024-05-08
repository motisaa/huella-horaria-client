import axios from "axios";
import Entorno from "./Entorno";
import key from "../apikey.json"

export const LoginBasicoUsuario = (usuario, password) => {
    const ent = Entorno.getEnv();
    const url_base = ent.API_URL;
    const url = `${url_base}/v1/login`;
    const data = {
        usuario,
        password,
    };
    return axios.post(url, data, {
        headers: {
            'api-key': key["api-key"]
        }
    });
};