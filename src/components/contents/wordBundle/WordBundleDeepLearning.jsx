import React from "react";
import "./WordBundleDeepLearning.css";

const WordBundleDeepLearning = ({ contents }) => {
  if (!contents) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <img
        src={contents.image}
        alt="이미지"
        className="wordBundle-basic-learning-img"
      />

      <div className="wordBundle-basic-learning-word">
        <h1>{contents.sentence}</h1>
        <h3>{contents.sentence_meaning}</h3>
      </div>
    </>
  );
};

export default WordBundleDeepLearning;
