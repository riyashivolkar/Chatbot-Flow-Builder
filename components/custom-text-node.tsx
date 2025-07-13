import { Handle, Position, type NodeProps } from "reactflow";
import { MessageSquare, PhoneIcon as Whatsapp } from "lucide-react";
import type { TextNodeData } from "@/app/page";
interface CustomTextNodeProps extends NodeProps<TextNodeData> {
  selected: boolean;
  d;
}

export default function CustomTextNode({
  data,
  selected,
}: CustomTextNodeProps) {
  return (
    <div
      className={`w-64 shadow-md rounded-lg bg-white border ${
        selected ? "border-blue-500" : "border-gray-300"
      }`}
    >
      <div className="flex items-center justify-between bg-teal-100 px-4 py-2 rounded-t-lg">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-teal-600" />
          <span className="text-sm font-semibold text-gray-800">
            Send Message
          </span>
        </div>
        <Whatsapp className="w-4 h-4 text-teal-600" />
      </div>

      <div className="px-4 py-3 text-sm text-gray-700">{data.text}</div>

      {/* Handles */}
      <Handle
        type="target"
        position={Position.Left}
        className="w-3 h-3 bg-green-500 rounded-full -left-1.5 top-1/2 -translate-y-1/2"
        isConnectable={true}
      />
      <Handle
        type="source"
        position={Position.Right}
        className="w-3 h-3 bg-green-500 rounded-full -right-1.5 top-1/2 -translate-y-1/2"
        isConnectable={1}
      />
    </div>
  );
}
