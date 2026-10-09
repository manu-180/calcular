import { type NextRequest } from "next/server";
import { GET as getAR } from "@/app/(ar)/auth/google/vuelta/route";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest, ctx: { params: Promise<{ mercado: string }> }) {
  if ((await ctx.params).mercado !== "global") return new Response("Not Found", { status: 404 });
  return getAR(req);
}
