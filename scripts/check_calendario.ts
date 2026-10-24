// Calendario laboral y fiscal (src/motor/calendario): por cada edición del registro arma el calendario
// con la fecha del mercado y falla si:
// - un evento no tiene fuente https, fecha válida, calculadora publicada o cae fuera de la ventana,
// - dos eventos de una edición comparten id (el UID del .ics),
// - el .ics de la edición o el de un evento no parsea (RFC 5545: CRLF, 75 octetos, UID, DTSTAMP...),
// - una calculadora de algún país usa un slug del calendario (la carpeta estática le ganaría),
// - una fecha declarada en `calendario` de un dato es inválida.
// Lista además, sin fallar, las ediciones sin calendario con su motivo y lo que falta cargar en el
// registro (la fecha de pago de un bono).
// Uso: npx tsx scripts/check_calendario.ts [--detalle]
import { DIAS_ADELANTE, DIAS_ATRAS, calendarioDe, esPublicable, validarFechaCalendario } from "../src/motor/calendario/eventos";
import { armarIcs, escaparTexto, leerIcs, plegar } from "../src/motor/calendario/ics";
import { SLUG_CALENDARIO } from "../src/motor/calendario/rutas";
import { icsDe, vistaCalendario } from "../src/motor/calendario/ui/presentar";
import { contextoSitio } from "../src/motor/ui/contexto";
import { registro } from "../src/paises";
import { esFechaISO, hoyEn, sumarDias } from "../src/motor/vigencia";

process.env.NEXT_PUBLIC_SITIO_INTL_URL ||= "https://calcularya.com";
const detalle = process.argv.includes("--detalle");
const fallas: string[] = [];

// Pruebas del serializador: escape, plegado sin partir UTF-8 y lector estricto.
if (escaparTexto("a,b;c\\d\ne") !== "a\\,b\\;c\\\\d\\ne") fallas.push("ics: escaparTexto no escapa , ; \\ y salto de línea");
const larga = plegar(`SUMMARY:${"ñ".repeat(80)}`);
if (larga.split("\r\n").some((l) => new TextEncoder().encode(l).length > 75)) fallas.push("ics: plegar deja líneas de más de 75 octetos");
if (larga.replace(/\r\n /g, "") !== `SUMMARY:${"ñ".repeat(80)}`) fallas.push("ics: plegar pierde o parte caracteres");
const roto = leerIcs("BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nSUMMARY:x\nEND:VEVENT\nEND:VCALENDAR\n");
if (!roto.errores.length) fallas.push("ics: el lector no ve un archivo sin CRLF ni UID");
const prueba = leerIcs(armarIcs({ nombre: "Prueba, uno", descripcion: "x", idioma: "es", eventos: [{ uid: "a@b", fecha: "2027-01-01", resumen: "Sube; baja, igual", descripcion: "línea 1\nlínea 2", sello: "2026-10-01" }] }));
if (prueba.errores.length || prueba.eventos[0]?.DTEND !== "20270102") fallas.push(`ics: el archivo de prueba no pasa: ${prueba.errores.join("; ")}`);
if (validarFechaCalendario({ id: "zz.x" }, { id: "x", tipo: "pago", mes: 2, dia: 30, titulo: "t" }).length === 0) fallas.push("calendario: acepta el 30 de febrero");

const slugs = new Set(Object.values(SLUG_CALENDARIO));
for (const p of registro.paises) {
  for (const c of p.calculadoras) if (slugs.has(c.definicion.slug)) fallas.push(`${p.mercado.codigo}/${c.definicion.slug}: el slug es del calendario`);
  for (const d of p.datos) for (const f of d.calendario ?? []) for (const e of validarFechaCalendario(d, f)) fallas.push(`${p.mercado.codigo}: ${e}`);
}

const incluidos: string[] = [];
const sinCalendario: string[] = [];
const faltan: string[] = [];
let eventos = 0;
for (const modo of ["produccion", "interno"] as const) {
  process.env.VERCEL_ENV = modo === "produccion" ? "production" : "preview";
  for (const m of registro.mercados(modo)) {
    if (m.codigo === "global") continue;
    const fecha = hoyEn(m);
    const c = calendarioDe(registro, m.codigo, fecha, modo);
    const donde = `[${modo}] ${m.codigo}`;
    if (!c.ok) {
      if (modo === "produccion") sinCalendario.push(`${m.codigo}: ${c.motivo}`);
      continue;
    }
    const publicadas = new Set(registro.calculadorasPublicables(m.codigo, fecha, modo).map((x) => x.definicion.slug));
    const ids = new Set<string>();
    for (const e of c.eventos) {
      if (ids.has(e.id)) fallas.push(`${donde}: id repetido ${e.id}`);
      ids.add(e.id);
      if (!esFechaISO(e.fecha)) fallas.push(`${donde} ${e.id}: fecha inválida`);
      if (e.fecha < sumarDias(fecha, -DIAS_ATRAS) || e.fecha > sumarDias(fecha, DIAS_ADELANTE)) fallas.push(`${donde} ${e.id}: fuera de la ventana`);
      if (!/^https:\/\/[^\s]+$/.test(e.fuente.url)) fallas.push(`${donde} ${e.id}: fuente sin https (${e.fuente.url})`);
      if (!esFechaISO(e.fuente.verificadoEl) || e.fuente.verificadoEl > fecha) fallas.push(`${donde} ${e.id}: fecha de verificación inválida o futura`);
      if (!e.fuente.organismo.trim()) fallas.push(`${donde} ${e.id}: fuente sin organismo`);
      if (!e.titulo.trim()) fallas.push(`${donde} ${e.id}: sin título`);
      if (!e.calculadoras.length || e.calculadoras.some((s) => !publicadas.has(s))) fallas.push(`${donde} ${e.id}: calculadora no publicada (${e.calculadoras.join(", ")})`);
    }
    const conFuturo: boolean = esPublicable(c);
    if (!conFuturo) {
      if (modo === "produccion") sinCalendario.push(`${m.codigo}: sin fechas por delante (${c.eventos.length} en los últimos ${DIAS_ATRAS} días, ${c.excluidos.length} excluidas)`);
      continue;
    }
    const ctx = contextoSitio(registro, m.codigo);
    const v = ctx ? vistaCalendario(ctx, c) : null;
    if (!v) {
      fallas.push(`${donde}: publicable pero sin vista`);
      continue;
    }
    const completo = leerIcs(armarIcs(icsDe(v)));
    if (completo.errores.length) fallas.push(`${donde}: el .ics no parsea: ${completo.errores.slice(0, 3).join("; ")}`);
    if (completo.eventos.length !== c.eventos.length) fallas.push(`${donde}: el .ics tiene ${completo.eventos.length} eventos y el calendario ${c.eventos.length}`);
    for (const e of [...v.proximos, ...v.pasados]) {
      const uno = leerIcs(armarIcs(icsDe(v, [e], false)));
      if (uno.errores.length || uno.eventos.length !== 1) fallas.push(`${donde} ${e.id}: el .ics del evento no parsea: ${uno.errores.join("; ")}`);
    }
    if (modo !== "produccion") continue;
    eventos += c.eventos.length;
    const porTipo = new Map<string, number>();
    for (const e of c.eventos) porTipo.set(e.tipo, (porTipo.get(e.tipo) ?? 0) + 1);
    incluidos.push(`${m.codigo}: ${c.eventos.length} fechas (${v.proximos.length} por delante) · ${[...porTipo].map(([t, n]) => `${t} ${n}`).join(", ")}`);
    if (detalle) for (const e of c.eventos) incluidos.push(`    ${e.fecha} ${e.tipo.padEnd(14)} ${e.titulo}`);
    for (const x of c.excluidos) sinCalendario.push(`${m.codigo} · excluida ${x.id}: ${x.motivo}`);
    for (const f of c.faltan) faltan.push(`${m.codigo}: ${f}`);
  }
}

// Lo que falta en el registro también cuenta en las ediciones sin calendario publicable.
for (const m of registro.mercados("produccion")) {
  if (m.codigo === "global" || incluidos.some((l) => l.startsWith(`${m.codigo}:`))) continue;
  const c = calendarioDe(registro, m.codigo, hoyEn(m));
  if (c.ok) for (const f of c.faltan) faltan.push(`${m.codigo}: ${f}`);
}

console.log(`Con calendario (${incluidos.filter((l) => !l.startsWith(" ")).length}):`);
for (const l of incluidos) console.log(`  ${l}`);
console.log(`\nSin calendario o con fechas excluidas (${sinCalendario.length}):`);
for (const l of sinCalendario) console.log(`  ${l}`);
console.log(`\nFalta en el registro (${faltan.length}): declarar \`calendario\` en el dato (docs/paises/RECETA.md, «Fechas de calendario»)`);
for (const l of faltan) console.log(`  ${l}`);
for (const f of fallas) console.error(`❌ ${f}`);
console.log(fallas.length ? `\n${fallas.length} FALLAS` : `\nTODO OK: ${eventos} fechas en ${incluidos.filter((l) => !l.startsWith(" ")).length} ediciones, .ics válidos`);
process.exit(fallas.length ? 1 : 0);
