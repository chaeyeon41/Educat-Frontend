import React, { useState } from "react";
import "./twoMainUnit.css";

const Lesson1 = () => (
  <div className="lesson">
    <h1>Lesson 12단원</h1>
    <p>Content for Lesson 1...</p>
  </div>
);

const Lesson2 = () => (
  <div className="lesson">
    <h1>2단원</h1>
    <p>Content for Lesson 2...</p>
  </div>
);

const TwoMainUnit = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const renderLesson = () => {
    switch (currentStep) {
      case 1:
        return <Lesson1 />;
      case 2:
        return <Lesson2 />;
      default:
        return <Lesson1 />;
    }
  };

  return (
    <div className="mainunit-container">
      <div className="steps-nav">
        <button onClick={() => setCurrentStep(1)}>Lesson 1</button>
        <button onClick={() => setCurrentStep(2)}>Lesson 2</button>
      </div>
      {renderLesson()}
    </div>
  );
};

export default TwoMainUnit;
