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

const Result = styled.div`
  height: 54vh;
  background-color: rgba(25, 25, 25, 0.05);
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 16vh;
`;

const DataRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 7.7%;
  margin-top: 5px;
  color: black !important;

  p {
    font-size: 12px;
    font-weight: 300;
  }

  input,
  select {
    background-color: transparent;
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

const NextButton = styled.button`
  border-radius: 16px;
  color: white;
  height: 7.2vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 900;
  margin-bottom: 21vh;
  background-color: #191919;
  opacity: 0.65;
  width: 100%;
  cursor: pointer;
`;

function Interlim({ router: { query } }) {
  const router = useRouter();

  const [upper, setUpper] = useState<number>();
  const [shoulder, setShoulder] = useState<number>();
  const [arm, setArm] = useState<number>();
  const [waist, setWaist] = useState<number>();
  const [leg, setLeg] = useState<number>();
  const [sex, setSex] = useState<string>("2-2M");
  const [user, setUser] = useState<any>();

  if (typeof query.query == "undefined") {
    useEffect(() => {
      router.push("/");
    }, []);
  }

  useEffect(() => {
    setUser(JSON.parse(query.query));
  }, []);

  useEffect(() => {
    if (user) {
      if (user.gender == "??????") {
        setSex("2-2F");
      }
      setUpper(user.upper);
      setShoulder(user.shoulder);
      setArm(user.arm);
      setWaist(user.waist);
      setLeg(user.leg);
    }
  }, [user]);

  const handleNext = (e) => {
    e.preventDefault();
    if (upper && shoulder && arm && waist && leg) {
      user["upper"] = upper;
      user["shoulder"] = shoulder;
      user["arm"] = arm;
      user["waist"] = waist;
      user["leg"] = leg;

      router.push({
        pathname: `/signup/${sex}`,
        query: { query: JSON.stringify(user) },
      });
    } else {
      alert("?????? ??????????????????.");
      return;
    }
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
                Step 1{" "}
                <span style={{ color: "black !important" }}>
                  Step 2 ????????? ????????????
                </span>{" "}
                <span> Step 3</span>
              </p>
            </div>
            <Content>
              <div>
                <h1>SIZEYOURSELF</h1>
              </div>
              <div>
                <p style={{ color: "#505050" }}>?????? ????????? ?????? ???????????????.</p>
              </div>
              <div>
                <p style={{ color: "#999999", marginTop: "1vh" }}>
                  * ???????????? ?????? ???????????? ?????? ????????????.
                </p>
              </div>
              <div>
                <h2>?????? ?????? ?????????</h2>
              </div>
              <Result>
                <DataRow>
                  <p>????????????</p>
                  <input
                    placeholder="????????? ??????????????????"
                    value={upper}
                    onChange={(e) => setUpper(parseInt(e.target.value))}
                  />
                  <p>cm</p>
                </DataRow>
                <DataRow>
                  <p>????????????</p>
                  <input
                    placeholder="????????? ??????????????????"
                    value={shoulder}
                    onChange={(e) => setShoulder(parseInt(e.target.value))}
                  />
                  <p>cm</p>
                </DataRow>
                <DataRow>
                  <p>????????????</p>
                  <input
                    placeholder="????????? ??????????????????"
                    value={arm}
                    onChange={(e) => setArm(parseInt(e.target.value))}
                  />
                  <p>cm</p>
                </DataRow>
                <DataRow>
                  <p>????????????</p>
                  <input
                    placeholder="????????? ??????????????????"
                    value={waist}
                    onChange={(e) => setWaist(parseInt(e.target.value))}
                  />
                  <p>cm</p>
                </DataRow>
                <DataRow>
                  <p>????????????</p>
                  <input
                    placeholder="????????? ??????????????????"
                    value={leg}
                    onChange={(e) => setLeg(parseInt(e.target.value))}
                  />
                  <p>cm</p>
                </DataRow>
              </Result>
              <div>
                <NextButton onClick={handleNext}>??????</NextButton>
              </div>
            </Content>
          </MainMargin>
        </MainContent>
      </Layout>
    </>
  );
}

export default withRouter(Interlim);
