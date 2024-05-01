import React, { memo } from "react";
import { Handle, Position } from "reactflow";

const CustomNode = ({ data }) => {
  return (
    <div className="border-t-4 border border-violet-500 rounded-sm max-w-[200px]  bg-white shadow-sm">
      <h1 className="bg-violet-100 px-6 py-2">Table Name</h1>
      {data.map((row) => (
        <div
          key={row.id}
          className=" px-2 border-b relative hover:bg-violet-50"
        >
          <Handle
            type="source"
            style={{ background: "#555" }}
            position={Position.Left}
            id={row.id}
          />
          <div>{row.name}</div>
          <Handle
            type="target"
            style={{ background: "#555" }}
            position={Position.Right}
            id={row.id}
          />
        </div>
      ))}
    </div>
  );
};

export default memo(CustomNode);
