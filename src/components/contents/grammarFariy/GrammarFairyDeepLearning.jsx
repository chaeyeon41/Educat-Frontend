import React from "react";
import "./GrammarFairyDeepLearning.css";

const GrammarFairyDeepLearning = ({ contents }) => {
  return (
    // <div>
    //   <div className="GrammarLand-basic-learning">
    //     <div className="GrammarLand-basic-learning-word">deep</div>
    //     <div className="GrammarLand-basic-learning-explanation">asdas</div>
    //   </div>
    // </div>
    <>
      <div className="grammarFairy-basic-learning-explaination">
        <h1>{contents.deep.sentence}</h1>
      </div>

      <div className="wordBundle-basic-learning-word">
        <h2>{contents.deep.explanation}</h2>
      </div>
    </>
  );
};

export default GrammarFairyDeepLearning;
