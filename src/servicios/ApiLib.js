import axios from 'axios'
import Entorno from './Entorno'

export const leerVersion = () => {
    const ent = Entorno.getEnv()
    const url_base = ent.API_URL
    const url = `${url_base}/v1/version`
    return axios.get(url)
}