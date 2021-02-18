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
      color: #999999 !important;
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

  div {
    width: 55%;
  }

  div:last-child {
    color: #505050;
    opacity: 0.6;
    margin-bottom: 46.5vh;
    margin-top: 3.1vh;

    p {
      font-weight: 500;
      font-size: 12px;
    }
  }

  h1 {
    margin-top: 12vh;
    font-size: 28px;
    font-weight: 900;
    margin-bottom: 1.5vh;
  }
  p {
    font-weight: 300;
    font-size: 13px;
    line-height: 28px;
  }

  h2 {
    margin-top: 7.2vh;
    margin-bottom: 3.9vh;
    font-size: 18px;
    font-weight: 500;
  }
`;

const ImageBox = styled.div`
  height: 62.4vh;
  margin-bottom: 9.45vh;
  background-color: gray;
`;

const DataRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 4.3vh;
  color: black !important;

  p {
    font-size: 12px;
    font-weight: 500;
  }

  input,
  select {
    border: none;
    border-bottom: 1px solid #999999 !important;
  }

  select {
    color: #999999;
    width: 21.21%;
  }
  input {
    width: 56%;
    text-align: center;
  }
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  a {
    cursor: pointer;
    width: 27%;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 4.5vh;
    font-size: 11px;
    border-radius: 16px;
  }

  a:first-child {
    color: #999999;
    border: 1.5px solid #999999;
  }
  a:last-child {
    color: white;
    background-color: #191919;
    opacity: 0.65;
  }
`;

export default function two() {
  return (
    <>
      <Head>
        <title>Sizeyourself::회원가입::Step2</title>
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
              <p>
                Step 1{" "}
                <span style={{ color: "black !important" }}>
                  Step 2 사이즈 정보입력
                </span>{" "}
                <span> Step 3</span>
              </p>
            </div>
            <Content>
              <div>
                <h1>SIZEYOURSELF</h1>
              </div>
              <div>
                <p style={{ color: "#505050" }}>
                  전신 사진 업로드와 키, 몸무게 입력을 진행해주세요. 의류 구매에
                  필요한 상세 사이즈(어깨너비, 소매길이 등) 측정과 의류 피팅을
                  위한 아바타 생성이 이루어집니다.{" "}
                </p>
              </div>
              <div>
                <p style={{ color: "#999999", marginTop: "1vh" }}>
                  * 사진을 업로드 하지 않고 상세 사이즈를 직접 입력하실 수도
                  있습니다.
                </p>
              </div>
              <div>
                <h2>전신 사진 업로드</h2>
              </div>
              <ImageBox></ImageBox>
              <DataRow>
                <p>키 입력</p>
                <input placeholder="키를 입력해주세요" />
                <select>
                  <option>cm</option>
                  <option>in</option>
                </select>
              </DataRow>
              <DataRow>
                <p>몸무게 입력</p>
                <input placeholder="몸무게를 입력해주세요" />
                <select>
                  <option>kg</option>
                  <option>lb</option>
                </select>
              </DataRow>
              <ButtonRow>
                <Link href="/signup/interlim">
                  <a>사이즈 직접 입력하기</a>
                </Link>
                <Link href="/signup/interlim">
                  <a>사이즈 측정하기</a>
                </Link>
              </ButtonRow>
              <div>
                <p>사이즈를 직접 입력하고 싶으신가요?</p>
              </div>
            </Content>
          </MainMargin>
        </MainContent>
      </Layout>
    </>
  );
}
