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
  const [meaningVisible, setMeaningVisible] = useState(false);
  const [isAnswerVisible, setIsAnswerVisible] = useState(false);
  const [buttonImage, setButtonImage] = useState("/images/megane.svg");
  const [answerButtonState, setAnswerButtonState] = useState({
    text: "答え",
    imagePath: "/images/eye.svg",
  });

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

  //////不正解の場合の処理   ////////////////////////
  const batuAct = () => {
    setBatu(false);
    setTimeout(() => {
      setBatu(true);
    }, 1800);
  };

  //正解の場合の処理    ////////////////////////////////
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
    } else {
      motion4();
    }
  };

  const answerCheck = (event) => {
    setIsAnswerVisible(false);
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

  // 意味表示の切り替えとボタン画像の更新を行う関数
  const toggleMeaningVisibility = () => {
    setMeaningVisible(!meaningVisible);
    // 画像を切り替える
    if (!meaningVisible) {
      setButtonImage("/images/mean-batu.svg"); // 表示時の画像に切り替える
    } else {
      setButtonImage("/images/megane.svg"); // 非表示時の元の画像に戻す
    }
  };
  //答えの文字数取得
  const getAnswerClass = () => {
    const answerLength = quiz[quizNow].answer.length;
    return answerLength === 3 ? "triple-char" : "double-or-less-char";
  };
  //答えの表示切り替え
  const toggleAnswerVisibility = () => {
    setIsAnswerVisible(!isAnswerVisible);
    if (!isAnswerVisible) {
      // 答えを表示する状態へ切り替える
      setAnswerButtonState({
        text: "隠す",
        imagePath: "/images/eye-close.svg",
      });
    } else {
      // 答えを隠す状態へ切り替える
      setAnswerButtonState({
        text: "答え",
        imagePath: "/images/eye.svg",
      });
    }
  };

  const getFontSize = (length) => {
    if (length === 1) return 6.6; // 1文字の場合のフォントサイズ
    if (length === 2) return 3.3; // 2文字の場合のフォントサイズ
    if (length === 3) return 2.2; // 3文字の場合のフォントサイズ
    return 2.2; // 4文字以上の場合のフォントサイズ
  };

  /////////////////////////return/////////////////////////////////////

  return (
    <>
      <div
        className={`${
          startBlack ? "mozi-black" : "mozi-black mozi-black-add"
        } ${endBlack ? "" : "mozi-end-add"}`}
      ></div>
      <div className={showModal ? "overlay" : "overlay-add"}></div>
      <div className={end ? "end-black" : "end-black end-black-add"}></div>
      <div className="failed-area">
        <div className={failed ? "failed" : "failed-add"}>
          <h2>FAILED...</h2>
        </div>
      </div>
      <div className="clear-area">
        <div className={clear ? "clear" : "clear-add"}>
          <h2>CLEAR!</h2>
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

      {/* 問題数ゲージ */}
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

        {/* 問題文表示ゾーン */}
        <div className="q-wrap">
          <div className={go ? "question" : "q-add"}>
            <h1>
              <div dangerouslySetInnerHTML={{ __html: question }} />
            </h1>
          </div>
        </div>
        <h1 id="h1"></h1>

        {/* 文字認識結果表示ゾーン */}
        <div className="result-wrap">
          <div className="result-push">
            <div
              className={a && b && c ? "result add" : "result"}
              onClick={answerCheck}
              style={{
                fontSize:
                  result && result[0] && result[0].length
                    ? `${getFontSize(result[0].length)}rem`
                    : "2.2rem", // デフォルトのフォントサイズを設定
              }}
              ref={resultBtn1}
            >
              <p>{result[0]}</p>
            </div>
          </div>
          <div className="result-push">
            <div
              className={a && b && c ? "result add" : "result"}
              onClick={answerCheck}
              style={{
                fontSize:
                  result && result[1] && result[1].length
                    ? `${getFontSize(result[1].length)}rem`
                    : "2.2rem", // デフォルトのフォントサイズを設定
              }}
              ref={resultBtn2}
            >
              <p>{result[1]}</p>
            </div>
          </div>
          <div className="result-push">
            <div
              className={a && b && c ? "result add" : "result"}
              onClick={answerCheck}
              style={{
                fontSize:
                  result && result[2] && result[2].length
                    ? `${getFontSize(result[2].length)}rem`
                    : "2.2rem", // デフォルトのフォントサイズを設定
              }}
              ref={resultBtn3}
            >
              <p>{result[2]}</p>
            </div>
          </div>
        </div>

        {/* 記述キャンバス領域 */}
        <div style={{ display: "inline-block" }}>
          <div
            className={go ? "mozi-canvas-wrap" : "mozi-canvas-wrap canvas-add"}
            ref={wrapRef}
          >
            <canvas className="mozi-canvas" ref={canvasRef}></canvas>
            {/* 意味表示ボタン */}
            <button className="meaning-btn" onClick={toggleMeaningVisibility}>
              <img src={buttonImage} alt="" />
            </button>
            {/* 答え表示ボタン */}
            <button className="answer-btn" onClick={toggleAnswerVisibility}>
              <img src={answerButtonState.imagePath} alt="" />
              <h2>{answerButtonState.text}</h2>
            </button>
          </div>
          <br />
        </div>

        {/* 意味表示領域 */}
        <div
          className={
            meaningVisible ? "meaning-wrap" : "meaning-wrap display-none"
          }
        >
          <h2 dangerouslySetInnerHTML={{ __html: quiz[quizNow].meaning }} />
        </div>

        {/* 答え表示領域 */}
        <div
          className={`answer-wrap ${isAnswerVisible ? "answer-visible" : ""}`}
        >
          <h2 className={getAnswerClass()}>{quiz[quizNow].answer}</h2>
        </div>

        {/* 消しゴムボタン */}
        <button
          className={a && b && c ? "erase-btn" : "display-none"}
          ref={buttonRef}
        >
          <img src="/images/kesi.png" alt="" />
        </button>

        {/* マルバツ演出表示領域 */}
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
