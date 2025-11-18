import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getElementosByAnaliseId, Elemento } from "@/services/elementos";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowLeft, FileText } from "lucide-react";
import { toast } from "sonner";

interface ImpactoElemento extends Elemento {
  total_proposto: number;
  diferenca_total: number;
}

const CalcularImpacto = () => {
  const [elementos, setElementos] = useState<ImpactoElemento[]>([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    const loadElementos = async () => {
      if (!id) {
        toast.error("ID da análise não encontrado.");
        setLoading(false);
        return;
      }
      try {
        const data = await getElementosByAnaliseId(Number(id));
        const elementosComProposta = data
          .filter((el) => el.valor_proposto !== null)
          .map((el) => {
            const custoTotal = el.custo_total || 0;
            const valorProposto = el.valor_proposto!;
            const freq = el.freq || 1;
            const totalProposto = freq * valorProposto;
            const diferencaTotal = totalProposto - custoTotal;
            return {
              ...el,
              total_proposto: totalProposto,
              diferenca_total: diferencaTotal,
            };
          });
        setElementos(elementosComProposta);
      } catch (error) {
        console.error("Erro ao carregar elementos:", error);
        toast.error("Erro ao carregar dados para cálculo de impacto.");
      } finally {
        setLoading(false);
      }
    };

    loadElementos();
  }, [id]);

  const formatCurrency = (value: number | null | undefined) => {
    if (value === null || value === undefined) return "N/A";
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const totalDiferenca = elementos.reduce(
    (acc, el) => acc + el.diferenca_total,
    0
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" onClick={() => navigate("/historicos")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Calcular Impacto das Propostas
            </h1>
            <p className="text-muted-foreground mt-1">
              Análise comparativa de valores propostos vs. recebidos para a
              análise ID: {id}
            </p>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg shadow-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead>Item</TableHead>
                <TableHead className="text-right">Valor Recebido</TableHead>
                <TableHead className="text-center">Frequência</TableHead>
                <TableHead className="text-right">Total Recebido</TableHead>
                <TableHead className="text-right">Valor Proposto</TableHead>
                <TableHead className="text-right">Total Proposto</TableHead>
                <TableHead className="text-right">Diferença Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i}>
                    {Array.from({ length: 7 }).map((_, j) => (
                      <TableCell key={j}>
                        <Skeleton className="h-4 w-full" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : elementos.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-12">
                    <FileText className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">
                      Nenhum item com valor proposto encontrado para esta
                      análise.
                    </p>
                  </TableCell>
                </TableRow>
              ) : (
                elementos.map((el) => (
                  <TableRow key={el.id} className="hover:bg-muted/30">
                    <TableCell className="font-medium">{el.nome}</TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(el.custo_unit)}
                    </TableCell>
                    <TableCell className="text-center">{el.freq}</TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(el.custo_total)}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(el.valor_proposto)}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(el.total_proposto)}
                    </TableCell>
                    <TableCell
                      className={`text-right font-bold ${
                        el.diferenca_total > 0
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {formatCurrency(el.diferenca_total)}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
            {!loading && elementos.length > 0 && (
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={6} className="text-right font-bold">
                    Impacto Total
                  </TableCell>
                  <TableCell
                    className={`text-right font-bold ${
                      totalDiferenca > 0 ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {formatCurrency(totalDiferenca)}
                  </TableCell>
                </TableRow>
              </TableFooter>
            )}
          </Table>
        </div>
      </div>
    </div>
  );
};

export default CalcularImpacto;
