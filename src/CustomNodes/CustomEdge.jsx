import React from "react";
import { BaseEdge, EdgeLabelRenderer, useReactFlow } from "reactflow";

export default function CustomEdge({ id, sourceX, sourceY, targetX, targetY }) {
  const { setEdges } = useReactFlow();

  return (
    <>
      <BaseEdge
        id={id}
        path={`M${sourceX},${sourceY} L${targetX},${targetY}`}
      />
      <EdgeLabelRenderer>
        <button
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${
              (sourceX + targetX) / 2
            }px,${(sourceY + targetY) / 2}px)`,
            pointerEvents: "all",
          }}
          className="nodrag nopan"
          onClick={() => {
            setEdges((es) => es.filter((e) => e.id !== id));
          }}
        >
          x
        </button>
      </EdgeLabelRenderer>
    </>
  );
}
