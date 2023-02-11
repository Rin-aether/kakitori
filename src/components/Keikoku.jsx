import { useState } from "react";

const Keikoku = () => {
    const [visible, setVisible] = useState(true);
  return (
    visible && <>
       <div className="keikoku">
        <h2>
          動かしやすいため、
          <br />
          スマートフォンでのプレイをおすすめしています。
          <br />
          (※PCでも問題なく遊べます！)
        </h2>
        <button onClick={() => setVisible(false)}>✖</button>
      </div>
    </>
  );
};

export default Keikoku;
