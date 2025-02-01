import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Polygon, useMap } from 'react-leaflet';
import { LatLngTuple, LatLngBounds } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import L from 'leaflet';
import 'leaflet-draw'; // Impor leaflet-draw

interface MapComponentProps {
  polygonCoordinates: LatLngTuple[]; // Terima koordinat dari parent
}

const MapComponent: React.FC<MapComponentProps> = ({ polygonCoordinates }) => {
  const map = useMap();

  useEffect(() => {
    if (map && polygonCoordinates.length > 0) {
      // Membuat LatLngBounds dari koordinat polygon
      const bounds = new LatLngBounds(polygonCoordinates);
      
      // Mengatur peta agar terfokus pada bounds (batas polygon)
      map.fitBounds(bounds);
    }
  }, [map, polygonCoordinates]); // Setiap kali polygonCoordinates berubah, peta akan disesuaikan

  return (
    <>
      {polygonCoordinates.length > 0 && (
        <Polygon positions={polygonCoordinates} color="green" weight={3} />
      )}
    </>
  );
};

const MapView: React.FC<{ polygonCoordinates: LatLngTuple[] }> = ({ polygonCoordinates }) => {
  return (
    <MapContainer center={[-6.200000, 106.816666]} zoom={15} style={{ height: '500px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapComponent polygonCoordinates={polygonCoordinates} />
    </MapContainer>
  );
};

export default MapView;
