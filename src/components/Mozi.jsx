import { useState, useEffect, useRef } from "react";
import MoziFunction from "./MoziFunction";
import "../../scss/mozi.scss";
import { quiz } from "./Kanjidata";

const Mozi = ({ motion1, motion2, moziHidden, flagprop }) => {
  const quizLenght = quiz.length; //クイズの数
  ////////////////////////////////
  const canvasRef = useRef(null);
  const buttonRef = useRef(null);
  const resultBtn1 = useRef(null);
  const resultBtn2 = useRef(null);
  const resultBtn3 = useRef(null);
  const wrapRef = useRef(null);

  const [question, setQuestion] = useState("<span>ユウシュウ</span>の美");
  const [result, setResult] = useState(["", "", ""]);
  const [alert, setAlert] = useState("LEVEL UP");
  const [quizNow, setQuizNow] = useState(0);
  const [lifeNow, setLifeNow] = useState(3);
  const [maru, setMaru] = useState(true);
  const [batu, setBatu] = useState(true);
  const [level, setLevel] = useState(true);
  const [clear, setClear] = useState(true);
  const [failed, setFailed] = useState(true);
  const [startBlack, setStartBlack] = useState(false);
  const [end, setEnd] = useState(true);
  const [endBlack, setEndBlack] = useState(true);
  const [go, setGo] = useState(true);

  MoziFunction(function () {
    setResult(["", "", ""]);
  });

  setTimeout(() => {
    setStartBlack(true);
  }, 1000);

  useEffect(() => {
    setTimeout(() => {
      setQuestion(quiz[quizNow].question);
      setGo(true);
      firstset();
    }, 500);
  }, []);

  useEffect(() => {
    var canvas = new handwriting.Canvas(
      canvasRef.current,
      4,
      buttonRef.current,
      resultBtn1.current,
      resultBtn2.current,
      resultBtn3.current
    );

    let canvasParent = wrapRef.current;
    canvas.cxt.canvas.width = canvasParent.clientWidth; //縦と横
    canvas.cxt.canvas.height = canvasParent.clientHeight;

    canvas.setCallBack(function (data, err) {
      setResult(data);
    });
  }, [canvasRef]);
  const [a, b, c] = result;
  ///////////////問題書き換え////////////////////
  const quizset = () => {
    setQuestion(quiz[quizNow + 1].question);
    setGo(true);
  };

  const firstset = () => {
    setTimeout(() => {
      motion1();
    }, 1000);
    setTimeout(() => {
      setGo(false);
    }, 4000);
  };

  const batuAct = () => {
    setBatu(false);
    setTimeout(() => {
      setLifeNow(lifeNow - 1);
    }, 1100);
    setTimeout(() => {
      setBatu(true);
      if (lifeNow == 1) {
        setFailed(false);
        setEnd(false);
        setGo(true);
        setTimeout(() => {
          allend();
        }, 3500);
      }
    }, 1800);
  };

  const maruAct = () => {
    setMaru(false);
    setGo(true);
    if (quizNow == 7) {
      setAlert("FINAL");
    }
    setTimeout(() => {
      setQuizNow((quizNow) => quizNow + 1);
      quizset();
    }, 1100);
    setTimeout(() => {
      setMaru(true);
      if (quizNow == 9) {
        setClear(false);
        setEnd(false);
        setTimeout(() => {
          allend();
        }, 3500);
      }
    }, 1800);
  };

  const answerCheck = (event) => {
    if (quiz[quizNow].answer == event.target.textContent) {
      setResult(["", "", ""]);
      maruAct();

      setTimeout(() => {
        if (quizNow == 2 || quizNow == 5 || quizNow == 8) {
          setLevel(false);
        } else {
          setLevel(true);
        }
      }, 1000);
      if (quizNow != 9) {
        setTimeout(() => {
          motion2();
        }, 1700);
        setTimeout(() => {
          setGo(false);
        }, 4500);
      }
    } else {
      setResult(["", "", ""]);
      batuAct();
    }
  };

  const allend = () => {
    setEndBlack(false);
    flagprop();
    setTimeout(() => {
      moziHidden();
    }, 1400);
  };
  //任意のタイミングでuseEffectを実行する関数
  // const executeUseEffect = () => {
  //   setDummyState((prevState) => !prevState);
  // };
  return (
    <>
      <div
        className={`${
          startBlack ? "mozi-black" : "mozi-black mozi-black-add"
        } ${endBlack ? "" : "mozi-end-add"}`}
      ></div>
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
              <div className={i < quizNow ? "num num-add" : "num"} key={v}>
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
              onClick={answerCheck}
              style={{ fontSize: `${6.7 / result[0].length}rem` }}
              ref={resultBtn1}
            >
              <p>{result[0]}</p>
            </div>
          </div>
          <div className="result-push">
            <div
              className={a && b && c ? "result add" : "result"}
              onClick={answerCheck}
              style={{ fontSize: `${6.7 / result[1].length}rem` }}
              ref={resultBtn2}
            >
              <p>{result[1]}</p>
            </div>
          </div>
          <div className="result-push">
            <div
              className={a && b && c ? "result add" : "result"}
              onClick={answerCheck}
              style={{ fontSize: `${6.7 / result[2].length}rem` }}
              ref={resultBtn3}
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

          <div className="life-wrap">
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
