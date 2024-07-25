import { useEffect, useState } from "react";
import "../../scss/style.scss";
import "../../scss/home.scss";
import Keikoku from "./Keikoku";
import Live2d from "./Live2d";
import Kanbatu from "./Kanbatu";
import Story from "./Story";

function App() {
  const appState = localStorage.getItem("flag");
  const flag = appState ? appState : "no";
  const [logo, setLogo] = useState(true);
  const [qstart, setQstart] = useState(false);
  const [sstart, setSstart] = useState(false);
  const [storyModal, setStoryModal] = useState(false);
  const [storyVisible, setStoryVisible] = useState(false);
  const [quizVisible, setquizVisible] = useState(false);
  const [quizVisible2, setquizVisible2] = useState(false);
  const [home, setHome] = useState(true);
  const [clearF, setCrearF] = useState("no");
  const displayStyle = clearF === "ok" ? {} : { display: "none" };
  const modelUrl = "/Live2dModels/rutika-model/runtime/rutika.model3.json";
  useEffect(() => {
    setCrearF(flag);
  }, []);
  useEffect(() => {
    localStorage.setItem("flag", clearF);
  }, [clearF]);

  const storyCheck = () => {
    if (clearF == "ok") {
      //ストーリー開始
      setHome(false);
      setTimeout(() => {
        setStoryVisible(true);
      }, 500);
    } else {
      setStoryModal(!storyModal);
    }
  };
  const qstartBtn = () => {
    setHome(false);
    setTimeout(() => {
      setquizVisible(true);
    }, 500);
  };
  // 漢伐↓
  const qstartBtn2 = () => {
    setHome(false);
    setTimeout(() => {
      setquizVisible2(true);
    }, 500);
  };
  const changeF = () => {
    setCrearF("ok");
  };
  return (
    modelUrl && (
      <>
        <div className="App">
          {quizVisible ? (
            <Live2d
              quizHidden={() => {
                setquizVisible(false);
                setHome(true);
              }}
              flag={changeF}
            />
          ) : null}

          {/* 漢伐↓ */}
          {quizVisible2 ? (
            <Kanbatu
              quizHidden2={() => {
                setquizVisible2(false);
                setHome(true);
              }}
              flag={changeF}
            />
          ) : null}

          {storyVisible ? (
            <Story
              storyHidden={() => {
                setStoryVisible(false);
                setHome(true);
              }}
            />
          ) : null}
          <div className={home ? "black" : "black black-add"}></div>
          <section className={home ? "home-wrap" : "home-diss"}>
            <div className={storyModal ? "overlay-add" : "overlay"}></div>
            <div
              className="home-btn"
              onClick={() => {
                setLogo(true);
                setQstart(false);
                setSstart(false);
              }}
            >
              <img src="/images/home.svg" alt="" />
            </div>
            <div className={logo ? "logo-wrap" : "logo-diss"}>
              <img className="logo-img" src="/images/logo.png" alt="" />
            </div>
            <div
              className="kaki-btn"
              onClick={() => {
                setLogo(false);
                setSstart(false);
                setQstart(true);
              }}
            >
              <img className="kaki-img" src="/images/pen.png" alt="" />
              <h2>かきとり</h2>
            </div>

            <div
              className="story-btn"
              onClick={() => {
                setLogo(false);
                setQstart(false);
                setSstart(true);
              }}
            >
              <img src="/images/note.png" alt="" />
              <h2>ストーリー</h2>
            </div>

            <div className="start-wrap">
              <div
                className={qstart ? "quiz-start" : "qstart-diss"}
                onClick={qstartBtn}
              >
                <h1 className="back-eng-practice">PRACTICE</h1>
                <img className="kaki-img" src="/images/pen.png" alt="" />
                <h2 className="item">━ 練習字合 ━</h2>
                <h4 className="stage-ex">
                  生徒と一緒に練習をおこなうモードです
                </h4>

                {/* <h3 style={displayStyle}>CLEAR!</h3> */}
              </div>
              {/* 漢伐↓ */}
              <div
                className={qstart ? "kanbatu-start" : "qstart-diss"}
                onClick={qstartBtn2}
              >
                <h1 className="back-eng-test">TEST</h1>
                <img className="kaki-img" src="/images/penwhite.png" alt="" />
                <h2 className="item">━ 答伐 ━</h2>
                <h4 className="stage-ex">
                  体力と時間の制限付きで敵と戦うモードです
                </h4>
                <h3 style={displayStyle}>CLEAR!</h3>
              </div>
              {/* ストーリー↓ */}
              <div
                className={sstart ? "story-start" : "story-diss"}
                onClick={storyCheck}
              >
                <img src="/images/note.png" alt="" />
                <h2 className="item">━ まだ何もない世界で ━</h2>
                <h4 className="stage-ex">
                  キャラクターの物語を読むことができます
                </h4>
              </div>
            </div>

            <div className="modal-wrap">
              <div className={storyModal ? "modal modal-add" : "modal"}>
                <h2>━ 解放条件 ━</h2>
                <h3>"答伐"ステージをクリアする</h3>
                <div className="btn-wrap">
                  <button
                    className="close-btn"
                    onClick={() => {
                      setStoryModal(!storyModal);
                    }}
                  >
                    閉じる
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
        <Keikoku />
      </>
    )
  );
}

export default App;
