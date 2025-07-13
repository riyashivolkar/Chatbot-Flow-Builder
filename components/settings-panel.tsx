"use client";

import type React from "react";
import type { Node } from "reactflow";
import type { TextNodeData } from "@/app/page";
import { ArrowLeft } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface SettingsPanelProps {
  selectedNode: Node<TextNodeData> | null;
  onTextChange: (nodeId: string, newText: string) => void;
  onBackClick: () => void;
  onDeleteNode: (nodeId: string) => void;
}

export default function SettingsPanel({
  selectedNode,
  onTextChange,
  onBackClick,
  onDeleteNode,
}: SettingsPanelProps) {
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (selectedNode) {
      onTextChange(selectedNode.id, event.target.value);
    }
  };

  return (
    <aside className="border-l border-gray-200 p-4 text-sm bg-white h-full w-80">
      {/* Header for Settings Panel */}
      <div className="flex items-center border-b border-gray-200 pb-3 mb-4">
        <button
          onClick={onBackClick}
          className="p-1 rounded-full hover:bg-gray-100 mr-2"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <span className="text-lg font-semibold text-gray-800">Message</span>
      </div>

      {selectedNode ? (
        <div>
          <label
            htmlFor="node-text"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Text
          </label>
          <textarea
            id="node-text"
            name="node-text"
            rows={4}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-none"
            value={selectedNode.data.text}
            onChange={handleChange}
          />
          {/* Delete Button with AlertDialog */}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded shadow-md transition-colors">
                Delete Node
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your node and any connected edges.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => {
                    if (selectedNode) {
                      onDeleteNode(selectedNode.id);
                    }
                  }}
                  className="bg-red-500 hover:bg-red-600 text-white"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      ) : (
        <div className="text-gray-500">Select a node to edit its settings.</div>
      )}
    </aside>
  );
}
