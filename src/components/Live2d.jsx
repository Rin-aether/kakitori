import { useState, useEffect, useRef } from "react";
import "../../scss/live2d.scss";
import Mozi from "./Mozi";

const Live2d = ({ quizHidden, flag }) => {
  //appをindex.jsで使いたいのでスコープを外しています。
  const live2dRef = useRef(null);
  const live2dwrapRef = useRef(null);

  var app;

  // PixiJS
  var {
    Application,
    live2d: { Live2DModel },
  } = PIXI;

  // Kalidokit
  var {
    Face,
    Vector: { lerp },
    Utils: { clamp },
  } = Kalidokit;

  // 1, Live2Dモデルへのパスを指定する
  var modelUrl =
    "../../Live2dModels/haru_greeter_pro_jp/runtime/haru_greeter_t03.model3.json";
  var currentModel;

  // メインの処理開始
  useEffect(() => {
    (async function main() {
      // 2, PixiJSを準備する
      app = new PIXI.Application({
        view: live2dRef.current,
        // backgroundColor: 0x999999,
        transparent: true,
        autoStart: true,
        backgroundAlpha: 0,
        resizeTo: window,
      });

      // 3, Live2Dモデルをロードする
      currentModel = await Live2DModel.from(modelUrl, { autoInteract: false });
      if (window.innerWidth < 768) {
        currentModel.scale.set(0.3); //モデルの大きさ★
        currentModel.interactive = true;
        currentModel.anchor.set(0.5, 0.5); //モデルのアンカー★
      } else {
        //pc
        currentModel.scale.set(0.35); //モデルの大きさ★
        currentModel.interactive = true;
        currentModel.anchor.set(0.5, 0.5); //モデルのアンカー★
      }
      currentModel.position.set(window.innerWidth / 2, window.innerHeight); //モデルの位置★

      // 6, Live2Dモデルを配置する
      app.stage.addChild(currentModel);
    })();
  }, [live2dRef]);

  const flick = () => {
    app.stage.children[0].internalModel.motionManager.startMotion(
      "Flick",
      1,
      2
    );
  };
  const tap = () => {
    app.stage.children[0].internalModel.motionManager.startMotion("Tap", 0, 2);
  };
  return (
    <>
      <div className="live2d-canvas-wrap" ref={live2dwrapRef}>
        <canvas className="my-live2d" ref={live2dRef}></canvas>
      </div>
      <br />
      <br />
      <Mozi
        motion1={flick}
        motion2={tap}
        moziHidden={quizHidden}
        flagprop={flag}
      />
    </>
  );
};

export default Live2d;
