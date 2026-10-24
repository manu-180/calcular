// Refresca src/lib/horas/precios.json leyendo la tienda oficial de cada producto en cada país.
//   npx tsx scripts/horas/actualizar_precios.ts            (todos los países del registro + Argentina)
//   npx tsx scripts/horas/actualizar_precios.ts MX BR      (solo esos)
//
// Reglas (docs/decisiones/horas.md):
// - Una lectura por producto y país por corrida, con PAUSA_MS entre pedidos, y solo si el robots.txt del
//   sitio lo permite a nuestro agente. Una tienda que bloquea (403, 429, captcha) no se saltea: queda sin dato.
// - Solo la tienda oficial del fabricante. País sin tienda (404 o redirección a otro país) = sin dato.
// - Un pedido que falla por red conserva el precio anterior con su fecha vieja: el vencimiento de 120 días
//   (src/motor/horas/calculo.ts) lo saca solo si la tienda no vuelve.
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import "../sin-server-only";
import { leerApple, leerSpotify, robotsPermite, type Lectura } from "../../src/motor/horas/leer";
import { PRODUCTOS, segmentoTienda, urlProducto, type ProductoHoras } from "../../src/motor/horas/productos";
import type { ArchivoPrecios, PrecioGuardado } from "../../src/motor/horas/tipos";
import { registro } from "../../src/paises";

const AGENTE = "CalcularYaBot/1.0 (+https://calcularya.com; datos públicos de precios)";
const PAUSA_MS = 3000;
const ESPERA_MS = 30000;
const ARCHIVO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../src/lib/horas/precios.json");

const hoy = new Date().toISOString().slice(0, 10);
const dormir = (ms: number) => new Promise((r) => setTimeout(r, ms));

const robots = new Map<string, string | null>();
let ultimoPedido = 0;

async function pedir(url: string): Promise<{ estado: number; final: string; html: string } | { error: string }> {
  const espera = ultimoPedido + PAUSA_MS - Date.now();
  if (espera > 0) await dormir(espera);
  ultimoPedido = Date.now();
  try {
    const r = await fetch(url, { headers: { "user-agent": AGENTE, "accept-language": "en" }, redirect: "follow", signal: AbortSignal.timeout(ESPERA_MS) });
    return { estado: r.status, final: r.url, html: r.ok ? await r.text() : "" };
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

async function permitido(url: string): Promise<boolean> {
  const u = new URL(url);
  if (!robots.has(u.origin)) {
    const r = await pedir(`${u.origin}/robots.txt`);
    robots.set(u.origin, "html" in r && r.estado === 200 ? r.html : "estado" in r && r.estado === 404 ? "" : null);
  }
  const texto = robots.get(u.origin);
  // Sin robots.txt legible (error, 5xx) no se lee nada de ese sitio en esta corrida.
  if (texto === null || texto === undefined) return false;
  return robotsPermite(texto, "CalcularYaBot", u.pathname);
}

type Resultado = { tipo: "precio"; lectura: Extract<Lectura, { ok: true }>; url: string } | { tipo: "sin-dato"; motivo: string } | { tipo: "transitorio"; motivo: string };

async function leer(p: ProductoHoras, iso: string, moneda: string): Promise<Resultado> {
  const url = urlProducto(p, iso);
  if (!(await permitido(url))) return { tipo: "sin-dato", motivo: "el robots.txt de la tienda no permite leer la página" };
  const r = await pedir(url);
  if ("error" in r) return { tipo: "transitorio", motivo: `red: ${r.error}` };
  if (r.estado === 404 || r.estado === 410) return { tipo: "sin-dato", motivo: "el país no tiene tienda oficial online" };
  if (r.estado === 403 || r.estado === 429) return { tipo: "sin-dato", motivo: `la tienda bloqueó la lectura (${r.estado})` };
  if (r.estado !== 200) return { tipo: "transitorio", motivo: `la tienda respondió ${r.estado}` };
  // Una tienda que redirige a otro país no es la del país.
  const seg = segmentoTienda(p.tienda, iso);
  const ruta = new URL(r.final).pathname;
  const propia = p.tienda === "apple" ? (seg ? ruta.startsWith(`/${seg}/`) : !/^\/[a-z]{2}(-[a-z]{2})?\/shop\//.test(ruta)) : new RegExp(`^/${seg}(-[a-z]{2})?/`).test(ruta);
  if (!propia) return { tipo: "sin-dato", motivo: `la tienda redirige a ${ruta}: no vende en el país` };
  const lectura = p.tienda === "apple" ? leerApple(r.html, p.nombreLd ?? p.nombre, moneda) : leerSpotify(r.html, moneda);
  return lectura.ok ? { tipo: "precio", lectura, url: r.final } : { tipo: "sin-dato", motivo: lectura.motivo };
}

function paises(): { iso: string; moneda: string }[] {
  const lista = new Map<string, string>([["AR", "ARS"]]);
  for (const m of registro.mercados("produccion")) {
    if (m.codigo === "global" || m.codigo.includes("-")) continue;
    if (!lista.has(m.pais)) lista.set(m.pais, m.monedas[0]);
  }
  return [...lista].map(([iso, moneda]) => ({ iso, moneda })).sort((a, b) => a.iso.localeCompare(b.iso));
}

async function main() {
  const pedidos = new Set(process.argv.slice(2).map((s) => s.toUpperCase()));
  const anterior: ArchivoPrecios = existsSync(ARCHIVO) ? JSON.parse(readFileSync(ARCHIVO, "utf8")) : { version: 1, actualizadoEl: hoy, precios: {}, sinDato: {} };
  const precios: Record<string, Record<string, PrecioGuardado>> = structuredClone(anterior.precios);
  const sinDato: Record<string, Record<string, string>> = structuredClone(anterior.sinDato);
  const lista = paises().filter((p) => !pedidos.size || pedidos.has(p.iso));
  for (const { iso, moneda } of lista) {
    let sinTiendaApple = false;
    for (const p of PRODUCTOS) {
      const r: Resultado = p.tienda === "apple" && sinTiendaApple ? { tipo: "sin-dato", motivo: "el país no tiene tienda oficial online" } : await leer(p, iso, moneda);
      if (p.tienda === "apple" && r.tipo === "sin-dato" && /no tiene tienda|redirige/.test(r.motivo)) sinTiendaApple = true;
      if (r.tipo === "precio") {
        (precios[iso] ??= {})[p.id] = { monto: r.lectura.precio.monto, moneda: r.lectura.precio.moneda, url: r.url, consultadoEl: hoy };
        if (sinDato[iso]) delete sinDato[iso][p.id];
        console.log(`  ${iso} ${p.id.padEnd(16)} ${r.lectura.precio.moneda} ${r.lectura.precio.monto}${r.lectura.detalle ? `  (${r.lectura.detalle})` : ""}`);
      } else if (r.tipo === "sin-dato") {
        if (precios[iso]) delete precios[iso][p.id];
        (sinDato[iso] ??= {})[p.id] = r.motivo;
        console.log(`  ${iso} ${p.id.padEnd(16)} sin dato: ${r.motivo}`);
      } else {
        const viejo = precios[iso]?.[p.id];
        console.log(`  ${iso} ${p.id.padEnd(16)} ${r.motivo}${viejo ? `; queda el precio del ${viejo.consultadoEl}` : ""}`);
      }
    }
  }
  const limpiar = <T>(o: Record<string, Record<string, T>>) => Object.fromEntries(Object.entries(o).filter(([, v]) => Object.keys(v).length).sort(([a], [b]) => a.localeCompare(b)));
  const salida: ArchivoPrecios = { version: 1, actualizadoEl: hoy, precios: limpiar(precios), sinDato: limpiar(sinDato) };
  writeFileSync(ARCHIVO, `${JSON.stringify(salida, null, 2)}\n`);
  console.log(`\n${Object.values(salida.precios).reduce((s, x) => s + Object.keys(x).length, 0)} precios en ${Object.keys(salida.precios).length} países → ${path.relative(process.cwd(), ARCHIVO)}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
