"use client";

import { Database } from "@/types/supabase";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export type LanguageModel = Database["public"]["Tables"]["language_models"]["Row"];

const supabase = createClientComponentClient<Database>();

export async function getAll(): Promise<LanguageModel[] | null> {
  const { data: languageModels } = await supabase
    .from("language_models")
    .select("*")
    .order("id", { ascending: true });
  return languageModels;
}
