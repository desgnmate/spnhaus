"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import Draggable from "react-draggable";

interface Position {
  x: number;
  y: number;
}

interface Size {
  width: number;
  height: number;
}

interface NodeStyle {
  backgroundColor?: string;
  color?: string;
  fontSize?: string;
  fontWeight?: string;
  padding?: string;
  borderRadius?: string;
  [key: string]: any;
}

interface CanvasNode {
  _id?: string;
  type: "note" | "image" | "link" | "text" | "shape" | "connector";
  content: any;
  position: Position;
  size?: Size;
  style?: NodeStyle;
  parentId?: string;
  order: number;
}

interface Board {
  _id: string;
  title: string;
  type: "mindmap" | "roadmap" | "moodboard" | "mixed";
  nodes: CanvasNode[];
}

interface DesignCanvasProps {
  board?: Board | null;
  onCreateBoard?: (title: string, type: Board["type"], searchQuery: string) => Promise<void>;
  onSaveNode?: (node: Omit<CanvasNode, "_id">) => Promise<void>;
  onUpdateNode?: (nodeId: string, updates: Partial<CanvasNode>) => Promise<void>;
}

export default function DesignCanvas({ 
  board, 
  onCreateBoard,
  onSaveNode,
  onUpdateNode 
}: DesignCanvasProps) {
  const [canvasPosition, setCanvasPosition] = useState<Position>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [isPanning, setIsPanning] = useState(false);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [nodes, setNodes] = useState<CanvasNode[]>(board?.nodes || []);
  const canvasRef = useRef<HTMLDivElement>(null);
  const lastMousePosition = useRef<Position>({ x: 0, y: 0 });

  // Handle mouse down for panning
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.target === canvasRef.current || e.target === canvasRef.current?.querySelector('.canvas-background')) {
      setIsPanning(true);
      lastMousePosition.current = { x: e.clientX, y: e.clientY };
    }
  }, []);

  // Handle mouse move for panning
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isPanning) {
      const deltaX = e.clientX - lastMousePosition.current.x;
      const deltaY = e.clientY - lastMousePosition.current.y;
      
      setCanvasPosition(prev => ({
        x: prev.x + deltaX,
        y: prev.y + deltaY,
      }));
      
      lastMousePosition.current = { x: e.clientX, y: e.clientY };
    }
  }, [isPanning]);

  // Handle mouse up to stop panning
  const handleMouseUp = useCallback(() => {
    setIsPanning(false);
  }, []);

  // Handle zoom
  const handleZoom = useCallback((delta: number) => {
    setZoom(prev => Math.max(0.25, Math.min(3, prev + delta)));
  }, []);

  // Handle node drag
  const handleNodeDrag = useCallback((nodeId: string, data: any) => {
    if (onUpdateNode && nodeId) {
      onUpdateNode(nodeId, {
        position: { x: data.x, y: data.y },
      });
    }
  }, [onUpdateNode]);

  // Add new node
  const addNode = useCallback((type: CanvasNode["type"], content: any, position?: Position) => {
    const newNode: CanvasNode = {
      type,
      content,
      position: position || { x: -canvasPosition.x + 400, y: -canvasPosition.y + 300 },
      order: nodes.length,
    };
    
    setNodes(prev => [...prev, newNode]);
    
    if (onSaveNode) {
      onSaveNode(newNode);
    }
  }, [canvasPosition, nodes.length, onSaveNode]);

  // Delete selected node
  const deleteSelectedNode = useCallback(() => {
    if (selectedNode) {
      setNodes(prev => prev.filter(n => n._id !== selectedNode));
      setSelectedNode(null);
    }
  }, [selectedNode]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Delete" || e.key === "Backspace") {
        deleteSelectedNode();
      }
      if (e.key === "+" || e.key === "=") {
        handleZoom(0.1);
      }
      if (e.key === "-") {
        handleZoom(-0.1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [deleteSelectedNode, handleZoom]);

  // Reset view
  const resetView = () => {
    setCanvasPosition({ x: 0, y: 0 });
    setZoom(1);
  };

  return (
    <div className="relative w-full h-screen bg-[#0A0A0A] overflow-hidden">
      {/* Toolbar */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
        <button
          onClick={() => handleZoom(-0.1)}
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors text-white"
          title="Zoom Out"
        >
          −
        </button>
        <span className="text-xs text-white/70 min-w-[60px] text-center">
          {Math.round(zoom * 100)}%
        </span>
        <button
          onClick={() => handleZoom(0.1)}
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors text-white"
          title="Zoom In"
        >
          +
        </button>
        <div className="w-px h-4 bg-white/20 mx-2" />
        <button
          onClick={resetView}
          className="px-3 py-1 text-xs text-white hover:bg-white/20 rounded-full transition-colors"
          title="Reset View"
        >
          Reset
        </button>
        <div className="w-px h-4 bg-white/20 mx-2" />
        <button
          onClick={() => addNode("note", { text: "New Note" })}
          className="px-3 py-1 text-xs text-white hover:bg-white/20 rounded-full transition-colors"
          title="Add Note"
        >
          + Note
        </button>
        <button
          onClick={() => addNode("image", { url: "", alt: "New Image" })}
          className="px-3 py-1 text-xs text-white hover:bg-white/20 rounded-full transition-colors"
          title="Add Image"
        >
          + Image
        </button>
      </div>

      {/* Canvas */}
      <div
        ref={canvasRef}
        className={`canvas-background w-full h-full cursor-${isPanning ? 'grabbing' : 'grab'}`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <motion.div
          className="absolute origin-top-left"
          style={{
            x: canvasPosition.x,
            y: canvasPosition.y,
            scale: zoom,
          }}
        >
          {/* Grid Background */}
          <div 
            className="absolute inset-[-5000px] w-[10000px] h-[10000px] opacity-20"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px',
            }}
          />

          {/* Nodes */}
          {nodes.map((node, index) => (
            <CanvasNodeComponent
              key={node._id || index}
              node={node}
              isSelected={selectedNode === node._id}
              onSelect={() => setSelectedNode(node._id || null)}
              onDrag={(data) => handleNodeDrag(node._id!, data)}
            />
          ))}
        </motion.div>
      </div>

      {/* Info Panel */}
      <div className="absolute bottom-4 left-4 z-50 px-4 py-2 bg-white/10 backdrop-blur-md rounded-lg border border-white/20">
        <p className="text-xs text-white/50">
          {board?.title || "Untitled Board"} • {nodes.length} nodes
        </p>
      </div>

      {/* Help Text */}
      <div className="absolute bottom-4 right-4 z-50 px-4 py-2 bg-white/10 backdrop-blur-md rounded-lg border border-white/20">
        <p className="text-xs text-white/50 space-y-1">
          <div>Drag canvas to pan • Scroll to zoom</div>
          <div>Drag nodes to move • Click to select</div>
          <div>Delete/Backspace to remove</div>
        </p>
      </div>
    </div>
  );
}

// Individual Node Component
function CanvasNodeComponent({ 
  node, 
  isSelected, 
  onSelect,
  onDrag 
}: { 
  node: CanvasNode; 
  isSelected: boolean;
  onSelect: () => void;
  onDrag: (data: any) => void;
}) {
  const nodeRef = useRef<HTMLDivElement>(null);

  const defaultStyles: NodeStyle = {
    note: {
      backgroundColor: "rgba(255,255,255,0.1)",
      color: "#fff",
      padding: "16px",
      borderRadius: "8px",
      minWidth: "200px",
      maxWidth: "400px",
      boxShadow: "0 4px 6px rgba(0,0,0,0.3)",
    },
    image: {
      backgroundColor: "rgba(255,255,255,0.05)",
      borderRadius: "8px",
      overflow: "hidden",
      boxShadow: "0 4px 6px rgba(0,0,0,0.3)",
    },
  };

  const style = {
    ...defaultStyles[node.type],
    ...node.style,
    border: isSelected ? "2px solid #F4C542" : "2px solid transparent",
  };

  return (
    <Draggable
      nodeRef={nodeRef}
      position={node.position}
      onStop={(_, data) => onDrag({ x: data.x, y: data.y })}
      handle=".drag-handle"
    >
      <div
        ref={nodeRef}
        onClick={onSelect}
        className="absolute cursor-move group"
        style={node.size ? { width: node.size.width, height: node.size.height } : {}}
      >
        <div style={style}>
          {node.type === "note" || node.type === "text" ? (
            <div className="drag-handle cursor-move">
              {node.content.isTitle ? (
                <h3 style={node.style}>{node.content.text}</h3>
              ) : (
                <p style={node.style}>{node.content.text}</p>
              )}
            </div>
          ) : node.type === "image" ? (
            <div className="drag-handle cursor-move h-full">
              {node.content.url ? (
                <img 
                  src={node.content.url} 
                  alt={node.content.alt}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white/50">
                  {node.content.alt || "Image Placeholder"}
                </div>
              )}
            </div>
          ) : null}
        </div>
        
        {/* Selection indicator */}
        {isSelected && (
          <div className="absolute -inset-1 border-2 border-[#F4C542] rounded-lg pointer-events-none" />
        )}
        
        {/* Resize handles (future enhancement) */}
        {isSelected && (
          <>
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-[#F4C542] rounded-full cursor-se-resize" />
            <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-[#F4C542] rounded-full cursor-sw-resize" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#F4C542] rounded-full cursor-ne-resize" />
            <div className="absolute -top-1 -left-1 w-3 h-3 bg-[#F4C542] rounded-full cursor-nw-resize" />
          </>
        )}
      </div>
    </Draggable>
  );
}
