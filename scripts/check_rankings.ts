// Rankings de países (src/motor/rankings): arma la grilla como en producción y revisa que cada
// ranking esté bien ordenado, que los empates compartan puesto (1, 2, 2, 4), que cada país de la grilla
// aparezca una sola vez en cada ranking, que la frase de posición diga el puesto y el total que muestra
// la tabla en cada edición e idioma, que el historial mensual sea válido y que las carpetas de las
// rutas coincidan con los slugs. También prueba la grilla vacía: nada tira y no hay páginas.
//   npx tsx scripts/check_rankings.ts
import "./sin-server-only";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { construirInformeMundo } from "../src/lib/mundo/grilla";
import { DICCIONARIOS_RANKINGS, textosRankings } from "../src/motor/i18n/rankings";
import type { GrillaMundo } from "../src/motor/mundo/tipos";
import { csvDe, datosAbiertos } from "../src/motor/rankings/abiertos";
import { clasificar, paisDeEdicion, RANKINGS, rankingDe, todosLosRankings } from "../src/motor/rankings/calculo";
import { fotoAnterior, fotoDe, RE_MES, type FotoMensual } from "../src/motor/rankings/historial";
import { FOTOS } from "../src/motor/rankings/historial/indice";
import { ARCHIVOS_DATOS, IDS_RANKING, SEGMENTO_DATOS, SLUG_RANKINGS, SLUGS_RANKING } from "../src/motor/rankings/rutas";
import { diaActualizacion, vistaRanking, vistasDeRankings } from "../src/motor/rankings/vista";
import { IDIOMAS } from "../src/motor/tipos";
import { registro } from "../src/paises";

const fallas: string[] = [];
const RAIZ = process.cwd();
const APP = path.join(RAIZ, "src", "app", "(intl)", "intl", "[mercado]");
const HISTORIAL = path.join(RAIZ, "src", "motor", "rankings", "historial");

const { grilla } = construirInformeMundo();
const incluidos = grilla.paises.filter((p) => p.puntos.length > 1 && p.ppa > 0);
if (!incluidos.length) fallas.push("la grilla salió vacía: no hay nada que rankear");

// ---------- Orden, empates y presencia ----------
let filas = 0;
for (const id of IDS_RANKING) {
  const def = RANKINGS[id];
  if (!def.variantes.includes(def.porDefecto)) fallas.push(`${id}: la variante por defecto no está entre las variantes`);
  for (const v of def.variantes) {
    const r = rankingDe(grilla, id, v);
    const donde = `${id}/${v}`;
    filas += r.filas.length;
    const isos = r.filas.map((f) => f.iso);
    if (new Set(isos).size !== isos.length) fallas.push(`${donde}: un país aparece dos veces`);
    for (const p of incluidos) if (!isos.includes(p.iso)) fallas.push(`${donde}: falta ${p.iso}, que está en la grilla`);
    if (r.filas.length !== incluidos.length) fallas.push(`${donde}: ${r.filas.length} filas para ${incluidos.length} países`);
    r.filas.forEach((f, i) => {
      if (!Number.isFinite(f.valor) || !Number.isFinite(f.clave)) fallas.push(`${donde} ${f.iso}: valor no finito`);
      if (!(f.barra >= 0 && f.barra <= 1)) fallas.push(`${donde} ${f.iso}: barra fuera de 0-1 (${f.barra})`);
      if (!(f.carga >= 0 && f.carga <= 1)) fallas.push(`${donde} ${f.iso}: carga fuera de 0-1 (${f.carga})`);
      if (i > 0) {
        const a = r.filas[i - 1];
        const enOrden = def.orden === "asc" ? a.clave <= f.clave : a.clave >= f.clave;
        if (!enOrden) fallas.push(`${donde}: ${a.iso} (${a.clave}) antes que ${f.iso} (${f.clave}) rompe el orden ${def.orden}`);
        if (a.clave === f.clave && a.puesto !== f.puesto) fallas.push(`${donde}: ${a.iso} y ${f.iso} empatan en ${f.clave} con puestos distintos`);
        if (a.clave !== f.clave && f.puesto !== i + 1) fallas.push(`${donde}: ${f.iso} tendría que estar en el puesto ${i + 1} y está en ${f.puesto}`);
      } else if (f.puesto !== 1) fallas.push(`${donde}: el primero no tiene el puesto 1`);
      const mejores = r.filas.filter((x) => (def.orden === "asc" ? x.clave < f.clave : x.clave > f.clave)).length;
      if (f.puesto !== mejores + 1) fallas.push(`${donde} ${f.iso}: puesto ${f.puesto} con ${mejores} países mejores`);
      const iguales = r.filas.filter((x) => x.clave === f.clave).length;
      if (f.empatados !== iguales) fallas.push(`${donde} ${f.iso}: empatados ${f.empatados}, pero ${iguales} países tienen ${f.clave}`);
    });
  }
}

// El caso de libro: 1, 2, 2, 4.
const prueba = clasificar([{ iso: "AA", clave: 9 }, { iso: "BB", clave: 7 }, { iso: "CC", clave: 7 }, { iso: "DD", clave: 3 }], "desc").map((x) => x.puesto).join(",");
if (prueba !== "1,2,2,4") fallas.push(`clasificar da ${prueba} en vez de 1,2,2,4`);

// ---------- Frase de posición por edición ----------
// bn escribe las cifras con dígitos bengalíes (ADR 0002, D14): se leen como ASCII antes de buscarlas.
const numeros = (s: string) => (s.replace(/[০-৯]/g, (d) => String(d.charCodeAt(0) - 0x09e6)).match(/\d+/g) ?? []).map(Number);
let ediciones = 0;
for (const modo of ["produccion", "interno"] as const) {
  for (const m of registro.mercados(modo)) {
    ediciones++;
    const propio = paisDeEdicion(grilla, m);
    for (const vista of vistasDeRankings({ grilla, mercado: m, origenAR: "https://calcular.ar", fotos: FOTOS })) {
      for (const v of vista.variantes) {
        const donde = `[${modo}] ${m.codigo} ${vista.id}/${v.id}`;
        const d = v.destacado;
        const fila = v.filas.find((f) => f.iso === d.iso);
        if (!fila) fallas.push(`${donde}: el destacado ${d.iso} no está en la tabla`);
        else if (fila.puesto !== d.puesto) fallas.push(`${donde}: el panel dice ${d.puesto} y la tabla ${fila.puesto}`);
        if (d.total !== v.filas.length) fallas.push(`${donde}: total ${d.total} con ${v.filas.length} filas`);
        const n = numeros(v.frase);
        if (!n.includes(d.puesto) || !n.includes(d.total)) fallas.push(`${donde}: la frase «${v.frase}» no dice el puesto ${d.puesto} de ${d.total}`);
        if (!v.frase.includes(d.nombre)) fallas.push(`${donde}: la frase no nombra a ${d.nombre}`);
        if (!v.cita.includes(v.frase) || !v.cita.includes(vista.url)) fallas.push(`${donde}: la cita no lleva la frase y el link`);
        const sola = textosRankings(m.idioma, m.trato, m.locale).posicion(d.nombre, d.puesto, d.total);
        if (fila && fila.empate !== (v.frase !== sola)) fallas.push(`${donde}: ${fila.empate ? "empata y la frase no lo dice" : "la frase habla de un empate que no hay"} («${v.frase}»)`);
        if (propio) {
          if (!v.esPropia || d.iso !== propio.iso) fallas.push(`${donde}: la edición está en la grilla (${propio.iso}) y el panel muestra ${d.iso}`);
          if (v.filas.filter((f) => f.propia).length !== 1) fallas.push(`${donde}: tiene que haber una sola fila propia`);
        } else {
          if (v.esPropia) fallas.push(`${donde}: sin país en la grilla y el panel se marca como propio`);
          if (d.puesto !== 1) fallas.push(`${donde}: sin país propio el panel muestra el primero, y muestra el ${d.puesto}`);
          if (m.codigo !== "global" && !vista.fuera) fallas.push(`${donde}: falta el aviso de que el país todavía no está`);
        }
      }
    }
  }
}

// Las frases de cada idioma dicen los dos números, con y sin empate.
for (const idioma of IDIOMAS) {
  for (const locale of idioma === "zh" ? ["zh-TW", "zh-CN"] : [undefined]) {
    const t = textosRankings(idioma, "tu", locale);
    const f = t.posicion("Zetaland", 27, 41);
    if (!numeros(f).includes(27) || !numeros(f).includes(41) || !f.includes("Zetaland")) fallas.push(`${locale ?? idioma}: posicion() da «${f}»`);
    if (!numeros(t.de(41)).includes(41)) fallas.push(`${locale ?? idioma}: de() no dice el total`);
    if (!numeros(t.empate(2)).includes(2)) fallas.push(`${locale ?? idioma}: empate() no dice cuántos`);
  }
  if (!DICCIONARIOS_RANKINGS[idioma]) fallas.push(`${idioma}: falta el diccionario de rankings`);
}

// ---------- Rutas ----------
const indices = Object.values(SLUG_RANKINGS);
if (new Set(indices).size !== indices.length) fallas.push("SLUG_RANKINGS repite un slug entre idiomas (comparten carpeta)");
for (const idioma of IDIOMAS) {
  const carpeta = path.join(APP, SLUG_RANKINGS[idioma]);
  for (const archivo of ["page.tsx", path.join("[ranking]", "page.tsx"), path.join("og", "route.tsx")]) {
    const ruta = path.join(carpeta, archivo);
    if (!existsSync(ruta)) fallas.push(`${idioma}: falta ${path.relative(RAIZ, ruta)}`);
    else if (!readFileSync(ruta, "utf8").includes(`("${idioma}")`)) fallas.push(`${path.relative(RAIZ, ruta)}: no es la carpeta de ${idioma}`);
  }
  const slugs = Object.values(SLUGS_RANKING[idioma]);
  if (new Set(slugs).size !== slugs.length) fallas.push(`${idioma}: dos rankings con el mismo slug`);
  if (slugs.includes("og")) fallas.push(`${idioma}: un ranking no puede llamarse «og»`);
  for (const s of slugs) if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(s)) fallas.push(`${idioma}: slug inválido «${s}»`);
}
const sobrantes = readdirSync(APP).filter((d) => existsSync(path.join(APP, d, "[ranking]")) && !indices.includes(d));
for (const d of sobrantes) fallas.push(`carpeta de rankings sin idioma en SLUG_RANKINGS: ${d}`);
for (const archivo of Object.values(ARCHIVOS_DATOS)) {
  if (!existsSync(path.join(APP, SEGMENTO_DATOS, archivo, "route.ts"))) fallas.push(`falta la ruta de datos abiertos ${SEGMENTO_DATOS}/${archivo}`);
}

// ---------- Historial ----------
const enDisco = readdirSync(HISTORIAL).filter((f) => f.endsWith(".json"));
const enIndice = new Set(FOTOS.map((f) => `${f.mes}.json`));
for (const f of enDisco) if (!enIndice.has(f)) fallas.push(`historial/${f} no está en historial/indice.ts (correr scripts/rankings/foto_mensual.ts)`);
for (const f of enIndice) if (!enDisco.includes(f)) fallas.push(`historial/indice.ts lista ${f}, que no existe`);
const meses = FOTOS.map((f) => f.mes);
if (new Set(meses).size !== meses.length) fallas.push("historial: dos fotos del mismo mes");
for (const foto of FOTOS as readonly FotoMensual[]) {
  const donde = `historial/${foto.mes}.json`;
  if (foto.version !== 1 || !RE_MES.test(foto.mes) || !/^\d{4}-\d{2}-\d{2}$/.test(foto.tomadaEl) || !foto.tomadaEl.startsWith(foto.mes)) fallas.push(`${donde}: encabezado inválido`);
  for (const [id, variantes] of Object.entries(foto.puestos)) {
    if (!(IDS_RANKING as readonly string[]).includes(id)) fallas.push(`${donde}: ranking desconocido «${id}»`);
    for (const [v, puestos] of Object.entries(variantes ?? {})) {
      for (const [iso, p] of Object.entries(puestos)) {
        if (!/^[A-Z]{2}$/.test(iso) || !Number.isInteger(p) || p < 1 || p > foto.paises) fallas.push(`${donde} ${id}/${v}: ${iso} con puesto ${p}`);
      }
    }
  }
}
// Sin foto previa no hay variación; con una foto de un mes anterior, sí.
const mesGrilla = grilla.generadoEl.slice(0, 7);
const ficticia = fotoDe(todosLosRankings(grilla), "2000-01", "2000-01-01", incluidos.length);
if (fotoAnterior("2000-01", [ficticia])) fallas.push("fotoAnterior devuelve la foto del mismo mes");
if (!fotoAnterior(mesGrilla, [ficticia])) fallas.push("fotoAnterior no encuentra una foto de un mes anterior");
const mx = registro.mercados("interno").find((m) => paisDeEdicion(grilla, m));
if (mx) {
  const sin = vistaRanking({ grilla, mercado: mx, id: "rinde", origenAR: "https://calcular.ar", fotos: [] });
  if (sin?.mesAnterior || sin?.variantes.some((v) => v.filas.some((f) => f.cambio))) fallas.push("sin foto previa igual muestra variación");
  const con = vistaRanking({ grilla, mercado: mx, id: "rinde", origenAR: "https://calcular.ar", fotos: [ficticia] });
  if (!con?.mesAnterior || con.variantes.some((v) => v.filas.some((f) => f.cambio?.tipo !== "igual"))) fallas.push("con una foto idéntica, todos los países tendrían que quedar en el mismo puesto");
}

// ---------- Datos abiertos ----------
const datos = datosAbiertos(grilla, { origen: "https://calcularya.com", origenAR: "https://calcular.ar", urlPagina: "https://calcularya.com/country-rankings" });
if (datos.countries.length !== incluidos.length) fallas.push(`datos abiertos: ${datos.countries.length} países para ${incluidos.length} en la grilla`);
for (const c of datos.countries) {
  if (c.levels.length !== datos.levels.length || c.levels.some((n) => !Number.isFinite(n.net) || !(n.effectiveRate >= 0 && n.effectiveRate <= 1))) fallas.push(`datos abiertos ${c.iso}: niveles inválidos`);
  if (!c.calculatorUrl.startsWith("https://")) fallas.push(`datos abiertos ${c.iso}: link de calculadora no absoluto`);
  for (const id of IDS_RANKING) for (const v of RANKINGS[id].variantes) if (!c.ranks[id]?.[v]) fallas.push(`datos abiertos ${c.iso}: falta el puesto ${id}/${v}`);
}
const csv = csvDe(datos).trimEnd().split("\n");
const columnas = csv[0].split(",").length;
if (csv.length !== datos.countries.length + 1) fallas.push(`CSV: ${csv.length - 1} filas para ${datos.countries.length} países`);
for (const l of csv.slice(1)) if (l.replace(/"[^"]*"/g, "x").split(",").length !== columnas) fallas.push(`CSV: fila con otra cantidad de columnas: ${l.slice(0, 60)}`);

const inyeccion = csvDe({ ...datos, countries: datos.countries.slice(0, 1).map((c) => ({ ...c, name: "=HYPERLINK(1)", edition: "-x", currency: "+y", calculatorUrl: "@z" })) }).split("\n")[1] ?? "";
if (!inyeccion.startsWith(`${datos.countries[0]?.iso ?? ""},'=HYPERLINK(1),'-x,'+y,`) || !inyeccion.trimEnd().endsWith(",'@z")) fallas.push(`CSV: una celda de texto que empieza con = + - @ no lleva apóstrofo: ${inyeccion.slice(0, 80)}`);

// ---------- Fecha de actualización ----------
// La grilla se fecha en la zona más adelantada; la página muestra el día de la edición (UTC en global).
if (diaActualizacion("2026-10-25", "2026-10-24") !== "2026-10-24") fallas.push("fecha: con la edición todavía en el 24 la página diría 25");
if (diaActualizacion("2026-10-25", "2026-10-26") !== "2026-10-25") fallas.push("fecha: la página mostraría un día posterior al de la grilla");
if (mx) {
  const v = vistaRanking({ grilla: { ...grilla, generadoEl: "2026-10-25" }, mercado: mx, id: "rinde", origenAR: "https://calcular.ar", fotos: [], hoy: "2026-10-24" });
  if (v && v.fechaIso !== "2026-10-24") fallas.push(`fecha: la vista de ${mx.codigo} muestra ${v.fechaIso} con la edición en el 24`);
}

// ---------- Grilla vacía ----------
const vacia: GrillaMundo = { version: 1, generadoEl: "", fuentePpa: grilla.fuentePpa, paises: [] };
try {
  const global = registro.mercados("interno").find((m) => m.codigo === "global")!;
  if (vistasDeRankings({ grilla: vacia, mercado: global, origenAR: "https://calcular.ar" }).length) fallas.push("con la grilla vacía hay vistas: la página no daría 404");
  if (datosAbiertos(vacia, { origen: "https://x.test", origenAR: "https://y.test", urlPagina: "https://x.test/r" }).countries.length) fallas.push("con la grilla vacía los datos abiertos tienen países");
} catch (err) {
  fallas.push(`con la grilla vacía algo tira: ${err instanceof Error ? err.message : String(err)}`);
}

// ---------- Resumen ----------
const ejemplo = registro.mercados("interno").find((m) => m.codigo === "mx");
if (ejemplo) {
  for (const v of vistasDeRankings({ grilla, mercado: ejemplo, origenAR: "https://calcular.ar", fotos: FOTOS })) {
    const d = v.variantes[v.porDefecto];
    console.log(`  ${v.id.padEnd(9)} ${d.id.padEnd(11)} ${d.frase}  ·  ${d.destacado.valor}`);
  }
}
for (const f of fallas) console.error(`❌ ${f}`);
console.log(
  fallas.length
    ? `${fallas.length} FALLAS`
    : `TODO OK: ${IDS_RANKING.length} rankings, ${filas} filas, ${incluidos.length} países, ${ediciones} ediciones revisadas, ${FOTOS.length} foto(s) en el historial`,
);
process.exit(fallas.length ? 1 : 0);
