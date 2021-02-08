import styled from "styled-components";
import Link from "next/link";

const Navi = styled.nav`
  display: flex;
  height: 16px;
  width: 68.75%;
  margin: 7.22vh 15.625% 0 15.625%;
  justify-content: space-between;
  align-items: center;

  .left {
    img {
      margin-left: 20px;
    }
    p {
      margin-left: 15px;
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
`;

export const Nav = () => {
  return (
    <Navi>
      <div className="left">
        <Link href="/">
          <a style={{ height: "100%" }}>
            <img src="/images/logo.svg" alt="logo" width="88px" height="15px" />
          </a>
        </Link>
        <p>한국어 / KR &nbsp;</p>
        <img
          src="/images/down.svg"
          alt="down"
          width="7.79px"
          height="3.9px"
          style={{ marginLeft: "0px" }}
        />
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
