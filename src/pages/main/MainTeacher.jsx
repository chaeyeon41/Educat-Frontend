import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./MainTeacher.css";
import AllLineChart from "../../components/chart/AllLineChart";
import mainBodyImage from "../../assets/mainbody.png";

const MainTeacher = () => {
  const [sumAverage, setSumAverage] = useState();
  const [health, setHealth] = useState();
  const [clickComment, setClickComment] = useState();
  const [clickStudent, setClickStudent] = useState("이름을 누르세요");
  const navigate = useNavigate();
  const [selectedDataset, setSelectedDataset] = useState([]);
  const [solved, setSolved] = useState([]);
  const [topTwoKeys, setTopTwoKeys] = useState([]);
  const [student, setStudent] = useState();
  const [allDatasets, setAllDatasets] = useState([]);
  const [datasets, setDatasets] = useState([]);
  const [labels, setLabels] = useState([]);
  const [progress, setProgress] = useState(0);
  const [allDatasets2, setAllDatasets2] = useState([]);
  const [datasets2, setDatasets2] = useState();
  const [labels2, setLabels2] = useState([]);
  const [comment, setComment] = useState();
  const [onlyStudent, setOnlyStudent] = useState();

  const saveComment = (e) => {
    setComment(e.target.value);
    console.log(comment);
  };

  const sendComment = async () => {
    console.log(onlyStudent, comment);
    try {
      const response = await axios.put(
        `http://localhost:8080/updateComment`,
        { id: onlyStudent, comment: comment },
        {
          withCredentials: true,
        }
      );
      setClickComment(comment);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const determineHealthStatus = (studentSum, average) => {
    const difference = studentSum - average;
    if (difference >= -50 && difference <= 50) {
      return "양호";
    } else if (difference > 50) {
      return "우수";
    } else if (difference >= -150) {
      return "주의";
    } else {
      return "경고";
    }
  };
  const getHealthClassName = (status) => {
    switch (status) {
      case "양호":
        return "health-good";
      case "우수":
        return "health-excellent";
      case "주의":
        return "health-warning";
      case "경고":
        return "health-danger";
      default:
        return "";
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${month}-${day}`;
  };

  const fetchStudents = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/studentAll`, {
        withCredentials: true,
      });
      console.log(response.data);
      setStudent(response.data);
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

      // 가장 큰 값 두 개의 키 가져오기
      const [first, second, three] = solvedCounts
        .slice(0, 3)
        .map(([key, value]) => key);

      // 상태로 설정
      setTopTwoKeys([first, second, three]);

      console.log("가장 큰 값 두 개의 키:", first, second, three);

      // 이후에 필요한 로직을 수행하면 됩니다.
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const fetchClickStudent = async (studentId, studentName, studentComment) => {
    try {
      setClickStudent(studentName);
      setClickComment(studentComment);
      setOnlyStudent(studentId);
      const response = await axios.get(
        `http://localhost:8080/scorelog/parents/latest?userId=${studentId}`,
        {
          withCredentials: true,
        }
      );
      console.log(response.data);

      let data = response.data;

      // Sort the data by date
      data.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

      // Format dates and prepare datasets
      const newLabels = data.map((entry) => formatDate(entry.createdAt));
      const avgFocusData = data.map((entry) => entry.focus || 0);
      const avgUnderstandData = data.map((entry) => entry.understand || 0);
      const avgWordData = data.map((entry) => entry.word || 0);
      const avgGrammarData = data.map((entry) => entry.grammar || 0);
      const avgSentenceData = data.map((entry) => entry.sentence || 0);
      const avgExpressionData = data.map((entry) => entry.expression || 0);

      const newDatasets = [
        {
          label: "집중",
          data: avgFocusData,
          borderColor: "rgba(75, 192, 192, 0.7)",
          fill: false,
        },
        {
          label: "이해",
          data: avgUnderstandData,
          borderColor: "rgba(54, 162, 235, 1)",
          fill: false,
        },
        {
          label: "어휘",
          data: avgWordData,
          borderColor: "rgba(75, 192, 192, 1)",
          fill: false,
        },
        {
          label: "문법",
          data: avgGrammarData,
          borderColor: "rgba(153, 102, 255, 1)",
          fill: false,
        },
        {
          label: "문장",
          data: avgSentenceData,
          borderColor: "rgba(255, 159, 64, 1)",
          fill: false,
        },
        {
          label: "표현",
          data: avgExpressionData,
          borderColor: "rgba(255, 206, 86, 1)",
          fill: false,
        },
      ];

      setLabels2(newLabels);
      setAllDatasets2(newDatasets);
      setDatasets2(newDatasets); // Initially display all datasets
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // -----------------------------------------------------------------------------------------------------------------
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/scorelog/averages/all",
        {
          withCredentials: true,
        }
      );
      console.log(response.data);
      const data = response.data;

      const newLabels = data.map((entry) => formatDate(entry.date));
      const avgFocusData = data.map((entry) => entry.avgFocus);
      const avgUnderstandData = data.map((entry) => entry.avgUnderstand);
      const avgWordData = data.map((entry) => entry.avgWord);
      const avgGrammarData = data.map((entry) => entry.avgGrammar);
      const avgSentenceData = data.map((entry) => entry.avgSentence);
      const avgExpressionData = data.map((entry) => entry.avgExpression);

      const newDatasets = [
        {
          label: "집중",
          data: avgFocusData,
          borderColor: "rgba(75, 192, 192, 0.7)",
          fill: false,
        },
        {
          label: "이해",
          data: avgUnderstandData,
          borderColor: "rgba(54, 162, 235, 1)",
          fill: false,
        },
        {
          label: "어휘",
          data: avgWordData,
          borderColor: "rgba(75, 192, 192, 1)",
          fill: false,
        },
        {
          label: "문법",
          data: avgGrammarData,
          borderColor: "rgba(153, 102, 255, 1)",
          fill: false,
        },
        {
          label: "문장",
          data: avgSentenceData,
          borderColor: "rgba(255, 159, 64, 1)",
          fill: false,
        },
        {
          label: "표현",
          data: avgExpressionData,
          borderColor: "rgba(255, 206, 86, 1)",
          fill: false,
        },
      ];

      setLabels(newLabels);
      setAllDatasets(newDatasets);
      setDatasets(newDatasets); // Initially display all datasets
      const totalProgress = data.reduce(
        (acc, cur) =>
          acc +
          cur.avgFocus +
          cur.avgExpression +
          cur.avgUnderstand +
          cur.avgWord +
          cur.avgSentence +
          cur.avgGrammar,
        0
      );
      setProgress(totalProgress);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchSolvedCount();
    fetchData();
    fetchStudents();
    fetchSumAverage();
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

  const showAllDatasets = () => {
    setDatasets(allDatasets);
  };

  const showAllDatasets2 = () => {
    setDatasets2(allDatasets2);
  };

  const showExpressionAndUnderstanding = () => {
    setDatasets(
      allDatasets.filter(
        (dataset) => dataset.label === "표현" || dataset.label === "이해"
      )
    );
  };

  const showExpressionAndUnderstanding2 = () => {
    setDatasets2(
      allDatasets2.filter(
        (dataset) => dataset.label === "표현" || dataset.label === "이해"
      )
    );
  };

  const showAllStudents = () => {
    const combinedData = allDatasets[0].data.map((_, index) => {
      return (
        allDatasets[0].data[index] +
        allDatasets[1].data[index] +
        allDatasets[2].data[index] +
        allDatasets[3].data[index] +
        allDatasets[4].data[index] +
        allDatasets[5].data[index]
      );
    });

    const combinedDataset = [
      {
        label: "학생 체급 합계",
        data: combinedData,
        borderColor: "rgba(255, 99, 132, 1)",
        fill: false,
      },
    ];

    setDatasets(combinedDataset);
  };

  const showAllStudents2 = () => {
    const combinedData = allDatasets2[0].data.map((_, index) => {
      return (
        allDatasets2[0].data[index] +
        allDatasets2[1].data[index] +
        allDatasets2[2].data[index] +
        allDatasets2[3].data[index] +
        allDatasets2[4].data[index] +
        allDatasets2[5].data[index]
      );
    });

    const combinedDataset = [
      {
        label: "학생 체급 합계",
        data: combinedData,
        borderColor: "rgba(255, 99, 132, 1)",
        fill: false,
      },
    ];

    setDatasets2(combinedDataset);
  };
  const fetchSumAverage = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/average-total-score",
        {
          withCredentials: true,
        }
      );
      console.log(response.data.averageTotalScore);
      setSumAverage(response.data.averageTotalScore);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    // 체급을 결정할 때 사용될 함수
    if (student && sumAverage) {
      const healthStatus = determineHealthStatus(student.sum, sumAverage);
      setHealth(healthStatus);
    }
  }, [student, sumAverage]);
  return (
    <>
      <div
        className="mainstudent-container1"
        style={{
          backgroundImage: `url(${mainBodyImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="mainstudent-container-one">
          <h2 style={{ textAlign: "center", marginBottom: "0" }}>
            담당하는 학생들의 평균 역량
          </h2>
          <div className="mainteacher-chart">
            <div className="mainstudent-chart-left-container">
              <div className="mainstudent-chart-all">
                <AllLineChart labels={labels} datasets={datasets} />
              </div>
            </div>
            <div className="mainstudent-chart-right-container">
              <div className="mainstudent-chart-three-box">
                <div
                  className="mainstudent-chart-three-box-chart"
                  onClick={showAllStudents}
                >
                  <h1>우리반 체급 보기</h1>
                </div>
              </div>
              <div className="mainstudent-chart-three-box">
                <div
                  className="mainstudent-chart-three-box-chart"
                  onClick={showAllDatasets}
                >
                  <h1>우리반 전체 요소</h1>
                </div>
              </div>
              <div className="mainstudent-chart-three-box">
                <div
                  className="mainstudent-chart-three-box-chart"
                  onClick={showExpressionAndUnderstanding}
                >
                  <h1>표현과 이해</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mainstudent-container-two">
          <div className="mainteacher-left-container">
            <h2 style={{ margin: "0px" }}>학생 정보</h2>
            <div className="mainteacher-detail-container">
              <div className="mainteacher-detail-name-container">
                <div className="mainteacher-detail-name">
                  <h1>{clickStudent}</h1>
                </div>
              </div>
              <div className="mainteacher-detail-graph-container">
                <div className="mainteacher-detail-graph">
                  {datasets2 && (
                    <AllLineChart labels={labels2} datasets={datasets2} />
                  )}
                </div>
                <div className="mainteacher-detail-threebutton">
                  {onlyStudent ? (
                    <>
                      <div
                        className="mainteahcer-detail-button"
                        onClick={showAllStudents2}
                      >
                        체급보기
                      </div>
                      <div
                        className="mainteahcer-detail-button"
                        onClick={showAllDatasets2}
                      >
                        전체요소
                      </div>
                      <div
                        className="mainteahcer-detail-button"
                        onClick={showExpressionAndUnderstanding2}
                      >
                        표현과이해
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="mainteahcer-detail-button">체급보기</div>
                      <div className="mainteahcer-detail-button">전체요소</div>
                      <div className="mainteahcer-detail-button">
                        표현과이해
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div className="mainteacher-detail-comment-container">
                <div className="mainteacher-detail-comment">
                  {clickComment && (
                    <>
                      <h3>선생님의 한말씀</h3>
                      {clickComment}
                    </>
                  )}
                </div>
                <div className="mainteacher-detail-comment-input">
                  {clickComment ? (
                    <h3>{clickStudent}에게 코멘트</h3>
                  ) : (
                    <h3>코멘트</h3>
                  )}
                  <div className="mainteacher-detail-comment-input-button">
                    <input type="text" onChange={saveComment} />
                    <div onClick={sendComment}>코멘트달기</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mainteacher-right-container">
            <h2 style={{ margin: "0px" }}>학생 리스트</h2>
            <div className="mainteacher-list-container">
              {student &&
                student.map((student, index) => {
                  return (
                    <>
                      <div
                        className="mainteacher-list-student"
                        onClick={() =>
                          fetchClickStudent(
                            student.id,
                            student.name,
                            student.comment
                          )
                        }
                      >
                        <h2>{student.name}</h2>

                        <div
                          className={`mainstudent-student-information ${getHealthClassName(
                            determineHealthStatus(student.sum, sumAverage)
                          )}`}
                        >
                          {determineHealthStatus(student.sum, sumAverage)}
                        </div>
                      </div>
                    </>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainTeacher;
