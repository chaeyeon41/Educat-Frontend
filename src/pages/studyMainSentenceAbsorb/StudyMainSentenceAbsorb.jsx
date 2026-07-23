import React, { useEffect, useState } from "react";
import "./StudyMainSentenceAbsorb.css";
import SentenceAbsorbBasicLearning from "../../components/contents/sentenceAbsorb/SentenceAbsorbBasicLearning";
import SentenceAbsorbBasicLearning2 from "../../components/contents/sentenceAbsorb/SentenceAbsorbBasicLearning2";
import SentenceAbsorbBasicVerification from "../../components/contents/sentenceAbsorb/SentenceAbsorbBasicVerification";
import SentenceAbsorbDeepLearning from "../../components/contents/sentenceAbsorb/SentenceAbsorbDeepLearning";
import SentenceAbsorbDeepVerification from "../../components/contents/sentenceAbsorb/SentenceAbsorbDeepVerification";
import SentenceAbsorbDeepLearning2 from "../../components/contents/sentenceAbsorb/SentenceAbsorbDeepLearning2";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const StudyMainSentenceAbsorb = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [timer, setTimer] = useState(60);
  const [contents, setContents] = useState([]);
  const fetchData = async () => {
    try {
      console.log("챕터" + location.state.mainStep);
      console.log("레슨" + location.state.lessonStep);
      console.log("행성" + location.state.planetStep);
      console.log(contentType);

      const response = await axios.get(
        `http://localhost:8080/studyType/sentenceAbsorb?lesson=${location.state.lessonStep}&studyType=${location.state.planetStep}&chapter=${location.state.mainStep}`,
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
  const [question, setQuestion] = useState([]);
  useEffect(() => {
    if (contents.basic) {
      setQuestion([
        "단어를 듣고 따라 읽어봐요.",
        contents.basic.question,
        "문장을 듣고 따라 읽어봐요.",
        contents.deep.question,
      ]);
    }
  }, [contents]);
  const [title, setTitle] = useState([
    "문장쏙쏙 기본학습",
    "문장쏙쏙 기본검증",
    "문장쏙쏙 심화학습",
    "문장쏙쏙 심화검증",
    "메인페이지",
  ]);
  const navigate = useNavigate();

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
              <SentenceAbsorbBasicLearning contents={contents} />
            )}
            {currentStep === 2 && (
              <SentenceAbsorbBasicVerification
                contents={contents}
                timer={timer}
                handleNext={handleNext}
              />
            )}
            {currentStep === 3 && (
              <SentenceAbsorbDeepLearning contents={contents} />
            )}
            {currentStep === 4 && (
              <SentenceAbsorbDeepVerification
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

export default StudyMainSentenceAbsorb;
