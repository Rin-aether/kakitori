import { useState, useEffect, useRef } from "react";
import "../../scss/story.scss";

const Story = () => {
  const [showModal, setShowModal] = useState(true);
  const [makimono, setMakimono] = useState(false);
  const [image, setImage] = useState("komari");
  const [name, setName] = useState("謎の少女");
  const serifRef = useRef(null);
  const serifwrapRef = useRef(null);

  useEffect(() => {
    phina.display.CanvasApp.prototype._draw = function () {
      if (this.backgroundColor) {
        if (this.backgroundColor === "transparent") {
          this.canvas.clear();
        } else {
          this.canvas.clearColor(this.backgroundColor);
        }
      } else {
        this.canvas.clear();
      }

      if (this.currentScene.canvas) {
        this.currentScene._render();

        this._scenes.each(function (scene) {
          var c = scene.canvas;
          if (c) {
            this.canvas.context.drawImage(
              c.domElement,
              0,
              0,
              c.width,
              c.height
            );
          }
        }, this);
      }
    };
    let serifParent = serifwrapRef.current;
    let screenWidth = serifParent.clientWidth; //縦と横
    let screenHeight = serifParent.clientHeight;

    if (window.innerWidth < 768) {
      var minusx = 60;
      var minusy = 110;
      var fontsize = 20;
      var cursolx = 35;
      var cursoly = 20;
    } else {
      //pc
      var minusx = 90;
      var minusy = 150;
      var fontsize = 24;
      var cursolx = 35;
      var cursoly = 20;
    }

    phina.globalize();

    var MESSAGE_SPEED = 2; //1<n 低いほど早い
    var FONT_SIZE = fontsize;
    var TEXTS = [
      "……。",
      "はぁ……。",
      "皆はどうしているのでしょうか……\n心細い……",
    ];

    phina.define("MainScene", {
      superClass: "DisplayScene",

      init: function (option) {
        this.superInit(option);

        this.labelArea = LabelArea({
          text: "",
          width: screenWidth - minusx,
          height: screenHeight - minusy,
          fontSize: FONT_SIZE,
          fontFamily: "Line-bold",
          fill: "#fff",
          stroke: "#444466",
          strokeWidth: 2,
        })
          .addChildTo(this)
          .setPosition(this.gridX.center(), this.gridY.center());
        this.texts = TEXTS;
        this.textIndex = 0;
        this.charIndex = 0;
        this.nextTriangle = TriangleShape({
          fill: "#7BF8FF",
          stroke: "transparent",
          radius: FONT_SIZE / 2,
        })
          .addChildTo(this)
          .setPosition(
            this.labelArea.right - cursolx,
            this.labelArea.bottom + cursoly
          );
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
        backgroundColor: "transparent",
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
          <img src={`/images/${image}.png`} alt="" />
        </div>
        <div className="serif-wrap" ref={serifwrapRef}>
          <h2>{name}</h2>
          <canvas className="serif-canvas" ref={serifRef}></canvas>
        </div>

        {/* ///////モーダル////////////////////////////////// */}

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
    </>
  );
};

export default Story;
