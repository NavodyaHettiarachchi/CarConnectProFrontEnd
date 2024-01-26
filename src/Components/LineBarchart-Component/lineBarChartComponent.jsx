import React from 'react';
import ReactApexChart from 'react-apexcharts';
import '../../css/common.css';

const ChartComponent = ({ chartOptions, chartData, chartType }) => {
  
  const formatDataToSeries = (dataSets) => {
    return dataSets.map(({ name, data }) => ({
      name: name || 'Series', // If a name is not provided, use a default
      data: data,
    }));
  };

  const seriesData = formatDataToSeries(chartData);

  const optionsWithDimensions = {
    ...chartOptions,
    chart: {
      ...chartOptions.chart,
      width: 500,
      height: 500,
    },
  };

  
  return (
    <ReactApexChart
      options={optionsWithDimensions}
      series={seriesData}
      type={chartType}
    />
  );
};

export default ChartComponent;
