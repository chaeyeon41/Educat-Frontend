import React, { useState } from "react";
import "./SentenceAbsorbDeepLearning.css";

const SentenceAbsorbDeepLearning = ({ contents }) => {
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
      <img
        src={contents.deep.image}
        alt="이미지"
        className="wordBundle-basic-learning-img"
        onClick={toggleAudio}
      />

      <div className="wordBundle-basic-learning-word">
        <h1>{contents.deep.sentence}</h1>
        <h3>{contents.deep.sentence_meaning}</h3>
      </div>
      <audio id="song-audio" controls style={{ display: "none" }}>
        <source src={contents.deep.file} type="audio/mpeg" />
      </audio>
    </>
  );
};

export default SentenceAbsorbDeepLearning;
