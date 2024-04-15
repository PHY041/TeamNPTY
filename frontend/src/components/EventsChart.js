import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto'; // Import Chart.js so it can be used by react-chartjs-2

const EventsChart = ({ events }) => {
  // Prepare data for the chart
  const data = {
    labels: events.map(event => event.day), // days of the week
    datasets: [
      {
        label: 'Hours Spent on Events',
        data: events.map(event => event.duration), // hours spent
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default EventsChart;
