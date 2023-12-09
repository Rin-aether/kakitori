import { useState, useEffect, useRef } from "react";
import "../../scss/live2d.scss";
import Mozi2 from "./Mozi2";

const Kanbatu = ({ quizHidden2, flag }) => {
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
  var modelUrl = "/Live2dModels/slime-model/runtime/silme.model3.json";
  var currentModel;

  // メインの処理開始
  useEffect(() => {
    (async function main() {
      // 2, PixiJSを準備する
      app = new PIXI.Application({
        view: live2dRef.current,
        transparent: true,
        autoStart: true,
        backgroundAlpha: 0,
        resizeTo: window,
      });

      // 3, Live2Dモデルをロードする
      currentModel = await Live2DModel.from(modelUrl, { autoInteract: false });

    if (window.innerWidth <= 767) {
      // 767px以下の画面幅の場合
      currentModel.scale.set(1); // モデルの大きさ
      currentModel.anchor.set(0.5, 0.75); // モデルのアンカー
    } else if (window.innerWidth >= 768 && window.innerWidth <= 1199) {
      // タブレット
      currentModel.scale.set(1.1); // モデルの大きさ
      currentModel.anchor.set(0.5, 0.75); // モデルのアンカー
    } else {
      // desktop
      currentModel.scale.set(0.85); // モデルの大きさ
      currentModel.anchor.set(0.5, 0.75); // モデルのアンカー
    }

      currentModel.interactive = true;

      // 6, Live2Dモデルを配置する
      app.stage.addChild(currentModel);
      function handleResize() {
        var parent = live2dwrapRef.current;
        var canvas = live2dRef.current;
        var ratio = window.devicePixelRatio;
        canvas.width = parent.clientWidth * ratio;
        canvas.height = parent.clientHeight * ratio;
        canvas.style.width = parent.clientWidth + "px";
        canvas.style.height = parent.clientHeight + "px";

        currentModel.position.set(app.view.width / 2, app.view.height / 2); //モデルの位置★

        // PixiJSのrendererにcanvasのサイズを更新する
        app.renderer.resize(canvas.width, canvas.height);
      }

      window.addEventListener("resize", handleResize);
      handleResize();
    })();
  }, [live2dRef]);

  const eyewave = () => {
    app.stage.children[0].internalModel.motionManager.startMotion(
      "EyeWave",
      0,
      2
    );
  };
  const rushcharge = () => {
    app.stage.children[0].internalModel.motionManager.startMotion(
      "RushCharge",
      0,
      2
    );
  };

  return (
    <>
      <div className="live2d-canvas-wrap" ref={live2dwrapRef}>
        <canvas className="my-live2d" ref={live2dRef}></canvas>
      </div>
      <Mozi2 motion={eyewave} motion2={rushcharge}  moziHidden2={quizHidden2} flagprop={flag} />
    </>
  );
};

export default Kanbatu;
