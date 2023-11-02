"use client";

import { Database } from "@/types/supabase";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import type { RealtimeChannel } from "@supabase/supabase-js";

export function unSubscribeChannels(...channels: RealtimeChannel[]) {
  const supabse = createClientComponentClient<Database>();
  for (let i = 0; i < channels.length; i++) {
    supabse.removeChannel(channels[i]);
  }
}
