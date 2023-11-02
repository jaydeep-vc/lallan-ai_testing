import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    const { searchParams } = new URL(req.url);
    const code = searchParams.get("code");
    const next = searchParams.get("next");

    console.log("code = ", code);
    console.log("next = ", next);

    if (code) {
      await supabase.auth.exchangeCodeForSession(code);
    }

    if (next) {
      return NextResponse.redirect(new URL(next, req.url));
    }

    return NextResponse.redirect(new URL("/chats", req.url));
  } catch (error: any) {
    console.error(error);
    return NextResponse.redirect(new URL("/login/?error=true", req.url));
  }
}
