import React, { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";

const AllLineChart = ({ labels, datasets }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");
    const chartInstance = new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: datasets.map((dataset) => ({
          ...dataset,
          xAxisID: "x-axis-0", // Add xAxisID
          yAxisID: "y-axis-0", // Add yAxisID
        })),
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
        },
        scales: {
          "x-axis-0": {
            type: "category",
            position: "bottom",
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
          "y-axis-0": {
            type: "linear",
            position: "left",
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

export default AllLineChart;
