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
import { useRecoilState } from "recoil";
import { NodeHook } from "../Hooks/NodeHook";
import { SidePanel } from "../Components/SidePanel";
import { NavBar } from "../Components/NavBar";
import { FaRegTrashCan } from "react-icons/fa6";
import { debounce } from "lodash";

const nodeTypes = { CustomNode: CustomNode };

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

function Home() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedEdge, setSelectedEdge] = useState(null);
  const [recoilNode, setRecoilNode] = useRecoilState(NodeHook);

  const setRecoilNodeDebounced = debounce((node) => {
    setRecoilNode(node);
  }, 500);

  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );
  const onEdgeClick = (event, edge) => {
    setSelectedEdge({
      ...edge,
      clickPosition: {
        x: event.clientX,
        y: event.clientY,
      },
    });
  };

  const deleteEdge = () => {
    if (selectedEdge) {
      setEdges((prevEdges) =>
        prevEdges.filter((edge) => edge.id !== selectedEdge.id)
      );
      setSelectedEdge(null);
    }
  };

  const getEdgeMidpoint = (edge) => {
    const { source, target } = edge;
    const midX = source.x;
    const midY = source.y;
    return [midX, midY];
  };

  useEffect(() => {
    setRecoilNodeDebounced(nodes);
    return () => {
      setRecoilNodeDebounced.cancel();
    };
  }, [nodes, setRecoilNodeDebounced]);

  useEffect(() => {
    console.log(recoilNode);
  }, [recoilNode]);

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <NavBar />
      <SidePanel />
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onEdgeClick={onEdgeClick}
        fitView
        nodeTypes={nodeTypes}
      >
        <Background />
        <Controls />
        {selectedEdge && selectedEdge.clickPosition && (
          <div
            style={{
              position: "absolute",
              top: selectedEdge.clickPosition.y,
              left: selectedEdge.clickPosition.x,
            }}
            onClick={deleteEdge}
            className="cursor-pointer z-10"
          >
            <FaRegTrashCan size={20} />
          </div>
        )}
      </ReactFlow>
    </div>
  );
}

export default Home;
