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

  h1 {
    font-size: 30px;
    font-weight: 800;
    color: #505050;
    margin-top: 12vh;
    margin-bottom: 9vh;
  }

  select {
    color: #999999;
  }

  select:focus {
    outline: none;
  }

  input,
  select {
    padding: 2px 10px 5px 10px;
  }

  .input-box {
    width: 57.34%;
    height: 3vh;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 5.32vh;
    font-size: 15px;
    font-weight: 400;

    input,
    select {
      border: none;
      border-bottom: 1px solid #999999 !important;
    }
  }

  .one {
    width: 74.5%;
  }

  .two {
    width: 74.5%;
    display: flex;
    justify-content: space-between;

    select {
      width: 30%;
    }
    input:last-child {
      width: 60%;
    }
  }

  .three {
    width: 74.5%;
    display: flex;
    justify-content: space-between;

    select {
      width: 30%;
    }
  }

  #warning {
    width: 50%;
    font-size: 10px;
    color: #505050;
  }

  .check {
    font-size: 14px;
    font-weight: 500;
    color: #505050;
    margin-top: 12vh;
    margin-bottom: 9.25vh;
    text-align: center;
  }

  #submit {
    cursor: pointer;
    width: 57.34%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: "pointer";
    color: white;
    background-color: rgba(25, 25, 25, 0.65);
    font-weight: 900;
    font-size: 14px;
    border-radius: 16px;
    padding: 16px 0;
    margin-bottom: 21.5vh;
  }
`;

const Radio = styled.div`
  display: flex;
  width: 56.34%;
  align-items: center;
  margin-bottom: 12px;

  div {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  input {
    margin-right: 20px;
  }

  #detail {
    font-size: 12px;
    color: #999999;
    text-decoration: underline;
  }
`;

function one({ router: { query } }) {
  const [username, setUsername] = useState<string>();
  const [phone, setPhone] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [userID, setUserId] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [passcheck, setPasscheck] = useState<string>();
  const router = useRouter();

  useEffect(() => {
    if (typeof query.query == "undefined") {
      router.push("/");
    }
  }, []);

  const handleAgree = (event) => {
    event.preventDefault();
    const box = document.getElementById("agree_all")! as HTMLInputElement;
    const box1 = document.getElementById("agree_mend_1")! as HTMLInputElement;
    const box2 = document.getElementById("agree_mend_2")! as HTMLInputElement;
    const box3 = document.getElementById("agree_opt")! as HTMLInputElement;
    if (box.checked) {
      box1.checked = true;
      box2.checked = true;
      box3.checked = true;
    } else {
      box1.checked = false;
      box2.checked = false;
      box3.checked = false;
    }
  };

  const PasswordCheck = (inputtxt) => {
    var passw = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
    if (inputtxt.match(passw)) {
      return true;
    } else {
      return false;
    }
  };

  const toNext = (e) => {
    e.preventDefault();

    const selectValue = document.getElementsByTagName("select");
    const birthday =
      selectValue[0].value + selectValue[1].value + selectValue[2].value;
    const gender = selectValue[3].value;
    const phoneFull = selectValue[4].value + phone;
    const box1 = document.getElementById("agree_mend_1")! as HTMLInputElement;
    const box2 = document.getElementById("agree_mend_2")! as HTMLInputElement;

    if (!box1.checked || !box2.checked) {
      alert("????????? ??????????????????.");
      return;
    }

    if (!username || !phone || !email || !userID || !password || !passcheck) {
      alert("????????? ????????? ?????????");
      return;
    }

    if (
      selectValue[0].value == "??????(??????)" ||
      selectValue[1].value == "???(??????)" ||
      selectValue[2].value == "???(??????)" ||
      selectValue[3].value == "??????"
    ) {
      alert("????????? ????????? ?????????");
      return;
    }

    if (password != passcheck) {
      alert("??????????????? ???????????? ????????????.");
      return;
    }

    if (password.length < 8 || PasswordCheck(password)) {
      alert("??????????????? ????????? ?????????")
      return;
    }

    var user = {};

    user["id"] = userID;
    user["password"] = password;
    user["username"] = username;
    user["birthday"] = birthday;
    user["gender"] = gender;
    user["phone"] = phoneFull;
    user["email"] = email;

    router.push({
      pathname: "/signup/2",
      query: { query: JSON.stringify(user) },
    });
  };

  return (
    <>
      <Head>
        <title>Sizeyourself::????????????::Step1</title>
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
              <p style={{ color: "black" }}>
                Step 1 ???????????? <span>Step 2</span> <span> Step 3</span>
              </p>
            </div>
            <Content>
              <h1>????????????</h1>
              <div className="input-box">
                <p>??????</p>
                <input
                  type="text"
                  className="one"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                />
              </div>
              <div className="input-box">
                <p>??????</p>
                <div className="three">
                  <select id="year">
                    <option>??????(??????)</option>
                    {[...Array(120).keys()].map((key) => {
                      return <option value={key + 1900}>{key + 1900}</option>;
                    })}
                  </select>
                  <select id="month">
                    <option>???(??????)</option>
                    {[...Array(12).keys()].map((key) => {
                      return <option value={key + 1}>{key + 1}</option>;
                    })}
                  </select>
                  <select id="day">
                    <option>???(??????)</option>
                    {[...Array(31).keys()].map((key) => {
                      return <option value={key + 1}>{key + 1}</option>;
                    })}
                  </select>
                </div>
              </div>
              <div className="input-box">
                <p>??????</p>
                <select className="one">
                  <option>??????</option>
                  <option>??????</option>
                  <option>??????</option>
                </select>
              </div>
              <div className="input-box">
                <p>????????? ??????</p>
                <div className="two">
                  <select>
                    <option>010</option>
                  </select>
                  <input
                    type="text"
                    placeholder="'-'??? ?????? ??????????????????"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="input-box">
                <p>?????????</p>
                <input
                  type="text"
                  className="one"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
              <div className="input-box">
                <p>?????????</p>
                <input
                  type="text"
                  className="one"
                  placeholder="6??? ?????? ??????, ?????? ?????? ??????"
                  value={userID}
                  onChange={(e) => {
                    setUserId(e.target.value);
                  }}
                />
              </div>
              <div className="input-box">
                <p>????????????</p>
                <input
                  type="password"
                  className="one"
                  placeholder="??????, ??????, ???????????? ??? 2?????? ?????? ?????? (?????? 8???)"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
              <div className="input-box">
                <p>???????????? ??????</p>
                <input
                  type="password"
                  className="one"
                  placeholder="??????????????? ?????? ?????? ????????? ?????????"
                  value={passcheck}
                  onChange={(e) => {
                    setPasscheck(e.target.value);
                  }}
                />
              </div>
              <hr
                style={{
                  width: "57.34%",
                  marginTop: "3.77vh",
                  marginBottom: "9vh",
                }}
              />
              <Radio style={{ marginBottom: "5.6vh" }}>
                <input type="checkbox" id="agree_all" onChange={handleAgree} />
                <p style={{ fontWeight: 500 }}>
                  ????????????(?????? ??? ?????? ?????? ?????? ?????? ???)
                </p>
              </Radio>
              <Radio>
                <input type="checkbox" id="agree_mend_1" />
                <div>
                  <p>(??????) ????????? ????????????</p>
                  <a id="detail">???????????????</a>
                </div>
              </Radio>
              <Radio>
                <input type="checkbox" id="agree_mend_2" />
                <div>
                  <p>(??????) ???????????? ?????? ????????????</p>
                  <a id="detail">???????????????</a>
                </div>
              </Radio>
              <p id="warning" style={{ marginBottom: "4.8vh" }}>
                * ???????????? ?????? ??? ??????????????? ???????????? ????????????, ???????????????
                ??????????????? ???????????????.
              </p>
              <Radio>
                <input type="checkbox" id="agree_opt" />
                <div>
                  <p>(??????) ?????? ????????? ?????? ???????????? ?????? ??? ?????? ??????</p>
                  <a id="detail">???????????????</a>
                </div>
              </Radio>
              <p id="warning">
                * ??????????????? ???????????? ???????????? ????????? ????????? ????????? ????????????.
              </p>
              <p className="check">
                ??? 14??? ????????????, ??????????????? ???????????? ?????? ??? ????????? <br />
                ??????????????? ???????????????????
              </p>
              <div id="submit" onClick={toNext}>
                ???????????? ????????????
              </div>
            </Content>
          </MainMargin>
        </MainContent>
      </Layout>
    </>
  );
}

export default withRouter(one);
