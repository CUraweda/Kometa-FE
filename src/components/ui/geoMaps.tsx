import React from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts/highmaps";
import indonesiaMap from "../../constant/data/id-all.json";

const GeoMaps: React.FC = () => {
    
    const Options = {
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
            [0, "#E0F8E0"], 
            [0.5, "#58D68D"], 
            [1, "#145A32"], 
          ],
        },
        series: [
          {
            data: [
              ["id-ac", 1],
              ["id-jk", 2],
              ["id-jr", 3],
              ["id-jt", 4],
              ["id-be", 5],
              ["id-yo", 6],
            ],
            name: "Total Anggota",
            states: {
              hover: {
                color: "#15B392", 
              },
            },
            dataLabels: {
              enabled: true,
              format: "{point.name}",
            },
          },
        ],
      };
      
  

  return (
    <div>
      <HighchartsReact
        highcharts={Highcharts}
        constructorType={"mapChart"}
        options={Options}
      />
    </div>
  );
};

export default GeoMaps;
