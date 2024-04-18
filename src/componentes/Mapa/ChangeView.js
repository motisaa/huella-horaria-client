/*
source: stackOverFlow
EN:
 this ChangeView component is used to change the view of the map 
 when new center coordinates and zoom level are provided. 
 It's useful when dynamically updating the map view in response to certain events,
  such as when an administrator changes latitude and longitude coordinates.
ES:
este componente ChangeView se utiliza para cambiar la vista del mapa
cuando se le proporcionan nuevas coordenadas de centro y nivel de zoom. 
Es útil cuando se necesita actualizar dinámicamente la vista del mapa en respuesta a ciertos eventos,
 como por ejemplo cuando un administrador cambia las coordenadas de latitud y longitud.
 */
import { useMap } from "react-leaflet";

export function ChangeView({ center, zoom }) {
    const map = useMap();
    map.setView(center, zoom);
    return null;
}