import { useState, useEffect } from 'react';
import axios from 'axios';
import './MyPage.css';

const MyPage = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/member', {
          withCredentials: true,
        });
        console.log(response);
        setId(response.data.data.id);
        setGrade(response.data.data.grade);
        setName(response.data.data.name);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  // 사용자 입력을 저장할 state 초기화
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [grade, setGrade] = useState('');

  // 회원가입 처리 함수

  return (
    <div className="signup-container">
      <div className="signup-form">
        <div>내 프로필</div>
        <p>아이디 : {id}</p>
        <p>이름 : {name}</p>
        <p>학년 : {grade}</p>
      </div>
    </div>
  );
};

export default MyPage;
