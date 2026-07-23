import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./MainStudent.css";
import AllLineChart from "../../components/chart/AllLineChart";
import AllBarChart from "../../components/chart/AllBarChart";

const MainStudent = () => {
  const navigate = useNavigate();
  const [solved, setSolved] = useState([]);
  const [topTwoKeys, setTopTwoKeys] = useState([]);
  const [labels, setLabels] = useState([]);
  const [focusDataset, setFocusDataset] = useState([]);
  const [understandDataset, setUnderstandDataset] = useState([]);
  const [wordDataset, setWordDataset] = useState([]);
  const [grammarDataset, setGrammarDataset] = useState([]);
  const [sentenceDataset, setSentenceDataset] = useState([]);
  const [expressionDataset, setExpressionDataset] = useState([]);
  const [progress, setProgress] = useState(0);
  const [images, setImages] = useState({
    동화여행: "fairytravel.png",
    동화세계: "fairyworld.png",
    문법요정: "grammerfariy.png",
    문법랜드: "grammerland.png",
    문장쑥쑥: "sentenceabsorb.png",
    문장일기: "sentencediary.png",
    동요여행: "songtravel.png",
    동요나라: "songcountry.png",
    어휘력쑥쑥: "wordabsorb.png",
    단어뭉치: "wordbundle.png",
  });

  const goContent = () => {
    navigate("/");
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${month}-${day}`;
  };

  const fetchSolved = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/member/solved`, {
        withCredentials: true,
      });
      console.log(response);
      if (response.data && response.data.result) {
        setSolved(response.data.data.length);
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const fetchSolvedCount = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/solved/count`, {
        withCredentials: true,
      });
      const data = response.data;

      // 객체의 키와 값을 배열로 변환
      const solvedCounts = Object.entries(data);

      // 값이 큰 순서대로 정렬
      solvedCounts.sort((a, b) => b[1] - a[1]);

      // 가장 큰 값 세 개의 키 가져오기
      const [first, second, three] = solvedCounts
        .slice(0, 3)
        .map(([key, value]) => key);

      // 상태로 설정
      setTopTwoKeys([first, second, three]);

      console.log("가장 큰 값 세 개의 키:", first, second, three);

      // 이후에 필요한 로직을 수행하면 됩니다.
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/scorelog/latest",
        {
          withCredentials: true,
        }
      );
      console.log(response);
      const data = response.data;

      const labels = data.map((entry) => formatDate(entry.createdAt));
      const focusData = data.map((entry) => entry.focus);
      const understandData = data.map((entry) => entry.understand);
      const wordData = data.map((entry) => entry.word);
      const grammarData = data.map((entry) => entry.grammar);
      const sentenceData = data.map((entry) => entry.sentence);
      const expressionData = data.map((entry) => entry.expression);

      setLabels(labels);
      setFocusDataset([
        {
          label: "집중",
          data: focusData,
          borderColor: "rgba(75, 192, 192, 0.7)",
          fill: false,
        },
      ]);
      setUnderstandDataset([
        {
          label: "이해",
          data: understandData,
          borderColor: "rgba(54, 162, 235, 1)",
          fill: false,
        },
      ]);
      setWordDataset([
        {
          label: "어휘",
          data: wordData,
          borderColor: "rgba(75, 192, 192, 1)",
          fill: false,
        },
      ]);
      setGrammarDataset([
        {
          label: "문법",
          data: grammarData,
          borderColor: "rgba(153, 102, 255, 1)",
          fill: false,
        },
      ]);
      setSentenceDataset([
        {
          label: "문장",
          data: sentenceData,

          borderColor: "rgba(255, 159, 64, 1)",
          fill: false,
        },
      ]);
      setExpressionDataset([
        {
          label: "표현",
          data: expressionData,
          borderColor: "rgba(255, 206, 86, 1)",
          fill: false,
        },
      ]);

      const totalProgress = data.reduce(
        (acc, cur) =>
          acc +
          cur.focus +
          cur.expression +
          cur.understand +
          cur.word +
          cur.sentence +
          cur.grammar,
        0
      );
      setProgress(totalProgress / (6 * data.length));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchSolvedCount();
    fetchSolved();
    fetchData();
  }, []);

  const getProgressBarColor = (progress) => {
    if (progress < 30) {
      return "red";
    } else if (progress < 70) {
      return "orange";
    } else {
      return "green";
    }
  };

  const expressionAndUnderstandDatasets = [
    {
      label: "이해",
      data: understandDataset.length ? understandDataset[0].data : [],
      backgroundColor: "rgba(54, 162, 235, 0.5)",
    },
    {
      label: "표현",
      data: expressionDataset.length ? expressionDataset[0].data : [],
      backgroundColor: "rgba(255, 206, 86, 0.5)",
    },
  ];

  return (
    <>
      <div className="mainstudent-container">
        <div className="mainstudent-chart">
          <div className="mainstudent-chart-container">
            <div className="mainstudent-chart-box">
              <div className="mainstudent-chart-box-container">
                <h2>집중</h2>
                <div className="chart-wrapper">
                  <AllLineChart labels={labels} datasets={focusDataset} />
                </div>
              </div>
            </div>
            <div className="mainstudent-chart-box">
              <div className="mainstudent-chart-box-container">
                <h2>어휘</h2>
                <div className="chart-wrapper">
                  <AllLineChart labels={labels} datasets={wordDataset} />
                </div>
              </div>
            </div>
            <div className="mainstudent-chart-box">
              <div className="mainstudent-chart-box-container">
                <h2>문법</h2>
                <div className="chart-wrapper">
                  <AllLineChart labels={labels} datasets={grammarDataset} />
                </div>
              </div>
            </div>
            <div className="mainstudent-chart-box">
              <div className="mainstudent-chart-box-container">
                <h2>문장</h2>
                <div className="chart-wrapper">
                  <AllLineChart labels={labels} datasets={sentenceDataset} />
                </div>
              </div>
            </div>
            <div className="mainstudent-chart-box">
              <div className="mainstudent-chart-box-container">
                <h2>이해와 표현</h2>
                <div className="chart-wrapper">
                  <AllBarChart
                    labels={labels}
                    datasets={expressionAndUnderstandDatasets}
                  />
                </div>
              </div>
            </div>
            <div className="mainstudent-chart-box">
              <div
                className="mainstudent-gocontent-box-container"
                onClick={goContent}
                style={{ cursor: "pointer" }}
              >
                학습 컨텐츠 바로가기
              </div>
            </div>
          </div>
        </div>

        <div className="mainstudent-progress-recommend">
          <div className="mainstudent-progress-left-container">
            <div className="mainstudent-progress-bar-container">
              <div className="progress-bar-container">
                <div
                  className="progress-bar"
                  style={{
                    width: `${solved * 1.25}%`,
                    backgroundColor: getProgressBarColor(solved * 1.25),
                  }}
                ></div>
              </div>
              <div className="mainstudent-progress">
                진행률 : {solved * 1.25}%
              </div>
            </div>
          </div>
          <div className="mainstudent-recommend-right-container">
            <div className="mainstudent-recommend-container">
              <div className="mainstudent-recommend-question">
                <h2>가장 인기 많은 학습 컨텐츠</h2>
              </div>
              <div className="mainstudent-recommend-keys">
                {topTwoKeys.map((key) => (
                  <div key={key} className="mainstudent-recommend-key">
                    <img src={`/images/${images[key]}`} alt={key} />
                    <span>{key}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainStudent;
