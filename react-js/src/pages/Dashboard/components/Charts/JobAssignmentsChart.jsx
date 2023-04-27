import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const JobAssignmentsChart = ({ data: dataProp, users }) => {
  const chartValues = Object.keys(dataProp).map((userId) => {
    const user = users?.find((item) => item.id === userId);
    const fullName = user?.first_name + ' ' + user?.last_name;
    return { label: fullName, data: dataProp[userId] };
  });

  const chartData = {
    labels: chartValues.map(({ label }) => label),
    datasets: [
      {
        label: 'Job Assignments',
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(75,192,192,0.6)',
        hoverBorderColor: 'rgba(75,192,192,1)',
        data: chartValues.map(({ data }) => data)
      },
    ],
  };


  const options = {
    indexAxis: 'y',
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: 'Job Assignments of Published Jobs by User',
        font: {
          size: 16,
          family: 'Public Sans,sans-serif'
        }
      },
    },
    maintainAspectRatio: false
  };

  return (
    <Bar
      data={chartData}
      height={500}
      options={options}
    />
  );
};

export default JobAssignmentsChart;
