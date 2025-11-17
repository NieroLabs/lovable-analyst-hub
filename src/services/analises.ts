import { supabase } from "./supabase";

export interface Analise {
  id: number;
  created_at: string;
  filename: string;
}

export const getAllAnalises = async (): Promise<Analise[]> => {
  const { data, error } = await supabase
    .from("analises")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data || [];
};

export const createAnalise = async (filename: string): Promise<Analise> => {
  const { data, error } = await supabase
    .from("analises")
    .insert({ filename })
    .select()
    .single();

  if (error) throw error;
  return data;
};
