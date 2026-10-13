// Smoke en vivo contra calcular.ar después de cada deploy de producción: no alcanza con que las
// páginas respondan 200 — tienen que mostrar EL DATO VIGENTE. Un build viejo servido por caché, un
// alias que no se movió o una página que quedó anclada en otro mes pasan un chequeo de status y no
// pasan este.
//
// Lo corre .github/workflows/post-deploy.yml cuando Vercel avisa que terminó un deploy de producción.
// USO: npx -y tsx scripts/datos-vivos/smoke.ts [--base https://calcular.ar]

import { prestacionesVigentes, bonoVigente } from "../../src/data/prestaciones";
import { asignacionesVigentes } from "../../src/data/asignaciones";
import { MESES_UOCRA } from "../../src/data/convenios/uocra";
import { periodoDeMes, vigenteEn } from "../../src/lib/hoy";

const i = process.argv.indexOf("--base");
const BASE = (i > 0 ? process.argv[i + 1] : "https://calcular.ar").replace(/\/$/, "");

const miles = (n: number) => Math.round(n).toLocaleString("es-AR");

type Caso = { ruta: string; debeContener?: string[] };

const UOCRA = vigenteEn(MESES_UOCRA, periodoDeMes);

const CASOS: Caso[] = [
  { ruta: "/" },
  { ruta: "/sueldo-neto" },
  { ruta: "/monotributo" },
  { ruta: "/aguinaldo" },
  { ruta: "/planillas" },
  { ruta: "/sitemap.xml", debeContener: ["<loc>"] },
  { ruta: "/jubilacion", debeContener: [prestacionesVigentes().resolucion.replace("Resolución ANSES ", ""), bonoVigente().norma, miles(prestacionesVigentes().haberMinimo)] },
  { ruta: "/asignaciones-familiares", debeContener: [asignacionesVigentes().resolucion.replace("Resolución ANSES ", ""), miles(asignacionesVigentes().universales.hijo.general)] },
  { ruta: "/convenios/uocra", debeContener: [UOCRA.etiqueta.toLowerCase(), miles(UOCRA.jornales.oficial.a)] },
];

async function traer(url: string): Promise<{ status: number; html: string }> {
  for (let intento = 0; intento < 3; intento++) {
    try {
      const r = await fetch(url, { headers: { "cache-control": "no-cache" }, signal: AbortSignal.timeout(30_000) });
      return { status: r.status, html: (await r.text()).replace(/<!-- -->/g, "") };
    } catch {
      await new Promise((ok) => setTimeout(ok, 3_000));
    }
  }
  return { status: 0, html: "" };
}

async function main(): Promise<void> {
  const fallas: string[] = [];
  for (const c of CASOS) {
    const { status, html } = await traer(`${BASE}${c.ruta}`);
    const faltan = (c.debeContener ?? []).filter((t) => !html.includes(t));
    if (status !== 200) fallas.push(`${c.ruta}: HTTP ${status}`);
    else if (faltan.length) fallas.push(`${c.ruta}: no muestra ${faltan.map((f) => `«${f}»`).join(", ")}`);
    console.log(`${status === 200 && !faltan.length ? "✓" : "✗"} ${c.ruta} (${status})${faltan.length ? ` falta: ${faltan.join(" · ")}` : ""}`);
  }
  if (fallas.length) {
    console.error(`\n🔴 Smoke en vivo con ${fallas.length} falla(s):\n- ${fallas.join("\n- ")}`);
    process.exit(1);
  }
  console.log(`\n✓ ${BASE} sirve el dato vigente (${prestacionesVigentes().vigencia}).`);
}

main();
