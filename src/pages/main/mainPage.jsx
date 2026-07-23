import React from "react";
import "./mainPage.css";

const mainPage = () => {
  return (
    <div className="mainp-container">
      <div className="mainp-left-main">
        <div className="mainp-left-main-top">
          <div className="mainp-title">단원</div>
          <div className="mainp-content">
            <ul className="mainp-ul">
              <li className="mainp-firstli">1단원</li>
              <li className="mainp-li">2단원</li>
              <li className="mainp-li">3단원</li>
              <li className="mainp-li">4단원</li>
            </ul>
            <ul className="mainp-ul">
              <li className="mainp-firstli">5단원</li>
              <li className="mainp-li">6단원</li>
              <li className="mainp-li">7단원</li>
              <li className="mainp-li">8단원</li>
            </ul>
          </div>
        </div>
        <div className="mainp-left-main-bottom">
          <div className="mainp-title">능력치</div>
          <div className="mainp-content-right2"></div>
        </div>
      </div>
      <div className="mainp-right-main">
        <div className="mainp-right-main-top">
          <div className="mainp-title-right">레슨</div>
          <div className="mainp-content-right">
            <div className="mainp-lesson1">
              <ul className="mainp-lesson-ul">
                <li className="mainp-lesson-li">Lesson 1</li>
                <li className="mainp-lesson-li">Lesson 2</li>
              </ul>
            </div>
            <div className="mainp-lesson2">
              <span className="mainp-lesson2-span">
                Lesson 1 What’s your name?
              </span>
            </div>
          </div>
        </div>

        <div className="mainp-right-main-bottom">
          <div className="mainp-title">단원</div>
          <div className="mainp-content-right2">
            <ul className="mainp-ul2">
              <li className="mainp-firstli2">단어뭉치</li>
              <li className="mainp-li2">어휘력쑥쑥</li>
              <li className="mainp-li2">문장일기</li>
              <li className="mainp-li2">문장쏙쏙</li>
              <li className="mainp-li2">문법요정</li>
            </ul>
            <ul className="mainp-ul2">
              <li className="mainp-firstli2">문법나라</li>
              <li className="mainp-li2">동화여행</li>
              <li className="mainp-li2">동화세상</li>
              <li className="mainp-li2">동요여행</li>
              <li className="mainp-li2">동요나라</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default mainPage;
