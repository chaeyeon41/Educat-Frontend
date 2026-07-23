import React, { useState } from "react";
import "./FairyWorldBasicVerification.css";
import CheckBtn from "../../checkBtn/CheckBtn";
import axios from "axios";

const FairyWorldBasicVerification = ({ contents, timer, handleNext }) => {
  const [clickedIndex, setClickedIndex] = useState(null);
  const [clickedItem, setClickedItem] = useState(null);

  const handleButtonClick = (item, index) => {
    // 여기서 item.element 대신 index를 파라미터로 받습니다.
    setClickedIndex(index); // 클릭된 요소의 인덱스를 상태에 저장
    setClickedItem(item);
    console.log(item);
  };
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleAudio = () => {
    const audio = document.getElementById("fairy-audio");
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };
  const sendAnswer = () => {
    const data = {
      id: contents.basic.studyResponse.id,
      answer: clickedItem,
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
  return (
    <>
      <img
        src={contents.basic.image}
        alt="이미지"
        className="wordBundle-basic-learning-img"
      />
      <div className="basic-learning-wordabsorb-three">
        {contents.basic.worldThrees.map((item, index) => (
          <button
            key={index}
            onClick={() => handleButtonClick(item.element, index)} // 여기서 item.element 대신 index를 전달합니다.
            className={clickedIndex === index ? "clicked" : ""}
          >
            {item.element}
          </button>
        ))}
      </div>
      <div className="button-container" onClick={sendAnswer}>
        <CheckBtn />
      </div>
    </>
  );
};

export default FairyWorldBasicVerification;
