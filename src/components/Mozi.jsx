import { useState, useEffect, useRef } from "react";
import MoziFunction from "./MoziFunction";
import "../../scss/mozi.scss";
import { quiz, reloadQuiz } from "./Kanjidata";

const Mozi = ({ motion, motion2, motion3, motion4, moziHidden, flagprop }) => {
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
  const [showModal, setShowModal] = useState(true);

  MoziFunction(function () {
    setResult(["", "", ""]);
  });
  ////////////開始処理///////////////////////////
  setTimeout(() => {
    setStartBlack(true);
  }, 2500);

  useEffect(() => {
    reloadQuiz();
    setTimeout(() => {
      setQuestion(quiz[quizNow].question);
      setGo(true);
      firstset();
    }, 2100);
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
      motion();
    }, 800);
    setTimeout(() => {
      setGo(false);
    }, 3000);
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
        flagprop();
        setTimeout(() => {
          allend();
        }, 3500);
      }
    }, 1800);
  };

  const motionStart = () => {
    if (quizNow <= 1) {
      motion();
    } else if (quizNow >= 2 && quizNow <= 4) {
      motion2();
    } else if (quizNow >= 5 && quizNow <= 7) {
      motion3();
    } else{
      motion4();
    }
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
          motionStart();
        }, 1600);
        setTimeout(() => {
          setGo(false);
        }, 3600);
      }
    } else {
      setResult(["", "", ""]);
      batuAct();
    }
  };

  const allend = () => {
    setEndBlack(false);
    setTimeout(() => {
      moziHidden();
    }, 1400);
  };

  return (
    <>
      <div
        className={`${
          startBlack ? "mozi-black" : "mozi-black mozi-black-add"
        } ${endBlack ? "" : "mozi-end-add"}`}
      ></div>
      <div className={showModal ? "overlay" : "overlay-add"}></div>
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
      {/* ///////モーダル////////////////////////////////// */}

      <button
        className="quiz-skip-btn"
        onClick={() => {
          setShowModal(!showModal);
        }}
      ></button>

      <div className="modal-wrap">
        <div className={showModal ? "modal" : "modal modal-add"}>
          <h2>━ RETIRE ━</h2>
          <h3>書き取りを中断しますか？</h3>

          <div className="btn-wrap">
            <button
              className="cancel-btn"
              onClick={() => {
                setShowModal(!showModal);
              }}
            >
              キャンセル
            </button>
            <button
              className="ok-btn"
              onClick={() => {
                allend();
              }}
            >
              OK
            </button>
          </div>
        </div>
      </div>

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
