import React, { useState } from "react";
import "./GrammarLandBasicVerification.css";
import CheckBtn from "../../checkBtn/CheckBtn";
import axios from "axios";

const GrammarLandBasicVerification = ({ contents, timer, handleNext }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const sendAnswer = () => {
    const data = {
      id: contents.basic.studyResponse.id,
      answer: inputValue,
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
    <>
      {/* <div>
        <div className="GrammarLand-basic-ver">
          <div className="GrammarLand-basic-ver-title">제목</div>
          <div className="GrammarLand-basic-ver-word">asdasd</div>
        </div>
        <div className="GrammarLand-basic-ver-answer-gather">
          <input type="text" className="GrammarLand-basic-ver-answer" />
        </div>
      </div> */}
      <div className="grammarFairy-basic-learning-explaination">
        <h1>{contents.basic.example}</h1>
      </div>
      <div className="wordBundle-basic-learning-word">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
      </div>
      <div className="button-container" onClick={sendAnswer}>
        <CheckBtn />
      </div>
    </>
  );
};

export default GrammarLandBasicVerification;
