"use server";

import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

import { Database } from "@/types/supabase";

export type Channel = Database["public"]["Tables"]["channels"]["Row"];
type InsertChannel = Database["public"]["Tables"]["channels"]["Insert"];

/**
 * To get all channels of the current user
 *
 * @returns channels list
 */
export async function fetchAll(): Promise<Channel[] | null> {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data } = await supabase.from("channels").select("*");
  return data;
}

/**
 * Fetch channel with it's id
 *
 * @param id channel id
 * @returns channel
 */
export async function fetchById(id: string): Promise<Channel | null> {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data } = await supabase.from("channels").select("*").eq("id", id).single();
  return data;
}

/**
 * Update channel from the database
 *
 * @param id channnel id to updated
 * @param payload body or fields we want to update
 */
export async function update(id: string, payload?: Omit<Partial<Channel>, "created_at" | "id">) {
  const supabase = createServerComponentClient<Database>({ cookies });
  await supabase
    .from("channels")
    .update({ ...payload, updated_at: new Date().toISOString() })
    .eq("id", id)
    .throwOnError();
}

/**
 * Create new channel inside the database
 *
 * @param payload body of the channel to create a new channel inside the database
 * @returns new channel
 */
export async function create(payload: InsertChannel): Promise<Channel | null> {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data, error } = await supabase
    .from("channels")
    .insert({ ...payload, updated_at: new Date().toISOString() })
    .select("*")
    .single();

  if (error) {
    console.error(error);
    throw error;
  }

  return data;
}

/**
 * Remove the channel from the database
 *
 * @param id channel id to remove that channel
 */
export async function remove(id: string) {
  const supabase = createServerComponentClient<Database>({ cookies });
  await supabase.from("channels").delete().eq("id", id).throwOnError();
}
