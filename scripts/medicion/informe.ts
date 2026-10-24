// Informe de fugas: lee ca_fugas (últimos 14 días y los 14 anteriores) y Search Console, corre
// src/lib/medicion/fugas.ts y deja docs/medicion/informes/<fecha>.md + docs/medicion/ultimo.json.
// Lo corre .github/workflows/mejora-continua.yml cada lunes; a mano:
//   envkit run -- npx tsx scripts/medicion/informe.ts
//   (Search Console: sumar `-p apex-manager --only GSC_SERVICE_ACCOUNT_JSON` en otro envkit run, o la env)
// Sin GSC_SERVICE_ACCOUNT_JSON el informe sale igual, sin el paso «buscador».

import { createSign } from "node:crypto";
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { EXPERIMENTOS } from "../../src/lib/experimentos";
import { analizar, ctrEsperado, MIN_POR_BRAZO, MIN_VISTAS, UMBRAL, wilson, type Analisis, type DatosFugas, type FilaBuscador, type Fuga } from "../../src/lib/medicion/fugas";

const raiz = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const DIA = 86_400_000;
const VENTANA = 14;

const url = process.env.SUPABASE_URL;
const clave = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !clave) {
  console.error("Faltan SUPABASE_URL y SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

// Medianoche de Buenos Aires: los días del informe son días de la gente, no de UTC.
function medianocheAR(d: Date): Date {
  const ar = new Date(d.getTime() - 3 * 3_600_000);
  return new Date(Date.UTC(ar.getUTCFullYear(), ar.getUTCMonth(), ar.getUTCDate(), 3));
}

async function fugas(desde: Date, hasta: Date): Promise<DatosFugas> {
  const r = await fetch(`${url}/rest/v1/rpc/ca_fugas`, {
    method: "POST",
    headers: { apikey: clave!, Authorization: `Bearer ${clave}`, "Content-Type": "application/json" },
    body: JSON.stringify({ p_desde: desde.toISOString(), p_hasta: hasta.toISOString(), p_min_vistas: 5 }),
  });
  if (!r.ok) throw new Error(`ca_fugas ${r.status}: ${(await r.text()).slice(0, 300)}`);
  return r.json();
}

async function tokenGoogle(): Promise<string | null> {
  const crudo = process.env.GSC_SERVICE_ACCOUNT_JSON;
  if (!crudo) return null;
  const sa = JSON.parse(crudo) as { client_email: string; private_key: string };
  const ahora = Math.floor(Date.now() / 1000);
  const b64 = (o: object) => Buffer.from(JSON.stringify(o)).toString("base64url");
  const sinFirma = `${b64({ alg: "RS256", typ: "JWT" })}.${b64({
    iss: sa.client_email,
    scope: "https://www.googleapis.com/auth/webmasters.readonly",
    aud: "https://oauth2.googleapis.com/token",
    iat: ahora,
    exp: ahora + 3600,
  })}`;
  const firma = createSign("RSA-SHA256").update(sinFirma).sign(sa.private_key, "base64url");
  const r = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion: `${sinFirma}.${firma}` }),
  });
  const j = (await r.json()) as { access_token?: string };
  return j.access_token ?? null;
}

// Search Console va 2-3 días atrasado: se pide la ventana corrida 3 días para no subcontar.
async function buscador(sitio: "ar" | "intl", propiedad: string, desde: Date, hasta: Date, token: string): Promise<FilaBuscador[]> {
  const f = (d: Date) => new Date(d.getTime() - 3 * DIA).toISOString().slice(0, 10);
  const r = await fetch(`https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(propiedad)}/searchAnalytics/query`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "content-type": "application/json" },
    body: JSON.stringify({ startDate: f(desde), endDate: f(hasta), dimensions: ["page", "query"], rowLimit: 25000 }),
  });
  if (!r.ok) {
    console.warn(`Search Console ${propiedad}: ${r.status} (sigo sin ese sitio)`);
    return [];
  }
  const j = (await r.json()) as { rows?: Array<{ keys: string[]; clicks: number; impressions: number; position: number }> };
  const porPagina = new Map<string, FilaBuscador>();
  for (const x of j.rows ?? []) {
    const p = new URL(x.keys[0]).pathname.replace(/\/+$/, "") || "/";
    const fila = porPagina.get(p) ?? { sitio, path: p, clics: 0, impresiones: 0, esperado: 0, posicion: 0, consultas: [] };
    fila.clics += x.clicks;
    fila.posicion = (fila.posicion * fila.impresiones + x.position * x.impressions) / (fila.impresiones + x.impressions);
    fila.impresiones += x.impressions;
    if (x.position <= 20) fila.esperado += x.impressions * ctrEsperado(x.position);
    fila.consultas.push({ q: x.keys[1], impresiones: x.impressions, clics: x.clicks, posicion: x.position });
    porPagina.set(p, fila);
  }
  return [...porPagina.values()].map((b) => ({
    ...b,
    esperado: Math.round(b.esperado),
    consultas: b.consultas.sort((a, c) => c.impresiones - a.impresiones).slice(0, 8),
  }));
}

const pct = (x: number) => `${(x * 100).toFixed(x < 0.1 ? 1 : 0)} %`;
const tasa = (x: number, n: number) => (n >= MIN_VISTAS ? pct(x / n) : n ? `${pct(x / n)}*` : "—");
const nombre = (sitio: string, mercado: string) => (sitio === "ar" ? "calcular.ar" : `calcularya · ${mercado}`);

function valor(f: Fuga): string {
  if (f.paso === "velocidad" || f.paso === "interaccion") return `${f.tasa} ms (límite ${f.referencia})`;
  if (f.paso === "estabilidad") return `${(f.tasa / 1000).toFixed(2)} (límite ${(f.referencia / 1000).toFixed(2)})`;
  return `${pct(f.tasa)} vs ${pct(f.referencia)}`;
}

function markdown(d: DatosFugas, a: Analisis, gsc: boolean, fecha: string): string {
  const l: string[] = [];
  l.push(`# Informe de fugas · ${fecha}`, "");
  l.push(`Ventana: ${d.desde.slice(0, 10)} → ${d.hasta.slice(0, 10)} (${VENTANA} días), comparada con los ${VENTANA} anteriores. Search Console: ${gsc ? "sí" : "no"}.`);
  l.push(`Una tasa con * tiene menos de ${MIN_VISTAS} casos: es orientativa, no entra en el ranking.`, "");

  l.push("## Por sitio y mercado", "", "| Sitio | Sesiones | Rebote | Usan | Llegan a resultado | Hacen algo | Ir a comprar | Móvil |", "|---|---:|---:|---:|---:|---:|---:|---:|");
  const chicos = d.mercados.filter((m) => m.sesiones < 5);
  for (const m of d.mercados.filter((m) => m.sesiones >= 5)) {
    l.push(`| ${nombre(m.sitio, m.mercado)} | ${m.sesiones} | ${tasa(m.rebotes, m.sesiones)} | ${tasa(m.usos, m.vistas)} | ${tasa(m.resultados, m.usos_medidos ?? 0)} | ${tasa(m.acciones, m.vistas)} | ${tasa(m.compras, m.vistas)} | ${tasa(m.movil, m.vistas)} |`);
  }
  if (chicos.length) l.push("", `Con menos de 5 sesiones: ${chicos.map((m) => `${m.mercado} (${m.sesiones})`).join(", ")}.`);

  const tabla = (titulo: string, bajada: string, lista: Fuga[]) => {
    l.push("", `## ${titulo}`, "", bajada, "");
    l.push("| # | Paso | Página | Base | Valor | Perdidas | Qué pasa | Pistas |", "|---:|---|---|---:|---|---:|---|---|");
    lista.slice(0, 15).forEach((f, i) => {
      l.push(`| ${i + 1} | ${f.paso} | ${nombre(f.sitio, f.mercado)} \`${f.path}\` | ${f.base} | ${valor(f)} | ${f.perdidas} | ${f.detalle} | ${f.pistas.join("; ") || "—"} |`);
    });
    if (!lista.length) l.push("| — | — | Sin fugas con evidencia suficiente en esta ventana | | | | | |");
  };
  tabla(
    "Fugas en el sitio",
    "Personas perdidas en la ventana contra la referencia del sitio (mediana de sus páginas). Sólo entra lo que tiene evidencia: la cota de Wilson al 95 % no llega a la referencia.",
    a.fugas.filter((f) => f.paso !== "buscador"),
  );
  tabla("Fugas en Google", "Clics que faltan contra el CTR típico de la posición de cada consulta. Base = impresiones.", a.fugas.filter((f) => f.paso === "buscador"));

  const intl = [...new Set(a.fugas.filter((f) => f.sitio === "intl").map((f) => f.mercado))];
  if (intl.length) {
    l.push("", "## Por país (calcularya)", "");
    for (const m of intl) {
      const top = a.fugas.filter((f) => f.sitio === "intl" && f.mercado === m).slice(0, 3);
      l.push(`- **${m}**: ${top.map((f) => `${f.paso} en \`${f.path}\` (${valor(f)}, ${f.perdidas} perdidas)`).join(" · ")}`);
    }
  }

  l.push("", "## Cambios contra el período anterior (p < 0,05)", "");
  if (!a.cambios.length) l.push("Ninguno significativo.");
  for (const c of a.cambios.slice(0, 15)) {
    l.push(`- ${nombre(c.sitio, c.mercado)} \`${c.path}\` · ${c.metrica}: ${pct(c.antes)} → ${pct(c.ahora)} (n=${c.n}, p=${c.p.toFixed(3)})`);
  }

  l.push("", "## Experimentos", "");
  if (!a.experimentos.length) l.push("No hay experimentos corriendo.");
  for (const e of a.experimentos) {
    const vs = e.variantes.map((v) => {
      const [lo, hi] = wilson(v.exitos, v.n);
      return `${v.v}: ${pct(v.tasa)} [${pct(lo)}–${pct(hi)}] n=${v.n}${v.pMejorQueA !== null ? `, P(mejor que a)=${pct(v.pMejorQueA)}` : ""}`;
    });
    l.push(`- **${e.exp}** (${e.metrica}) → **${e.estado}**${e.ganadora ? `, queda «${e.ganadora}»` : ""}${e.srm ? " ⚠️ reparto desparejo (SRM): la asignación está rota" : ""}. ${vs.join(" · ")}. Mínimo para decidir: ${MIN_POR_BRAZO} por variante.`);
  }

  const vel = d.paginas.filter((p) => p.con_vitals >= MIN_VISTAS).sort((x, y) => y.vistas - x.vistas).slice(0, 15);
  l.push("", "## Velocidad real (p75)", "", `Límites: LCP ${UMBRAL.lcp} ms · INP ${UMBRAL.inp} ms · CLS ${UMBRAL.cls / 1000}.`, "");
  if (!vel.length) l.push(`Todavía no hay ${MIN_VISTAS} cargas medidas en ninguna página.`);
  else {
    l.push("| Página | Cargas | LCP móvil | LCP escritorio | INP | CLS | TTFB |", "|---|---:|---:|---:|---:|---:|---:|");
    for (const p of vel) {
      const ms = (x: number | null, u: number) => (x == null ? "—" : x > u ? `**${x}**` : `${x}`);
      l.push(`| ${nombre(p.sitio, p.mercado)} \`${p.path}\` | ${p.con_vitals} | ${ms(p.lcp_p75_movil, UMBRAL.lcp)} | ${ms(p.lcp_p75_escritorio, UMBRAL.lcp)} | ${ms(p.inp_p75, UMBRAL.inp)} | ${p.cls_p75_milli == null ? "—" : ms(p.cls_p75_milli, UMBRAL.cls)} | ${p.ttfb_p75 ?? "—"} |`);
    }
  }

  if (d.errores.length) {
    l.push("", "## Errores de JavaScript", "");
    for (const e of d.errores.slice(0, 10)) l.push(`- ${nombre(e.sitio, e.mercado)} \`${e.path}\` (${e.n}): ${e.m}`);
  }

  const medidas = d.paginas.reduce((s, p) => s + (p.usos_medidos ?? 0), 0);
  const usos = d.paginas.reduce((s, p) => s + p.usos, 0);
  l.push("", "## Calidad del dato", "");
  l.push(`- Usos con el paso «resultado» medido: ${medidas} de ${usos} (${usos ? pct(medidas / usos) : "—"}). Lo que falta es anterior al 24/10/2026, cuando empezó esta medición.`);
  l.push(`- Cargas con Web Vitals: ${d.paginas.reduce((s, p) => s + p.con_vitals, 0)}.`);
  return `${l.join("\n")}\n`;
}

async function main() {
  const hasta = medianocheAR(new Date());
  const desde = new Date(hasta.getTime() - VENTANA * DIA);
  const antes = new Date(desde.getTime() - VENTANA * DIA);
  const [actual, anterior] = await Promise.all([fugas(desde, hasta), fugas(antes, desde)]);

  const token = await tokenGoogle().catch(() => null);
  const gsc = token
    ? (await Promise.all([buscador("ar", "sc-domain:calcular.ar", desde, hasta, token), buscador("intl", "sc-domain:calcularya.com", desde, hasta, token)])).flat()
    : [];
  const vigentes = Object.fromEntries(EXPERIMENTOS.map((e) => [e.id, { hasta: e.hasta, metrica: e.metrica }]));
  const fecha = new Date(hasta.getTime() - DIA).toISOString().slice(0, 10);
  const analisis = analizar(actual, anterior, gsc, fecha, vigentes);

  const dir = path.join(raiz, "docs", "medicion");
  mkdirSync(path.join(dir, "informes"), { recursive: true });
  writeFileSync(path.join(dir, "informes", `${fecha}.md`), markdown(actual, analisis, !!token, fecha));
  writeFileSync(path.join(dir, "ultimo.json"), `${JSON.stringify({ fecha, ventanaDias: VENTANA, analisis, actual, buscador: gsc.slice(0, 200) }, null, 1)}\n`);
  console.log(`docs/medicion/informes/${fecha}.md · ${analisis.fugas.length} fugas · ${analisis.cambios.length} cambios · ${analisis.experimentos.length} experimentos`);
}

main().catch((e) => {
  console.error("informe de fugas:", e instanceof Error ? e.message : e);
  process.exit(1);
});
