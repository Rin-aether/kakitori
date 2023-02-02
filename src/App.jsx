import { useState } from "react";
import Mozi from "./Mozi";
import "../scss/style.scss";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
    
      <div className="App">
        <Mozi />
      </div>
    </>
  );
}

export default App;
