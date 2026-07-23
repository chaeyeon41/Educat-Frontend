import React, { useEffect, useState } from "react";
import "./lesson1.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";

const Lesson1 = ({ mainStep, lessonStep }) => {
  const [planetStep, setPlanetStep] = useState(0);
  const [cookies1, setCookie1] = useCookies(["username"]);
  const [recom, setRecom] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    console.log("mainStep" + mainStep);
    console.log("lessonStep" + lessonStep);
  }, [mainStep, lessonStep]);

  const goWordAbsorb = () => {
    const updatedPlanetStep = 1; // 업데이트된 행성 값을 변수에 저장
    setPlanetStep(updatedPlanetStep); // 행성 값을 업데이트
    navigate("/studymain-wordabsorb", {
      state: { mainStep, lessonStep, planetStep: updatedPlanetStep }, // 업데이트된 행성 값을 전달
    });
  };
  const goWordBundle = () => {
    const updatedPlanetStep = 2; // 업데이트된 행성 값을 변수에 저장
    setPlanetStep(updatedPlanetStep); // 행성 값을 업데이트
    navigate("/studymain-wordbundle", {
      state: { mainStep, lessonStep, planetStep: updatedPlanetStep }, // 업데이트된 행성 값을 전달
    });
  };
  const goSentenceDiary = () => {
    const updatedPlanetStep = 3;
    setPlanetStep(updatedPlanetStep);
    navigate("/studymain-sentencediary", {
      state: { mainStep, lessonStep, planetStep: updatedPlanetStep },
    });
  };
  const goSentenceAbsorb = () => {
    const updatedPlanetStep = 4;
    setPlanetStep(updatedPlanetStep);
    navigate("/studymain-sentenceabsorb", {
      state: { mainStep, lessonStep, planetStep: updatedPlanetStep },
    });
  };
  const goGrammarFairy = () => {
    const updatedPlanetStep = 5;
    setPlanetStep(updatedPlanetStep);
    navigate("/studymain-grammarfairy", {
      state: { mainStep, lessonStep, planetStep: updatedPlanetStep },
    });
  };
  const goGrammarLand = () => {
    const updatedPlanetStep = 6;
    setPlanetStep(updatedPlanetStep);
    navigate("/studymain-grammarland", {
      state: { mainStep, lessonStep, planetStep: updatedPlanetStep },
    });
  };
  const goFairyTravel = () => {
    const updatedPlanetStep = 7;
    setPlanetStep(updatedPlanetStep);
    navigate("/studymain-fairytravel", {
      state: { mainStep, lessonStep, planetStep: updatedPlanetStep },
    });
  };
  const goFairyWorld = () => {
    const updatedPlanetStep = 8;
    setPlanetStep(updatedPlanetStep);
    navigate("/studymain-fairyworld", {
      state: { mainStep, lessonStep, planetStep: updatedPlanetStep },
    });
  };
  const goSongTravel = () => {
    const updatedPlanetStep = 9;
    setPlanetStep(updatedPlanetStep);
    navigate("/studymain-songworld", {
      state: { mainStep, lessonStep, planetStep: updatedPlanetStep },
    });
  };
  const goSongCountry = () => {
    const updatedPlanetStep = 10;
    setPlanetStep(updatedPlanetStep);
    navigate("/studymain-songcountry", {
      state: { mainStep, lessonStep, planetStep: updatedPlanetStep },
    });
  };
  const [solved, setSolved] = useState([]);
  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/member/solved`, {
        withCredentials: true,
      });
      if (response.data && response.data.result) {
        setSolved(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };
  const fetchDataRecommend = async () => {
    const username = cookies1.username;
    try {
      const response = await axios.post(
        `http://165.229.169.32:32344/recommend`,
        { student_id: username },
        {
          withCredentials: true,
        }
      );
      setRecom(response.data.recommended_content);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };
  useEffect(() => {
    fetchData();
    fetchDataRecommend();
  }, []);

  useEffect(() => {
    console.log(solved);
    console.log(recom[0]);
  }, [solved, recom]);
  const isContentSolved = (studyType) => {
    return solved.some(
      (item) =>
        item.study.chapter === mainStep &&
        item.study.lesson === lessonStep &&
        item.study.studyType === studyType
    );
  };
  const isContentRecommended = (studyType) => {
    return recom.some(
      (item) =>
        item[0] === mainStep && item[1] === lessonStep && item[2] === studyType
    );
  };

  const getContentContainer = (imageName, isChecked, isRecommended) => (
    <div className="content-img-container">
      {isChecked && (
        <img className="flag" src="/images/clear/flag.png" alt="clear" />
      )}
      {isRecommended && (
        <img
          className="recommand"
          src="/images/clear/star.png"
          alt="recommand"
        />
      )}
      <img src={`/images/${imageName}.png`} alt={imageName} />
    </div>
  );
  const getLessonTitle = () => {
    if (mainStep === 1 && lessonStep === 1) {
      return `Lesson ${lessonStep} : All about me`;
    } else if (mainStep === 1 && lessonStep === 2) {
      return `Lesson ${lessonStep} : My best friend`;
    } else {
      return `Lesson ${lessonStep}`;
    }
  };
  return (
    <div className="lesson">
      <h2 className="lesson-h2">
        <mark>{getLessonTitle()}</mark>
      </h2>
      <p className="lesson-p">컨텐츠 행성</p>
      <div className="lesson-contents">
        <ul className="lesson">
          <li onClick={goWordAbsorb}>
            <div className="lession-container">
              <div className="content-img-container">
                {getContentContainer(
                  "wordabsorb",
                  isContentSolved("어휘력쑥쑥"),
                  isContentRecommended("어휘력쑥쑥")
                )}
              </div>
              <div className="lession-content-name">어휘럭 쑥쑥</div>
            </div>
          </li>
          <li onClick={goWordBundle}>
            <div className="lession-container">
              <div className="content-img-container">
                {getContentContainer(
                  "wordbundle",
                  isContentSolved("단어뭉치"),
                  isContentRecommended("단어뭉치")
                )}
              </div>
              <div className="lession-content-name">단어 뭉치</div>
            </div>
          </li>
          <li onClick={goSentenceDiary}>
            <div className="lession-container">
              <div className="content-img-container">
                {getContentContainer(
                  "sentencediary",
                  isContentSolved("문장일기"),
                  isContentRecommended("문장일기")
                )}
              </div>
              <div className="lession-content-name">문장 일기</div>
            </div>
          </li>
          <li onClick={goSentenceAbsorb}>
            <div className="lession-container">
              <div className="content-img-container">
                {getContentContainer(
                  "sentenceabsorb",
                  isContentSolved("문장쏙쏙"),
                  isContentRecommended("문장쏙쏙")
                )}
              </div>
              <div className="lession-content-name">문장 쑥쑥</div>
            </div>
          </li>
          <li onClick={goGrammarFairy}>
            <div className="lession-container">
              <div className="content-img-container">
                {getContentContainer(
                  "grammerfariy",
                  isContentSolved("문법요정"),
                  isContentRecommended("문법요정")
                )}
              </div>
              <div className="lession-content-name">문법 요정</div>
            </div>
          </li>
        </ul>
        <ul>
          <li onClick={goGrammarLand}>
            <div className="lession-container">
              <div className="content-img-container">
                {getContentContainer(
                  "grammerland",
                  isContentSolved("문법랜드"),
                  isContentRecommended("문법랜드")
                )}
              </div>
              <div className="lession-content-name">문법 랜드</div>
            </div>
          </li>
          <li onClick={goFairyTravel}>
            <div className="lession-container">
              <div className="content-img-container">
                {getContentContainer(
                  "fairytravel",
                  isContentSolved("동화여행"),
                  isContentRecommended("동화여행")
                )}
              </div>
              <div className="lession-content-name">동화 여행</div>
            </div>
          </li>
          <li onClick={goFairyWorld}>
            <div className="lession-container">
              <div className="content-img-container">
                {getContentContainer(
                  "fairyworld",
                  isContentSolved("동화세상"),
                  isContentRecommended("동화세상")
                )}
              </div>
              <div className="lession-content-name">동화 세상</div>
            </div>
          </li>
          <li onClick={goSongTravel}>
            <div className="lession-container">
              <div className="content-img-container">
                {getContentContainer(
                  "songtravel",
                  isContentSolved("동요세상"),
                  isContentRecommended("동요세상")
                )}
              </div>
              <div className="lession-content-name">동요 세상</div>
            </div>
          </li>
          <li onClick={goSongCountry}>
            <div className="lession-container">
              <div className="content-img-container">
                {getContentContainer(
                  "songcountry",
                  isContentSolved("동요나라"),
                  isContentRecommended("동요나라")
                )}
              </div>
              <div className="lession-content-name">동요 나라</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Lesson1;
