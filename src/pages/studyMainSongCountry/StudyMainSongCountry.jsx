import React, { useEffect, useState } from "react";
import "./StudyMainSongCountry.css";
import SongCountryBasicLearning from "../../components/contents/songCountry/SongCountryBasicLearning";
import SongCountryBasicVerification from "../../components/contents/songCountry/SongCountryBasicVerification";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import SongCountryBasicLearning2 from "../../components/contents/songCountry/SongCountryBasicLearning2";
import SongCountryDeepLearning from "./../../components/contents/songCountry/SongCountryDeepLearning";
import SongCountryDeepLearning2 from "./../../components/contents/songCountry/SongCountryDeepLearning2";
import SongCountryDeepVerification from "../../components/contents/songCountry/SongCountryDeepVerification";
const StudyMainSongCountry = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [timer, setTimer] = useState(60);
  const [question, setQeustion] = useState([
    "동물을 클릭하여 노래를 불러봐요.",
    "노래를 따라 불러봐요.",
    "맥도날드 할아버지는 뭘 갖고 있나요?",
    "동물을 클릭하여 노래를 불러봐요.",
    "노래를 따라 불러봐요.",
    "맥도날드 할아버지의 농장에서 울리는 소리는 무슨 소리였나요?",
  ]);
  const [title, setTitle] = useState([
    "동요나라 기본학습1",
    "동요나라 기본학습2",
    "동요나라 기본검증",
    "동요나라 심화학습1",
    "동요나라 심화학습2",
    "동요나라 심화검증",
    "메인페이지",
  ]);

  const navigate = useNavigate();
  const [contents, setContents] = useState();

  const handleNext = () => {
    if (currentStep >= 6) {
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
        `http://localhost:8080/studyType/songCountry?lesson=${location.state.lessonStep}&studyType=${location.state.planetStep}&chapter=${location.state.mainStep}`,
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
              <SongCountryBasicLearning contents={contents} />
            )}
            {currentStep === 2 && (
              <SongCountryBasicLearning2 contents={contents} />
            )}
            {currentStep === 3 && (
              <SongCountryBasicVerification
                contents={contents}
                timer={timer}
                handleNext={handleNext}
              />
            )}
            {currentStep === 4 && (
              <SongCountryDeepLearning contents={contents} />
            )}
            {currentStep === 5 && (
              <SongCountryDeepLearning2 contents={contents} />
            )}
            {currentStep === 6 && (
              <SongCountryDeepVerification contents={contents} timer={timer} />
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

export default StudyMainSongCountry;
