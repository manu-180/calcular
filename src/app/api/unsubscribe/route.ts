import { NextRequest } from "next/server";
import { servicio } from "@/lib/supabase/servicio";

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

type Pantalla = { titulo: string; h1: string; texto: string; cuerpo: string; status: number };

function pagina(p: Pantalla): Response {
  const html = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex,nofollow">
<title>${p.titulo} · CalculAR</title>
<style>
  body{margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;
    background:#f4f4f5;font-family:system-ui,-apple-system,sans-serif;caret-color:transparent;}
  .card{background:#fff;border-radius:12px;padding:40px 48px;max-width:440px;margin:16px;text-align:center;
    box-shadow:0 1px 3px rgba(0,0,0,.08);}
  h1{margin:0 0 12px;font-size:20px;color:#111827;}
  p{margin:0 0 24px;font-size:15px;color:#6b7280;line-height:1.5;}
  a,button{display:inline-block;background:#059669;color:#fff;text-decoration:none;padding:10px 24px;
    border:0;border-radius:8px;font:600 14px system-ui,-apple-system,sans-serif;cursor:pointer;}
  .secundario{display:block;margin-top:16px;background:none;color:#6b7280;padding:0;font-weight:500;}
</style>
</head>
<body>
<div class="card">
  <h1>${p.h1}</h1>
  <p>${p.texto}</p>
  ${p.cuerpo}
</div>
</body>
</html>`;
  return new Response(html, {
    status: p.status,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "private, no-store",
      "X-Robots-Tag": "noindex, nofollow",
      "Referrer-Policy": "no-referrer",
    },
  });
}

const VOLVER = `<a href="https://calcular.ar">Ir a CalculAR</a>`;

const linkInvalido = () =>
  pagina({
    titulo: "Link inválido",
    h1: "Este link no funciona",
    texto: "El link de baja no es válido. Si necesitás ayuda, escribinos y lo resolvemos.",
    cuerpo: VOLVER,
    status: 400,
  });

// El GET sólo pregunta: los escáneres de correo abren todos los links de un mail y antes daban de
// baja a la gente sin que tocara nada. La baja la hace el POST (el botón o el one-click del cliente
// de correo, RFC 8058, que manda List-Unsubscribe=One-Click a esta misma URL).
export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("t") ?? "";
  if (!UUID_RE.test(token)) return linkInvalido();
  return pagina({
    titulo: "Darte de baja",
    h1: "¿Querés dejar de recibir nuestros emails?",
    texto: "Si confirmás, no te escribimos más. Podés volver a suscribirte cuando quieras desde el sitio.",
    cuerpo: `<form method="post" action="/api/unsubscribe?t=${token}"><button type="submit">Sí, darme de baja</button></form>
  <a class="secundario" href="https://calcular.ar">No, volver a CalculAR</a>`,
    status: 200,
  });
}

export async function POST(req: NextRequest) {
  let token = req.nextUrl.searchParams.get("t") ?? "";
  if (!token) {
    const form = await req.formData().catch(() => null);
    const t = form?.get("t");
    token = typeof t === "string" ? t : "";
  }
  if (!UUID_RE.test(token)) return linkInvalido();

  // Con service role: la policy pública de UPDATE que usaba antes dejaba a cualquiera con la anon
  // key modificar CUALQUIER fila de subscribers (qual true); se borró en la migración 120400.
  const { data, error } = await servicio()
    .from("subscribers")
    .update({ active: false })
    .eq("unsubscribe_token", token)
    .select("id");
  if (error) console.error("[unsubscribe]", error.code, error.message);
  if (error || !data?.length) return linkInvalido();
  return pagina({
    titulo: "Baja confirmada",
    h1: "Listo, te diste de baja",
    texto: "Ya no vas a recibir más emails de CalculAR. Si cambiás de opinión, podés suscribirte de nuevo en el sitio.",
    cuerpo: VOLVER,
    status: 200,
  });
}
