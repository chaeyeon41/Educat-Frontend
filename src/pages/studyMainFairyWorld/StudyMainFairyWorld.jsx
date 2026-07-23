import React, { useEffect, useState } from "react";
import "./StudyMainFairyWorld.css";
import FairyWorldBasicLearning from "./../../components/contents/fairyWorld/FairyWorldBasicLearning";
import FairyWorldBasicVerification from "./../../components/contents/fairyWorld/FairyWorldBasicVerification";
import FairyWorldDeepLearning from "./../../components/contents/fairyWorld/FairyWorldDeepLearning";
import FairyWorldDeepVerification from "../../components/contents/fairyWorld/FairyWorldDeepVerification";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
const StudyMainFairyWorld = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [question, setQeustion] = useState([
    "음성을 듣고 동화를 따라 읽어보아요.",
    "진저브래드 맨은 뭘 하고 있나요?",
    "음성을 듣고 동화를 따라 읽어보아요.",
    "소가 하고싶은건 무엇일까요?",
  ]);
  const [title, setTitle] = useState([
    "동화세상 기본학습",
    "동화세상 기본검증",
    "동화세상 심화학습",
    "동화세상 심화검증",
    "메인페이지",
  ]);
  const [timer, setTimer] = useState(60);
  const navigate = useNavigate();
  const [contents, setContents] = useState();

  const handleNext = () => {
    if (currentStep >= 4) {
      navigate("/"); // 메인 페이지로 이동합니다. 메인 페이지의 경로가 다르다면, 해당 경로로 수정하세요.
      setCurrentStep(1); // currentStep을 1로 설정합니다.
    } else {
      setCurrentStep(currentStep + 1); // 다음 단계로 상태 업데이트
      setTimer(60);
    }
  };
  const location = useLocation();
  const [contentType, setContentType] = useState(location.state.planetStep);
  const fetchData = async () => {
    try {
      console.log("챕터" + location.state.mainStep);
      console.log("레슨" + location.state.lessonStep);
      console.log("행성" + location.state.planetStep);
      console.log(contentType);

      const response = await axios.get(
        `http://localhost:8080/studyType/bookWorld?lesson=${location.state.lessonStep}&studyType=${location.state.planetStep}&chapter=${location.state.mainStep}`,
        { withCredentials: true }
      );

      setContents(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [contentType]);
  useEffect(() => {
    if (timer === 0) return;

    const countdown = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    return () => clearInterval(countdown);
  }, [timer]);

  return (
    <>
      <div className="container">
        <div className="studyMain-container">
          <div className="studyMain-name-container">
            <img src="./../images/check.png" />
            <h3>{title[currentStep - 1]}</h3>
          </div>
          <div className="studyMain-question">
            <h1>{question[currentStep - 1]}</h1>
          </div>
          <div className="studyMain-box-container">
            {currentStep === 1 && (
              <FairyWorldBasicLearning contents={contents} />
            )}
            {currentStep === 2 && (
              <FairyWorldBasicVerification
                contents={contents}
                timer={timer}
                handleNext={handleNext}
              />
            )}
            {currentStep === 3 && (
              <FairyWorldDeepLearning contents={contents} />
            )}
            {currentStep === 4 && (
              <FairyWorldDeepVerification contents={contents} timer={timer} />
            )}
          </div>
          <div className="studyMain-timer-check-next-container">
            <div className="timer-container">
              <div className="concentration-timer">집중타이머</div>
              <img src="./../images/timer.png" />
              <div className="time-timer">{timer} 초</div>
            </div>
          </div>
          <img
            className="next-img"
            src="./../images/next.png"
            onClick={handleNext}
          />
          <div className="studyMain-nextTitle">
            <h5>{title[currentStep]}</h5>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudyMainFairyWorld;
