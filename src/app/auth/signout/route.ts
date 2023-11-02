import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const supabase = createRouteHandlerClient({ cookies });

  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    await supabase.auth.signOut();
  }

  const baseURL = `${process.env.NEXT_PUBLIC_APP_URL}/auth/signout`;
  return NextResponse.redirect(new URL("/login", baseURL), {
    status: 302,
  });
}
