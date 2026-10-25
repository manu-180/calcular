// «¿Cuántas horas de trabajo cuesta?»: arma el índice como en producción (registro + calcular.ar +
// precios.json) e imprime qué país entra, con su salario por hora y sus horas por producto, y qué queda
// afuera y por qué. Un país o un producto excluido NO es falla (la otra PC agrega países todo el tiempo).
// El paso del tiempo NO es falla: si los precios vencen (el refresco mensual no corrió) las páginas se
// apagan solas y el sitemap deja de listarlas; eso es un aviso (⚠️), desde AVISO_DIAS antes de vencer.
// Falla si:
//   - algo publicado está vencido: un precio de más de VIGENCIA_PRECIO_DIAS días, un salario mínimo o una
//     jornada cuya vigencia terminó, o horas que no cierran con precio ÷ salario por hora;
//   - con los precios al día de su última lectura (sin contar el tiempo) quedarían menos de MINIMO_PAISES
//     países, o un producto en menos de MINIMO_PAISES_PRODUCTO: eso es un dato roto, no el reloj;
//   - el sitemap lista una página de horas que no se publica, u omite una que sí.
//   npx tsx scripts/check_horas.ts            (CALCULAR_HOY=2027-02-21 para ver un día futuro)
import "./sin-server-only";
import { diasEntre, MINIMO_PAISES, precioVigente, VIGENCIA_PRECIO_DIAS } from "../src/motor/horas/calculo";
import { PRODUCTOS } from "../src/motor/horas/productos";
import { MINIMO_PAISES_PRODUCTO, paginasHoras, publicacionDe } from "../src/motor/horas/publicacion";
import { urlHoras } from "../src/motor/horas/ui/seo";
import type { ArchivoPrecios } from "../src/motor/horas/tipos";
import { entradasDelMercado } from "../src/motor/mapa";
import type { FechaISO } from "../src/motor/tipos";
import { construirInformeHoras } from "../src/lib/horas/indice";
import precios from "../src/lib/horas/precios.json";
import { hoyEn, sumarDias } from "../src/motor/vigencia";
import { registro } from "../src/paises";

const AVISO_DIAS = 30;
const { indice, excluidos } = construirInformeHoras();
const sinReloj = construirInformeHoras(new Date(), { preciosAl: (precios as ArchivoPrecios).actualizadoEl as FechaISO }).indice;
const fallas: string[] = [];
const avisos: string[] = [];
const vencenPronto = new Set<string>();
// Un mínimo que cambia cada mes (AR: la Res. 4/2026 fija el SMVM mes a mes hasta abril de 2027) vence a
// fin de cada mes aunque el mes siguiente ya esté cargado. Solo se avisa si al día siguiente el país
// efectivamente sale del índice; los precios se miden al día de su lectura para no mezclar los dos relojes.
function sigueAlOtroDia(iso: string, vigenteHasta: string): boolean {
  const dia = sumarDias(vigenteHasta as FechaISO, 1);
  const previo = process.env.CALCULAR_HOY;
  process.env.CALCULAR_HOY = dia;
  try {
    const otro = construirInformeHoras(new Date(`${dia}T12:00:00Z`), { preciosAl: (precios as ArchivoPrecios).actualizadoEl as FechaISO });
    return otro.indice.filas.some((f) => f.iso === iso);
  } finally {
    if (previo === undefined) delete process.env.CALCULAR_HOY;
    else process.env.CALCULAR_HOY = previo;
  }
}
const fmt = (n: number) => (n >= 100 ? Math.round(n).toString() : n.toFixed(1)).padStart(7);

console.log(`— Horas de trabajo · ${indice.generadoEl} · precios del ${indice.preciosActualizadosEl} —\n`);
console.log(`INCLUIDOS (${indice.filas.length}) · salario mínimo por hora y horas por producto (${PRODUCTOS.map((p) => p.id).join(" / ")})`);
for (const f of indice.filas) {
  const m = f.minimo;
  const hoy = f.mercado === "ar" ? indice.generadoEl : hoyEn(registro.pais(f.mercado as never)!.mercado);
  const conv = m.conversion;
  const via = conv.tipo === "hora" ? "por hora" : conv.tipo === "divisor" ? `÷ ${conv.divisor}` : `${conv.tipo}${conv.horasSemana ? ` ${conv.horasSemana} h/sem` : ""}${conv.horasDia ? ` ${conv.horasDia} h/día` : ""}${conv.diasPagados ? ` ${conv.diasPagados} días pagados` : ""}${conv.pagas ? ` ${conv.pagas} pagas` : ""}`;
  const horas = PRODUCTOS.map((p) => (f.celdas[p.id] ? fmt(f.celdas[p.id].horas) : "      ·")).join(" ");
  console.log(`  ${f.iso} ${f.mercado.padEnd(3)} ${m.porHora.toFixed(2).padStart(10)} ${m.moneda}/h  ${horas}   ${via}${m.vigenteHasta ? `  vence ${m.vigenteHasta}` : ""}`);
  if (m.vigenteHasta && m.vigenteHasta < hoy) fallas.push(`${f.iso}: publica un salario o jornada que venció el ${m.vigenteHasta}`);
  else if (m.vigenteHasta && diasEntre(hoy, m.vigenteHasta) <= AVISO_DIAS && !sigueAlOtroDia(f.iso, m.vigenteHasta)) avisos.push(`${f.iso}: el salario o la jornada vence el ${m.vigenteHasta}; sin el tramo nuevo el país sale del índice`);
  for (const c of Object.values(f.celdas)) {
    const vence = sumarDias(c.precio.consultadoEl as FechaISO, VIGENCIA_PRECIO_DIAS);
    if (!precioVigente(c.precio.consultadoEl, hoy)) fallas.push(`${f.iso} ${c.producto}: precio del ${c.precio.consultadoEl}, más de ${VIGENCIA_PRECIO_DIAS} días`);
    else if (diasEntre(hoy, vence) <= AVISO_DIAS) vencenPronto.add(vence);
    if (Math.abs(c.horas - c.precioLocal / m.porHora) > 1e-9) fallas.push(`${f.iso} ${c.producto}: las horas no cierran`);
    if (!c.precio.url.startsWith("https://")) fallas.push(`${f.iso} ${c.producto}: precio sin URL de la tienda`);
  }
}

const paises = excluidos.filter((e) => !e.producto);
console.log(`\nEXCLUIDOS (${paises.length} países)`);
for (const e of paises) console.log(`  ${e.iso} ${e.mercado.padEnd(3)} ${e.motivo}`);

const celdas = excluidos.filter((e) => e.producto && indice.filas.some((f) => f.iso === e.iso));
console.log(`\nSIN PRECIO en países incluidos (${celdas.length})`);
for (const e of celdas) console.log(`  ${e.iso} ${e.producto!.padEnd(16)} ${e.motivo}`);

console.log("\nPOR PRODUCTO");
for (const p of PRODUCTOS) {
  const filas = indice.filas.filter((f) => f.celdas[p.id]).sort((a, b) => a.celdas[p.id].horas - b.celdas[p.id].horas);
  const extremos = filas.length ? `menos horas ${filas[0].iso} (${fmt(filas[0].celdas[p.id].horas).trim()}), más ${filas.at(-1)!.iso} (${fmt(filas.at(-1)!.celdas[p.id].horas).trim()})` : "";
  console.log(`  ${p.id.padEnd(16)} ${String(filas.length).padStart(2)} países  ${extremos}`);
  if (filas.length < MINIMO_PAISES_PRODUCTO) {
    const conPrecioAlDia = sinReloj.filas.filter((f) => f.celdas[p.id]).length;
    if (conPrecioAlDia < MINIMO_PAISES_PRODUCTO) fallas.push(`${p.id}: con los precios al día quedaría en ${conPrecioAlDia} país(es)`);
    else avisos.push(`${p.id}: sin página, ${filas.length} país(es) con precio vigente (${conPrecioAlDia} con los precios al día): falta el refresco de precios`);
  }
}

if (indice.filas.length < MINIMO_PAISES) {
  if (sinReloj.filas.length < MINIMO_PAISES) fallas.push(`con los precios al día quedarían ${sinReloj.filas.length} países (mínimo ${MINIMO_PAISES})`);
  else avisos.push(`el índice no se publica: ${indice.filas.length} países con precio vigente (${sinReloj.filas.length} con los precios al día): falta el refresco de precios`);
}
if (vencenPronto.size) avisos.push(`precios que vencen el ${[...vencenPronto].sort().join(", ")}: los renueva el refresco mensual (scripts/cron/mensual.ts)`);

// Publicación: la misma regla para la página, el sitemap, el hreflang y llms.txt.
const pub = publicacionDe(indice);
console.log(`\nPUBLICACIÓN: ${pub.inicial ? `índice con ${pub.inicial}; productos ${pub.productos.join(", ")}` : "nada (las páginas dan 404 y no están en el sitemap)"}`);
process.env.NEXT_PUBLIC_SITIO_INTL_URL ||= "https://calcularya.com";
process.env.VERCEL_ENV = "production";
const revisar = registro.mercados("produccion").filter((m, i) => m.codigo === "global" || i < 4);
for (const m of revisar) {
  const todas = new Set([undefined, ...PRODUCTOS.map((p) => p.id)].map((p) => urlHoras(m, p)));
  const esperadas = new Set(paginasHoras(pub).map((p) => urlHoras(m, p)));
  const listadas = new Set((entradasDelMercado(registro, m.codigo, { horas: pub }) ?? []).map((e) => e.url).filter((u) => todas.has(u)));
  for (const u of listadas) if (!esperadas.has(u)) fallas.push(`sitemap ${m.codigo}: lista ${u} y no se publica (o es el producto del índice)`);
  for (const u of esperadas) if (!listadas.has(u)) fallas.push(`sitemap ${m.codigo}: falta ${u}`);
  if ((entradasDelMercado(registro, m.codigo) ?? []).some((e) => todas.has(e.url))) fallas.push(`sitemap ${m.codigo}: sin la publicación de horas igual lista horas`);
}
console.log(`SITEMAP: ${paginasHoras(pub).length} página(s) de horas por edición (revisadas ${revisar.map((m) => m.codigo).join(", ")})`);

if (avisos.length) {
  console.log(`\nAVISOS (${avisos.length})`);
  for (const a of avisos) console.log(`  ⚠️ ${a}`);
}
if (fallas.length) {
  console.log(`\nFALLAS (${fallas.length})`);
  for (const f of fallas) console.log(`  ${f}`);
  process.exit(1);
}
console.log(`\nOK: ${indice.filas.length} países, nada vencido publicado${avisos.length ? `, ${avisos.length} aviso(s)` : ""}.`);
