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

const initialEdges = [];

function Flow() {
  const [recoilNode, setRecoilNode] = useRecoilState(NodeHook);
  const [nodes, setNodes, onNodesChange] = useNodesState(recoilNode);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedEdge, setSelectedEdge] = useState(null);

  useEffect(() => {
    setNodes((prevNodes) =>
      applyNodeChanges(prevNodes, recoilNode, { removeUnlisted: true })
    );
  }, [recoilNode]);

  // const setRecoilNodeDebounced = debounce((node) => {
  //   setRecoilNode(node);
  // }, 500);

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

  // useEffect(() => {
  //   setRecoilNodeDebounced(nodes);
  //   return () => {
  //     setRecoilNodeDebounced.cancel();
  //   };
  // }, [nodes, setRecoilNodeDebounced]);

  useEffect(()=>{
    console.log(nodes)
  },[nodes])

  return (
    <div style={{ height: "90vh", width: "100vw" }}>
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

export default Flow;
