import "leaflet/dist/leaflet.css";

import React, { useEffect } from "react";
import L from "leaflet";
import Pin from "../../assets/icon/iconMap.png";

const customIcon = new L.Icon({
  iconUrl: Pin,
  iconSize: [38, 38],
  iconAnchor: [19, 38],
  popupAnchor: [0, -38],
});

const locations = [
  { lat: -6.908151, lng: 107.626454, label: "Bandung 1" },
  { lat: -6.914744, lng: 107.60981, label: "Bandung 2" },
  { lat: -6.917464, lng: 107.619123, label: "Bandung 3" },
];

const CustomMap: React.FC = () => {
  useEffect(() => {
    const map = L.map("map").setView([locations[0].lat, locations[0].lng], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(
      map
    );

    locations.forEach((location) => {
      const marker = L.marker([location.lat, location.lng], {
        icon: customIcon,
      }).addTo(map);

      marker.on("click", () => {
        const mapsUrl = `https://www.google.com/maps?q=${location.lat},${location.lng}`;
        window.open(mapsUrl, "_blank");
      });
      L.marker([location.lat, location.lng], { icon: customIcon })
        .addTo(map)
        .bindPopup(location.label)
        .openPopup();
    });

    return () => {
      map.remove();
    };
  }, []);

  return <div id="map" style={{ height: "500px", width: "100%" }} />;
};

export default CustomMap;
