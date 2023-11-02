"use client";

import type { Session, User } from "@supabase/auth-helpers-nextjs";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/supabase";

export type { User };

const supabase = createClientComponentClient<Database>();

export async function resetPassword(
  email: string,
  options?: { redirectTo?: string; captchaToken?: string }
) {
  const { error } = await supabase.auth.resetPasswordForEmail(email, options);
  if (error) throw error;
}

export async function signIn(
  email: string,
  password: string
): Promise<{ user: User; session: Session }> {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
}

export async function singUp(
  email: string,
  password: string,
  options?: { emailRedirectTo?: string; data: any }
) {
  const { data, error } = await supabase.auth.signUp({ email, password, options });
  if (error) throw error;
  return data;
}

export async function updatePassword(password: string) {
  const { data, error } = await supabase.auth.updateUser({ password });
  if (error) throw error;
  return data;
}
