import { useState, useCallback } from "react";
import { Upload, FileSpreadsheet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  selectedFile: File | null;
}

export const FileUpload = ({ onFileSelect, selectedFile }: FileUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      const files = Array.from(e.dataTransfer.files);
      const xlsxFile = files.find(
        (file) =>
          file.name.endsWith(".xlsx") || file.name.endsWith(".xls")
      );

      if (xlsxFile) {
        onFileSelect(xlsxFile);
      }
    },
    [onFileSelect]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files && files[0]) {
        onFileSelect(files[0]);
      }
    },
    [onFileSelect]
  );

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={cn(
        "border-2 border-dashed rounded-lg p-12 text-center transition-all",
        isDragging
          ? "border-primary bg-primary/5 scale-[1.02]"
          : "border-border bg-card hover:border-primary/50"
      )}
    >
      <div className="flex flex-col items-center gap-4">
        {selectedFile ? (
          <>
            <FileSpreadsheet className="w-16 h-16 text-accent" />
            <div>
              <p className="text-lg font-medium text-foreground">
                {selectedFile.name}
              </p>
              <p className="text-sm text-muted-foreground">
                {(selectedFile.size / 1024).toFixed(2)} KB
              </p>
            </div>
          </>
        ) : (
          <>
            <Upload className="w-16 h-16 text-muted-foreground" />
            <div>
              <p className="text-lg font-medium text-foreground">
                Arraste seu arquivo .xlsx aqui
              </p>
              <p className="text-sm text-muted-foreground">
                ou clique para selecionar
              </p>
            </div>
          </>
        )}

        <input
          type="file"
          accept=".xlsx,.xls"
          onChange={handleFileInput}
          className="hidden"
          id="file-input"
        />
        <label htmlFor="file-input">
          <Button variant="outline" className="cursor-pointer" asChild>
            <span>Selecionar arquivo</span>
          </Button>
        </label>
      </div>
    </div>
  );
};
