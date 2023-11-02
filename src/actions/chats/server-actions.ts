"use server";

import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

import { Database } from "@/types/supabase";

export type Conversation = Database["public"]["Tables"]["conversations"]["Row"];
type ConversationInsert = Database["public"]["Tables"]["conversations"]["Insert"];
type ConversationUpdate = Database["public"]["Tables"]["conversations"]["Update"];

export async function fetchAllByChannelId(
  channelId: string,
  offset?: number,
  skip?: number
): Promise<Conversation[] | null> {
  const supabase = createServerComponentClient<Database>({ cookies });
  const fn = supabase
    .from("conversations")
    .select("*")
    .eq("channel_id", channelId)
    .order("created_at", { ascending: false });

  if (offset && skip) {
    fn.range(offset, skip);
  } else {
    fn.limit(5);
  }

  const { data } = await fn;

  return data;
}

export async function create(
  chat: Omit<ConversationInsert, "updated_at" | "created_at" | "id">
): Promise<Conversation | null> {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data } = await supabase
    .from("conversations")
    .insert({
      ...chat,
      updated_at: new Date().toISOString(),
    })
    .select("*")
    .single()
    .throwOnError();

  return data;
}

export async function update(
  id: string,
  payload?: Omit<ConversationUpdate, "updated_at" | "created_at" | "id">
) {
  const supabase = createServerComponentClient<Database>({ cookies });
  await supabase
    .from("channels")
    .update({ ...payload, updated_at: new Date().toISOString() })
    .eq("id", id);
}

export async function removeAllByChannelId(channelId: string) {
  const supabase = createServerComponentClient<Database>({ cookies });
  await supabase.from("conversations").delete().eq("channel_id", channelId).throwOnError();
}
