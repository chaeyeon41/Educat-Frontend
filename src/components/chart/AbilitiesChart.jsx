import React from "react";
import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  RadialLinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  RadialLinearScale,
  Tooltip,
  Legend
);
const AbilitiesChart = ({ abilities }) => {
  const data = {
    labels: abilities.map((ability) => ability.name),
    datasets: [
      {
        label: "나의 능력",
        backgroundColor: "rgba(123, 95, 232, 0.5)",
        borderColor: "rgba(123, 95, 232, 1)",
        pointBackgroundColor: "rgba(123, 95, 232, 1)",
        data: abilities.map((ability) => ability.level),
      },
    ],
  };
  const options = {
    scales: {
      r: {
        angleLines: {
          display: false,
        },
        suggestedMin: 0,
        suggestedMax: 5,
      },
    },
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        enabled: true,
        mode: "index",
        intersect: false,
      },
    },
  };
  return <Radar data={data} options={options} />;
};

export default AbilitiesChart;
