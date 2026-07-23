import React, { useEffect, useState } from "react";
import "./StudyMainSentenceDiary.css";
import SentenceDiaryBasicLearning from "../../components/contents/sentenceDiary/SentenceDiaryBasicLearning";
import SentenceDiaryBasicVerification from "../../components/contents/sentenceDiary/SentenceDiaryBasicVerification";
import SentenceDiaryDeepLearning from "../../components/contents/sentenceDiary/SentenceDiaryDeepLearning";
import SentenceDiaryDeepVerification from "../../components/contents/sentenceDiary/SentenceDiaryDeepVerification";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const StudyMainSentenceDiary = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [timer, setTimer] = useState(60);
  const [question, setQeustion] = useState([
    "문장과 그림을 보고 읽어봐요.",
    "문장과 그림을 보고 영어로 적어봐요.",
    "음성을 듣고 따라해봐요.",
    "그림과 문장을 보고 영어로 말해봐요.",
  ]);
  const [title, setTitle] = useState([
    "문장일기 기본학습",
    "문장일기 기본검증",
    "문장일기 심화학습",
    "문장일기 심화검증",
    "메인페이지",
  ]);
  const navigate = useNavigate();
  const [contents, setContents] = useState([]);

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
        `http://localhost:8080/studyType/sentenceDiary?lesson=${location.state.lessonStep}&studyType=${location.state.planetStep}&chapter=${location.state.mainStep}`,
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
  }, []);
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
              <SentenceDiaryBasicLearning contents={contents} />
            )}
            {currentStep === 2 && (
              <SentenceDiaryBasicVerification
                contents={contents}
                timer={timer}
                handleNext={handleNext}
              />
            )}
            {currentStep === 3 && (
              <SentenceDiaryDeepLearning contents={contents} />
            )}
            {currentStep === 4 && (
              <SentenceDiaryDeepVerification
                contents={contents}
                timer={timer}
              />
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

export default StudyMainSentenceDiary;
