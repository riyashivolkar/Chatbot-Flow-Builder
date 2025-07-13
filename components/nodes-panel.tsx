"use client";

import type React from "react";
import { MessageSquare } from "lucide-react";
export default function NodesPanel() {
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside className="border-r border-gray-200 p-4 text-sm bg-white h-full w-64">
      {/* Draggable Message Node */}
      <div
        className="dndnode border border-blue-500 rounded-md p-3 cursor-grab hover:bg-blue-50 transition-colors flex flex-col items-center justify-center gap-2"
        onDragStart={(event) => onDragStart(event, "textNode")}
        draggable
      >
        <MessageSquare className="w-6 h-6 text-blue-500" />
        <span className="text-blue-700 font-medium">Message</span>
      </div>
    </aside>
  );
}
