import axios from "axios";
import Entorno from "./Entorno";

export const LeerFichajes = () => {
  const ent = Entorno.getEnv();
  const url_base = ent.API_URL;
  const url = `${url_base}/v1/fichajes`;

  return axios.get(url, {
    headers: {
      'api-key': 'Nz&V*M_9,bfjS5-<L:K'
    }
  });
};
export const LeerFichajesTrabajador = (trabajadorId) => {
  const ent = Entorno.getEnv();
  const url_base = ent.API_URL;
  const url = `${url_base}/v1/fichajes/fichajes_trabajador/${trabajadorId}`;

  return axios.get(url, {
    headers: {
      'api-key': 'Nz&V*M_9,bfjS5-<L:K'
    }
  });
};
export const EliminarFichaje = (fichajeId) => {
  const ent = Entorno.getEnv();
  const url_base = ent.API_URL;
  const url = `${url_base}/v1/fichajes/${fichajeId}`;
  return axios.delete(url, {
    headers: {
      'api-key': 'Nz&V*M_9,bfjS5-<L:K'
    }
  });
};

export const CrearFichaje = (fichajeId) => {
  const ent = Entorno.getEnv();
  const url_base = ent.API_URL;
  const url = `${url_base}/v1/fichajes`;
  return axios.post(url, fichajeId, {
    headers: {
      'api-key': 'Nz&V*M_9,bfjS5-<L:K'
    }
  });
};

export const ActualizarFichaje = (fichaje) => {
  const ent = Entorno.getEnv();
  const url_base = ent.API_URL;
  const url = `${url_base}/v1/fichajes`;
  return axios.put(url, fichaje, {
    headers: {
      'api-key': 'Nz&V*M_9,bfjS5-<L:K'
    }
  });
};

export const LeerFichaje = (fichajeId) => {
  const ent = Entorno.getEnv();
  const url_base = ent.API_URL;
  const url = `${url_base}/v1/fichajes/${fichajeId}`;
  return axios.get(url, {
    headers: {
      'api-key': 'Nz&V*M_9,bfjS5-<L:K'
    }
  });
};