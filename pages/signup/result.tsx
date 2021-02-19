import Head from "next/head";
import Layout from "../../components/Layout";
import styled from "styled-components";
import Link from "next/link";

const MainContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  .top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 12px;
    font-weight: 500;
    margin-top: 5.37vh;
    color: #999999;

    span {
      margin-left: 5px;
      color: #999999;
    }
  }
  a:visited {
    color: #999999;
  }
  a:hover {
    text-decoration: underline;
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
    margin-top: 12.8vh;
    font-size: 35px;
    font-weight: 900;
    margin-bottom: 1.5vh;
    padding-bottom: 10px;
    border-bottom: 1px solid #707070;
  }
  p {
    font-weight: 300;
    font-size: 13px;
    line-height: 28px;
  }
  h2 {
    margin-top: 12.5vh;
    font-size: 20px;
    font-weight: 500;
    margin-bottom: 1vh;
  }

  a:hover {
    text-decoration: none;
  }
`;

const Container = styled.div`
  width: 40vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgba(153, 153, 153, 0.05);
  padding: 7% 0;
  margin-top: 50px;

  div {
    width: 80%;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    border-radius: 16px;
  }

  p {
    font-size: 20px;
    font-weight: 300;
    margin-bottom: 50px;
  }

  span {
    font-weight: 500 !important;
  }

  img {
    max-width: 100%;
    max-height: 100%;
  }
`;

const Button = styled.a`
  margin-top: 20vh;
  text-align: center;
  width: 20vw;
  padding: 12px 0;
  color: white;
  background-color: #5378c6;
  border-radius: 16px;
  font-size: 15px;
  font-weight: 500;
  margin-bottom: 20vh;
  transition: 0.3s;

  &:hover {
    background-color: #24448a;
  }
`;

export default function TwoTwo() {
  return (
    <>
      <Head>
        <title>Sizeyourself</title>
      </Head>
      <Layout>
        <MainContent>
          <MainMargin>
            <div className="top">
              <p>
                <span>
                  <Link href="/">
                    <a>Home </a>
                  </Link>
                </span>
                {"> "}
                <Link href="/signup">
                  <a>회원가입</a>
                </Link>
              </p>
            </div>
            <Content>
              <h1>SIZEYOURSELF</h1>
              <p>생성된 아바타와 나의 상세 사이즈를 확인해보세요</p>
              <h2>아바타</h2>
              <p>My Avatar</p>
              <Container>
                <img src="/images/test.svg" />
              </Container>
              <h2>상세 사이즈</h2>
              <p>My Size</p>
              <Container>
                <div>
                  <p>상체총장</p>
                  <p>
                    <span>67</span>
                  </p>
                  <p>cm</p>
                </div>
                <div>
                  <p>어깨너비</p>
                  <p>
                    <span>67</span>
                  </p>
                  <p>cm</p>
                </div>
                <div>
                  <p>소매길이</p>
                  <p>
                    <span>67</span>
                  </p>
                  <p>cm</p>
                </div>
                <div>
                  <p>허리단면</p>
                  <p>
                    <span>67</span>
                  </p>
                  <p>cm</p>
                </div>
                <div>
                  <p>하체총장</p>
                  <p>
                    <span>67</span>
                  </p>
                  <p>cm</p>
                </div>
              </Container>
              <Button>Sizeyourself 시작하기</Button>
            </Content>
          </MainMargin>
        </MainContent>
      </Layout>
    </>
  );
}
