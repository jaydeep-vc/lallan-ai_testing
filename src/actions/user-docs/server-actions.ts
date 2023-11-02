"use server";

import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

import { Database } from "@/types/supabase";

export type UserDocument = Database["public"]["Tables"]["user_documents"]["Row"];
type DocumentInsert = Database["public"]["Tables"]["user_documents"]["Insert"];

/**
 * Get all user document by their channel id
 *
 * @param channelId channel id
 * @returns user document
 */
export async function fetchByChannelId(channelId: string): Promise<UserDocument[] | null> {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data } = await supabase.from("user_documents").select("*").eq("channel_id", channelId);
  return data;
}

export async function create(
  doc: Omit<DocumentInsert, "id" | "created_at">
): Promise<UserDocument | null> {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data } = await supabase
    .from("user_documents")
    .insert(doc)
    .select()
    .single()
    .throwOnError();
  return data;
}

export async function fetchById(id: string): Promise<UserDocument | null> {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data } = await supabase
    .from("user_documents")
    .delete()
    .eq("id", id)
    .select("*")
    .single()
    .throwOnError();
  return data;
}
