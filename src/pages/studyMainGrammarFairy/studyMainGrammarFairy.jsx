import React, { useEffect, useState } from "react";
import "./studyMainGrammarFairy.css";
import GrammarFairyBasicLearning from "../../components/contents/grammarFariy/GrammarFairyBasicLearning";
import GrammarFairyBasicVerification from "../../components/contents/grammarFariy/GrammarFairyBasicVerification";
import GrammarFairyDeepLearning from "../../components/contents/grammarFariy/GrammarFairyDeepLearning";
import GrammarFairyDeepVerification from "../../components/contents/grammarFariy/GrammarFairyDeepVerification";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const StudyMainGrammarFairy = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [timer, setTimer] = useState(60);
  const [question, setQeustion] = useState([
    "단어와 문법을 보고 읽어봐요.",
    "주어진 단어 중 명사인 것을 고르시오.",
    "문법요정 문장을 보고 배워봐요.",
    "단어가 들어갈 알맞은 위치를 고르시오.",
  ]);
  const [title, setTitle] = useState([
    "문법요정 기본학습",
    "문법요정 기본검증",
    "문법요정 심화학습",
    "문법요정 심화검증",
    "메인페이지",
  ]);
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
        `http://localhost:8080/studyType/grammarFairy?lesson=${location.state.lessonStep}&studyType=${location.state.planetStep}&chapter=${location.state.mainStep}`,
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
              <GrammarFairyBasicLearning contents={contents} />
            )}
            {currentStep === 2 && (
              <GrammarFairyBasicVerification
                contents={contents}
                timer={timer}
                handleNext={handleNext}
              />
            )}
            {currentStep === 3 && (
              <GrammarFairyDeepLearning contents={contents} />
            )}
            {currentStep === 4 && (
              <GrammarFairyDeepVerification contents={contents} timer={timer} />
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

export default StudyMainGrammarFairy;
