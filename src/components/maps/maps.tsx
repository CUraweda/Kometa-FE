import "leaflet/dist/leaflet.css";
import React, { useEffect } from "react";
import L from "leaflet";

export interface Location {
  lat: number;
  lng: number;
 
}

interface CustomMapProps {
  locations: Location[];
  defaultZoom?: number;
  iconUrl?: string;
  id: string
}

const CustomMap: React.FC<CustomMapProps> = ({ locations, defaultZoom = 13, iconUrl , id}) => {
  useEffect(() => {
    const mapContainer = document.getElementById(id);

    // Pastikan elemen DOM tersedia sebelum inisialisasi
    if (!mapContainer) {
      console.error("Map container not found");
      return;
    }

    // Inisialisasi ikon kustom
    const customIcon = new L.Icon({
      iconUrl: iconUrl || "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
      iconSize: [38, 38],
      iconAnchor: [19, 38],
    });

    // Inisialisasi peta
    const mapInstance = L.map(mapContainer).setView(
      [locations[0].lat, locations[0].lng],
      defaultZoom
    );

    // Tambahkan tile layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(mapInstance);

    // Tambahkan marker untuk setiap lokasi
    locations.forEach((location) => {
      L.marker([location.lat, location.lng], { icon: customIcon }).addTo(mapInstance);
      
    });

    // Bersihkan peta saat komponen di-unmount
    return () => {
      mapInstance.remove();
    };
  }, [locations, defaultZoom, iconUrl]);

  return <div id={id} style={{ height: "500px", width: "100%" }} />;
};

export default CustomMap;
