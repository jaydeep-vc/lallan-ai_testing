"use server";

import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { getCurrentUser } from "./server-auth-actions";

import { Database } from "@/types/supabase";

export type Profile = Database["public"]["Tables"]["profiles"]["Row"];

/**
 * Get the user profile from the database
 *
 * @returns Profile data
 */
export async function getProfile(): Promise<Profile | null> {
  const user = await getCurrentUser();
  if (!user) return null;

  const supabase = createServerComponentClient<Database>({ cookies });
  const { data } = await supabase.from("profiles").select("*").eq("id", user.id).single();
  return data;
}
