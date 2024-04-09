import axios from "axios";
import Entorno from "./Entorno";

export const LeerFichajes = () => {
    const ent = Entorno.getEnv();
    const url_base = ent.API_URL;
    const url = `${url_base}/v1/fichajes`;

    return axios.get(url);
};
export const EliminarFichaje = (fichajeId) => {
    const ent = Entorno.getEnv();
    const url_base = ent.API_URL;
    const url = `${url_base}/v1/fichajes/${fichajeId}`;
    return axios.delete(url);
};

export const CrearFichaje = (fichajeId) => {
    const ent = Entorno.getEnv();
    const url_base = ent.API_URL;
    const url = `${url_base}/v1/fichajes`;
    return axios.post(url, fichajeId);
};

  export const ActualizarFichaje = (fichaje) => {
    const ent = Entorno.getEnv();
    const url_base = ent.API_URL;
    const url = `${url_base}/v1/fichajes`;
    return axios.put(url, fichaje);
  };
  
  export const LeerFichaje = (fichajeId) => {
    const ent = Entorno.getEnv();
    const url_base = ent.API_URL;
    const url = `${url_base}/v1/fichajes/${fichajeId}`;
    return axios.get(url);
  };