import React from "react";
import L from "leaflet";
import {
  MapContainer,
  TileLayer,
  Marker,
  Circle,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

interface Position {
  lat: number;
  lng: number;
}

interface MapComponentProps {
  position: Position;
  setPosition: (position: Position) => void;
  radius?: number; // Opsional, jika Anda ingin menampilkan lingkaran radius
  markerIconUrl?: string; // Opsional, untuk mengganti ikon marker
}

// Perbaikan default Leaflet marker icon agar ikon tampil dengan benar
const DefaultIcon = L.icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

// Komponen untuk menangani klik peta
const MapClickHandler: React.FC<{ onMapClick: (position: Position) => void }> = ({ onMapClick }) => {
  useMapEvents({
    click(e: L.LeafletMouseEvent) {
      onMapClick({ lat: e.latlng.lat, lng: e.latlng.lng });
    },
  });
  return null;
};

const MapComponent: React.FC<MapComponentProps> = ({
  position,
  setPosition,
  radius = 0,
  markerIconUrl,
}) => {
  const customIcon = markerIconUrl
    ? new L.Icon({
        iconUrl: markerIconUrl,
        iconSize: [50, 50],
        iconAnchor: [25, 48],
      })
    : DefaultIcon;

  return (
    <div className="mb-1">
      <MapContainer
        center={[position.lat, position.lng]}
        zoom={13}
        style={{ height: "40vh", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <MapClickHandler onMapClick={setPosition} />
        <Marker
          position={[position.lat, position.lng]}
          icon={customIcon}
          draggable={true}
          eventHandlers={{
            dragend: (e) => {
              const marker = e.target as L.Marker;
              const newPosition = marker.getLatLng();
              setPosition({ lat: newPosition.lat, lng: newPosition.lng });
            },
          }}
        />
        {radius > 0 && (
          <Circle center={[position.lat, position.lng]} radius={radius} />
        )}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
