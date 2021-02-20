import { useEffect, useRef } from "react";
import ReactDOM from "react-dom";

interface CircleProps {
  node?: string;
  cx: number;
  cy: number;
}

export const Circle: React.FC<CircleProps> = ({ node, cx, cy }) => {
  const myRef = useRef<SVGCircleElement>(null);
  const d3 = require("d3");

  function makeDraggable(me: any) {
    const handleDrag = d3
      .drag()
      .subject(function () {
        const translateX = me.datum().translateX;
        const translateY = me.datum().translateY;
        return { x: translateX, y: translateY };
      })
      .on("drag", function (event: any, d: any) {
        const transform = `translate(${event.x}, ${event.y})`;
        me.datum().translateX = event.x;
        me.datum().translateY = event.y;
        me.attr("transform", transform);
        me.dispatch("moved");
      });
    handleDrag(me);
  }

  useEffect(() => {
    if (myRef && myRef.current) {
      const me = d3.select(ReactDOM.findDOMNode(myRef.current));
      me.datum({
        translateX: 0,
        translateY: 0,
      });
      me.on("moved", () => {
        const centerX = cx + me.datum().translateX;
        const centerY = cy + me.datum().translateY;
        me.datum().center = [centerX, centerY];
      });
      me.dispatch("moved");
      makeDraggable(me);
    }
  }, [myRef]);
  return (
    <circle
      ref={myRef}
      id={node}
      r={15}
      stroke="black"
      cx={cx}
      cy={cy}
      fill="rgba(255,255,255,0.4)"
    />
  );
};
