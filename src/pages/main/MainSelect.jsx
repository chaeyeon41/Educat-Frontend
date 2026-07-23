import React, { useEffect } from "react";
import "./MainParent.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const MainSelect = () => {
  const navigate = useNavigate();
  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/rating`, {
        withCredentials: true,
      });
      const responseData = response.data.data; // response.data는 이미 JavaScript 객체로 사용 가능합니다.
      const role = responseData.role;
      if (role == "parent") {
        navigate("/mainParent");
      } else if (role == "teacher") {
        navigate("/mainTeacher");
      } else {
        navigate("/mainStudent");
      }

      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return <div>loading...</div>;
};

export default MainSelect;
