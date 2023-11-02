"use client";

import { Database } from "@/types/supabase";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

type Channel = Database["public"]["Tables"]["channels"]["Row"];

const supabase = createClientComponentClient<Database>();

export function subscribeToInsert(callback: (newChat: Channel) => void) {
  return supabase
    .channel("realtime channel insert")
    .on("postgres_changes", { event: "INSERT", schema: "public", table: "channels" }, (payload) => {
      callback(payload.new as Channel);
    })
    .subscribe();
}

export function subscribeToUpdate(callback: (newChat: Channel) => void) {
  return supabase
    .channel("realtime channel update")
    .on(
      "postgres_changes",
      {
        event: "UPDATE",
        schema: "public",
        table: "channels",
      },
      (payload) => {
        callback(payload.new as Channel);
      }
    )
    .subscribe();
}

export function subscribeToUpdateByChannnel(
  channelId: string,
  callback: (newChat: Channel) => void
) {
  return supabase
    .channel("realtime channel update with channel id")
    .on(
      "postgres_changes",
      {
        event: "UPDATE",
        schema: "public",
        table: "channels",
        filter: `id=eq.${channelId}`,
      },
      (payload) => {
        callback(payload.new as Channel);
      }
    )
    .subscribe();
}

export function subscribeToRemove(callback: (oldChannel: Channel) => void) {
  return supabase
    .channel("realtime channel remove")
    .on(
      "postgres_changes",
      {
        event: "DELETE",
        schema: "public",
        table: "channels",
      },
      (payload) => {
        callback(payload.old as Channel);
      }
    )
    .subscribe();
}

export function subscribeToRemoveByChannel(
  channelId: string,
  callback: (oldChannel: Channel) => void
) {
  return supabase
    .channel("realtime channel remove with id")
    .on(
      "postgres_changes",
      {
        event: "DELETE",
        schema: "public",
        table: "channels",
        filter: `id=eq.${channelId}`,
      },
      (payload) => {
        callback(payload.old as Channel);
      }
    )
    .subscribe();
}
