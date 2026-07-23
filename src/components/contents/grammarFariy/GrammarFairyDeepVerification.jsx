import React, { useState } from "react";
import "./GrammarFairyDeepVerification.css";
import CheckBtn from "../../checkBtn/CheckBtn";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const GrammarFairyDeepVerification = ({ contents, timer }) => {
  const [clickedIndex, setClickedIndex] = useState(null);
  const [clickedItem, setClickedItem] = useState(null);
  const [answer, setAnswer] = useState([1, 2]);
  const navigate = useNavigate();
  const handleButtonClick = (item, index) => {
    // 여기서 item.element 대신 index를 파라미터로 받습니다.
    setClickedIndex(index); // 클릭된 요소의 인덱스를 상태에 저장
    setClickedItem(item);
    console.log(item);
  };
  const sendAnswer = () => {
    const data = {
      id: contents.basic.studyResponse.id,
      answer: clickedIndex + 1,
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
    // <>
    //   <div>
    //     <div className="GrammarFairy-deep-ver">
    //       <div className="GrammarFairy-deep-ver-title">제목</div>
    //       <div className="GrammarFairy-deep-ver-word">asdasd</div>
    //     </div>
    //     <div className="GrammarFairy-deep-ver-answer-gather">
    //       <input type="text" className="GrammarFairy-deep-ver-answer" />
    //     </div>
    //   </div>
    //   <div className="button-container">
    //     <CheckBtn />
    //   </div>
    // </>
    <>
      <div className="grammarFairy-basic-learning-explaination">
        <h1>{contents.deep.example}</h1>
        <h3>{contents.deep.sentenceFairy}</h3>
      </div>
      <div className="basic-learning-wordabsorb-three">
        {answer.map((item, index) => (
          <button
            key={index}
            onClick={() => handleButtonClick(item, index)} // 여기서 item.element 대신 index를 전달합니다.
            className={clickedIndex === index ? "clicked" : ""}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="button-container" onClick={sendAnswer}>
        <CheckBtn />
      </div>
    </>
  );
};

export default GrammarFairyDeepVerification;
