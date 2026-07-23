import React, { useState } from "react";
import "./SongWorldBasicLearning.css";

const SongWorldBasicLearning = ({ contents }) => {
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
      {contents && (
        <div className="song-world-container" onClick={toggleAudio}>
          <div className="song-world-image">
            <img src={contents.basic.image} alt="동요이미지" />
          </div>
          <div className="song-world-sentence-container">
            <div className="song-world-sentence">
              <h2>{contents.basic.sentence}</h2>
            </div>
            <div className="song-world-sentence">
              <h2>{contents.basic.sentenceMeaning}</h2>
            </div>
            <audio id="song-audio" controls style={{ display: "none" }}>
              <source src={contents.basic.file} type="audio/mpeg" />
            </audio>
          </div>
        </div>
      )}
    </>
  );
};

export default SongWorldBasicLearning;
