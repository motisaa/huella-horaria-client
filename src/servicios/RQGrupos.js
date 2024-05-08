import axios from "axios";
import Entorno from "./Entorno";

export const LeerGrupos = () => {
  const ent = Entorno.getEnv();
  const url_base = ent.API_URL;
  const url = `${url_base}/v1/grupos_trabajadores`;

  return axios.get(url, {
    headers: {
      'api-key': 'gdYUQ4Muxhq*_Hk83ySml'
    }
  });
};
export const CrearGrupo = (grupoId) => {
  const ent = Entorno.getEnv();
  const url_base = ent.API_URL;
  const url = `${url_base}/v1/grupos_trabajadores`;
  return axios.post(url, grupoId, {
    headers: {
      'api-key': 'gdYUQ4Muxhq*_Hk83ySml'
    }
  });
};

export const ActualizarGrupo = (grupo) => {
  const ent = Entorno.getEnv();
  const url_base = ent.API_URL;
  const url = `${url_base}/v1/grupos_trabajadores`;
  return axios.put(url, grupo, {
    headers: {
      'api-key': 'gdYUQ4Muxhq*_Hk83ySml'
    }
  });
};

export const LeerGrupo = (grupoId) => {
  const ent = Entorno.getEnv();
  const url_base = ent.API_URL;
  const url = `${url_base}/v1/grupos_trabajadores/${grupoId}`;
  return axios.get(url, {
    headers: {
      'api-key': 'gdYUQ4Muxhq*_Hk83ySml'
    }
  });
};

export const EliminarGrupo = (grupoId) => {
  const ent = Entorno.getEnv();
  const url_base = ent.API_URL;
  const url = `${url_base}/v1/grupos_trabajadores/${grupoId}`;
  return axios.delete(url, {
    headers: {
      'api-key': 'gdYUQ4Muxhq*_Hk83ySml'
    }
  });
};