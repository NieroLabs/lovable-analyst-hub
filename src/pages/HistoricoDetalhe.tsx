import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getElementosByAnaliseId,
  updateElemento,
  getProcedimentos,
  Elemento,
} from "@/services/elementos";
import { EditableCell } from "@/components/EditableCell";
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
import { ArrowLeft, Save } from "lucide-react";
import { toast } from "sonner";

const HistoricoDetalhe = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [elementos, setElementos] = useState<Elemento[]>([]);
  const [procedimentos, setProcedimentos] = useState<
    { id: number; nome: string }[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, [id]);

  const loadData = async () => {
    try {
      const [elementosData, procedimentosData] = await Promise.all([
        getElementosByAnaliseId(Number(id)),
        getProcedimentos(),
      ]);
      setElementos(elementosData);
      setProcedimentos(procedimentosData);
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
      toast.error("Erro ao carregar elementos");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (
    elementoId: number,
    field: string,
    value: string | number | null
  ) => {
    try {
      await updateElemento(elementoId, { [field]: value });
      
      setElementos((prev) =>
        prev.map((el) =>
          el.id === elementoId ? { ...el, [field]: value } : el
        )
      );
      
      toast.success("Atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar:", error);
      toast.error("Erro ao salvar alteração");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center gap-4">
          <Button variant="ghost" onClick={() => navigate("/historicos")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Detalhes da Análise #{id}
            </h1>
            <p className="text-muted-foreground mt-1">
              Clique nas células para editar os valores
            </p>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg shadow-lg overflow-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead>Tipo</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>Freq</TableHead>
                <TableHead>Custo Unit.</TableHead>
                <TableHead>Custo Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Valor Proposto</TableHead>
                <TableHead>Gold Label</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i}>
                    {Array.from({ length: 8 }).map((_, j) => (
                      <TableCell key={j}>
                        <Skeleton className="h-8 w-full" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : elementos.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-12">
                    <p className="text-muted-foreground">
                      Nenhum elemento encontrado
                    </p>
                  </TableCell>
                </TableRow>
              ) : (
                elementos.map((elemento) => (
                  <TableRow key={elemento.id} className="hover:bg-muted/30">
                    <TableCell>{elemento.tipo || "-"}</TableCell>
                    <TableCell className="font-medium">
                      {elemento.nome || "-"}
                    </TableCell>
                    <TableCell>{elemento.freq || "-"}</TableCell>
                    <TableCell>
                      <EditableCell
                        value={elemento.custo_unit}
                        type="number"
                        onSave={(val) =>
                          handleUpdate(elemento.id, "custo_unit", val)
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <EditableCell
                        value={elemento.custo_total}
                        type="number"
                        onSave={(val) =>
                          handleUpdate(elemento.id, "custo_total", val)
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <EditableCell
                        value={elemento.status}
                        onSave={(val) =>
                          handleUpdate(elemento.id, "status", val)
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <EditableCell
                        value={elemento.valor_proposto}
                        type="number"
                        onSave={(val) =>
                          handleUpdate(elemento.id, "valor_proposto", val)
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <EditableCell
                        value={elemento.id_gold_label}
                        type="select"
                        options={procedimentos}
                        onSave={(val) =>
                          handleUpdate(elemento.id, "id_gold_label", val)
                        }
                      />
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

export default HistoricoDetalhe;
