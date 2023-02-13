import { useState, useEffect, useRef } from "react";
import MoziFunction from "./MoziFunction";
import "../../scss/mozi.scss";

const Mozi = ({ motion }) => {
  ////////////////////////////////
  const canvasRef = useRef(null);
  const buttonRef = useRef(null);
  const wrapRef = useRef(null);

  const [question, setQuestion] = useState("千差<span>バンベツ</span>");
  const [result, setResult] = useState(["", "", ""]);
  const [alert, setAlert] = useState("LEVEL UP");
  const [quizNow, setQuizNow] = useState(5);
  const [lifeNow, setLifeNow] = useState(3);
  const [maru, setMaru] = useState(true);
  const [batu, setBatu] = useState(true);
  const [level, setLevel] = useState(true);
  const [clear, setClear] = useState(true);
  const [failed, setFailed] = useState(true);
  const [start, setStart] = useState(true);
  const [end, setEnd] = useState(true);
  const [go, setGo] = useState(true);

  MoziFunction(function () {
    setResult(["", "", ""]);
  });

  useEffect(() => {
    var canvas = new handwriting.Canvas(
      canvasRef.current,
      3,
      buttonRef.current
    );

    let canvasParent = wrapRef.current;
    canvas.cxt.canvas.width = canvasParent.clientWidth; //縦と横
    canvas.cxt.canvas.height = canvasParent.clientHeight;

    canvas.setCallBack(function (data, err) {
      setResult(data);
    });
  }, [canvasRef]);
  const [a, b, c] = result;

  const test2 = (event) => {
    console.log(event.target.textContent);
  };

  return (
    <>
      <div className={start ? "normal" : "black-zone"}></div>
      <div className={batu ? "normal" : "red-zone"}></div>
      <div className={end ? "end-black" : "end-black end-black-add"}></div>
      <div className="failed-area">
        <div className={failed ? "failed" : "failed-add"}>
          <h2>FAILED...</h2>
        </div>
      </div>
      <div className="clear-area">
        <div className={clear ? "clear" : "clear-add"}>
          <h2>CLEAR</h2>
        </div>
      </div>
      <div className="alert-area">
        <div className={level ? "level" : "level-add"}>
          <h2>{alert}</h2>
        </div>
      </div>
      {/* //////////////////////////////////////////////////// */}

      <div className="mozi-wrap">
        <div className="num-wrap">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((v, i) => {
            return (
              <div className={i < quizNow - 1 ? "num num-add" : "num"} key={v}>
                {i + 1}
              </div>
            );
          })}
        </div>

        <div className="q-wrap">
          <div className={go ? "question" : "q-add"}>
            <h1>
              <div dangerouslySetInnerHTML={{ __html: question }} />
            </h1>
          </div>
        </div>
        <h1 id="h1"></h1>
        <div className="result-wrap">
          <div className="result-push">
            <div
              className={a && b && c ? "result add" : "result"}
              onClick={test2}
              style={{ fontSize: `${6.7 / result[0].length}rem` }}
            >
              <p>{result[0]}</p>
            </div>
          </div>
          <div className="result-push">
            <div
              className={a && b && c ? "result add" : "result"}
              onClick={test2}
              style={{ fontSize: `${6.7 / result[1].length}rem` }}
            >
              <p>{result[1]}</p>
            </div>
          </div>
          <div className="result-push">
            <div
              className={a && b && c ? "result add" : "result"}
              onClick={test2}
              style={{ fontSize: `${6.7 / result[2].length}rem` }}
            >
              <p>{result[2]}</p>
            </div>
          </div>
        </div>

        <div style={{ display: "inline-block" }}>
          <div
            className={go ? "mozi-canvas-wrap" : "mozi-canvas-wrap canvas-add"}
            ref={wrapRef}
          >
            <canvas className="mozi-canvas" ref={canvasRef}></canvas>
          </div>
          <br />

          <button
            className={a && b && c ? "erase-btn" : "display-none"}
            ref={buttonRef}
          >
            <img src="/images/kesi.png" alt="" />
          </button>

          <div
            className="life-wrap"
            onClick={() => {
              setGo(!go);
              motion();
            }}
          >
            <img src="/images/heart.png" alt="" />
            <h3>✖</h3>
            <h2>{lifeNow}</h2>
          </div>
        </div>
        <div className="check-wrap">
          <img
            className={maru ? "maru" : "maru-add"}
            src="/images/maru.png"
            alt=""
          />
          <img
            className={batu ? "batu" : "batu-add"}
            src="/images/batu.png"
            alt=""
          />
        </div>
      </div>
    </>
  );
};

export default Mozi;
