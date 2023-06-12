import { ApexOptions } from 'apexcharts';

// Define the series data for the TotalRevenue component
export const TotalRevenueSeries = [
  {
    name: 'Last Month',
    data: [183, 124, 115, 85, 143, 143, 96], // Data for the "Last Month" series
  },
  {
    name: 'Running Month',
    data: [95, 84, 72, 44, 108, 108, 47], // Data for the "Running Month" series
  },
];

// Define the options for configuring the TotalRevenue component's bar chart
export const TotalRevenueOptions: ApexOptions = {
  chart: {
    type: 'bar',
    toolbar: {
      show: false,
    },
  },
  colors: ['#475BE8', '#CFC8FF'],
  plotOptions: {
    bar: {
      borderRadius: 4,
      horizontal: false,
      columnWidth: '55%',
    },
  },
  dataLabels: {
    enabled: false,
  },
  grid: {
    show: false,
  },
  stroke: {
    colors: ['transparent'],
    width: 4,
  },
  xaxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'], // X-axis categories
  },
  yaxis: {
    title: {
      text: '$ (thousands)', // Y-axis title
    },
  },
  fill: {
    opacity: 1,
  },
  legend: {
    position: 'top',
    horizontalAlign: 'right',
  },
  tooltip: {
    y: {
      formatter(val: number) {
        return `$ ${val} thousands`; // Format the tooltip value
      },
    },
  },
};
