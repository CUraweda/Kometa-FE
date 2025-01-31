import React from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts/highmaps";
import indonesiaMap from "../../constant/data/id-all.json";

interface GeoMapsProps {
  data: [string, number][]; // Data harus dalam format [["id-jt", 3], ["id-jk", 5]]
}

const getMapOptions = (data: [string, number][]) => ({
  chart: {
    map: indonesiaMap,
  },
  title: {
    text: "Persebaran Wilayah",
  },
  subtitle: {
    text: "Anggota Kometa",
  },
  mapNavigation: {
    enabled: true,
    buttonOptions: {
      verticalAlign: "bottom",
    },
  },
  colorAxis: {
    min: 0,
    stops: [
      [0, "#E0F8E0"], // Warna untuk jumlah terendah
      [0.5, "#58D68D"], // Warna tengah
      [1, "#145A32"], // Warna untuk jumlah tertinggi
    ],
  },
  series: [
    {
      data,
      name: "Total Anggota",
      states: {
        hover: {
          color: "#15B392", // Warna saat hover
        },
      },
      dataLabels: {
        enabled: true,
        format: "{point.name}",
      },
    },
  ],
});

const GeoMaps: React.FC<GeoMapsProps> = ({ data }) => {
  return (
    <div>
      <HighchartsReact
        highcharts={Highcharts}
        constructorType={"mapChart"}
        options={getMapOptions(data)}
      />
    </div>
  );
};

// Default props jika tidak ada data
GeoMaps.defaultProps = {
  data: [],
};

export default GeoMaps;
