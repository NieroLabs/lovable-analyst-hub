import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Upload, History, FileSpreadsheet, MessageSquare } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-12">
            <FileSpreadsheet className="w-20 h-20 mx-auto mb-6 text-primary" />
            <h1 className="text-5xl font-bold text-foreground mb-4">
              Sistema de Análise de Dados
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Envie arquivos .xlsx para processamento automático e gerencie suas
              análises de forma eficiente
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <div className="bg-card border border-border rounded-lg shadow-lg p-8 hover:shadow-xl transition-all hover:scale-[1.02]">
              <Upload className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h2 className="text-2xl font-bold mb-3 text-foreground">
                Nova Análise
              </h2>
              <p className="text-muted-foreground mb-6">
                Envie um novo arquivo para processamento via N8N
              </p>
              <Button
                onClick={() => navigate("/upload")}
                size="lg"
                className="w-full"
              >
                <Upload className="w-4 h-4 mr-2" />
                Fazer Upload
              </Button>
            </div>

            <div className="bg-card border border-border rounded-lg shadow-lg p-8 hover:shadow-xl transition-all hover:scale-[1.02]">
              <History className="w-12 h-12 mx-auto mb-4 text-accent" />
              <h2 className="text-2xl font-bold mb-3 text-foreground">
                Histórico
              </h2>
              <p className="text-muted-foreground mb-6">
                Visualize e edite análises já processadas
              </p>
              <Button
                onClick={() => navigate("/historicos")}
                size="lg"
                variant="outline"
                className="w-full"
              >
                <History className="w-4 h-4 mr-2" />
                Ver Histórico
              </Button>
            </div>
          </div>

          <div className="grid md:grid-cols-1 gap-6 max-w-3xl mx-auto mt-6">
            <div className="bg-card border border-border rounded-lg shadow-lg p-8 hover:shadow-xl transition-all hover:scale-[1.02]">
              <MessageSquare className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h2 className="text-2xl font-bold mb-3 text-foreground">
                Protocolo THOrnaDO
              </h2>
              <p className="text-muted-foreground mb-6">
                Converse com um agente especializado no protocolo THOrnaDO
              </p>
              <a href="/rag/thornado" className="w-full">
                <Button size="lg" className="w-full">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Iniciar Chat
                </Button>
              </a>
            </div>
          </div>

          <div className="mt-16 p-8 bg-muted/30 rounded-lg border border-border">
            <h3 className="text-lg font-semibold mb-3 text-foreground">
              Como funciona?
            </h3>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div>
                <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold mb-3">
                  1
                </div>
                <p className="text-sm text-muted-foreground">
                  Faça upload do arquivo .xlsx
                </p>
              </div>
              <div>
                <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold mb-3">
                  2
                </div>
                <p className="text-sm text-muted-foreground">
                  O arquivo é processado automaticamente
                </p>
              </div>
              <div>
                <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold mb-3">
                  3
                </div>
                <p className="text-sm text-muted-foreground">
                  Visualize e edite os resultados
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
