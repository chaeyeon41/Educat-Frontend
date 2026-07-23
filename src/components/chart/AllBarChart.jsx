import React, { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";

const AllBarChart = ({ labels, datasets }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");
    const chartInstance = new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: datasets,
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: "날짜",
            },
            ticks: {
              font: {
                family: "JalnanGothic, sans-serif",
              },
            },
          },
          y: {
            title: {
              display: true,
              text: "점수",
            },
            ticks: {
              font: {
                family: "JalnanGothic, sans-serif",
              },
            },
          },
        },
      },
    });

    return () => {
      chartInstance.destroy();
    };
  }, [labels, datasets]);

  return <canvas ref={chartRef} />;
};

export default AllBarChart;
