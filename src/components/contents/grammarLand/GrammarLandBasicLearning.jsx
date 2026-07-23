import React from "react";
import "./GrammarLandBasicLearning.css";

const GrammarLandBasicLearning = ({ contents }) => {
  const explanationItems = contents?.basic.explanation
    .split(",")
    .map((item, index) => (
      <h3 key={index} className="explanation-list-item">
        {item.trim()}
      </h3>
    ));
  return (
    // <div>
    //   <div className="GrammarLand-basic-learning">
    //     <div className="GrammarLand-basic-learning-word">asdasd</div>
    //     <div className="GrammarLand-basic-learning-explanation">asdas</div>
    //   </div>
    // </div>
    <>
      {contents && (
        <>
          <div className="grammarFairy-basic-learning-explaination">
            <h1>{contents.basic.sentence1}</h1>
            <h1>{contents.basic.sentence2}</h1>
          </div>

          <div className="wordBundle-basic-learning-word">
            <h2>{contents.basic.explanation}</h2>
          </div>
        </>
      )}
    </>
  );
};

export default GrammarLandBasicLearning;
