import React, { useState, useRef } from "react";
import "./SongCountryBasicLearning.css";

const SongCountryBasicLearning = ({ contents }) => {
  const [currentAudio, setCurrentAudio] = useState("");
  const audioRef = useRef(null);

  const toggleAudio = (audioSource) => {
    if (currentAudio === audioSource && audioRef.current) {
      if (!audioRef.current.paused) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    } else {
      setCurrentAudio(audioSource);
      // 오디오 소스 변경 후 재생
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.load(); // 새 소스로 오디오를 다시 로드
        audioRef.current.play();
      }
    }
  };

  return (
    <>
      {contents && (
        <>
          <div
            className="basic-learning-songcountry-img-container"
            onClick={() =>
              toggleAudio(contents.basic.countryTwoFiles[0].element)
            }
          >
            <div className="basic-learning-songcountry-img1">
              <img src="images/good.png" alt="" />
            </div>
            <h2>{contents.basic.countryTwoFiles[0].sentence}</h2>
            <h3>{contents.basic.countryTwoFiles[0].sentenceMeaning}</h3>
          </div>

          <audio ref={audioRef} controls style={{ display: "none" }}>
            <source src={currentAudio} type="audio/mpeg" />
          </audio>
        </>
      )}
    </>
  );
};

export default SongCountryBasicLearning;
