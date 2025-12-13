import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function MapView({ lat, lon, name }) {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">Map</h2>

      <MapContainer
        center={[lat, lon]}
        zoom={6}
        className="h-96 w-full rounded"
      >
        <TileLayer
          attribution="© OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={[lat, lon]}>
          <Popup>{name}</Popup>
        </Marker>
      </MapContainer>
    </section>
  );
}
