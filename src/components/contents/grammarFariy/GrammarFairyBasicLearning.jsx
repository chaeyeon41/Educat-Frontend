import React from "react";
import "./GrammarFairyBasicLearning.css";

const GrammarFairyBasicLearning = ({ contents }) => {
  return (
    // <div>
    //   <div className="GrammarFairy-basic-learning">
    //     <div className="GrammarFairy-basic-learning-word">
    //       {contents.basic.example}
    //     </div>
    //     <div className="GrammarFairy-basic-learning-explanation">
    //       {contents.basic.explanation}
    //     </div>
    //   </div>
    // </div>
    <>
      {contents && (
        <>
          <div className="grammarFairy-basic-learning-explaination">
            <h1>{contents.basic.sentence}</h1>
          </div>

          <div className="wordBundle-basic-learning-word">
            <h2>{contents.basic.explanation}</h2>
          </div>
        </>
      )}
    </>
  );
};

export default GrammarFairyBasicLearning;
