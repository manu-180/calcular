// Publica la alerta de la corrida (.datos-vivos/alerta.md) en la tabla `messages` del dashboard de
// libre_albedrio, que es donde Manuel y las sesiones de Claude miran los pendientes. El issue de
// GitHub lo maneja el workflow; esto es el segundo canal.
//
// Idempotente: mientras haya un aviso sin leer con el mismo asunto, no se apila otro (el workflow
// corre tres veces por día). Sin credenciales, sale 0 sin hacer nada: el canal es opcional.
//
// ENV: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const ASUNTO = "calcular.ar: hay datos oficiales que requieren una sesión";

async function main(): Promise<void> {
  const archivo = resolve(import.meta.dirname, "..", "..", ".datos-vivos", "alerta.md");
  const cuerpo = existsSync(archivo) ? readFileSync(archivo, "utf8").trim() : "";
  if (!cuerpo) {
    console.log("✓ Nada que avisar.");
    return;
  }
  const url = process.env.SUPABASE_URL?.replace(/\/$/, "");
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    console.log("::notice::Sin SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY: el aviso queda sólo en el issue.");
    return;
  }
  const headers = { apikey: key, Authorization: `Bearer ${key}`, "Content-Type": "application/json" };
  const ya = await fetch(
    `${url}/rest/v1/messages?sender=eq.claude&read_at=is.null&subject=eq.${encodeURIComponent(ASUNTO)}&select=id&limit=1`,
    { headers },
  );
  if (ya.ok && ((await ya.json()) as unknown[]).length > 0) {
    console.log("✓ Ya hay un aviso sin leer por lo mismo: no duplico.");
    return;
  }
  const r = await fetch(`${url}/rest/v1/messages`, {
    method: "POST",
    headers: { ...headers, Prefer: "return=minimal" },
    body: JSON.stringify({
      sender: "claude",
      subject: ASUNTO,
      body: `${cuerpo}\n\n— workflow datos-vivos (manu-180/calcular)`,
      requires_action: true,
    }),
  });
  if (!r.ok) throw new Error(`messages respondió HTTP ${r.status}: ${(await r.text()).slice(0, 200)}`);
  console.log(`📨 Aviso publicado en messages: "${ASUNTO}"`);
}

main().catch((e) => {
  console.error(`❌ avisar: ${e instanceof Error ? e.message : e}`);
  process.exit(1);
});
