import { useState, useCallback, useEffect } from "react";
import ReactFlow, {
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  useNodesState,
  useEdgesState,
} from "reactflow";
import "reactflow/dist/style.css";
import CustomNode from "../CustomNodes/CustomNode";
import CustomEdge from "../CustomNodes/CustomEdge";

const nodeTypes = { CustomNode: CustomNode };
const edgeTypes = {
  "custom-edge": CustomEdge,
};

const initialNodes = [
  {
    id: "A",
    data: [
      { id: "i1", name: "id", top: 30 },
      { id: "i2", name: "name", top: 90 },
      { id: "i3", name: "name1", top: 150 },
    ],
    position: { x: 0, y: 0 },
    type: "CustomNode",
  },
  {
    id: "B",
    data: [
      { id: "i1", name: "id", top: 30 },
      { id: "i2", name: "name", top: 90 },
      { id: "i3", name: "name1", top: 150 },
    ],
    position: { x: 200, y: 0 },
    type: "CustomNode",
  },
];

const initialEdges = [];

function Flow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect = useCallback(
    (connection) => {
      const edge = { ...connection, type: "custom-edge" };
      setEdges((eds) => addEdge(edge, eds));
    },
    [setEdges]
  );

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        // edgeTypes={edgeTypes}
        fitView
        nodeTypes={nodeTypes}
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default Flow;
