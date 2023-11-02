import type { NextRequest, NextMiddleware, NextFetchEvent } from "next/server";
import { NextResponse } from "next/server";

import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

export default function authMiddleware(middleware: NextMiddleware) {
  return async (req: NextRequest, event: NextFetchEvent) => {
    const res = NextResponse.next();
    const supabase = createMiddlewareClient({ req, res });

    const {
      data: { session },
    } = await supabase.auth.getSession();

    // authorized routs are => /, /chats,
    if (!session && (req.nextUrl.pathname.startsWith("/chats") || req.nextUrl.pathname === "/")) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    if (req.nextUrl.pathname === "/") {
      return NextResponse.redirect(new URL("/chats", req.url));
    }

    return middleware(req, event);
  };
}
