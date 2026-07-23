import React, { useState } from "react";
import "./MainTeacher.css";
import AllLineChart from "../../components/chart/AllLineChart";
import { useNavigate } from "react-router-dom";

const MainTeacher3 = () => {
  const navigate = useNavigate();
  const datasets = [
    {
      label: "어휘",
      data: [12, 19, 3, 5, 2, 3, 7],
      borderColor: "rgba(75, 192, 192, 1)",
      fill: false,
    },
    {
      label: "문법",
      data: [2, 3, 20, 5, 1, 4, 9],
      borderColor: "rgba(153, 102, 255, 1)",
      fill: false,
    },
    {
      label: "문장",
      data: [3, 10, 13, 15, 22, 30, 25],
      borderColor: "rgba(255, 159, 64, 1)",
      fill: false,
    },
    {
      label: "이해",
      data: [5, 15, 10, 20, 8, 7, 18],
      borderColor: "rgba(54, 162, 235, 1)",
      fill: false,
    },
    {
      label: "표현",
      data: [1, 4, 6, 8, 10, 12, 14],
      borderColor: "rgba(255, 206, 86, 1)",
      fill: false,
    },
    {
      label: "집중",
      data: [9, 7, 6, 4, 3, 2, 1],
      borderColor: "rgba(75, 192, 192, 0.7)",
      fill: false,
    },
  ];

  const expressionDataset = [
    {
      label: "표현",
      data: [3, 10, 13, 15, 22, 30, 25],
      borderColor: "rgba(255, 159, 64, 1)",
      fill: false,
    },
  ];

  const comprehensionDataset = [
    {
      label: "이해",
      data: [5, 15, 10, 20, 8, 7, 18],
      borderColor: "rgba(54, 162, 235, 1)",
      fill: false,
    },
  ];

  const [selectedDataset, setSelectedDataset] = useState(datasets);
  const handleButtonClick = (dataset) => {
    switch (dataset) {
      case "전체성적":
        setSelectedDataset(datasets);
        break;
      case "이해성적":
        setSelectedDataset(comprehensionDataset);
        break;
      case "표현성적":
        setSelectedDataset(expressionDataset);
        break;
      default:
        setSelectedDataset(datasets);
        break;
    }
  };

  const handleNextPageClick = () => {
    navigate("/mainTeacher2");
  };

  return (
    <div className="main-teacher-container">
      <h2>교사 전용 페이지</h2>
      <div className="main-teacher-top-container">
        <div className="main-teacher-top-chart">
          <AllLineChart datasets={selectedDataset} />
        </div>
        <div className="main-teacher-top-buttons">
          <div
            className="main-teacher-top-button"
            onClick={() => handleButtonClick("전체성적")}
          >
            전체성적
          </div>
          <div
            className="main-teacher-top-button"
            onClick={() => handleButtonClick("이해성적")}
          >
            이해성적
          </div>
          <div
            className="main-teacher-top-button"
            onClick={() => handleButtonClick("표현성적")}
          >
            표현성적
          </div>
          <button
            className="main-teacher-next-button"
            onClick={handleNextPageClick}
          >
            다음 페이지로
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainTeacher3;
