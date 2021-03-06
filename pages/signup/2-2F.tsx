import Head from "next/head";
import Layout from "../../components/Layout";
import styled from "styled-components";
import Link from "next/link";
import { useState, useEffect } from "react";
import { withRouter, useRouter } from "next/router";

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

  div {
    width: 55%;
  }
  h1 {
    margin-top: 12.8vh;
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
    margin-top: 12.5vh;
    font-size: 20px;
    font-weight: 500;
    margin-bottom: 1.5vh;
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
    margin-top: 21vh;
    margin-bottom: 21vh;
    cursor: pointer;
  }

  a:hover {
    text-decoration: none;
  }
`;

const ImageBox = styled.div`
  width: 50% !important;
  height: 33vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5%;
  border-radius: 16px;
  background-color: rgba(25, 25, 25, 0.05);
  margin-top: 12vh;

  img {
    max-width: 100%;
    max-height: 100%;
  }

  div {
    width: 80%;
    display: flex;
  }
`;

const ButtonRow = styled.div`
  width: 35% !important;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 6.5vh;

  label {
    font-size: 15px;
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
`;

const Chest = styled.div`
  width: 50% !important;
  margin-top: 14vh;

  * {
    margin-bottom: 3vh;
  }

  h4 {
    color: black;
    font-size: 15px;
    font-weight: 500;
  }
`;

const SizeTable = styled.div`
  width: 100% !important;
  background-color: rgba(153, 153, 153, 0.05);
  border-radius: 16px;
  flex-wrap: wrap;
  display: flex;
  justify-content: flex-start;

  input[type="radio"] {
    display: none;
  }

  label {
    display: inline-block;
    text-align: center;
    padding: 20px 0;
    width: calc(100% / 6);
    margin: 0;
    border-right: 1px solid black;
  }

  label:last-child {
    border-right: 0 !important;
  }

  label:nth-child(12) {
    border-right: 0 !important;
  }

  label:nth-child(-n + 13) {
    border-bottom: 1px solid black;
  }

  input[type="radio"]:checked + label {
    font-weight: bold;
  }
`;

const DupSizeTable = styled.div`
  width: 100% !important;
  background-color: rgba(153, 153, 153, 0.05);
  border-radius: 16px;
  flex-wrap: wrap;
  display: flex;
  justify-content: flex-start;

  input[type="radio"] {
    display: none;
  }

  label {
    display: inline-block;
    text-align: center;
    padding: 20px 0;
    width: calc(100% / 6);
    margin: 0;
    border-right: 1px solid black;
  }

  label:nth-child(12) {
    border-right: 0 !important;
  }

  label:nth-child(-n + 13) {
    border-bottom: 1px solid black;
  }

  input[type="radio"]:checked + label {
    font-weight: bold;
  }
`;

function TwoTwoF({ router: { query } }) {
  const [user, setUser] = useState<any>();
  const router = useRouter();

  useEffect(() => {
    if (typeof query.query == "undefined") {
      router.push("/");
    }
  }, []);

  useEffect(() => {
    setUser(JSON.parse(query.query));
  }, []);

  const chestSize = ["AA", "A", "B", "C", "D", "E", "F", "G"];

  const handleNext = (event) => {
    event.preventDefault();
    const tummy = (document.querySelector(
      'input[name="tummy"]:checked'
    ) as HTMLInputElement)?.value;
    const brasize = (document.querySelector(
      'input[name="size"]:checked'
    ) as HTMLInputElement)?.value;
    const bracup = (document.querySelector(
      'input[name="cup"]:checked'
    ) as HTMLInputElement)?.value;
    const hip = (document.querySelector(
      'input[name="hip"]:checked'
    ) as HTMLInputElement)?.value;
    if (!(tummy && brasize && bracup && hip)) {
      alert("?????? ??????????????????.");
      return;
    }

    user["tummy"] = tummy;
    user["bra_size"] = brasize;
    user["bar_cup"] = bracup;
    user["hip"] = hip;

    console.log('in 2-2f ' + tummy + brasize + bracup + hip);

    router.push({
      pathname: "/signup/3",
      query: { query: JSON.stringify(user) },
    });
  };

  return (
    <>
      <Head>
        <title>Sizeyourself::????????????::Step2</title>
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
                  <a>????????????</a>
                </Link>
              </p>
              <p>
                Step 1
                <span style={{ color: "black" }}>Step 2 ????????? ????????????</span>
                <span> Step 3</span>
              </p>
            </div>
            <Content>
              <div>
                <h1>SIZEYOURSELF</h1>
                <p>????????? ????????? ?????????.</p>
              </div>
              <div>
                <h2>???</h2>
                <p>Tummy Shape</p>
              </div>
              <ImageBox>
                <img src="/images/belly_woman.png" />
              </ImageBox>
              <ButtonRow>
                <input
                  type="radio"
                  name="tummy"
                  id="slim"
                  value="slim"
                  onClick={(e) => {}}
                />
                <label htmlFor="slim">??????</label>
                <input
                  type="radio"
                  name="tummy"
                  id="average2"
                  value="average"
                />
                <label htmlFor="average2">??????</label>
                <input type="radio" name="tummy" id="fat" value="fat" />
                <label htmlFor="fat">??????</label>
              </ButtonRow>
              <div>
                <h2>??????</h2>
                <p>Chest shape</p>
              </div>
              <Chest>
                <h4>?????????</h4>
                <SizeTable>
                  {[...Array(12).keys()].map((key) => {
                    const num = String(65 + key * 5);
                    return (
                      <>
                        <input type="radio" name="size" id={num} value={num} />
                        <label htmlFor={num}>{num}</label>
                      </>
                    );
                  })}
                </SizeTable>
                <h4>???</h4>
                <DupSizeTable>
                  {[...chestSize].map((key) => {
                    return (
                      <>
                        <input type="radio" name="cup" id={key} value={key} />
                        <label htmlFor={key}>{key}</label>
                      </>
                    );
                  })}
                </DupSizeTable>
              </Chest>
              <div>
                <h2>???</h2>
                <p>Hip shape</p>
              </div>
              <ImageBox>
                <img src="/images/hip_woman.png" />
              </ImageBox>
              <ButtonRow>
                <input type="radio" name="hip" id="narrow" value="narrow" />
                <label htmlFor="narrow">??????</label>
                <input type="radio" name="hip" id="average" value="average" />
                <label htmlFor="average">??????</label>
                <input type="radio" name="hip" id="wide" value="wide" />
                <label htmlFor="wide">??????</label>
              </ButtonRow>
              <button id="next" onClick={handleNext}>
                ??????
              </button>
            </Content>
          </MainMargin>
        </MainContent>
      </Layout>
    </>
  );
}

export default withRouter(TwoTwoF);
