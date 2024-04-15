import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto'; // Import Chart.js so it can be used by react-chartjs-2

const EventsChart = ({ events }) => {
  // Transform the object into an array of { day, duration } objects, excluding the 'Summary'
  const eventsArray = Object.keys(events).reduce((acc, day) => {
    if(day !== 'Summary') {
      acc.push({ day, duration: events[day] });
    }
    return acc;
  }, []);

  // Prepare data for the chart
  const data = {
    labels: eventsArray.map(event => event.day), // days of the week
    datasets: [
      {
        label: 'Hours Spent on Events',
        data: eventsArray.map(event => event.duration), // hours spent
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
