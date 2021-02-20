import Head from "next/head";
import Layout from "../../components/Layout";
import styled from "styled-components";
import Link from "next/link";
import { useState, useRef } from "react";
import { ImageZone } from "../../components/ImageZone";
import { useEffect } from "react";
import { Circle } from "../../components/Circle";
import { useRouter, withRouter } from "next/router";
import { Line } from "../../components/Line";

class circleData {
  public node: string;
  public cx: number;
  public cy: number;
  constructor(node: string, cx: number, cy: number) {
    this.node = node;
    this.cx = cx;
    this.cy = cy;
  }
}

class lineData {
  public from: string;
  public to: string;
  constructor(from: string, to: string) {
    this.from = from;
    this.to = to;
  }
}

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
const Submit = styled.button`
  margin-bottom: 8vh;
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

  button {
    cursor: pointer;
    width: 27%;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 4.5vh;
    font-size: 11px;
    border-radius: 16px;
    border: none;
  }

  button:first-child {
    color: #999999;
    border: 1.5px solid #999999;
  }
  button:last-child {
    color: white;
    background-color: #191919;
    opacity: 0.65;
  }
`;
const ImgBox = styled.div`
  background-color: gray;
  height: 62.4vh;
  margin-bottom: 1.45vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  canvas {
    position: absolute;
    z-index: 10;
  }

  svg {
    position: absolute;
    z-index: 20;
  }

  img {
    max-width: 100%;
    max-height: 100%;
  }
`;

const Loading = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 62.4vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.4);
  width: 100% !important;
  p {
    color: white;
    font-size: 30px;
    font-weight: 600;
  }
`;

const Example = styled.div`
  height: 30vh;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10vh;
  img {
    border: 1px solid black;
    max-height: 100%;
    max-width: 100%;
  }
`;

function two({ router: { query } }) {
  const router = useRouter();

  const d3 = require("d3");
  const posenet = require("@tensorflow-models/posenet");

  const [nodeList, setNodeList] = useState<circleData[]>([]);
  const [lineList, setLineList] = useState<lineData[]>([]);
  const [poseData, setPoseData] = useState<any>();
  const [ratio, setRatio] = useState<number>();
  const [result, setResult] = useState<number[]>([0, 0, 0, 0, 0]);

  const [imgLoad, setImgLoad] = useState<boolean>(false);
  const [img, setImg] = useState<string>();
  const [canvas, setCanvas] = useState<HTMLCanvasElement>();
  const [loading, setLoading] = useState<boolean>(false);

  const [height, setHeight] = useState<number>();
  const [weight, setWeight] = useState<number>();

  const [heightPxl, setHeightPxl] = useState<number>();

  const [calculated, setCalculated] = useState<boolean>(false);

  const myRef = useRef<SVGSVGElement>(null);
  var identifiables = new WeakMap<Object, number>();
  var nextId = 1;

  const assignId = (obj: Object) => {
    let id = identifiables.get(obj);
    if (id) return id;
    id = nextId;
    nextId += 1;
    identifiables.set(obj, id);
    return id;
  };

  const process_img = async () => {
    const imageElement = document.getElementById("input");
    const net = await posenet.load({
      architectrue: "MovileNetV1",
      outputStride: 16,
      multiplier: 0.75,
    });
    const pose = await net.estimateSinglePose(imageElement, {
      flipHorizontal: false,
    });
    setPoseData(pose);
  };

  const draw_height = () => {
    alert(
      "아래 사진처럼 각 점을 머리 끝과 뒷꿈치에 맞춘 후 입력 버튼을 눌러주세요."
    );
    var cl: circleData[] = [];
    var ll: lineData[] = [];
    var nose = newCoord(0)!;
    var ankle1 = newCoord(15)!;
    var ankle2 = newCoord(16)!;
    cl.push(new circleData("top", nose[1], nose[2] - 45));
    cl.push(
      new circleData(
        "bottom",
        (ankle1[1] + ankle2[1]) / 2,
        (ankle1[2] + ankle2[2]) / 2 + 25
      )
    );
    ll.push(new lineData("top", "bottom"));
    setNodeList(cl);
    setLineList(ll);
    setLoading(false);
  };

  const newCoord = (i: number) => {
    const canvas = document.getElementById(
      "image_container"
    )! as HTMLCanvasElement;
    const img = document.getElementById("input") as HTMLImageElement;
    var node = poseData.keypoints[i].part;
    const x =
      (((img.width * canvas.height) / img.height) *
        poseData.keypoints[i].position.x) /
        img.width +
      (canvas.width - (img.width * canvas.height) / img.height) / 2;
    const y = (canvas.height * poseData.keypoints[i].position.y) / img.height;
    return [node, x, y];
  };

  const getDistance = (d1: string, d2: string) => {
    const obj1 = d3.select(d1).datum();
    const obj2 = d3.select(d2).datum();
    return Math.sqrt(
      Math.pow(obj1.center[0] - obj2.center[0], 2) +
        Math.pow(obj1.center[1] - obj2.center[1], 2)
    );
  };

  const getYDistance = (d1: string, d2: string) => {
    const obj1 = d3.select(d1).datum();
    const obj2 = d3.select(d2).datum();
    return Math.abs(obj1.center[1] - obj2.center[1]);
  };

  useEffect(() => {
    if (poseData) {
      draw_height();
    }
  }, [poseData]);

  useEffect(() => {
    const zone = document.getElementById("temp");
    if (!imgLoad) {
      zone.style.display = "none";
    }
    if (imgLoad) {
      setLoading(true);
      zone.style.display = "flex";
      // eslint-disable-next-line react-hooks/exhaustive-deps
      const canvas = document.getElementById(
        "image_container"
      )! as HTMLCanvasElement;
      const ctx = canvas.getContext("2d")!;
      const image = document.getElementById("input")! as HTMLImageElement;
      const svgBox = document.getElementById("svg_box");
      image.onload = () => {
        canvas.width = image.width;
        canvas.height = image.height;
        svgBox.style.width = String(image.width);
        svgBox.style.height = String(image.height);
      };
      process_img();
    }
  }, [imgLoad, img]);

  const checkInput = () => {
    const heightScale = (document.getElementById(
      "height"
    )! as HTMLSelectElement).value;
    const weightScale = (document.getElementById(
      "weight"
    )! as HTMLSelectElement).value;
    if (!height || !weight) {
      alert("모든 값을 입력해주세요.");
      return null;
    }
    var h = height;
    var w = weight;
    if (heightScale === "in") h *= 2.54;
    if (weightScale === "lb") w /= 2.205;
    return [h, w];
  };

  const handleManual = (event) => {
    event.preventDefault();
    const values = checkInput();
    if (values) {
      console.log(values);
    }
  };

  const handleNext = (event) => {
    event.preventDefault();
    const values = checkInput();
    if (values) {
      if (!(img && calculated)) {
        alert("모든 정보를 입력해주세요!");
        return;
      }
      const ratio = height / heightPxl;
      const shoulder = ratio * getDistance("#leftShoulder", "#rightShoulder");
      const arm1 =
        ratio *
        (getDistance("#leftShoulder", "#leftElbow") +
          getDistance("#leftWrist", "#leftElbow"));
      const arm2 =
        ratio *
        (getDistance("#rightShoulder", "#rightElbow") +
          getDistance("#rightWrist", "#rightElbow"));
      const arm = (arm1 + arm2) / 2;
      const waist = ratio * getDistance("#leftHip", "#rightHip");
      const leg1 = ratio * getYDistance("#leftHip", "#leftAnkle");
      const leg2 = ratio * getYDistance("#rightHip", "#rightAnkle");
      const leg = (leg1 + leg2) / 2;
      const upper1 = ratio * getYDistance("#leftShoulder", "#leftHip");
      const upper2 = ratio * getYDistance("#rightShoulder", "#rightHip");
      const upper = (upper1 + upper2) / 2;
      var result: number[] = [];
      result[0] = upper;
      result[1] = shoulder;
      result[2] = arm;
      result[3] = waist;
      result[4] = leg;
      setResult(result);
      setLineList([]);
      setNodeList([]);
    }
  };

  const calcHeight = (event) => {
    event.preventDefault();
    if (!calculated) {
      alert(
        "점들을 아래 사진과 같이 어깨 선과 허리 선, 다리 선에 맞추고 입력 버튼을 눌러주세요."
      );
      setLoading(true);
      setHeightPxl(getDistance("#top", "#bottom"));
      var cl: circleData[] = [];
      var ll: lineData[] = [];
      for (let i = 5; i < 17; i++) {
        const temp = newCoord(i)!;
        cl.push(new circleData(temp[0], temp[1], temp[2]));
      }
      ll.push(new lineData("leftShoulder", "rightShoulder"));
      ll.push(new lineData("leftWrist", "leftElbow"));
      ll.push(new lineData("leftElbow", "leftShoulder"));
      ll.push(new lineData("rightShoulder", "rightElbow"));
      ll.push(new lineData("rightElbow", "rightWrist"));
      ll.push(new lineData("leftHip", "rightHip"));
      ll.push(new lineData("leftAnkle", "leftKnee"));
      ll.push(new lineData("leftKnee", "leftHip"));
      ll.push(new lineData("rightAnkle", "rightKnee"));
      ll.push(new lineData("rightKnee", "rightHip"));
      ll.push(new lineData("leftHip", "leftShoulder"));
      ll.push(new lineData("rightHip", "rightShoulder"));
      nodeList[0].cx = nodeList[0].cy = nodeList[1].cx = nodeList[1].cy = 9999;
      setNodeList([...nodeList, ...cl]);
      setLineList(ll);
      setLoading(false);
      setCalculated(true);
    } else {
      setLoading(true);
    }
  };

  return (
    <>
      <Head>
        <title>Sizeyourself::회원가입::Step2</title>
        <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs"></script>
        <script src="https://cdn.jsdelivr.net/npm/@tensorflow-models/posenet"></script>
        <script src="https://cdn.jsdelivr.net/npm/d3-require@1"></script>
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
              {!imgLoad && (
                <ImageZone setImgLoad={setImgLoad} setImg={setImg} />
              )}
              <ImgBox id="temp">
                {loading && (
                  <Loading>
                    <p>{!calculated ? "Loading..." : ""}</p>
                  </Loading>
                )}
                <canvas id="image_container" />
                <svg ref={myRef} id="svg_box">
                  {nodeList.map((data) => (
                    <Circle node={data.node} cx={data.cx} cy={data.cy} />
                  ))}
                  {lineList.map((data) => (
                    <Line from={data.from} to={data.to} assignId={assignId} />
                  ))}
                </svg>
                <img id="input" alt="input" src={img} />
              </ImgBox>
              <Submit disabled={!img} onClick={calcHeight}>
                입력
              </Submit>
              {img && (
                <Example>
                  {calculated ? (
                    <img src="/images/rest.png" />
                  ) : (
                    <img src="/images/height.png" />
                  )}
                </Example>
              )}
              <DataRow>
                <p>키 입력</p>
                <input
                  placeholder="키를 입력해주세요"
                  value={height}
                  onChange={(e) => setHeight(parseInt(e.target.value))}
                />
                <select id="height">
                  <option>cm</option>
                  <option>in</option>
                </select>
              </DataRow>
              <DataRow>
                <p>몸무게 입력</p>
                <input
                  placeholder="몸무게를 입력해주세요"
                  value={weight}
                  onChange={(e) => setWeight(parseInt(e.target.value))}
                />
                <select id="weight">
                  <option>kg</option>
                  <option>lb</option>
                </select>
              </DataRow>
              <ButtonRow>
                <button onClick={handleManual}>사이즈 직접 입력하기</button>
                <button onClick={handleNext}>사이즈 측정하기</button>
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

export default withRouter(two);
