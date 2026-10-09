import { type NextRequest } from "next/server";
import { GET as getAR } from "@/app/(ar)/auth/google/route";

export const dynamic = "force-dynamic";

// Mismo handler que calcular.ar: el sitio (redirect_uri, textos) sale del Host del pedido. La cuenta
// vive sólo en la raíz (global): /mx/auth/... no existe.
export async function GET(req: NextRequest, ctx: { params: Promise<{ mercado: string }> }) {
  if ((await ctx.params).mercado !== "global") return new Response("Not Found", { status: 404 });
  return getAR(req);
}
