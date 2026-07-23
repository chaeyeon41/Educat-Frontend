import React, { useState } from "react";
import "./WordBundleBasicVerification.css";
import CheckBtn from "../../checkBtn/CheckBtn";
import axios from "axios";

const WordBundleBasicVerification = ({ contents, timer, handleNext }) => {
  const [inputFocus, setInputFocus] = useState(false);
  const [inputValue, setInputValue] = useState("");

  if (!contents) {
    return <div>Loading...</div>;
  }

  // 단어의 첫 글자를 제외한 나머지 글자를 밑줄로 변환하는 함수
  const maskedWord = contents.word
    ? contents.word[0] + "_ ".repeat(contents.word.length - 1)
    : "";

  // 사용자가 입력을 시작하면 placeholder를 비워주는 함수
  const handleFocus = () => setInputFocus(true);
  const handleBlur = () => {
    if (!inputValue) {
      setInputFocus(false);
    }
  };
  const handleChange = (e) => {
    setInputValue(e.target.value);
    console.log(inputValue);
  };
  const sendAnswer = () => {
    const data = {
      id: contents.studyResponse.id,
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
      <img
        src={contents.image}
        alt="이미지"
        className="wordBundle-basic-learning-img"
      />

      <div className="wordBundle-basic-learning-word">
        <input
          type="text"
          placeholder={!inputFocus && !inputValue ? maskedWord : ""}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          value={inputValue}
          onKeyDown={handleKeyDown}
        />
        <h3>{contents.word_meaning}</h3>
      </div>
      <div className="button-container" onClick={sendAnswer}>
        <CheckBtn />
      </div>
    </>
  );
};

export default WordBundleBasicVerification;
