import styled from "styled-components";
import Link from "next/link";
import { useEffect, useState } from "react";

const Navi = styled.nav`
  display: flex;
  height: 100vh * 21/1080;
  height: 100%;
  width: 68.75%;
  margin: 7.22vh 15.625% 0 15.625%;
  justify-content: space-between;
  align-items: center;

  .left {
    img {
      margin-left: 20px;
    }
    a {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .right {
    div {
      margin-right: 20px;
    }
    img {
      margin-right: 6px;
    }
  }

  p {
    font-size: 15px;
    white-space: nowrap;
  }

  div {
    display: flex;
    height: 100%;
    align-items: center;
  }

  a:link,
  a:visited,
  a:hover,
  a:active {
    color: black;
    text-decoration: none;
  }

  #dropdown {
    display: flex;
    flex-direction: column;
    justify-content: center;
    cursor: pointer;
    position: relative;
    margin-left: 15px;
    text-align: center;

    div {
      width: 100px;
      height: 27px;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 2px 7px;
    }

    #dropdown-content {
      display: none;
      position: absolute;
      top: 100%;
      border: 1px solid #999999;
      border-top: 0;
      color: #505050;
      font-size: 14px;
    }

    #dropdown-contet:hover {
      display: flex;
    }
  }

  #dropdown:hover {
    #main {
      background-color: #5378c6;
      color: white;
      border: 1px solid #999999;
      border-bottom: 0;

      img {
        display: none;
      }
    }

    #dropdown-content {
      display: flex;
    }
  }
`;

export const Nav = () => {
  const [lang, setLang] = useState<string>("KOR");

  useEffect(() => {
    const item = document.getElementById("temp");
    console.log(item);
  }, []);
  return (
    <Navi id="temp">
      <div className="left">
        <Link href="/">
          <a style={{ height: "100%" }}>
            <img src="/images/logo.svg" alt="logo" width="88px" height="15px" />
          </a>
        </Link>
        {lang === "KOR" && (
          <div id="dropdown">
            <div id="main">
              <p>한국어 / KR &nbsp;</p>
              <img
                src="/images/down.svg"
                alt="down"
                width="7.79px"
                height="3.9px"
                style={{ marginLeft: "0px" }}
              />
            </div>
            <div
              id="dropdown-content"
              onClick={() => {
                setLang("ENG");
              }}
            >
              <p>ENGLISH / EN &nbsp;</p>
            </div>
          </div>
        )}
        {lang === "ENG" && (
          <div id="dropdown">
            <div id="main">
              <p>ENGLISH / EN &nbsp;</p>
              <img
                src="/images/down.svg"
                alt="down"
                width="7.79px"
                height="3.9px"
                style={{ marginLeft: "0px" }}
              />
            </div>
            <div
              id="dropdown-content"
              onClick={() => {
                setLang("KOR");
              }}
            >
              <p>한국어 / KR &nbsp;</p>
            </div>
          </div>
        )}
      </div>
      <div className="right">
        <div>
          <img src="/images/login.svg" alt="login" />
          <p>로그인</p>
        </div>
        <div>
          <img src="/images/signup.svg" alt="login" />
          <p>회원가입</p>
        </div>
        <Link href="/my">
          <a>
            <div>
              <img src="/images/mypage.svg" alt="login" />
              <p>마이페이지</p>
            </div>
          </a>
        </Link>
      </div>
    </Navi>
  );
};
