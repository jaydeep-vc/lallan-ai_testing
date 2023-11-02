"use server";

import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

import { Database } from "@/types/supabase";

export type ChannelType = Database["public"]["Tables"]["channel_type"]["Row"];

export async function fetchAll(): Promise<ChannelType[] | null> {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data } = await supabase.from("channel_type").select("*");
  return data;
}
