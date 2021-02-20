import styled from "styled-components";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import Router from 'next/router';

const axios = require("axios");

const LoginModal = styled(motion.div)`
  position: absolute;
  z-index: 999;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.15);
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  #ax {
    position: absolute;
    top: 3%;
    right: 4%;
  }

  .box {
    width: 34.21vw;
    text-align: center;
    max-width: 656.85px;
    height: 83.24vh;
    max-height: 899px;
    background-color: white;
    border-radius: 30px;
    margin-bottom: 20px;
    padding: 5vh 3.75vw;

    h1 {
      color: #5378c6;
      opacity: 0.34;
      font-size: 40px;
      font-weight: 500;
    }

    h2 {
      margin-top: 1.85vh;
      font-size: 30px;
      font-weight: 600;
      color: #767676;
      margin-bottom: 4.63vh;
    }

    #input-box {
      input {
        padding-left: 1.5vw;
        width: 100%;
        height: 5.83vh;
        border: 1px solid #999999;
        font-size: 15px;
        font-weight: 500;
        margin-bottom: 2.69vh;
        border-radius: 17px;
      }
    }

    #login-btn {
      width: 100%;
      height: 5.83vh;
      color: white;
      background-color: #5378c6;
      font-size: 20px;
      font-weight: 500;
      border-radius: 20px;
      border: none;
      margin-bottom: 1.94vh;
      cursor: pointer;
    }

    #last {
      display: flex;
      justify-content: space-between;
      font-size: 14px;
      color: #767676;
      align-items: center;
    }

    a {
      text-decoration: underline;
      color: #767676;
    }

    a:visited {
      color: #767676;
    }
  }

  #horizontal {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 4.54vh;

    hr {
      width: 20%;
    }

    p {
      color: #767676;
      font-size: 14px;
    }
  }

  #social {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1.85vh;

    img {
      cursor: pointer;
      width: 6.94vh;
      height: 6.94vh;
    }
  }

  #find {
    display: flex;
    width: 100%;
    justify-content: center;
    font-size: 14px;
    color: #191919;
    margin-top: 6.95vh;
  }
`;

export const Login = ({ setToggleSignIn }) => {
  const [userID, setUserId] = useState<string>();
  const [password, setPassword] = useState<string>();

  const handleLogin = async (event) => {
    if (!userID) {
      alert("아이디를 입력해주세요.");
      return;
    }
    if (!password) {
      alert("비밀번호를 입력해주세요.");
      return;
    }
    const checkbox = document.getElementById("save") as HTMLInputElement;
    console.log("체크박스 : " + checkbox.checked);

    event.preventDefault();
    const url = `/api/login?id=${userID}&password=${password}`;
    const res = await axios.get(url);
    console.log(res);

    if(res.data.length == 0) {
      alert('아이디 또는 패스워드를 확인해 주세요');
    } else if(res.data.Password != password) {
      alert('아이디 또는 패스워드를 확인해 주세요')
    } else {
      
      let loginInfo = {
        Id: res.data.Id,
        Password: res.data.Password,
        Lastname: res.data.Lastname,
        Firstname: res.data.Firstname,
        Birthday: res.data.Birthday,
        Gender: res.data.Gender,
        Phone: res.data.Phone
      }; 

      if(checkbox.checked){
        localStorage.setItem("user", JSON.stringify(loginInfo));
      }

      setToggleSignIn(false);
      Router.push(`/?username=${loginInfo.Lastname}`, '/')
    }
  };

  return (
    <LoginModal
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      onDoubleClick={() => {
        setToggleSignIn(false);
      }}
    >
      <div style={{ position: "relative" }}>
        <img
          style={{ cursor: "pointer" }}
          onClick={() => {
            setToggleSignIn(false);
          }}
          id="ax"
          src="/images/x.svg"
        />
        <div className="box">
          <h1>Sizeyourself</h1>
          <h2>로그인</h2>
          <div>
            <div id="input-box">
              <input
                type="text"
                placeholder="아이디"
                value={userID}
                onChange={(e) => {
                  setUserId(e.target.value);
                }}
              />
            </div>
            <div id="input-box">
              <input
                type="password"
                placeholder="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button id="login-btn" onClick={handleLogin}>
              로그인
            </button>
            <div id="last">
              <div>
                <input type="checkbox" id="save"/>
                <p
                  style={{
                    marginLeft: "5px",
                  }}
                >
                  로그인 유지하기
                </p>
              </div>
              <Link href="signup">
                <a>회원가입</a>
              </Link>
            </div>
          </div>
          <div id="horizontal">
            <hr />
            <p>소셜 계정 로그인</p>
            <hr />
          </div>
          <div id="social">
            <img src="/images/google.svg" />
            <img src="/images/naver.svg" />
            <img src="/images/kakao.svg" />
            <img src="/images/facebook.svg" />
          </div>
          <div id="find">
            <p>아이디 찾기 &nbsp;&nbsp;&nbsp;&nbsp;</p>|
            <p> &nbsp;&nbsp;&nbsp;&nbsp;비밀번호 찾기</p>
          </div>
        </div>
      </div>
    </LoginModal>
  );
};
