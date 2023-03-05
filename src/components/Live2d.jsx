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
  var modelUrl = "/Live2dModels/rutika-model/runtime/rutika.model3.json";
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
      if (window.innerWidth < 768) {
        currentModel.scale.set(0.8); //モデルの大きさ★
        currentModel.anchor.set(0.5, 0.5); //モデルのアンカー★
      } else {
        //pc
        currentModel.scale.set(0.57); //モデルの大きさ★
        currentModel.anchor.set(0.5, 0.5); //モデルのアンカー★
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

  const slash = () => {
    app.stage.children[0].internalModel.motionManager.startMotion(
      "Slash",
      0,
      2
    );
  };
  const second = () => {
    app.stage.children[0].internalModel.motionManager.startMotion(
      "Second",
      0,
      2
    );
  };
  const three = () => {
    app.stage.children[0].internalModel.motionManager.startMotion(
      "Three",
      0,
      2
    );
  };
  const final = () => {
    app.stage.children[0].internalModel.motionManager.startMotion(
      "Final",
      0,
      2
    );
  };
  return (
    <>
      <div className="live2d-canvas-wrap" ref={live2dwrapRef}>
        <canvas className="my-live2d" ref={live2dRef}></canvas>
      </div>
      <Mozi motion={slash} motion2={second} motion3={three} motion4={final} moziHidden={quizHidden} flagprop={flag} />
    </>
  );
};

export default Live2d;
