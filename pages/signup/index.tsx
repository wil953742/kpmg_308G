import Head from "next/head";
import Link from "next/link";
import Layout from "../../components/Layout";
import styled from "styled-components";

const MainContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  .top-left {
    color: #999999;
    font-size: 12px;
    font-weight: 500;
    margin-top: 5.37vh;

    a:visited {
      color: #999999;
    }

    a:hover {
      text-decoration: underline;
    }
  }
`;

const MainMargin = styled.div`
  width: 68.75%;
  max-width: 1280px;
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  h1 {
    font-size: 30px;
    font-weight: 800;
    color: #505050;
    margin-top: 6.67vh;
  }

  h3 {
    font-size: 14px;
    color: #505050;
    font-weight: 300;
    margin-top: 1.38vh;
    margin-bottom: 4.91vh;
  }

  .break {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 37.5%;
    margin: 9.72vh 0 3.52vh 0;
    font-size: 13px;
    font-weight: 530;

    hr {
      width: 20%;
    }
  }
`;

const LoginButton = styled.div`
  cursor: pointer;
  width: 37.5%;
  margin-top: 1.48vh;
  border-radius: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  height: 5.28vh;
  font-size: 12px;
  font-weight: 530;
  background-color: rgba(25, 25, 25, 0.65);

  div {
    position: absolute;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 90%;
    height: 33%;

    img {
      height: 100%;
    }
  }

  a:visited {
    color: white;
  }
`;

const Email = styled.a`
  width: 37.5%;
  margin-top: 1.48vh;
  border-radius: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  height: 5.28vh;
  font-size: 12px;
  font-weight: 530;
  background-color: rgba(25, 25, 25, 0.65);

  a:visited {
    color: white;
  }
`;

export default function Signup() {
  const hanldeUnfinished = (event) => {
    alert("서비스 준비 중입니다.");
  };
  return (
    <>
      <Head>
        <title>Sizeyourself::회원가입</title>
      </Head>
      <Layout>
        <MainContent>
          <MainMargin>
            <div className="top-left">
              <p>
                <span>
                  <Link href="/">
                    <a>Home </a>
                  </Link>
                </span>
                {"> "} 회원가입
              </p>
            </div>
            <Content>
              <h1>회원가입</h1>
              <h3>회원가입은 14세 이상 고객만 가능합니다.</h3>
              <LoginButton
                style={{ backgroundColor: "rgba(234, 234, 234, 0.65)" }}
                onClick={hanldeUnfinished}
              >
                <div style={{ height: "72%", width: "95%" }}>
                  <img src="/images/small_google.svg" />
                </div>
                <p>구글 계정으로 회원가입</p>
              </LoginButton>
              <LoginButton
                style={{ backgroundColor: "#099A49", color: "white" }}
                onClick={hanldeUnfinished}
              >
                <div>
                  <img src="/images/small_naver.svg" />
                </div>
                <p>네이버 계정으로 회원가입</p>
              </LoginButton>
              <LoginButton
                style={{ backgroundColor: "#FDEB1D" }}
                onClick={hanldeUnfinished}
              >
                <div>
                  <img src="/images/small_kakao.svg" />
                </div>
                <p>카카오톡 계정으로 회원가입</p>
              </LoginButton>
              <LoginButton
                style={{ backgroundColor: "#385997", color: "white" }}
                onClick={hanldeUnfinished}
              >
                <div>
                  <img src="/images/small_facebook.svg" />
                </div>
                <p>페이스북 계정으로 회원가입</p>
              </LoginButton>
              <div className="break">
                <hr />
                <p>이메일로 회원가입</p>
                <hr />
              </div>
              <Link href="/signup/1">
                <Email
                  style={{
                    color: "white",
                    marginTop: "3.88vh",
                    cursor: "pointer",
                  }}
                >
                  <p>회원가입</p>
                </Email>
              </Link>
            </Content>
          </MainMargin>
        </MainContent>
      </Layout>
    </>
  );
}
