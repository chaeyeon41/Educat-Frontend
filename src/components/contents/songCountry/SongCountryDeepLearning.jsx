import React, { useRef, useState } from "react";
import "./SongCountryBasicLearning.css";

const SongCountryDeepLearning = ({ contents }) => {
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
              toggleAudio(contents.deep.countryTwoFiles[0].element)
            }
          >
            <div className="basic-learning-songcountry-img2">
              <img src="images/good3.png" alt="" />
            </div>
            <div className="basic-learning-songcountry-sentence">
              <h2>{contents.deep.countryTwoFiles[0].sentence}</h2>
              <h3>{contents.deep.countryTwoFiles[0].sentenceMeaning}</h3>
            </div>
          </div>

          <audio ref={audioRef} controls style={{ display: "none" }}>
            <source src={currentAudio} type="audio/mpeg" />
          </audio>
        </>
      )}
    </>
  );
};

export default SongCountryDeepLearning;
