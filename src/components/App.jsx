import { useState } from "react";
import Mozi from "./Mozi";
import "../../scss/style.scss";
import Keikoku from "./Keikoku";
import Live2d from "./Live2d";
import Story from "./Story";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="App">
    <Live2d/>
        {/* <Mozi /> */}
        {/* <Story/> */}
      </div>
      <Keikoku />
    </>
  );
}

export default App;
