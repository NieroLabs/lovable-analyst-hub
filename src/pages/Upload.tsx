import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FileUpload } from "@/components/FileUpload";
import { Button } from "@/components/ui/button";
import { uploadToN8N } from "@/services/upload";
import { createAnalise } from "@/services/analises";
import { toast } from "sonner";
import { Loader2, ArrowLeft } from "lucide-react";

const Upload = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!selectedFile) {
      toast.error("Por favor, selecione um arquivo");
      return;
    }

    setIsUploading(true);

    try {
      // Enviar para N8N
      await uploadToN8N(selectedFile);

      // Criar registro no Supabase
      await createAnalise(selectedFile.name);

      toast.success("Arquivo enviado com sucesso!");
      navigate("/historicos");
    } catch (error) {
      console.error("Erro no upload:", error);
      toast.error("Erro ao processar arquivo");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </Button>

        <div className="bg-card border border-border rounded-lg shadow-lg p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Upload de Análise
            </h1>
            <p className="text-muted-foreground">
              Envie seu arquivo .xlsx para processamento
            </p>
          </div>

          <FileUpload
            onFileSelect={setSelectedFile}
            selectedFile={selectedFile}
          />

          <div className="mt-8 flex justify-end">
            <Button
              onClick={handleSubmit}
              disabled={!selectedFile || isUploading}
              size="lg"
              className="min-w-[200px]"
            >
              {isUploading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Enviando...
                </>
              ) : (
                "Enviar Arquivo"
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
