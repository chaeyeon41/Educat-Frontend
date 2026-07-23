import React, { useState } from "react";
import "./GrammarLandDeepVerification.css";
import CheckBtn from "../../checkBtn/CheckBtn";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const GrammarLandDeepVerification = ({ contents, timer }) => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const sendAnswer = () => {
    const data = {
      id: contents.basic.studyResponse.id,
      answer: inputValue,
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
      {/* <div>
        <div className="GrammarLand-basic-ver">
          <div className="GrammarLand-basic-ver-title">제목</div>
          <div className="GrammarLand-basic-ver-word">asdasd</div>
        </div>
        <div className="GrammarLand-basic-ver-answer-gather">
          <input type="text" className="GrammarLand-basic-ver-answer" />
        </div>
      </div>
      <div className="button-container">
        <CheckBtn />
      </div> */}
      <div className="grammarFairy-basic-learning-explaination">
        <h1>{contents.deep.example}</h1>
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

export default GrammarLandDeepVerification;
