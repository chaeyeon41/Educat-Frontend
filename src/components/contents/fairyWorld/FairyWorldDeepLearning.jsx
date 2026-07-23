import React, { useState } from "react";
import "./FairyWorldBasicLearning.css";

const FairyWorldDeepLearning = ({ contents }) => {
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

  return (
    <>
      {contents && (
        <div className="fairy-world-container" onClick={toggleAudio}>
          <div className="fairy-world-image">
            <img src={contents.deep.image} alt="동화이미지" />
          </div>
          <div className="fairy-world-sentence-container">
            <div className="fairy-world-sentence">
              <h2>{contents.deep.sentence}</h2>
            </div>
            <div className="fairy-world-sentence_meaning">
              <h2>{contents.deep.sentenceMeaning}</h2>
            </div>
            <audio id="fairy-audio" controls style={{ display: "none" }}>
              <source src={contents.deep.file} type="audio/mpeg" />
            </audio>
          </div>
        </div>
      )}
    </>
  );
};

export default FairyWorldDeepLearning;
