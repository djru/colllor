import React, { useEffect, useContext, useState } from "react";
import ColorContext from "./ColorContext.js";
import debounce from "./debounce.js";

import "./styles.css";

function HuePicker(props) {
  const context = useContext(ColorContext);
  let [clicked, setClicked] = useState(false);

  const drawHuePicker = ctx => {
    ctx.clearRect(0, 0, context.docWidth, context.docWidth);
    var grad = ctx.createLinearGradient(0, 0, context.docWidth, 0);
    for (var col of [...new Array(370).keys()]) {
      grad.addColorStop(
        col / 370,
        `hsl(${Math.max(Math.min(col - 5, 360))}, 100%, 50%)`
      );
    }
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, context.docWidth, 100);
  };

  useEffect(() => {
    const can = document.querySelector("#hue-picker");
    const ctx = can.getContext("2d");
    drawHuePicker(ctx);
    ctx.fillStyle = "black";
    ctx.fillRect((context.hue * context.docWidth) / 360 - 1, 0, 2, 100);
  }, [context.hue, props.drawnWidth]);

  const onClickHue = e => {
    const can = document.querySelector("#hue-picker");
    var x = 0;
    if (e.type === "touchstart" || e.type === "touchmove") {
      x = e.touches[e.touches.length - 1].clientX - can.offsetLeft;
    } else {
      x = e.pageX - can.offsetLeft;
    }
    context.setHue(Math.round((x / context.docWidth) * 360));
  };

  return (
    <canvas
      id="hue-picker"
      height={100}
      width={props.drawnWidth}
      onMouseDown={e => {
        setClicked(true);
        onClickHue(e);
      }}
      onTouchStart={e => {
        setClicked(true);
        onClickHue(e);
      }}
      onMouseUp={e => {
        setClicked(false);
      }}
      onTouchEnd={e => {
        setClicked(false);
      }}
      onMouseMove={clicked ? onClickHue : null}
      onTouchMove={clicked ? onClickHue : null}
    />
  );
}

export default HuePicker;
