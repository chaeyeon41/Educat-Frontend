import React, { useState } from "react";
import "./SongWorldBasicLearning.css";

const SongWorldDeepLearning = ({ contents }) => {
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
    <div className="song-world-container">
      <div className="song-world-image" onClick={toggleAudio}>
        <img src={contents.deep.image} alt="동요이미지" />
      </div>
      <div className="song-world-sentence-container">
        <div className="song-world-sentence">
          <h2>{contents.deep.sentence}</h2>
        </div>
        <div className="song-world-sentence">
          <h2>{contents.deep.sentenceMeaning}</h2>
        </div>
        <audio id="song-audio" controls style={{ display: "none" }}>
          <source src={contents.deep.file} type="audio/mpeg" />
        </audio>
      </div>
    </div>
  );
};

export default SongWorldDeepLearning;
