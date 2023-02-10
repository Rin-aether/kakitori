import { useState, useEffect, useRef } from "react";
import MoziFunction from "./MoziFunction";
import "../../scss/mozi.scss";

const Mozi = () => {
  ////////////////////////////////
  const canvasRef = useRef(null);
  const buttonRef = useRef(null);
  const wrapRef = useRef(null);

  const [result, setResult] = useState(["例", "夢", "と"]);
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

  const test2 = () => {
    console.log("test2");
  };

  const [a, b, c] = result;

  return (
    <>
      <div className="mozi-wrap">
        <div className="num-wrap">
          {[1,2,3,4,5,6,7,8,9,10].map((v, i) => {

            
            return <div className="num">{i + 1}</div>;
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

          <button className="erase-btn" ref={buttonRef}>
            クリア
          </button>
        </div>
      </div>
    </>
  );
};

export default Mozi;
