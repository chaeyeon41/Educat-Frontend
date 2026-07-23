import React, { useState } from "react";
import "./FairyWorldDeepVerification.css";
import CheckBtn from "../../checkBtn/CheckBtn";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const FairyWorldDeepVerification = ({ contents, timer }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [clickedIndex, setClickedIndex] = useState(null);
  const [clickedItem, setClickedItem] = useState(null);
  const navigate = useNavigate();
  const handleButtonClick = (item, index) => {
    // 여기서 item.element 대신 index를 파라미터로 받습니다.
    setClickedIndex(index); // 클릭된 요소의 인덱스를 상태에 저장
    setClickedItem(item);
    console.log(item);
  };

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
  return (
    // <div className="fairy-world-deep-verification-container">
    //   <div
    //     className="fairy-world-deep-verification-image"
    //     onClick={toggleAudio}
    //   >
    //     <div className="fairy-bubble">
    //       ?<div className="fairy-bubble-tail"></div>
    //     </div>
    //     <img src="/images/logo/logo2.png" alt="동화이미지" />
    //   </div>
    //   <div className="fairy-world-deep-verification-buttons">
    //     <button>You can't catch me.</button>
    //     <button>I'm from Korea!</button>
    //     <button>Nice to meet you?</button>
    //   </div>
    //   <audio id="fairy-audio" controls style={{ display: "none" }}>
    //     <source src="/audio/your_audio_file.mp3" type="audio/mpeg" />
    //   </audio>
    // </div>
    <>
      <img
        src={contents.deep.image}
        alt="이미지"
        className="wordBundle-basic-learning-img"
      />
      <div className="basic-learning-wordabsorb-three">
        {contents.deep.worldThrees.map((item, index) => (
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

export default FairyWorldDeepVerification;
