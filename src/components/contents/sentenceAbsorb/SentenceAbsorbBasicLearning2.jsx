import React from "react";
import "./SentenceAbsorbBasicLearning2.css";

const SentenceAbsorbBasicLearning2 = () => {
  return (
    <div className="sentenceabsorb-basic-container">
      <div className="basic-learning-sentenceabsorb-male">
        <div className="basic-learning-sentenceabsorb-sentence">sentence1</div>
        <div className="basic-learning-sentenceabsorb-male-img">img</div>
      </div>
      <div className="basic-learning-sentenceabsorb-word">
        <div className="basic-learning-sentenceabsorb-word-img">img</div>
        <div className="basic-learning-sentenceabsorb-word-element">
          <button className="basic-learning-sentenceabsorb-audio">음성</button>
          <div className="basic-learning-sentenceabsorb-word-word">단어</div>
        </div>
      </div>
      <div className="basic-learning-sentenceabsorb-female">
        <div className="basic-learning-sentenceabsorb-sentence">sentence1</div>
        <div className="basic-learning-sentenceabsorb-male-img">img</div>
      </div>
    </div>
  );
};

export default SentenceAbsorbBasicLearning2;
