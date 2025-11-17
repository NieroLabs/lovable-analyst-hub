import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface EditableCellProps {
  value: string | number | null;
  type?: "text" | "number" | "select";
  options?: { id: number; nome: string }[];
  onSave: (value: string | number | null) => void;
}

export const EditableCell = ({
  value,
  type = "text",
  options,
  onSave,
}: EditableCellProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value?.toString() || "");

  const handleSave = () => {
    if (type === "number") {
      onSave(editValue ? parseFloat(editValue) : null);
    } else {
      onSave(editValue || null);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      setEditValue(value?.toString() || "");
      setIsEditing(false);
    }
  };

  if (type === "select" && options) {
    return (
      <Select
        value={value?.toString() || ""}
        onValueChange={(val) => onSave(val ? parseInt(val) : null)}
      >
        <SelectTrigger className="h-8">
          <SelectValue placeholder="Selecione..." />
        </SelectTrigger>
        <SelectContent>
          {options.map((opt) => (
            <SelectItem key={opt.id} value={opt.id.toString()}>
              {opt.nome}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  }

  if (isEditing) {
    return (
      <Input
        type={type}
        value={editValue}
        onChange={(e) => setEditValue(e.target.value)}
        onBlur={handleSave}
        onKeyDown={handleKeyDown}
        className="h-8"
        autoFocus
      />
    );
  }

  return (
    <div
      onClick={() => setIsEditing(true)}
      className="cursor-pointer hover:bg-muted/50 px-3 py-2 rounded min-h-[2rem] transition-colors"
    >
      {value !== null && value !== undefined ? value : "-"}
    </div>
  );
};
