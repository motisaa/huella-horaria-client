// source code from: https://www.youtube.com/watch?v=jD6813wGdBA , 
// https://codesandbox.io/p/sandbox/react-leaflet-with-marker-cluster-8kb8b0?file=%2Fsrc%2Fstyles.css
import "./styles.css";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { ChangeView } from "./ChangeView"
import { Icon, divIcon, point } from "leaflet";


// create custom icon
const customIcon = new Icon({
    // iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
    iconUrl: require("../../images/placeholder.png"),
    iconSize: [38, 38] // size of the icon
});

// custom cluster icon
const createClusterCustomIcon = function (cluster) {
    return new divIcon({
        html: `<span class="cluster-icon">${cluster.getChildCount()}</span>`,
        className: "custom-marker-cluster",
        iconSize: point(33, 33, true)
    });
};

export const Mapa = (props) => {
    
    return (
        <MapContainer center={[props.lat, props.lon]} zoom={15}>
            <ChangeView center={[props.lat, props.lon]} zoom={15} /> 
            {/* OPEN STREEN MAPS TILES */}
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MarkerClusterGroup
                chunkedLoading
                iconCreateFunction={createClusterCustomIcon}
            >
                {/* Mapping through the markers */}
                
                <Marker position={[props.lat, props.lon]} icon={customIcon}>
                </Marker>
                
            </MarkerClusterGroup>
            {/* Displaying accuracy */}
             <p className="accuracy-tooltip">{props.accuracy}</p>
        </MapContainer>
        
    );
}
