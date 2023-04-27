import React from 'react';
import { PolarArea } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const UncompletedTasksChart = ({ data, users }) => {
  const chartValues = Object.keys(data).map((userId) => {
    const user = users?.find((item) => item.id === userId);
    const fullName = user?.first_name + ' ' + user?.last_name;
    return { label: fullName, value: data[userId] };
  });

  const chartData = {
    labels: chartValues.map(({ label }) => label),
    datasets: [
      {
        label: 'Uncompleted Tasks',
        data: chartValues.map(({ value }) => value),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#2ecc71',
          '#e74c3c',
          '#9b59b6',
          '#1abc9c',
          '#f1c40f',
          '#3498db',
          '#34495e',
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: 'Uncompleted Tasks by User',
        font: {
          size: 16,
          family: 'Public Sans,sans-serif'
        }
      },
      legend: {
        position: 'bottom'
      }
    },
    scales: {
      r: {
        angleLines: {
          display: false,
        },
        suggestedMin: 0,
        suggestedMax: 30,
      },
    },
  };

  return <PolarArea data={chartData} height={500} options={options} />;
};

export default UncompletedTasksChart;
