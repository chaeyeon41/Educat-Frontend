import React, { useEffect, useState } from "react";
import "./FairyTravelBasicVerification.css";
import axios from "axios";
import CheckBtn from "../../checkBtn/CheckBtn";

const FairyTravelBasicVerification = ({ contents, timer, handleNext }) => {
  const [text, setText] = useState("");
  const [isRecording, setIsRecording] = useState(false); // 녹음 상태를 위한 상태

  const handleVoiceRecognition = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US"; // 언어를 영어로 설정
    recognition.interimResults = false;
    recognition.continuous = false;

    recognition.onstart = () => {
      setIsRecording(true); // 녹음 시작 시, 녹음 중 상태로 변경
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setText(transcript);
    };

    recognition.onend = () => {
      setIsRecording(false); // 녹음 종료 시, 녹음 중 상태 해제
      console.log("Speech recognition service disconnected");
    };

    recognition.onerror = (event) => {
      setIsRecording(false); // 오류 발생 시, 녹음 중 상태 해제
      console.error("Speech recognition error", event.error);
    };

    recognition.start(); // 음성 인식 시작
  };
  const sendAnswer = () => {
    const data = {
      id: contents.basic.studyResponse.id,
      answer: text,
      time: 60 - timer,
      level: 1,
    };
    const url = "http://localhost:8080/studyAnswer/checkAnswer";

    axios
      .post(url, data, { withCredentials: true })
      .then((response) => {
        console.log(response.data);
        if (response.data.data.isChecked === 1) {
          window.alert("축하합니다! 정답을 맞추셨습니다.");
          handleNext();
        } else {
          if (response.data.data.isChecked === 2) {
            window.alert("슬퍼요.. 틀리셨습니다.");
            handleNext();
          }
        }
      })
      .catch((error) => {
        window.alert("정답 제출 중 오류가 발생했습니다.");
        console.error("정답 제출 중 오류가 발생했습니다.", error);
      });
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendAnswer();
    }
  };
  return (
    <div className="fairy-travel-verification-container">
      <div className="fairy-travel-verification-image">
        <img src={contents.basic.image} alt="동화이미지" />
      </div>
      <div className="basic-verification-sentencediary-audio-input fairy-travel-audio">
        <button
          onClick={handleVoiceRecognition}
          style={{ backgroundColor: isRecording ? "#DCD4FB" : "white" }}
        >
          <img
            src="images/recorder.png"
            alt="음성인식"
            style={{ width: "17px" }}
          />
        </button>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
      {/* <div className="basic-verification-sentencediary-audio-input">
        <button
          onClick={handleVoiceRecognition}
          style={{ backgroundColor: isRecording ? "darkviolet" : "white" }}
        >
          <img
            src="images/recorder.png"
            alt="음성인식"
            style={{ width: "17px" }}
          />
        </button>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div> */}
      <div className="button-container" onClick={sendAnswer}>
        <CheckBtn />
      </div>
    </div>
  );
};

export default FairyTravelBasicVerification;
