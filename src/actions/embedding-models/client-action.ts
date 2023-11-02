"use client";

import { Database } from "@/types/supabase";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export type EmbeddingModel = Database["public"]["Tables"]["embedding_models"]["Row"];

const supabase = createClientComponentClient<Database>();

export async function getAll(): Promise<EmbeddingModel[] | null> {
  const { data: embeddingModels } = await supabase
    .from("embedding_models")
    .select("*")
    .order("id", { ascending: true });
  return embeddingModels;
}
