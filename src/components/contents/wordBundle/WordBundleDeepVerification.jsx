import React, { useEffect, useState } from "react";
import "./WordBundleDeepVerification.css";
import CheckBtn from "../../checkBtn/CheckBtn";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const WordBundleDeepVerification = ({ contents, timer }) => {
  const [inputFocus, setInputFocus] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();
  if (!contents) {
    return <div>Loading...</div>;
  }

  // 문장의 특정 단어를 마스킹하는 함수
  const maskSentence = (sentence, wordToMask) => {
    let words = sentence.split(" ");
    let maskedWords = words.map((word) => {
      if (word.toLowerCase() === wordToMask.toLowerCase()) {
        return word[0] + "_ ".repeat(word.length - 1);
      }
      return word;
    });
    return maskedWords.join(" ");
  };

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

  const maskedSentence = contents.sentence
    ? maskSentence(contents.sentence, contents.word)
    : "";
  const sendAnswer = () => {
    const data = {
      id: contents.studyResponse.id,
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
        } else if (response.data.data.isChecked === 2) {
          window.alert("슬퍼요.. 틀리셨습니다.");
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
      <img
        src={contents.image}
        alt="이미지"
        className="wordBundle-basic-learning-img"
      />

      <div className="wordBundle-basic-learning-word">
        <input
          type="text"
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          value={inputValue}
          placeholder={!inputFocus ? maskedSentence : ""}
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

export default WordBundleDeepVerification;
