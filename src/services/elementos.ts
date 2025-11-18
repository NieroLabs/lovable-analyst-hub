import { supabase } from "./supabase";

export interface Elemento {
  id: number;
  created_at: string;
  tipo: string | null;
  nome: string | null;
  freq: number | null;
  custo_unit: number | null;
  custo_total: number | null;
  status: string | null;
  valor_proposto: number | null;
  id_gold_label: number | null;
  analise_id: number | null;
  gold_label_nome?: string | null;
  gold_label_valor?: number | null;
}

export const getElementosByAnaliseId = async (
  analiseId: number
): Promise<Elemento[]> => {
  const { data, error } = await supabase
    .from("elementos_analises")
    .select(
      `
      *,
      financeiro_cadastro_procedimentos:id_gold_label (
        nome,
        valor_minimo
      )
    `
    )
    .eq("analise_id", analiseId);

  if (error) throw error;

  return (data || []).map((item: any) => ({
    ...item,
    gold_label_nome: item.financeiro_cadastro_procedimentos?.nome || null,
    gold_label_valor: item.financeiro_cadastro_procedimentos?.valor_minimo || null,
  }));
};

export const updateElemento = async (
  id: number,
  updates: Partial<Elemento>
): Promise<void> => {
  const { error } = await supabase
    .from("elementos_analises")
    .update(updates)
    .eq("id", id);

  if (error) throw error;
};

export const getProcedimentos = async () => {
  const { data, error } = await supabase
    .from("financeiro_cadastro_procedimentos")
    .select("id, nome")
    .order("nome");

  if (error) throw error;
  return data || [];
};
