import React, { useEffect, useState } from "react";
import "./mainp.css";
import TwoMainUnit from "../../components/mainUnit/twoMainUnit";
import OneMainUnit from "../../components/mainUnit/oneMainunit";
import AbilitiesChart from "../../components/chart/AbilitiesChart";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
const MainP = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["loggedIn"]);
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [abilities, setAbilities] = useState([
    { name: "어휘", level: 50 },
    { name: "문장", level: 50 },
    { name: "문법", level: 50 },
    { name: "이해", level: 50 },
    { name: "소통", level: 50 },
    { name: "집중", level: 50 },
  ]);
  const transformData = (data) => {
    return [
      { name: "어휘", level: data.word },
      { name: "문장", level: data.sentence },
      { name: "문법", level: data.grammar },
      { name: "이해", level: data.understand },
      { name: "표현", level: data.expression },
      { name: "집중", level: data.focus },
    ];
  };
  const renderComponent = () => {
    switch (currentStep) {
      case 1:
        return <OneMainUnit />;
      case 2:
        return <TwoMainUnit />;
      default:
        return null;
    }
  };
  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/rating`, {
        withCredentials: true,
      });
      const responseData = response.data.data; // response.data는 이미 JavaScript 객체로 사용 가능합니다.
      const role = responseData.role;
      if (role == "parent") {
        navigate("/mainParent");
      } else {
        navigate("/");
      }
      if (response.data && response.data.result) {
        setAbilities(transformData(response.data.data));
      }
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  // 사용자 입력을 저장할 state 초기화
  const [comment, setComment] = useState(
    "어서와~ 꿈 속 우주공간은 처음이지? 여행하고 싶은 행성을 골라봐~"
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/member", {
          withCredentials: true,
        });
        console.log(response);
        setComment(response.data.data.comment);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="mainp-container">
      <div className="mainp-left-wrap">
        <div className="mainp-left-top">
          <img src="/images/good.png" className="mainp-left-img" />
          <div className="mainp-left-top-div">
            {comment}
            <div className="bubble-tail"></div>
          </div>
        </div>
        <div className="mainp-left">
          <AbilitiesChart abilities={abilities} />
        </div>
      </div>
      <div className="mainp-right">
        <div className="mainp-menu">
          <ul>
            {[...Array(8).keys()].map((index) => (
              <li
                key={index + 1}
                className={currentStep === index + 1 ? "active" : ""}
                onClick={() => {
                  setCurrentStep(index + 1);
                  console.log(currentStep);
                }}
              >
                {index + 1}단원
              </li>
            ))}
          </ul>
        </div>
        <div className="mainp-components">
          <OneMainUnit initialStep={currentStep} />
        </div>
      </div>
    </div>
  );
};

export default MainP;
