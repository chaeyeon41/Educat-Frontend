import { useState } from "react";
import axios from "axios";
import "./signup.css";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const navigate = useNavigate();
  // 사용자 입력을 저장할 state 초기화
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [grade, setGrade] = useState();
  const [gender, setGender] = useState("");
  // 회원가입 처리 함수
  const handleSignUp = async () => {
    const userData = {
      id,
      password,
      name,
      grade,
      gender,
    };

    try {
      // axios를 사용하여 POST 요청 전송
      const response = await axios.post(
        "http://localhost:8080/register",
        userData
      );
      console.log("회원가입 성공:", response.data);
      window.alert("회원가입 성공");
      navigate("/");
    } catch (error) {
      window.alert("회원가입 실패", error);
      console.error("회원가입 실패:", error);
      console.log("회원", userData);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-form">
        <div className="signup-label">아이디</div>
        <input
          type="text"
          placeholder="아이디를 입력하세요."
          value={id}
          onChange={(e) => setId(e.target.value)}
          className="signup-input"
        />
        <div className="signup-label">비밀번호</div>
        <input
          type="password"
          placeholder="비밀번호를 입력하세요."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="signup-input"
        />
        <div className="signup-label">이름</div>
        <input
          type="text"
          placeholder="이름을 입력하세요."
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="signup-input"
        />
        <div className="signup-label">학년</div>
        <select
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
          className="signup-select"
        >
          <option value="1">1학년</option>
          <option value="2">2학년</option>
          <option value="3">3학년</option>
          <option value="4">4학년</option>
          <option value="5">5학년</option>
          <option value="6">6학년</option>
        </select>
        <div className="signup-label">성별</div>
        <input
          type="text"
          placeholder="성별을 입력하세요."
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="signup-input"
        />
        <button onClick={handleSignUp} className="signup-btn">
          회원가입
        </button>
      </div>
    </div>
  );
};

export default SignUpPage;
