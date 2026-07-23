import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
import LoginPage from "./pages/login/LoginPage";
import SignUpPage from "./pages/signup/SignUpPage";
import MyPage from "./pages/my/MyPage";
import Mainp from "./pages/main/mainp";
import StudyMainWordBundle from "./pages/studyMainWordBundle/StudyMainWordBundle";
import StudyMainGrammarLand from "./pages/studyMainGrammarLand/StudyMainGrammarLand";
import StudyMainWordAbsorb from "./pages/studyMainWordAbsorb/StudyMainWordAbsorb";
import StudyMainGrammarFairy from "./pages/studyMainGrammarFairy/studyMainGrammarFairy";
import StudyMainSentenceDiary from "./pages/studyMainSentenceDiary/StudyMainSentenceDiary";
import StudyMainSongCountry from "./pages/studyMainSongCountry/StudyMainSongCountry";
import StudyMainSentenceAbsorb from "./pages/studyMainSentenceAbsorb/StudyMainSentenceAbsorb";
import OneMainUnit from "./components/mainUnit/oneMainunit";
import "./App.css";
import mainBodyImage from "./assets/mainbody.png";
import StudyMainSongWorld from "./pages/studyMainSongWorld/StudyMainSongWorld";
import StudyMainFairyWorld from "./pages/studyMainFairyWorld/StudyMainFairyWorld";
import StudyMainFairyTravel from "./pages/studyMainFairyTravel/StudyMainFairyTravel";
import MainStudent from "./pages/main/MainStudent";
import MainTeacher from "./pages/main/MainTeacher";
import MainTeacher2 from "./pages/main/MainTeacher2";
import MainParent from "./pages/main/MainParent";
import MainSelect from "./pages/main/MainSelect";

function App() {
  return (
    <div
      style={{
        backgroundImage: `url(${mainBodyImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "100vh",
        margin: 0,
      }}
    >
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Mainp />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route
            path="/studymain-grammarland"
            element={<StudyMainGrammarLand />}
          />
          <Route
            path="/studymain-wordbundle"
            element={<StudyMainWordBundle />}
          />
          <Route
            path="/studymain-wordabsorb"
            element={<StudyMainWordAbsorb />}
          />
          <Route
            path="/studymain-grammarfairy"
            element={<StudyMainGrammarFairy />}
          />
          <Route
            path="/studymain-sentencediary"
            element={<StudyMainSentenceDiary />}
          />
          <Route
            path="/studymain-songcountry"
            element={<StudyMainSongCountry />}
          />
          <Route path="/studymain-songworld" element={<StudyMainSongWorld />} />
          <Route
            path="/studymain-sentenceabsorb"
            element={<StudyMainSentenceAbsorb />}
          />
          <Route
            path="/studymain-fairyworld"
            element={<StudyMainFairyWorld />}
          />
          <Route
            path="/studymain-fairytravel"
            element={<StudyMainFairyTravel />}
          />
          <Route path="/oneMainUnit" element={<OneMainUnit />} />
          <Route path="/mainStudent" element={<MainStudent />} />
          <Route path="/mainTeacher" element={<MainTeacher />} />
          <Route path="/mainTeacher2" element={<MainTeacher2 />} />
          <Route path="/mainParent" element={<MainParent />} />
          <Route path="/mainSelect" element={<MainSelect />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
