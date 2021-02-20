import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";

interface LineProps {
  from: string;
  to: string;
  assignId: (obj: any) => any;
}

export const Line: React.FC<LineProps> = ({ from, to, assignId }) => {
  const d3 = require("d3");
  const myRef = useRef<SVGLineElement>(null);
  let me: any;
  let frm: any;
  let t: any;

  useEffect(() => {
    if (myRef && myRef.current) {
      const id = assignId(myRef.current);
      me = d3.select(ReactDOM.findDOMNode(myRef.current));
      if (from) {
        frm = d3.select("#" + from);
        if (frm.empty()) {
          frm = undefined;
        } else {
          frm.on(`moved.${id}`, updatePosition.bind(myRef.current));
        }
      }
      if (to) {
        t = d3.select("#" + to);
        if (t.empty()) {
          t = undefined;
        } else {
          t.on(`moved.${id}`, updatePosition.bind(myRef.current));
        }
      }
      updatePosition();
    }
  }, [d3, from, myRef, to]);

  const updatePosition = () => {
    if (frm) {
      const fromCenter = frm.datum().center;
      me.attr("x1", fromCenter[0]);
      me.attr("y1", fromCenter[1]);
    }
    if (t) {
      const toCenter = t.datum().center;
      me.attr("x2", toCenter[0]);
      me.attr("y2", toCenter[1]);
    }
  };

  return (
    <line
      ref={myRef}
      style={{ stroke: "rgba(255,0,0,0.7)", strokeWidth: "2px" }}
    />
  );
};
