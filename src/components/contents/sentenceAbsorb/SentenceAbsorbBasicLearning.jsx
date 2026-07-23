import React, { useState } from "react";
import "./SentenceAbsorbBasicLearning.css";

const SentenceAbsorbBasicLearning = ({ contents }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleAudio = () => {
    const audio = document.getElementById("song-audio");
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };
  return (
    <>
      {contents.basic && (
        <>
          <img
            src={contents.basic.image}
            alt="이미지"
            className="wordBundle-basic-learning-img"
            onClick={toggleAudio}
          />

          <div className="wordBundle-basic-learning-word">
            <h1>{contents.basic.sentence}</h1>
            <h3>{contents.basic.sentence_meaning}</h3>
          </div>
          <audio id="song-audio" controls style={{ display: "none" }}>
            <source src={contents.basic.file} type="audio/mpeg" />
          </audio>
        </>
      )}
    </>
  );
};

export default SentenceAbsorbBasicLearning;
