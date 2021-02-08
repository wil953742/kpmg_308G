import Head from "next/head";
import Layout from "../components/Layout";
import styled from "styled-components";
import { useEffect, useState } from "react";

const MainContent = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  text-align: center;

  h1 {
    margin-top: 22.7vh;
    font-size: 75px;
    font-weight: 800;
    color: #505050;
    margin-bottom: 9.63vh;
  }

  h2 {
    font-size: 47px;
    margin-top: 20.27vh;
    color: black;
    font-weight: 400;
    margin-bottom: 6.85vh;
  }

  #h2-span {
    font-size: 50px;
    font-weight: bold;
  }

  #search-bar {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;

    .search {
      width: 38%;
      margin-right: 20px;
      border-radius: 14px;
      border: transparent;
      box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.47);
      height: 64px;
      padding: 0 31px;
    }

    .search:focus {
      outline: none;
    }

    #box {
      background-color: #444bdf;
      box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.47);
      border-radius: 14px;
      width: 65px;
      height: 64px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }
  }
`;

const Footer = styled.footer`
  width: 100%;
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  background-color: #0f223e;
  color: white;

  h2 {
    font-size: 13px;
    font-weight: bold;
  }

  p {
    font-size: 11px;
    font-weight: 300;
    margin-top: 7px;
  }

  #detail {
    color: #999999 !important;
    background: white;
    border-radius: 22px;
    padding: 6px 12px;
    font-size: 10px;
  }
`;

const Home = () => {
  const [rotation, setRotation] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(function () {
      setRotation(!rotation);
    }, 5000);
  });

  return (
    <>
      <Head>
        <title>SIZE YOURSELF::HELP YOU GET YOUR PERFECT CLOTHES</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Layout>
        <MainContent>
          {rotation ? (
            <h1>
              SIZE
              <span style={{ color: "#444BDF" }}>Y</span>
              <span style={{ color: "#3F8AD4" }}>O</span>
              <span style={{ color: "#5378C6" }}>U</span>
              <span style={{ color: "#444BDF" }}>R</span>
              SELF
            </h1>
          ) : (
            <h2>
              308G와 함께,
              <br />
              <span id="h2-span" style={{ color: "#3F8AD4" }}>
                새로운
              </span>
              <span id="h2-span" style={{ color: "#444BDF" }}>
                쇼핑 경험
              </span>
              을 시작해보세요
            </h2>
          )}
          <div id="search-bar">
            <input
              className="search"
              type="text"
              placeholder="링크를 입력해 주세요"
            />
            <div id="box">
              <img src="/images/search.svg" alt="search" />
            </div>
          </div>
        </MainContent>
        <Footer>
          <div style={{ margin: "18px 0 18px 40px" }}>
            <h2>Sizeyourself 가 처음이신가요?</h2>
            <p>Sizeyourself의 맞춤형 온라인 피팅 서비스에 대해 알아보세요.</p>
          </div>
          <div id="detail" style={{ margin: "23px 43px 25px 0" }}>
            자세히 보기
          </div>
        </Footer>
      </Layout>
    </>
  );
};

export default Home;
