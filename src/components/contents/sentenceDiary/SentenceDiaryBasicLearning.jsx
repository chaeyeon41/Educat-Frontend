import React, { useRef } from "react";
import "./SentenceDiaryBasicLearning.css";

const SentenceDiaryBasicLearning = ({ contents }) => {
  // 오디오 요소를 위한 ref 생성
  const audioRef = useRef(null);

  // 이미지 클릭 시 오디오 재생
  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  return (
    <>
      <img
        src={contents.image}
        alt="이미지"
        className="wordBundle-basic-learning-img"
      />
      {/* 숨겨진 오디오 요소 추가 */}
      <audio ref={audioRef} src={contents.file} />

      <div className="wordBundle-basic-learning-word">
        <h1>{contents.sentence}</h1>
        <h3>{contents.sentence_meaning}</h3>
      </div>
    </>
  );
};

export default SentenceDiaryBasicLearning;
