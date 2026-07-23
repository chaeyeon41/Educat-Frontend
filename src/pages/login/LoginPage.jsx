import React, { useState } from "react";
import axios from "axios";
import "./login.css";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
const LoginPage = () => {
  // 상태 초기화
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cookies, setCookie] = useCookies(["loggedIn"]);
  const [cookies1, setCookie1] = useCookies(["username"]);
  const navigate = useNavigate();
  // 로그인 처리 함수
  const handleLogin = () => {
    if (!username.trim() || !password.trim()) {
      window.alert("아이디와 비밀번호를 입력하세요.");
      return;
    }
    if (cookies.loggedIn) {
      window.alert("이미 로그인되어 있습니다.");
      return;
    }

    const data = {
      username: username,
      password: password,
    };
    const url = "http://localhost:8080/login";

    axios
      .post(url, data, { withCredentials: true })
      .then((response) => {
        window.alert("로그인이 완료되었습니다.");
        console.log(response.Cookies);
        setCookie("loggedIn", true, {
          path: "/",
          expires: new Date(Date.now() + 30 * 60 * 1000),
        });
        setCookie1("username", username, {
          path: "/",
          expires: new Date(Date.now() + 30 * 60 * 1000),
        });
        navigate("/mainSelect");
        console.log(response.data);
      })
      .catch((error) => {
        window.alert("로그인 중 오류가 발생했습니다.");
        console.error("로그인 중 오류가 발생했습니다.", error);
      });
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleLogin();
    }
  };
  return (
    <div className="login-container">
      <div className="login-form">
        <div className="login-label">아이디</div>
        <input
          className="login-input"
          type="text"
          placeholder="아이디를 입력하세요."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <div className="login-label">비밀번호</div>
        <input
          className="login-input"
          type="password" // 비밀번호 입력은 type을 "password"로 변경하여 보안 강화
          placeholder="비밀번호를 입력하세요."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button onClick={handleLogin} className="login-btn">
          로그인
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
