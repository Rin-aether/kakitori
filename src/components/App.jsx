import { useState } from "react";
import Mozi from "./Mozi";
import "../../scss/style.scss";
import Live2d from "./Live2d";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="App">
      <Live2d />
        {/* <Mozi /> */}
      </div>
    
    </>
  );
}

export default App;
