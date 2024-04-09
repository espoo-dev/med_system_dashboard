import React from 'react';
import Chart from "react-apexcharts";

export interface BarChartConfig {
  categories: string[] | number[],
  seriesData: number[]
}

interface Props {
  data: BarChartConfig;
  onDataUpdate: (newData: { categories: number[], seriesData: number[] }) => void;
}

export function BarChart({ data }: Props) {
  const options = {
    chart: {
      id: 'apexchart'
    },
    xaxis: {
      categories: data.categories
    }
  };

  const series = [
    {
      name: "Series 1",
      data: data.seriesData
    }
  ];

  return (
    <Chart options={options} series={series} type="bar" height={350} />
  );
}
