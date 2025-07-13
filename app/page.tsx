"use client";

import type React from "react";
import { useState, useRef, useCallback, useEffect } from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  MiniMap,
  type Connection,
  type Edge,
  type Node,
  MarkerType,
} from "reactflow";

import "reactflow/dist/style.css";

import NodesPanel from "@/components/nodes-panel";
import SettingsPanel from "@/components/settings-panel";
import CustomTextNode from "@/components/custom-text-node";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export type TextNodeData = {
  text: string;
};

const nodeTypes = { textNode: CustomTextNode };

const initialNodes: Node<TextNodeData>[] = [
  {
    id: "1",
    type: "textNode",
    data: { text: "Hello World!" },
    position: { x: 250, y: 5 },
  },
];

let id = 0;
const getId = () => `dndnode_${id++}`;

export default function FlowBuilder() {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);
  const [selectedNode, setSelectedNode] = useState<Node<TextNodeData> | null>(
    null
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showSaveSuccessDialog, setShowSaveSuccessDialog] = useState(false);

  const onConnect = useCallback(
    (params: Connection) => {
      setEdges((eds) =>
        addEdge({ ...params, markerEnd: { type: MarkerType.ArrowClosed } }, eds)
      );
    },
    [setEdges]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      if (reactFlowInstance) {
        const type = event.dataTransfer.getData("application/reactflow");
        const position = reactFlowInstance.screenToFlowPosition({
          x: event.clientX,
          y: event.clientY,
        });

        const newNode: Node<TextNodeData> = {
          id: getId(),
          type,
          position,
          data: { text: `New Message ${id}` },
        };

        setNodes((nds) => nds.concat(newNode));
      }
    },
    [reactFlowInstance, setNodes]
  );

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    event.stopPropagation();
    setSelectedNode(node as Node<TextNodeData>);
    setErrorMessage(null);
  }, []);

  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
  }, []);

  const onNodeTextChange = useCallback(
    (nodeId: string, newText: string) => {
      setNodes((nds) =>
        nds.map((node) =>
          node.id === nodeId
            ? { ...node, data: { ...node.data, text: newText } }
            : node
        )
      );
    },
    [setNodes]
  );

  const onDeleteNode = useCallback(
    (nodeId: string) => {
      const newNodes = nodes.filter((node) => node.id !== nodeId);
      const newEdges = edges.filter(
        (edge) => edge.source !== nodeId && edge.target !== nodeId
      );

      setNodes(newNodes);
      setEdges(newEdges);
      setSelectedNode(null);
      setErrorMessage(null);
    },
    [nodes, edges, setNodes, setEdges]
  );

  const saveFlowData = useCallback(() => {
    const timestamp = new Date().toISOString();

    if (!reactFlowInstance) {
      return;
    }

    try {
      const flowData = reactFlowInstance.toObject();

      if (flowData.nodes.length > 1) {
        const targetNodeIds = new Set(
          flowData.edges.map((edge: Edge) => edge.target)
        );
        const unconnectedNodes = flowData.nodes.filter(
          (node: Node) => !targetNodeIds.has(node.id)
        );

        if (unconnectedNodes.length > 1) {
          setErrorMessage(
            "Error: More than one node has an empty target handle. Please connect all but one starting node."
          );
          return;
        }
      }

      setErrorMessage(null);
      setShowSaveSuccessDialog(true);
    } catch (error) {}
  }, [reactFlowInstance]);

  useEffect(() => {
    if (selectedNode) {
      const updatedSelectedNode = nodes.find(
        (node) => node.id === selectedNode.id
      );
      if (updatedSelectedNode) {
        setSelectedNode(updatedSelectedNode as Node<TextNodeData>);
      } else {
        setSelectedNode(null);
      }
    }
  }, [nodes, selectedNode]);

  return (
    <div className="flex h-screen">
      <NodesPanel />

      <div className="flex-grow h-full" ref={reactFlowWrapper}>
        <ReactFlowProvider>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            nodeTypes={nodeTypes}
            onNodeClick={onNodeClick}
            onPaneClick={onPaneClick}
            fitView
          >
            <MiniMap />
            <Controls />
            <div className="absolute top-4 right-4 z-10">
              <button
                onClick={() => {
                  saveFlowData();
                }}
                className="border border-blue-500 text-blue-500 hover:bg-blue-50 font-bold py-2 px-4 rounded shadow-sm transition-colors"
              >
                Save Changes
              </button>
            </div>
          </ReactFlow>
        </ReactFlowProvider>
      </div>

      {selectedNode ? (
        <SettingsPanel
          selectedNode={selectedNode}
          onTextChange={onNodeTextChange}
          onBackClick={onPaneClick}
          onDeleteNode={onDeleteNode}
        />
      ) : (
        <aside className="border-l border-gray-200 p-4 text-sm bg-white h-full w-80 flex items-center justify-center text-gray-500">
          No node selected.
        </aside>
      )}

      <Dialog
        open={showSaveSuccessDialog}
        onOpenChange={setShowSaveSuccessDialog}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Flow Saved!</DialogTitle>
            <DialogDescription>
              Your changes have been saved successfully.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setShowSaveSuccessDialog(false)}>OK</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog
        open={!!errorMessage}
        onOpenChange={(open) => !open && setErrorMessage(null)}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-red-600">Validation Error</DialogTitle>
            <DialogDescription>{errorMessage}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setErrorMessage(null)}>
              OK
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
