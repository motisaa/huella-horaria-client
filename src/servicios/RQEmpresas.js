import axios from "axios";
import Entorno from "./Entorno";

export const LeerEmpresas = () => {
  const ent = Entorno.getEnv();
  const url_base = ent.API_URL;
  const url = `${url_base}/v1/empresas`;

  return axios.get(url);
};
export const CrearEmpresa = (empersa) => {
  const ent = Entorno.getEnv();
  const url_base = ent.API_URL;
  const url = `${url_base}/v1/empresas`;
  return axios.post(url, empersa);
};

export const ActualizarEmpresa = (empresa) => {
  const ent = Entorno.getEnv();
  const url_base = ent.API_URL;
  const url = `${url_base}/v1/empresas`;
  return axios.put(url, empresa);
};

export const LeerEmpresa = (empresaId) => {
  const ent = Entorno.getEnv();
  const url_base = ent.API_URL;
  const url = `${url_base}/v1/empresas/${empresaId}`;
  return axios.get(url);
};

export const EliminarGrupo = (empresaId) => {
  const ent = Entorno.getEnv();
  const url_base = ent.API_URL;
  const url = `${url_base}/v1/empresas/${empresaId}`;
  return axios.delete(url);
};