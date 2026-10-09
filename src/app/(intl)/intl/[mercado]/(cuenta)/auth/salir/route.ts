import { type NextRequest } from "next/server";
import { POST as postAR } from "@/app/(ar)/auth/salir/route";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest, ctx: { params: Promise<{ mercado: string }> }) {
  if ((await ctx.params).mercado !== "global") return new Response("Not Found", { status: 404 });
  return postAR(req);
}
