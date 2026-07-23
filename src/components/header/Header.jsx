import "./header.css";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
const Header = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["loggedIn"]);
  const [cookies1, setCookie1, removeCookie1] = useCookies(["username"]);
  const navigate = useNavigate();

  const gohome = () => {
    navigate("/");
  };

  const sendLogout = () => {
    const url = "http://localhost:8080/logout";

    axios
      .get(url, { withCredentials: true })
      .then((response) => {
        window.alert("로그아웃이 완료되었습니다.");
        console.log(response);
        removeCookie("loggedIn");
        removeCookie1("username");
        navigate("/");
        window.location.reload();
      })
      .catch((error) => {
        window.alert("로그아웃 중 오류가 발생했습니다.");
        console.error("로그아웃 중 오류가 발생했습니다.", error);
      });
  };

  const goMypage = () => {
    navigate("/mypage");
  };
  const goLogin = () => {
    navigate("/login");
  };
  const goSignup = () => {
    navigate("/signup");
  };
  return (
    <div className="header-container">
      <div
        className="icon"
        onClick={() => {
          navigate("/mainSelect");
        }}
      >
        <img src="/images/logo/logo3.png" />
        {/* <div className="web-title">에듀켓</div> */}
      </div>
      <div className="nav">
        {cookies.loggedIn ? (
          <>
            <span className="nav-item">{cookies.username}님</span>

            <div className="nav-item" onClick={goMypage}>
              마이페이지
            </div>
            <div className="nav-item" onClick={sendLogout}>
              로그아웃
            </div>
          </>
        ) : (
          <>
            <div className="nav-item" onClick={goSignup}>
              회원가입
            </div>
            <div className="nav-item" onClick={goLogin}>
              로그인
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
