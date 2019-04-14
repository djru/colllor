import React, { useEffect, useContext } from "react";
import ColorContext from "./ColorContext.js";

import "./styles.css";

function hslToHex(h, s, l) {
  h /= 360;
  s /= 100;
  l /= 100;
  let r, g, b;
  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }
  const toHex = x => {
    const hex = Math.round(x * 255).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function PreviewSwatch(props) {
  const context = useContext(ColorContext);
  const copyToCliboard = e => {
    const input = document.getElementById("to-copy");
    if (navigator.userAgent.match(/ipad|iphone/i)) {
      // input.contentEditable = true;
      // input.readOnly = false;
      var range = document.createRange();
      range.selectNodeContents(input);
      var selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);

      input.setSelectionRange(0, 999999);
      input.contentEditable = false;
      input.readOnly = true;
    } else {
      input.select();
    }

    document.execCommand("copy");
  };

  // this is for when we have a color selected but want to drag the hue
  // const p = ctx.getImageData(context.x, context.y, 1, 1).data;
  var hsl_string = null;
  var hex_string = null;

  if (context.y < 10) {
    hsl_string = "#ffffff";
    hex_string = "#ffffff";
  } else if (context.y > props.heightOfColorPicker - 10) {
    hsl_string = "#000000";
    hex_string = "#000000";
  } else {
    hsl_string = `hsl(${context.hue}, ${(context.x / props.drawnWidth) *
      100}%, ${100 -
      ((context.y - 10) / (props.heightOfColorPicker - 20)) * 100}%)`;
    hex_string = hslToHex(
      context.hue,
      (context.x / props.drawnWidth) * 100,
      100 - ((context.y - 10) / (props.heightOfColorPicker - 20)) * 100
    );
  }
  return (
    <div
      className="color-swatch"
      style={{
        backgroundColor: hsl_string,
        width: props.drawnWidth,
        height: props.drawnHeight,
        color: parseInt(hex_string.charAt(1)) <= 8 ? "white" : "black"
      }}
      onClick={copyToCliboard}
      onTouchEnd={copyToCliboard}
    >
      <span id="hex">{hex_string}</span>
      <input id="to-copy" readOnly value={hex_string} />
    </div>
  );
}

export default PreviewSwatch;
