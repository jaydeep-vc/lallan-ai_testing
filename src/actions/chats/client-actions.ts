"use client";

import { Database } from "@/types/supabase";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

type Conversation = Database["public"]["Tables"]["conversations"]["Row"];

const supabase = createClientComponentClient<Database>();

export function subscribeToInsert(channelId: string, callback: (newChat: Conversation) => void) {
  return supabase
    .channel("realtime chats")
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "conversations",
        filter: `channel_id=eq.${channelId}`,
      },
      (payload) => {
        if ("id" in payload.new) {
          callback(payload.new as Conversation);
        }
      }
    )
    .subscribe();
}
