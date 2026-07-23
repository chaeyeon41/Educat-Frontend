import React, { useEffect, useState } from "react";
import "./oneMainUnit.css";
import Lesson1 from "../lessons/lesson1";

const OneMainUnit = ({ initialStep }) => {
  const [currentStep, setCurrentStep] = useState(1);
  useEffect(() => {
    setCurrentStep(1); // 단원 변경 시 항상 첫 번째 레슨 선택
  }, [initialStep]); // initialStep 변경 감지

  return (
    <div className="mainunit-container">
      <div className="steps-nav">
        {[...Array(2).keys()].map((index) => (
          <div
            key={index + 1}
            className={`mainunit-lesson ${
              currentStep === index + 1 ? "selected" : ""
            }`}
            onClick={() => {
              setCurrentStep(index + 1);
            }}
          >
            Lesson {index + 1}
          </div>
        ))}
      </div>
      <Lesson1 mainStep={initialStep} lessonStep={currentStep} />
    </div>
  );
};

export default OneMainUnit;
