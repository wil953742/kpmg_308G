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

function two({ router: { query } }) {
  const [user, setUser] = useState<any>();
  const [brand, setBrand] = useState<string>();

  const router = useRouter();

  if (typeof query.query == "undefined") {
    useEffect(() => {
      router.push("/");
    }, []);
  }

  useEffect(() => {
    if (query.query) {
      setUser(JSON.parse(query.query));
    }
  }, []);

  const handleCreate = (e) => {
    e.preventDefault();
    const fit = (document.querySelector(
      'input[name="fit"]:checked'
    ) as HTMLInputElement)?.value;
    const look = Array.from(
      document.querySelectorAll('input[name="look"]:checked')
    );
    const type = (document.querySelector(
      'input[name="type"]:checked'
    ) as HTMLInputElement)?.value;
    const env = (document.getElementById("env") as HTMLInputElement).checked;
    if (!(fit && look && type)) {
      alert("?????? ??????????????????.");
      return;
    }
    user["fit"] = fit;
    user["type"] = type;
    user["env"] = env;
    user["brand"] = brand;
    var temp = [];
    look.forEach((value) => temp.push((value as HTMLInputElement).value));
    user["look"] = temp;

    router.push({
      pathname: "/signup/result",
      query: { query: JSON.stringify(user) },
    });
  };

  return (
    <>
      <Head>
        <title>Sizeyourself::????????????::Step3</title>
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
                Step 1 <span>Step 2</span>{" "}
                <span style={{ color: "black !important" }}>
                  Step 3 ?????? ????????????
                </span>
              </p>
            </div>
            <Content>
              <div>
                <h1>SIZEYOURSELF</h1>
                <p>????????? ????????? ?????????.</p>
              </div>
              <div>
                <h2>Q1. ???????????? ??? ?????? ????????? ?????????????</h2>
                <p>Fit Preference</p>
                <ButtonRow>
                  <input type="radio" name="fit" id="normal" value="normal" />
                  <label htmlFor="normal">?????????</label>
                  <input type="radio" name="fit" id="slim" value="slim" />
                  <label htmlFor="slim">?????????</label>
                  <input type="radio" name="fit" id="loose" value="loose" />
                  <label htmlFor="loose">?????????</label>
                  <input type="radio" name="fit" id="over" value="over" />
                  <label htmlFor="over">?????????</label>
                  <input type="radio" name="fit" id="muscle" value="muscle" />
                  <label htmlFor="muscle">?????????</label>
                </ButtonRow>
              </div>
              <div>
                <h2>Q2. ???????????? ???????????? ???????????????? (??????)</h2>
                <p>Brand Preference</p>
                <TextBox>
                  <input
                    type="text"
                    placeholder="??????????????? ???????????????"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                  />
                </TextBox>
              </div>
              <div>
                <h2>Q3. ???????????? ??? ???????????? ???????????????????</h2>
                <p>Style Preference</p>
                <ButtonRow>
                  <input
                    type="checkbox"
                    name="look"
                    id="girlish"
                    value="girlish"
                  />
                  <label htmlFor="girlish">?????????</label>
                  <input
                    type="checkbox"
                    name="look"
                    id="feminine"
                    value="feminine"
                  />
                  <label htmlFor="feminine">?????????</label>
                  <input
                    type="checkbox"
                    name="look"
                    id="manish"
                    value="manish"
                  />
                  <label htmlFor="manish">?????????</label>
                  <input
                    type="checkbox"
                    name="look"
                    id="sporty"
                    value="sporty"
                  />
                  <label htmlFor="sporty">?????????</label>
                  <input
                    type="checkbox"
                    name="look"
                    id="aethnic"
                    value="aethnic"
                  />
                  <label htmlFor="aethnic">?????????</label>
                </ButtonRow>
                <ButtonRow style={{ marginTop: "1.5vh" }}>
                  <input
                    type="checkbox"
                    name="look"
                    id="modern"
                    value="modern"
                  />
                  <label htmlFor="modern">??????</label>
                  <input type="checkbox" name="look" id="dandy" value="dandy" />
                  <label htmlFor="dandy">??????</label>
                  <input
                    type="checkbox"
                    name="look"
                    id="military"
                    value="military"
                  />
                  <label htmlFor="military">????????????</label>
                  <input
                    type="checkbox"
                    name="look"
                    id="minimal"
                    value="minimal"
                  />
                  <label htmlFor="minimal">?????????</label>
                  <input
                    type="checkbox"
                    name="fit"
                    id="office"
                    value="office"
                  />
                  <label htmlFor="office">?????????</label>
                </ButtonRow>
              </div>
              <div>
                <h2>Q4. ?????? ???????????? ?????? ?????? ???????????????????</h2>
                <p>Clothes Preference</p>
                <LongButtonRow>
                  <input type="checkbox" name="type" id="upper" value="upper" />
                  <label htmlFor="upper">????????????, ?????????, ?????? ??? ??????</label>
                  <input
                    type="checkbox"
                    name="type"
                    id="trouser"
                    value="trouser"
                  />
                  <label htmlFor="trouser">??????, ????????? ??? ??????</label>
                  <input type="checkbox" name="type" id="dress" value="dress" />
                  <label htmlFor="dress">?????????, ?????????</label>
                  <input type="checkbox" name="type" id="outer" value="outer" />
                  <label htmlFor="outer">?????????</label>
                  <input
                    type="checkbox"
                    name="type"
                    id="underwear"
                    value="underwear"
                  />
                  <label htmlFor="underwear">?????? ??? ??????</label>
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
                    Q5. ?????? ????????? ????????? ????????? ?????? ????????? ????????????
                    ???????????????.
                  </h2>
                  <input
                    id="env"
                    style={{
                      marginTop: "7.2vh",
                      marginBottom: "2vh",
                    }}
                    type="checkbox"
                  />
                </div>
                <p>Sustainability</p>
              </div>
              <button id="next" onClick={handleCreate}>
                ????????? ????????????
              </button>
            </Content>
          </MainMargin>
        </MainContent>
      </Layout>
    </>
  );
}

export default withRouter(two);
