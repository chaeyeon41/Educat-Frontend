import React, { useState } from "react";
import "./SentenceDiaryDeepVerification.css";
import CheckBtn from "../../checkBtn/CheckBtn";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SentenceDiaryDeepVerification = ({ contents, timer }) => {
  const [text, setText] = useState("");
  const [isRecording, setIsRecording] = useState(false); // 녹음 상태를 위한 상태
  const navigate = useNavigate();

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
      let transcript = event.results[0][0].transcript;
      // 첫 글자를 대문자로 변환
      transcript = transcript.charAt(0).toUpperCase() + transcript.slice(1);
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
      id: contents.studyResponse.id,
      answer: text,
      time: 60 - timer,
      level: 2,
    };
    const url = "http://localhost:8080/studyAnswer/checkAnswer";

    axios
      .post(url, data, { withCredentials: true })
      .then((response) => {
        console.log(response.data);
        if (response.data.data.isChecked === 1) {
          window.alert("축하합니다! 정답을 맞추셨습니다.");
        } else {
          if (response.data.data.isChecked === 2) {
            window.alert("슬퍼요.. 틀리셨습니다.");
          }
        }
        window.alert("학습을 마치셨습니다. 메인페이지로 이동하겠습니다.");
        navigate("/");
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
    <>
      <div>
        <img
          src={contents.image}
          alt="이미지"
          className="wordBundle-basic-learning-img"
        />
        <div className="deep-verification-sentencediary-sentence-meaning">
          {contents.sentence_meaning}
        </div>
      </div>

      <div className="basic-verification-sentencediary-audio-input">
        <button
          onClick={handleVoiceRecognition}
          style={{ backgroundColor: isRecording ? "#DCD4FB" : "white" }}
        >
          {/* 버튼 내에 이미지 추가 */}
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
      <div className="button-container" onClick={sendAnswer}>
        <CheckBtn />
      </div>
    </>
  );
};

export default SentenceDiaryDeepVerification;
