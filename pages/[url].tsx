import Head from "next/head";
import Layout from "../components/Layout";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useRouter, withRouter } from "next/router";

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
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;

  #url {
    margin-top: 15vh;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: center;

    p {
      width: 20%;
      font-size: 20;
      font-weight: 500;
      color: #5378c6;
    }

    input {
      width: 60%;
      padding: 10px 5%;
      border-radius: 16px;
      border: 2px solid #5378c6;
      color: #999999;
    }
  }

  h1 {
    margin-top: 20vh;
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

const Middle = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  margin-top: 20vh;

  h2 {
    font-size: 15px;
    font-weight: 500;
  }

  #left {
    width: 40%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 10% 0;

    div {
      width: 80%;
    }

    img {
      max-height: 80%;
      max-width: 80%;
    }

    p {
      font-size: 14px;
      font-weight: 300;
      color: #767676;
      margin-top: 30px;
    }
  }

  #right {
    width: 60%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    #top {
      display: flex;
      width: 100%;
      justify-content: space-between;
      margin-top: 8vh;
      margin-bottom: 15px;
      p {
        width: calc(100% / 6);
        text-align: center;
      }
    }
  }
`;

const Row = styled.div`
  width: 100%;
  margin-top: 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;

  &.recommended {
    #size {
      p {
        background-color: rgba(83, 120, 198, 0.3) !important;
      }
    }
    #in {
      background-color: rgba(83, 120, 198, 0.3) !important;
    }
  }

  #size {
    width: calc(100% / 6) !important;
    p {
      background-color: ${(props) =>
        !props.recommended ? "f4f4f4" : "rgba(83,120,198,0.3)"};
      border-radius: 16px;
      box-shadow: 0 3px 6px rgba(0, 0, 0, 0.39);
      padding: 15%;
    }
  }

  #in {
    width: calc(500% / 6);
    display: flex;
    justify-content: space-evenly;
    background-color: ${(props) =>
      !props.recommended ? "f4f4f4" : "rgba(83,120,198,0.3)"};
    border-radius: 16px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.39);
    padding: 1.5% 0;
    p {
      width: calc(100% / 5);
    }
  }
`;

const Size = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  div {
    width: 80%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }

  #last {
    border-radius: 16px;
    border: 1px solid #999999;
    padding: 1.5% 0;
  }
`;

const Recommend = styled.div`
  width: 100%;
  margin-bottom: 20vh;

  div {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  .imagebox {
    width: 80%;
    height: 200px;
    opacity: 0.05;
    background-color: #999999;
    border-radius: 16px;
    margin-top: 50px;
  }
  div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 80%;
  }

  p {
    font-size: 15px;
    font-weight: 500;
    color: black;
    margin-top: 10px;
  }
  span {
    font-size: 15px;
    font-weight: 300;
    color: #191919;
  }
`;

function newPage({ router: { query } }) {
  const axios = require("axios");
  const [url, setUrl] = useState<string>(query.url);
  const [category, setCategory] = useState<any>();
  const [size, setSize] = useState<any>();
  const [value, setValue] = useState<any>();
  const [user, setUser] = useState<any>();
  const [body, setBody] = useState<string[]>();
  const [recommended, setRecommended] = useState<string>("S");

  const router = useRouter();

  const temp = "후드 집업";
  let data = [
    ["S", "65", "46.5", "52", "61"],
    ["M", "67", "48.5", "54.5", "63"],
    ["L", "68.5", "50", "57", "64"],
    ["XL", "70", "51.5", "59.5", "65"],
    ["XXL", "71.5", "53", "62", "66"],
  ];

  useEffect(() => {
    let user = localStorage.getItem("user");
    if (!user) {
      user = sessionStorage.getItem("user");
    }
    if (user) {
      setUser(JSON.parse(user));
    } else {
      alert("잘못된 접근입니다.");
      router.push("/");
    }
    fetchCategory();
  }, []);

  useEffect(() => {
    if (user) {
      fetchBodySize();
    }
  }, [user]);

  useEffect(() => {
    if (body) {
      // console.log(calculateHoody(body, data));
    }
  }, [body]);

  const calculateHoody = (user, data) => {
    var temp = [];
    for (let i = 0; i < data.length; i++) {
      const upper = Math.pow(user[0] - parseInt(data[i][1]), 2);
      const shoulder = Math.pow(user[1] - parseInt(data[i][2]), 2);
      const arm = Math.pow(user[2] - parseInt(data[i][4]), 2);
      temp.push(upper + shoulder + arm);
    }
    return temp;
  };

  const fetchBodySize = async () => {
    const api = `api/user/${user.Id}/size`;
    const res = await axios.get(api);
    var temp = [];
    for (const property in res.data) {
      temp.push(res.data[property]);
    }
    setBody(temp);
  };

  const fetchCategory = async () => {
    const api = `api/category?name=${temp}`;
    const res = await axios.get(api);
    var sizes = [];
    var values = [];
    for (let i = 0; i < data.length; i++) {
      sizes.push(data[i][0]);
      let temp = [];
      for (let j = 1; j < data[i].length; j++) {
        temp.push(data[i][j]);
      }
      values.push(temp);
    }
    setSize(sizes);
    setValue(values);
    setCategory(JSON.parse(res.data.VALUES).values);
  };

  useEffect(() => {
    if (recommended) {
      var items = document.getElementsByClassName("row");
      for (let i = 0; i < items.length; i++) {
        if ((items[i].firstChild as HTMLDivElement).innerText === recommended) {
          (items[i] as HTMLDivElement).classList.add("recommended");
        }
      }
    }
  }, [recommended]);

  return (
    <>
      <Head>
        <title>Sizeyourself</title>
      </Head>
      <Layout>
        <MainContent>
          <MainMargin>
            <Content>
              <h1>SIZEYOURSELF</h1>
              <div id="url">
                <p>지금 피팅 중인 옷</p>
                <input type="text" value={url} disabled />
              </div>
              <Middle>
                <div id="left">
                  <img src="/images/test.svg" />
                  <p>Fitting Room</p>
                </div>
                <div id="right">
                  <h2>사이즈 적용해보기</h2>
                  <p>추천 사이즈가 푸른색으로 표시 됩니다</p>
                  <div id="top">
                    <p>{""}</p>
                    {category &&
                      category.map((key) => {
                        return <p>{key}</p>;
                      })}
                  </div>
                  {size &&
                    value &&
                    size.map((key, index) => {
                      return (
                        <Row className="row">
                          <div id="size">
                            <p>{key}</p>
                          </div>
                          <div id="in">
                            {value[index].map((key) => {
                              return <p>{key}</p>;
                            })}
                          </div>
                        </Row>
                      );
                    })}

                  <h2>나의 상세 사이즈</h2>
                  <Size>
                    <div
                      style={{
                        marginTop: "60px",
                        marginBottom: "40px",
                      }}
                    >
                      <div>
                        <p>상체총장</p>
                      </div>
                      <div>
                        <p>어깨너비</p>
                      </div>
                      <div>
                        <p>소매길이</p>
                      </div>
                      <div>
                        <p>허리단면</p>
                      </div>
                      <div>
                        <p>하체총장</p>
                      </div>
                    </div>
                    <div id="last">
                      {body &&
                        body.map((key) => {
                          return (
                            <div>
                              <p>{key}</p>
                            </div>
                          );
                        })}
                    </div>
                  </Size>
                </div>
              </Middle>
              <Recommend>
                <h2>나만을 위한 추천</h2>
                <div>
                  <img src="/images/left.svg" />
                  <Card>
                    <div className="imagebox"></div>
                    <div>
                      <p>쇼핑몰 이름</p>
                      <p>
                        <span>옷 이름</span>
                      </p>
                    </div>
                  </Card>
                  <Card>
                    <div className="imagebox"></div>
                    <div>
                      <p>쇼핑몰 이름</p>
                      <p>
                        <span>옷 이름</span>
                      </p>
                    </div>
                  </Card>
                  <Card>
                    <div className="imagebox"></div>
                    <div>
                      <p>쇼핑몰 이름</p>
                      <p>
                        <span>옷 이름</span>
                      </p>
                    </div>
                  </Card>
                  <Card>
                    <div className="imagebox"></div>
                    <div>
                      <p>쇼핑몰 이름</p>
                      <p>
                        <span>옷 이름</span>
                      </p>
                    </div>
                  </Card>
                  <img src="/images/right.svg" />
                </div>
              </Recommend>
            </Content>
          </MainMargin>
        </MainContent>
      </Layout>
    </>
  );
}

export default withRouter(newPage);
