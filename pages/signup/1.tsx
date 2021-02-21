import Head from "next/head";
import Layout from "../../components/Layout";
import styled from "styled-components";
import Link from "next/link";
import { useState, useEffect } from "react";
import { withRouter, useRouter } from "next/router";
import { User } from "../../lib/classes";

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

  if (typeof query.query == "undefined") {
    useEffect(() => {
      router.push("/");
    }, []);
  }

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
    console.log(box.checked, box1.checked, box2.checked, box3.checked);
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
      alert("약관에 동의해주세요.");
      return;
    }

    if (!username || !phone || !email || !userID || !password || !passcheck) {
      alert("빈칸을 확인해 주세요");
      return;
    }

    if (
      selectValue[0].value == "생년(선택)" ||
      selectValue[1].value == "월(선택)" ||
      selectValue[2].value == "일(선택)" ||
      selectValue[3].value == "선택"
    ) {
      alert("빈칸을 선택해 주세요");
      return;
    }

    if (password != passcheck) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    if (password.length < 8 || PasswordCheck(password)) {
      alert("비밀번호를 확인해 주세요")
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
        <title>Sizeyourself::회원가입::Step1</title>
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
              <p style={{ color: "black" }}>
                Step 1 정보입력 <span>Step 2</span> <span> Step 3</span>
              </p>
            </div>
            <Content>
              <h1>회원가입</h1>
              <div className="input-box">
                <p>이름</p>
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
                <p>나이</p>
                <div className="three">
                  <select id="year">
                    <option>생년(선택)</option>
                    {[...Array(120).keys()].map((key) => {
                      return <option value={key + 1900}>{key + 1900}</option>;
                    })}
                  </select>
                  <select>
                    <option>월(선택)</option>
                    {[...Array(12).keys()].map((key) => {
                      return <option value={key + 1}>{key + 1}</option>;
                    })}
                  </select>
                  <select>
                    <option>일(선택)</option>
                    {[...Array(31).keys()].map((key) => {
                      return <option value={key + 1}>{key + 1}</option>;
                    })}
                  </select>
                </div>
              </div>
              <div className="input-box">
                <p>성별</p>
                <select className="one">
                  <option>선택</option>
                  <option>남자</option>
                  <option>여자</option>
                </select>
              </div>
              <div className="input-box">
                <p>휴대폰 번호</p>
                <div className="two">
                  <select>
                    <option>010</option>
                  </select>
                  <input
                    type="text"
                    placeholder="'-'표 없이 입력해주세요"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="input-box">
                <p>이메일</p>
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
                <p>아이디</p>
                <input
                  type="text"
                  className="one"
                  placeholder="6자 이상 영문, 숫자 입력 가능"
                  value={userID}
                  onChange={(e) => {
                    setUserId(e.target.value);
                  }}
                />
              </div>
              <div className="input-box">
                <p>비밀번호</p>
                <input
                  type="password"
                  className="one"
                  placeholder="영문, 숫자, 특수문자 중 2가지 이상 조합 (최소 8자)"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
              <div className="input-box">
                <p>비밀번호 확인</p>
                <input
                  type="password"
                  className="one"
                  placeholder="비밀번호를 다시 한번 입력해 주세요"
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
                  전체동의(약관 및 개인 정보 수집 동의 등)
                </p>
              </Radio>
              <Radio>
                <input type="checkbox" id="agree_mend_1" />
                <div>
                  <p>(필수) 서비스 이용약관</p>
                  <a id="detail">자세히보기</a>
                </div>
              </Radio>
              <Radio>
                <input type="checkbox" id="agree_mend_2" />
                <div>
                  <p>(필수) 개인정보 수집 이용동의</p>
                  <a id="detail">자세히보기</a>
                </div>
              </Radio>
              <p id="warning" style={{ marginBottom: "4.8vh" }}>
                * 개인정보 수집 및 이용동의를 거부하실 수있으며, 동의거부시
                회원가입이 제한됩니다.
              </p>
              <Radio>
                <input type="checkbox" id="agree_opt" />
                <div>
                  <p>(선택) 홍보 마케팅 목적 개인정보 수집 및 이용 동의</p>
                  <a id="detail">자세히보기</a>
                </div>
              </Radio>
              <p id="warning">
                * 선택사항에 동의하지 않으셔도 서비스 이용에 제한은 없습니다.
              </p>
              <p className="check">
                만 14세 이상이며, 이용약관과 개인정보 수집 및 이용을 <br />
                확인하였고 동의하십니까?
              </p>
              <div id="submit" onClick={toNext}>
                동의하고 회원가입
              </div>
            </Content>
          </MainMargin>
        </MainContent>
      </Layout>
    </>
  );
}

export default withRouter(one);
