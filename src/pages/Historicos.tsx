import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllAnalises, Analise } from "@/services/analises";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { FileText, Eye, Upload, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

const Historicos = () => {
  const [analises, setAnalises] = useState<Analise[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadAnalises();
  }, []);

  const loadAnalises = async () => {
    try {
      const data = await getAllAnalises();
      setAnalises(data);
    } catch (error) {
      console.error("Erro ao carregar análises:", error);
      toast.error("Erro ao carregar histórico");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => navigate("/")}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Histórico de Análises
              </h1>
              <p className="text-muted-foreground mt-1">
                Visualize todas as análises processadas
              </p>
            </div>
          </div>
          <Button onClick={() => navigate("/upload")} size="lg">
            <Upload className="w-4 h-4 mr-2" />
            Nova Análise
          </Button>
        </div>

        <div className="bg-card border border-border rounded-lg shadow-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="w-20">ID</TableHead>
                <TableHead>Arquivo</TableHead>
                <TableHead className="w-48">Data de Criação</TableHead>
                <TableHead className="w-32 text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <Skeleton className="h-4 w-12" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-64" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-32" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-9 w-full" />
                    </TableCell>
                  </TableRow>
                ))
              ) : analises.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-12">
                    <FileText className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">
                      Nenhuma análise encontrada
                    </p>
                  </TableCell>
                </TableRow>
              ) : (
                analises.map((analise) => (
                  <TableRow key={analise.id} className="hover:bg-muted/30">
                    <TableCell className="font-medium">
                      {analise.id}
                    </TableCell>
                    <TableCell className="font-medium">
                      {analise.filename}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {format(
                        new Date(analise.created_at),
                        "dd/MM/yyyy 'às' HH:mm",
                        { locale: ptBR }
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate(`/historicos/${analise.id}`)}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Ver Detalhes
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Historicos;
