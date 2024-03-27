const Entorno = {
    getEnv: () => {
        let API_URL = process.env.NODE_ENV === 'development' ? "http://localhost:8080" : window.API_URL;
        API_URL = API_URL || ''
        return {
            API_URL
        }
        // REACT_APP_API_URL
    }
}
export default Entorno