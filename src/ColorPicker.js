import React, { useEffect, useContext, useState } from "react";
import ColorContext from "./ColorContext.js";
import debounce from "./debounce.js";

import "./styles.css";

function ColorPicker(props) {
  const context = useContext(ColorContext);
  let [locked, setLocked] = useState(false);
  const drawPicker = ctx => {
    ctx.clearRect(0, 0, context.docWidth, context.docWidth);
    var colorToDraw = [null, null];
    for (var row of [...new Array(props.drawnHeight).keys()]) {
      var grad = ctx.createLinearGradient(0, 0, props.drawnWidth, 0);
      if (row < 10) {
        colorToDraw = ["white", "white"];
      } else if (row > props.drawnHeight - 10) {
        colorToDraw = ["black", "black"];
      } else {
        colorToDraw = [
          `hsl(${context.hue}, 0%, ${100 -
            ((row - 10) / (props.drawnHeight - 20)) * 100}%)`,
          `hsl(${context.hue}, 100%, ${100 -
            ((row - 10) / (props.drawnHeight - 20)) * 100}%)`
        ];
      }
      grad.addColorStop(0, colorToDraw[0]);
      grad.addColorStop(0.1, colorToDraw[0]);
      grad.addColorStop(0.9, colorToDraw[1]);
      grad.addColorStop(1, colorToDraw[1]);
      ctx.fillStyle = grad;
      ctx.fillRect(0, row, context.docWidth, 1);
    }
  };

  useEffect(() => {
    const hls = document.querySelector("#hls-picker");
    drawPicker(hls.getContext("2d"));
  }, [props.drawnWidth, context.hue]);

  let pickColor = e => {
    e.stopPropagation();
    e.preventDefault();
    const can = document.querySelector("#hls-picker");
    var x = 0;
    var y = 0;
    if (e.type === "touchend") {
      x =
        e.changedTouches[e.changedTouches.length - 1].clientX - can.offsetLeft;
      y = e.changedTouches[e.changedTouches.length - 1].clientY - can.offsetTop;
    } else if (e.type === "touchstart" || e.type === "touchmove") {
      x = e.touches[e.touches.length - 1].clientX - can.offsetLeft;
      y = e.touches[e.touches.length - 1].clientY - can.offsetTop;
    } else {
      x = e.pageX - can.offsetLeft;
      y = e.pageY - can.offsetTop;
    }
    context.setX(x);
    context.setY(y);
  };

  return (
    <canvas
      id="hls-picker"
      height={props.drawnHeight}
      width={props.drawnWidth}
      onClick={e => {
        setLocked(true);
        pickColor(e);
      }}
      onTouchEnd={e => {
        setLocked(false);
        pickColor(e);
      }}
      onMouseEnter={e => {
        setLocked(false);
      }}
      onTouchMove={pickColor}
      onMouseMove={locked ? null : pickColor}
    />
  );
}

export default ColorPicker;
