import { useState, useEffect, useRef } from "react";
import "../../scss/story.scss";

const Story = () => {
  const [showModal, setShowModal] = useState(true);
  const [makimono, setMakimono] = useState(false);

  const serifRef = useRef(null);
  const serifwrapRef = useRef(null);

  useEffect(() => {
    let serifParent = serifwrapRef.current;
    let screenWidth = serifParent.clientWidth; //縦と横
    let screenHeight = serifParent.clientHeight;

    phina.globalize();

    var MESSAGE_SPEED = 2; //1<n 低いほど早い
    var FONT_SIZE = 25;
    var TEXTS = [
      "我々は宇宙人だ",
      "ちきゅうはいただいた。",
      "命が惜しければ\nよろしくね",
    ];

    phina.define("MainScene", {
      superClass: "DisplayScene",

      init: function (option) {
        this.superInit(option);
        this.labelArea = LabelArea({
          text: "",
          width: screenWidth,
          height: screenHeight,
          fontSize: FONT_SIZE,
          fontFamily: "Line-bold",

          fill: "#fff",
        })
          .addChildTo(this)
          .setPosition(this.gridX.center(), this.gridY.center());

        this.texts = TEXTS;
        this.textIndex = 0;
        this.charIndex = 0;

        this.nextTriangle = TriangleShape({
          fill: "white",
          stroke: "transparent",
          radius: FONT_SIZE / 2,
        })
          .addChildTo(this)
          .setPosition(this.labelArea.right - 55, this.labelArea.bottom - 45);

        this.nextTriangle.rotation = 180;

        this.nextTriangle.hide();

        this.messageSpeed = MESSAGE_SPEED;
      },
      update: function (app) {
        if (app.pointer.getPointingStart()) {
          if (this.textAll) {
            this.nextText();
          } else {
            this.showAllText();
          }
        } else if (app.frame % this.messageSpeed === 0) {
          this.addChar();
        }

        if (this.textAll) {
          if (app.frame % 8 === 0) {
            if (this.nextTriangle.visible) {
              this.nextTriangle.hide();
            } else {
              this.nextTriangle.show();
            }
          }
        } else {
          this.nextTriangle.hide();
        }
      },
      showAllText: function () {
        var text = this.texts[this.textIndex];
        this.labelArea.text = text;
        this.textAll = true;
        this.charIndex = text.length;
      },
      clearText: function () {
        this.labelArea.text = "";
      },
      nextText: function () {
        this.clearText();
        if (this.texts.length <= ++this.textIndex) {
          this.textIndex = 0;
        }
        this.charIndex = 0;
        this.addChar();
      },
      addChar: function () {
        this.labelArea.text += this.getChar();
      },
      getChar: function () {
        var text = this.texts[this.textIndex];
        if (text.length <= this.charIndex) {
          this.textAll = true;
          return "";
        } else {
          this.textAll = false;
          return text[this.charIndex++];
        }
      },
    });
    phina.main(function () {
      var app = GameApp({
        // 表示先のcanvasを指定
        domElement: serifRef.current,
        // MainScene から開始
        startLabel: "main",
        width: screenWidth,
        height: screenHeight,
        backgroundColor: "rgba(17, 30, 47, 0.6)",
        // 画面にフィットさせない
        fit: false,
      });
      // fps表示
      //app.enableStats();
      // 実行
      app.run();
    });
  }, [serifRef]);

  return (
    <>
      <div className="story-wrap">
        <div className={showModal ? "overlay" : "overlay-add"}></div>

        <div className={makimono ? "scroll-area" : "scroll-area ape"}>
          <div className={makimono ? "usirosvg" : "q-add"}>
            {/* <!-- 伸びるとこ --> */}
            <div className={makimono ? "mikaesi" : "mikaesi mikaesi-add"}>
              <h2>まだ何もない世界で</h2>
            </div>
          </div>
          <svg
            className={makimono ? "maesvg" : "maesvg maesvg-add"}
            width="100%"
            height="100%"
          >
            {/* <!-- 軸 --> */}
            <rect width="6%" height="135%" y="-17%" x="-0.3%" fill="black" />
            {/* <!-- 表紙 --> */}
            <rect className="ziku" width="5%" height="100%" />
          </svg>
        </div>
        {/* //////////////////////////////////////////////// */}
        <div
          className="rutika"
          onClick={() => {
            setMakimono(!makimono);
          }}
        >
          <img src="/images/rutika.png" alt="" />
        </div>
        <div className="serif-wrap" ref={serifwrapRef}>
          <h2>瑠散花</h2>
          <canvas className="serif-canvas" ref={serifRef}></canvas>
        </div>

        {/* ///////モーダル////////////////////////////////// */}
        <div>
          <button
            className="skip-btn"
            onClick={() => {
              setShowModal(!showModal);
            }}
          >
            SKIP
          </button>

          <div className="modal-wrap">
            <div className={showModal ? "modal" : "modal modal-add"}>
              <h2>━ STORY SKIP ━</h2>
              <h3>ストーリーをスキップしますか？</h3>

              <div className="btn-wrap">
                <button
                  className="cancel-btn"
                  onClick={() => {
                    setShowModal(!showModal);
                  }}
                >
                  キャンセル
                </button>
                <button className="ok-btn">OK</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Story;
