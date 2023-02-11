import { useState, useEffect, useRef } from "react";
import MoziFunction from "./MoziFunction";
import "../../scss/mozi.scss";

const Mozi = () => {
  ////////////////////////////////
  const canvasRef = useRef(null);
  const buttonRef = useRef(null);
  const wrapRef = useRef(null);

  const [result, setResult] = useState(["例", "夢", "凍"]);
  const [quizNow, setQuizNow] = useState(5);
  const [lifeNow, setLifeNow] = useState(3);

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
        <div className="rutika">
          <img src="/images/rutika.png" alt="" />
        </div>
        <div className="q-wrap">
          <h1>
            千差<span>バンベツ</span>
          </h1>
        </div>
        <h1 id="h1"></h1>
        <div className="result-wrap">
          <div
            className={a && b && c ? "result add" : "result"}
            onClick={test2}
            style={{ fontSize: `${6.7 / result[0].length}rem` }}
          >
            <p>{result[0]}</p>
          </div>
          <div
            className={a && b && c ? "result add" : "result"}
            onClick={test2}
            style={{ fontSize: `${6.7 / result[0].length}rem` }}
          >
            <p>{result[1]}</p>
          </div>
          <div
            className={a && b && c ? "result add" : "result"}
            onClick={test2}
            style={{ fontSize: `${6.7 / result[0].length}rem` }}
          >
            <p>{result[2]}</p>
          </div>
        </div>

        <div style={{ display: "inline-block" }}>
          <div className="mozi-canvas-wrap" ref={wrapRef}>
            <canvas className="mozi-canvas" ref={canvasRef}></canvas>
          </div>
          <br />

          <button
            className={a && b && c ? "erase-btn" : "display-none"}
            ref={buttonRef}
          >
            <img src="/images/kesi.png" alt="" />
          </button>

          <div className="life-wrap">
            <img src="/images/heart.png" alt="" />
            <span>✖</span><h2>{lifeNow}</h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default Mozi;
