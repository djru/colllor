import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import ColorContext from "./ColorContext.js";
import HuePicker from "./HuePicker.js";
import ColorPicker from "./ColorPicker.js";

import "./styles.css";
import PreviewSwatch from "./PreviewSwatch.js";

function App() {
  let [docWidth, setDocWidth] = useState(document.documentElement.clientWidth);
  let [x, setX] = useState(
    Math.round(Math.random() * document.documentElement.clientWidth)
  );
  let [y, setY] = useState(
    Math.round(Math.random() * Math.min(docWidth, window.innerHeight - 300))
  );
  let [hue, setHue] = useState(290);

  useEffect(() => {
    document.body.onresize = e => {
      setDocWidth(document.documentElement.clientWidth);
    };
  });

  const getHexColor = c =>
    `#${c
      .slice(0, 3)
      .map(x => x.toString(16).padStart(2, "0"))
      .join("")}`;

  return (
    <div className="App">
      <h1>Colllor</h1>
      <ColorContext.Provider
        value={{
          hue,
          setHue,
          docWidth,
          getHexColor,
          x,
          setX,
          y,
          setY
        }}
      >
        <ColorPicker
          drawnHeight={Math.min(docWidth, window.innerHeight - 300)}
          drawnWidth={docWidth}
        />
        <HuePicker drawnWidth={docWidth} drawnHeight={100} />
        <PreviewSwatch
          drawnWidth={docWidth}
          drawnHeight={
            window.innerHeight -
            Math.min(docWidth, window.innerHeight - 300) -
            100
          }
          heightOfColorPicker={Math.min(docWidth, window.innerHeight - 300)}
        />
      </ColorContext.Provider>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
