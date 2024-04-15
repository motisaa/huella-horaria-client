//código totalmente de Ariadna SW
import React, { createContext } from 'react';

const GeneralCtx = createContext();

const GeneralContext = props => {

    const areCookiesEnabled = () => {
        var cookieEnabled = (navigator.cookieEnabled) ? true : false;
        if (typeof navigator.cookieEnabled === "undefined" && !cookieEnabled) {
            document.cookie = "testcookie";
            cookieEnabled = (document.cookie.indexOf("testcookie") !== -1) ? true : false;
        }
        return (cookieEnabled);
    }
    const setCookie = (c_name, value, exdays) => {
        if (!areCookiesEnabled()) {
            alert("NO COOKIES");
        }
        var exdate = new Date();
        exdate.setDate(exdate.getDate() + exdays);
        var c_value = encodeURI(value) + ((exdays === null) ? "" : "; expires=" + exdate.toUTCString());
        document.cookie = c_name + "=" + c_value;
    }
    const deleteCookie = (c_name) => {
        if (!areCookiesEnabled()) {
            alert("NO COOKIES");
        }
        document.cookie = c_name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }
    const getCookie = (c_name) => {
        var i, x, y, ARRcookies = document.cookie.split(";");
        for (i = 0; i < ARRcookies.length; i++) {
            x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
            y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
            x = x.replace(/^\s+|\s+$/g, "");
            if (x === c_name) {
                return decodeURI(y);
            }
        }
    }

    const setSession = (usuario) => {
        setCookie('huellaHorariaUsuario', JSON.stringify(usuario), 1);
    };

    const getSession = () => {
        let usuario = getCookie('huellaHorariaUsuario')
        if (usuario) { usuario = JSON.parse(usuario) } else { return null }
        let session = {
            usuario,
        }
        return session;
    };

    const setFiltros = (filtros) => {
        setCookie('filtros', JSON.stringify(filtros), 1);
    }

    const getFiltros = () => {
        let filtros = getCookie('filtros')
        if (filtros) filtros = JSON.parse(filtros)
        return filtros
    }

    const deleteSession = () => {
        deleteCookie('session');
    }

    return (
        <GeneralCtx.Provider value={{
            setSession,
            getSession,
            deleteSession,
            setFiltros,
            getFiltros
        }}>
            {props.children}
        </GeneralCtx.Provider>
    )
}

export { GeneralContext, GeneralCtx };