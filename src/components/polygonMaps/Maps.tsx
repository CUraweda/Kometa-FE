import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Polygon, useMap } from 'react-leaflet';
import { LatLngTuple } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import L from 'leaflet';
import 'leaflet-draw'; // Impor leaflet-draw

interface MapComponentProps {
  onPolygonChange: (coordinates: LatLngTuple[]) => void; // Callback function
}

const MapComponent: React.FC<MapComponentProps> = ({ onPolygonChange }) => {
  const [polygonCoordinates, setPolygonCoordinates] = useState<LatLngTuple[]>([]);
  const drawnItems = useRef<L.FeatureGroup>(new L.FeatureGroup()); // Inisialisasi langsung
  const map = useMap();

  useEffect(() => {
    if (map) {
      drawnItems.current.addTo(map);

      const drawControl = new (L.Control as any).Draw({
        edit: {
          featureGroup: drawnItems.current,
        },
        draw: {
          polygon: true,
          rectangle: false,
          circle: false,
          marker: false,
          polyline: false,
          circlemarker: false,
        },
      });

      map.addControl(drawControl);

      map.on((L as any).Draw.Event.CREATED, (e: any) => {
        const layer = e.layer;

        // Reset koordinat sebelum menambah polygon baru
        drawnItems.current.clearLayers();

        // Menambah layer baru ke peta
        drawnItems.current.addLayer(layer);

        if (layer instanceof L.Polygon) {
          const latlngs = (layer.getLatLngs()[0] as L.LatLng[]).map((latlng) => [latlng.lat, latlng.lng] as LatLngTuple);
          setPolygonCoordinates(latlngs); // Set koordinat polygon yang baru
          onPolygonChange(latlngs); // Kirim data koordinat ke parent
        }
      });

      map.on((L as any).Draw.Event.DELETED, () => {
        setPolygonCoordinates([]); // Hapus koordinat jika polygon dihapus
        onPolygonChange([]); // Kirim data kosong ke parent
      });

      return () => {
        map.off((L as any).Draw.Event.CREATED);
        map.off((L as any).Draw.Event.DELETED);
        map.removeControl(drawControl);
      };
    }
  }, [map, onPolygonChange]);

  return (
    <>
      {polygonCoordinates.length > 0 && (
        <Polygon positions={polygonCoordinates} color="green" weight={3} />
      )}
    </>
  );
};

const Map: React.FC<{ onPolygonChange: (coordinates: LatLngTuple[]) => void }> = ({ onPolygonChange }) => {
  return (
    <MapContainer center={[-6.200000, 106.816666]} zoom={15} style={{ height: '500px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapComponent onPolygonChange={onPolygonChange} />
    </MapContainer>
  );
};

export default Map;
