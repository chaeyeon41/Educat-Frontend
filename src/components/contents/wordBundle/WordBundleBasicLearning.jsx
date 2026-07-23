import React, { useEffect } from "react";
import "./WordBundleBasicLearning.css";

const WordBundleBasicLearning = ({ contents }) => {
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
        <h1>{contents.word}</h1>
        <h3>{contents.wordMeaning}</h3>
      </div>
    </>
  );
};

export default WordBundleBasicLearning;
