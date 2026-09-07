import { NextRequest } from "next/server";

const SUPABASE_URL = process.env.SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY!;
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function htmlPage(ok: boolean): Response {
  const html = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${ok ? "Baja confirmada" : "Error"} — CalculAR</title>
<style>
  body{margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;
    background:#f4f4f5;font-family:system-ui,-apple-system,sans-serif;}
  .card{background:#fff;border-radius:12px;padding:40px 48px;max-width:440px;text-align:center;
    box-shadow:0 1px 3px rgba(0,0,0,.08);}
  .icon{font-size:40px;margin-bottom:16px;}
  h1{margin:0 0 12px;font-size:20px;color:#111827;}
  p{margin:0 0 24px;font-size:15px;color:#6b7280;line-height:1.5;}
  a{display:inline-block;background:#059669;color:#fff;text-decoration:none;padding:10px 24px;
    border-radius:8px;font-size:14px;font-weight:600;}
</style>
</head>
<body>
<div class="card">
  <div class="icon">${ok ? "✅" : "❌"}</div>
  <h1>${ok ? "Listo, te diste de baja" : "Link inválido"}</h1>
  <p>${ok
    ? "Ya no vas a recibir más emails de CalculAR. Si cambiás de opinión, podés suscribirte de nuevo en el sitio."
    : "El link de baja no es válido o ya fue usado. Si necesitás ayuda, contactanos."}</p>
  <a href="https://calcular.ar">Ir a CalculAR</a>
</div>
</body>
</html>`;
  return new Response(html, {
    status: ok ? 200 : 400,
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("t") ?? "";

  if (!UUID_RE.test(token)) return htmlPage(false);

  // UPDATE subscribers SET active=false WHERE unsubscribe_token=token
  // Usa anon key + política RLS "unsubscribe by token"
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/subscribers?unsubscribe_token=eq.${token}`,
    {
      method: "PATCH",
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({ active: false }),
    }
  );

  return htmlPage(res.ok);
}
