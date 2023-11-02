import type { NextMiddleware } from "next/server";
import { NextResponse } from "next/server";

type MiddleWareFactory = (middleware: NextMiddleware) => NextMiddleware;

export default function chains(functions: MiddleWareFactory[], index: number = 0): NextMiddleware {
  const current = functions[index];

  if (current) {
    const next = chains(functions, index + 1);
    return current(next);
  }

  return () => NextResponse.next();
}
