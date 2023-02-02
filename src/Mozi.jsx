import { useState, useEffect, useRef } from "react";
import axios from "axios";
import "../scss/mozi.scss";

const Mozi = () => {
  (function (window, document) {
    var root = (typeof self === "object" && self.self === self && self) || this;

    // Create a safe reference to the handwriting object for use below.
    var handwriting = function (obj) {
      if (obj instanceof handwriting) return obj;
      if (!(this instanceof handwriting)) return new handwriting(obj);
      this._wrapped = obj;
    };

    root.handwriting = handwriting;

    handwriting.Canvas = function (cvs, lineWidth, btn) {
      this.canvas = cvs;
      this.cxt = cvs.getContext("2d");
      this.cxt.lineCap = "round"; //線の端っこの形
      this.cxt.lineJoin = "round"; //線の折れたとこの形
      this.lineWidth = lineWidth || 3; //orの用途ではなく、左が問題なければ左を返す
      this.width = cvs.width;
      this.height = cvs.height;
      this.drawing = false;
      this.handwritingX = [];
      this.handwritingY = [];
      this.trace = [];
      this.options = {};
      this.step = [];
      this.allowUndo = false;
      this.allowRedo = false;
      this.ok_search = false;
      //bind→どのthisを参照するのか指定する
      cvs.addEventListener("mousedown", this.mouseDown.bind(this));
      cvs.addEventListener("mousemove", this.mouseMove.bind(this));
      cvs.addEventListener("mouseup", this.mouseUp.bind(this));
      cvs.addEventListener("touchstart", this.touchStart.bind(this));
      cvs.addEventListener("touchmove", this.touchMove.bind(this));
      cvs.addEventListener("touchend", this.touchEnd.bind(this));
      btn.addEventListener("click", this.erase.bind(this));
      this.callback = undefined;
      this.recognize = handwriting.recognize;
    };
    /**
     * [toggle_Undo_Redo description]
     * @return {[type]} [description]
     */
    handwriting.Canvas.prototype.setLineWidth = function (lineWidth) {
      this.lineWidth = lineWidth;
    };

    handwriting.Canvas.prototype.setCallBack = function (callback) {
      this.callback = callback;
    };

    handwriting.Canvas.prototype.setOptions = function (options) {
      this.options = options;
    };

    //////////////////　マウス処理　/////////////////////////////
    handwriting.Canvas.prototype.mouseDown = function (e) {
      // new stroke
      this.cxt.lineWidth = this.lineWidth;
      this.handwritingX = [];
      this.handwritingY = [];
      this.drawing = true;
      this.cxt.beginPath();
      var rect = this.canvas.getBoundingClientRect();
      var x = e.clientX - rect.left;
      var y = e.clientY - rect.top;
      this.cxt.moveTo(x, y);
      this.handwritingX.push(x);
      this.handwritingY.push(y);
      this.ok_search = true;
    };

    handwriting.Canvas.prototype.mouseMove = function (e) {
      if (this.drawing) {
        var rect = this.canvas.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        this.cxt.lineTo(x, y);
        this.cxt.stroke();
        this.handwritingX.push(x);
        this.handwritingY.push(y);
      }
    };

    handwriting.Canvas.prototype.mouseUp = function () {
      var w = [];
      w.push(this.handwritingX);
      w.push(this.handwritingY);
      w.push([]);
      this.trace.push(w);
      this.drawing = false;
      if (this.allowUndo) this.step.push(this.canvas.toDataURL());

      this.setOptions({ language: "ja" });
      this.recognize();
    };

    handwriting.Canvas.prototype.touchStart = function (e) {
      e.preventDefault();
      this.cxt.lineWidth = this.lineWidth;
      this.handwritingX = [];
      this.handwritingY = [];
      var de = document.documentElement;
      var box = this.canvas.getBoundingClientRect();
      var top = box.top + window.pageYOffset - de.clientTop;
      var left = box.left + window.pageXOffset - de.clientLeft;
      var touch = e.changedTouches[0];
      var touchX = touch.pageX - left;
      var touchY = touch.pageY - top;
      this.handwritingX.push(touchX);
      this.handwritingY.push(touchY);
      this.cxt.beginPath();
      this.cxt.moveTo(touchX, touchY);
      this.ok_search = true;
    };

    handwriting.Canvas.prototype.touchMove = function (e) {
      e.preventDefault();
      var touch = e.targetTouches[0];
      var de = document.documentElement;
      var box = this.canvas.getBoundingClientRect();
      var top = box.top + window.pageYOffset - de.clientTop;
      var left = box.left + window.pageXOffset - de.clientLeft;
      var x = touch.pageX - left;
      var y = touch.pageY - top;
      this.handwritingX.push(x);
      this.handwritingY.push(y);
      this.cxt.lineTo(x, y);
      this.cxt.stroke();
    };

    handwriting.Canvas.prototype.touchEnd = function (e) {
      var w = [];
      w.push(this.handwritingX);
      w.push(this.handwritingY);
      w.push([]);
      this.trace.push(w);
      if (this.allowUndo) this.step.push(this.canvas.toDataURL());
      this.setOptions({ language: "ja" });
      this.recognize();
    };

    handwriting.Canvas.prototype.erase = function () {
      this.cxt.clearRect(0, 0, this.width, this.height);
      this.step = [];
      this.trace = [];
      this.ok_search = false;
      setResult(["", "", ""]);
    };
    ///////////////////////////////////////////////////////////////////////

    handwriting.recognize = function (trace, options, callback) {
      if (!this.ok_search) {
        return;
      }
      if (handwriting.Canvas && this instanceof handwriting.Canvas) {
        trace = this.trace;
        options = this.options;
        callback = this.callback;
      } else if (!options) options = {};

      var data = JSON.stringify({
        app_version: 0.4,
        api_level: "537.36",
        device: window.navigator.userAgent,
        input_type: 0,
        options: "enable_pre_space",
        requests: [
          {
            writing_guide: {
              writing_area_width: options.width || this.width || undefined,
              writing_area_height: options.height || this.width || undefined,
            },
            ink: trace,
            language: options.language || "ja",
          },
        ],
      });

      axios
        .post(
          "https://www.google.com.tw/inputtools/request?ime=handwriting&app=mobilesearch&cs=1&oe=UTF-8",
          data,
          {
            headers: { "Content-Type": "application/json" },
          }
        )
        .then(function (response) {
          var results;
          if (response.data.length === 1)
            callback(undefined, new Error(response.data[0]));
          else results = response.data[1][0][1];

          if (!!options.numOfWords) {
            results = results.filter(function (result) {
              return result.length == options.numOfWords;
            });
          }
          if (!!options.numOfReturn) {
            results = results.slice(0, options.numOfReturn);
          }
          callback(results, undefined);
          console.log(results);
        })
        .catch(function (error) {
          console.log(error);
        });
    };
  })(window, document);
  /////////////////////////////////
  const canvasRef = useRef(null);
  const buttonRef = useRef(null);
  const wrapRef = useRef(null);

  const [result, setResult] = useState(["例", "赤坂", "青"]);

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

  return (
    <>
      <div className="mozi-wrap">
        <h1 id="h1"></h1>
        <div className="result-wrap">
          <div className="result" onClick={test2} style={{fontSize: `${6.6 / result[0].length}rem`}}>
            <p>{result[0]}</p>
          </div>
          <div className="result" onClick={test2}>
            <p>{result[1]}</p>
          </div>
          <div className="result" onClick={test2}>
            <p>{result[2]}</p>
          </div>
        </div>

        <div style={{ display: "inline-block" }}>
          <div className="mozi-canvas-wrap" ref={wrapRef}>
            <canvas className="mozi-canvas" ref={canvasRef}></canvas>
          </div>
          <br />

          <button className="button" ref={buttonRef}>
            クリア
          </button>

          <br />
        </div>
      </div>
    </>
  );
};

export default Mozi;
