import Head from "next/head";
import Layout from "../../components/Layout";
import styled from "styled-components";
import Link from "next/link";
import { useState, useEffect } from 'react';
import { withRouter, useRouter } from 'next/router';

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
  width: 100%;

  div {
    width: 55%;
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
    color: black !important;
    margin-top: 7.2vh;
    margin-bottom: 2vh;
    font-size: 18px;
    font-weight: 500;
  }

  #next {
    color: white;
    font-size: 15px;
    font-weight: 500;
    width: 18%;
    padding: 1% 0;
    background-color: rgba(25, 25, 25, 0.65);
    border-radius: 16px;
    text-align: center;
    margin-top: 15vh;
    margin-bottom: 21vh;
  }

  a:hover {
    text-decoration: none;
  }
`;

const ButtonRow = styled.div`
  width: 100% !important;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 6.5vh;

  label {
    font-size: 13px;
    font-weight: 500;
    border-radius: 13px;
    border: 1px solid #707070;
    padding: 1% 5%;
  }

  input[type="radio"]:checked + label {
    background-color: rgba(153, 153, 153, 0.5);
  }

  input[type="radio"] {
    display: none;
  }

  input[type="checkbox"]:checked + label {
    background-color: rgba(153, 153, 153, 0.5);
  }

  input[type="checkbox"] {
    display: none;
  }
`;

const LongButtonRow = styled.div`
  width: 100% !important;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  label:nth-child(2) {
    margin-top: 6.5vh;
  }

  label {
    width: 80% !important;
    font-size: 13px;
    font-weight: 500;
    border-radius: 13px;
    border: 1px solid #707070;
    padding: 1.5% 5%;
    margin-top: 1.5vh;
  }

  input[type="checkbox"]:checked + label {
    background-color: rgba(153, 153, 153, 0.5);
  }

  input[type="checkbox"] {
    display: none;
  }
`;

const TextBox = styled.div`
  width: 100% !important;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 6.5vh;

  input {
    width: 80%;
    font-size: 20px;
    font-weight: 500;
    padding: 2% 4%;
    border: 0;
    border-bottom: 1px solid #767676;
  }
`;

function two() {
  return (
    <>
      <Head>
        <title>Sizeyourself::회원가입::Step3</title>
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
                Step 1 <span>Step 2</span>{" "}
                <span style={{ color: "black !important" }}>
                  Step 3 취향 정보입력
                </span>
              </p>
            </div>
            <Content>
              <div>
                <h1>SIZEYOURSELF</h1>
                <p>취향을 선택해 주세요.</p>
              </div>
              <div>
                <h2>Q1. 선호하는 옷 핏이 어떻게 되시나요?</h2>
                <p>Fit Preference</p>
                <ButtonRow>
                  <input type="radio" name="fit" id="normal" value="normal" />
                  <label htmlFor="normal">기본핏</label>
                  <input type="radio" name="fit" id="slim" value="slim" />
                  <label htmlFor="slim">슬림핏</label>
                  <input type="radio" name="fit" id="loose" value="loose" />
                  <label htmlFor="loose">루즈핏</label>
                  <input type="radio" name="fit" id="over" value="over" />
                  <label htmlFor="over">오버핏</label>
                  <input type="radio" name="fit" id="muscle" value="muscle" />
                  <label htmlFor="muscle">머슬핏</label>
                </ButtonRow>
              </div>
              <div>
                <h2>Q2. 선호하는 브랜드가 있으신가요? (선택)</h2>
                <p>Brand Preference</p>
                <TextBox>
                  <input type="text" placeholder="브랜드명을 적어주세요" />
                </TextBox>
              </div>
              <div>
                <h2>Q3. 선호하는 옷 스타일은 무엇이신가요?</h2>
                <p>Style Preference</p>
                <ButtonRow>
                  <input
                    type="checkbox"
                    name="look"
                    id="girlish"
                    value="girlish"
                  />
                  <label htmlFor="girlish">걸리시</label>
                  <input
                    type="checkbox"
                    name="look"
                    id="feminine"
                    value="feminine"
                  />
                  <label htmlFor="feminine">페미닌</label>
                  <input
                    type="checkbox"
                    name="look"
                    id="manish"
                    value="manish"
                  />
                  <label htmlFor="manish">매니시</label>
                  <input
                    type="checkbox"
                    name="look"
                    id="sporty"
                    value="sporty"
                  />
                  <label htmlFor="sporty">스포티</label>
                  <input
                    type="checkbox"
                    name="look"
                    id="aethnic"
                    value="aethnic"
                  />
                  <label htmlFor="aethnic">에스닉</label>
                </ButtonRow>
                <ButtonRow style={{ marginTop: "1.5vh" }}>
                  <input
                    type="checkbox"
                    name="look"
                    id="modern"
                    value="modern"
                  />
                  <label htmlFor="modern">모던</label>
                  <input type="checkbox" name="look" id="dandy" value="dandy" />
                  <label htmlFor="dandy">댄디</label>
                  <input
                    type="checkbox"
                    name="look"
                    id="military"
                    value="military"
                  />
                  <label htmlFor="military">밀리터리</label>
                  <input
                    type="checkbox"
                    name="look"
                    id="minimal"
                    value="minimal"
                  />
                  <label htmlFor="minimal">미니멀</label>
                  <input
                    type="checkbox"
                    name="fit"
                    id="office"
                    value="office"
                  />
                  <label htmlFor="office">오피스</label>
                </ButtonRow>
              </div>
              <div>
                <h2>Q4. 주로 구매하는 옷은 어떤 종류이신가요?</h2>
                <p>Clothes Preference</p>
                <LongButtonRow>
                  <input type="checkbox" name="type" id="upper" value="upper" />
                  <label htmlFor="upper">블라우스, 티셔츠, 니트 등 상의</label>
                  <input
                    type="checkbox"
                    name="type"
                    id="trouser"
                    value="trouser"
                  />
                  <label htmlFor="trouser">바지, 스커트 등 하의</label>
                  <input type="checkbox" name="type" id="dress" value="dress" />
                  <label htmlFor="dress">드레스, 원피스</label>
                  <input type="checkbox" name="type" id="outer" value="outer" />
                  <label htmlFor="outer">아우터</label>
                  <input
                    type="checkbox"
                    name="type"
                    id="underwear"
                    value="underwear"
                  />
                  <label htmlFor="underwear">양말 및 속옷</label>
                </LongButtonRow>
              </div>
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <h2>
                    Q5. 나는 기업의 환경과 사회에 대한 책임을 중요하게
                    생각합니다.
                  </h2>
                  <input
                    style={{
                      marginTop: "7.2vh",
                      marginBottom: "2vh",
                    }}
                    type="checkbox"
                  />
                </div>
                <p>Sustainability</p>
              </div>
              <Link href="/">
                <a id="next">아바타 생성하기</a>
              </Link>
            </Content>
          </MainMargin>
        </MainContent>
      </Layout>
    </>
  );
}

export default withRouter(two)