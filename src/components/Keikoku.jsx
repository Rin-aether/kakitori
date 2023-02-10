import { useState } from "react";

const Keikoku = () => {
    const [visible, setVisible] = useState(true);
  return (
    visible && <>
       <div className="keikoku">
        <h2>
          指が動かしやすいため、
          <br />
          スマートフォンでのプレイをおすすめしています。
          <br />
          (※PCでも全く問題なく遊べます！)
        </h2>
        <button onClick={() => setVisible(false)}>✖</button>
      </div>
    </>
  );
};

export default Keikoku;
