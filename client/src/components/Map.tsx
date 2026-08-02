import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import type { Place } from "../types";

interface Props {
  places: Place[];
}

function Map({ places }: Props) {
  return (
    <MapContainer
      center={[45.5017, -73.5673]}
      zoom={11}
      style={{ height: "370px", width: "100%" }}
    >
      <TileLayer
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />

      {places.map((place, index) => (
        <Marker
          key={index}
          position={[place.latitude, place.longitude]}
        >
          <Popup>
            <b>{place.title}</b>
            <br />
            {place.arrondissement}
            <br />
            {place.first_date}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default Map;
