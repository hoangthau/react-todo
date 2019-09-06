import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";
import ToDo from "./ToDo";

function App() {
  return (
    <div className="App">
      <ToDo />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
