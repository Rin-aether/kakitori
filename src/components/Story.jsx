import { useState, useEffect, useRef } from "react";
import "../../scss/story.scss";

const Story = ({ storyHidden }) => {
  const [showModal, setShowModal] = useState(true);
  const [makimono, setMakimono] = useState(true);
  const [next, setNext] = useState(true);
  const [shadow, setShadow] = useState(false);
  const [storyBlack, setStoryBlack] = useState(false);
  const [storyEnd, setStoryEnd] = useState(true);
  const [image, setImage] = useState("komari");
  const [name, setName] = useState("謎の少女");
  const serifRef = useRef(null);
  const serifwrapRef = useRef(null);

  const img1 = new Image();
  img1.src = "/images/komari.png";
  const img2 = new Image();
  img2.src = "/images/egao.png";
  const img3 = new Image();
  img3.src = "/images/sinken.png";
  const img4 = new Image();
  img4.src = "/images/odoroki.png";

  setTimeout(() => {
    setMakimono(false);
    setStoryBlack(true);
  }, 1800);

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

    if (window.innerWidth <= 767) {
      // 767px以下の画面幅の場合
      var minusx = 54;
      var minusy = 120;
      var fontsize = 20;
      var cursolx = 34;
      var cursoly = 20;
    } else if (window.innerWidth >= 768 && window.innerWidth <= 1199) {
      // タブレット
      var minusx = 120;
      var minusy = 180;
      var fontsize = 28;
      var cursolx = 34;
      var cursoly = 20;
    } else {
      // desktop
      var minusx = 90;
      var minusy = 150;
      var fontsize = 24;
      var cursolx = 34;
      var cursoly = 20;
    }

    phina.globalize();

    var MESSAGE_SPEED = 2; //1<n 低いほど早い
    var FONT_SIZE = fontsize;
    const MAINNTEXTS = [
      "……。",
      "皆はどうしているのでしょうか……\n心細い……",
      "……いえ！\n落ち込んでなどいられません！",
      "生徒会長として、\nこんな時こそ頑張らなければ……！",
      "あの……",
      "うわ！びっくりしました！\n外から来た方ですか！？",
      "ここは一体……？",
      "此処はまだ何もない世界のようで……外からやってくる人も、少ししか居られないみたいです。",
      "頼りになる仲間たちも……\n此処にはいません……",
      "ですが……大丈夫です！\n必ずこの世界は形になります。\nそれまで絶対に諦めません。",
      "……強い意志を感じる目だ。\nきっとこの子は……",
      "…！\n(これ以上、ここに居られない気がする。)",
      "(最後に、名前だけでも…)",
      "君の名前は？",
      "天白 瑠散花です。\n……いつかまた、どこかで。",
      "",
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
        this.texts = MAINNTEXTS;
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
            this.setPhase();
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
      setPhase: function () {
        switch (this.textIndex) {
          case 1:
            setNext(false);
            break;
          case 2:
            setNext(true);
            setImage("sinken");
            break;
          case 3:
            setNext(false);
            break;
          case 4:
            setName("あなた");
            setShadow(true);
            break;
          case 5:
            setImage("odoroki");
            setShadow(false);
            setName("謎の少女");
            setNext(true);
            break;
          case 6:
            setShadow(true);
            setName("あなた");
            break;
          case 7:
            setImage("komari");
            setShadow(false);
            setName("謎の少女");
            setNext(false);
            break;
          case 8:
            setNext(true);
            break;
          case 9:
            setImage("sinken");
            setNext(false);
            break;
          case 10:
            setShadow(true);
            setName("あなた");
            break;
          case 13:
            setShadow(false);
            break;
          case 14:
            setImage("egao");
            setNext(true);
            setName("ルチカ");
            break;
          case 15:
            setStoryEnd(false);
            setTimeout(() => {
              storyHidden();
            }, 1600);

            break;
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
        <div
          className={`${
            storyBlack ? "story-black" : "story-black story-black-add"
          } ${storyEnd ? "" : "story-end-add"}`}
        ></div>
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
        <div className="rutika">
          <img
            className={`${next ? "rutika-add2" : "rutika-add"} ${
              shadow ? "rutika-shadow" : ""
            }`}
            src={`/images/${image}.png`}
            alt=""
          />
        </div>
        <div className="serif-wrap" ref={serifwrapRef}>
          <h2>
            <div dangerouslySetInnerHTML={{ __html: name }} />
          </h2>
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
              <button
                className="ok-btn"
                onClick={() => {
                  setStoryEnd(false);
                  setTimeout(() => {
                    storyHidden();
                  }, 1500);
                }}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Story;
