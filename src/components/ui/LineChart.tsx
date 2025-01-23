import React from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

const LineChart: React.FC = () => {
  const options: ApexOptions = {
    chart: {
      type: "line",
      toolbar: {
        show: false,
      },
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    xaxis: {
      categories: ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"],
    },
    yaxis: {
      labels: {
        formatter: (value: number) => `${value}`,
      },
      max: 100,
    },
    tooltip: {
      shared: true,
      intersect: false,
    },
    markers: {
      size: 4,
    },
    colors: ["#0D8E74", "#1E3A8A"], // Warna garis
    grid: {
      strokeDashArray: 5,
    },
  };

  const series = [
    {
      name: "Pemilik Lahan",
      data: [30, 40, 50, 60, 70, 80, 90],
    },
    {
      name: "Tidak Memiliki Lahan",
      data: [20, 30, 25, 40, 50, 60, 75],
    },
  ];

  return <Chart options={options} series={series} type="line" height={350} />;
};

export default LineChart;
