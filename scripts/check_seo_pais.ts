// SEO de cada país, calculadora por calculadora (docs/seo/ESTANDAR-SEO-MULTIPAIS.md). Mide lo que
// decide si una página local vale como página propia o como variante intercambiable de otra
// (Google filtra las intercambiables: QRG 2025 «Lowest», política de scaled content abuse):
// - año en title, description o h1: va con {{anio}} y nunca tipeado (un año viejo es causa documentada
//   de reescritura del título; un año tipeado se vence el 1 de enero). Los ejercicios fiscales con rango
//   («2026-27») sí van literales: nombran la escala, no el año de la búsqueda.
// - respuesta primero: el primer párrafo de la intro lleva un número vigente (marcador) o una cifra.
// - cuerpo propio: intro + cómo se calcula + ejemplo + FAQ + glosario con un mínimo de palabras, al menos
//   3 preguntas y un ejemplo resuelto (lo que comparten las calculadoras que rankean en UK, DE, US y ES).
// - sin copiar entre países del mismo idioma: dos calculadoras locales del mismo concepto en dos países
//   no comparten más de la mitad de sus oraciones (modifier-delete test: si al sacar el nombre del país
//   la página es la de otro país, es un doorway).
// Las universales no entran: su texto es del motor por idioma y su diferenciación es del registro.
// Uso: npx tsx scripts/check_seo_pais.ts [mercado]   ·   --medir imprime la distribución sin fallar.
import { esUniversal, marcadoresDe } from "../src/motor/registro";
import type { ContenidoCalculadora } from "../src/motor/tipos";
import { cargarPaises } from "./paises_comun";

const MIN_PALABRAS = 90;
const PALABRAS_OBJETIVO = 220;
const MIN_FAQ = 3;
const MAX_SIMILITUD = 0.65;
const ANIO = new Date().getFullYear();

// Un año suelto (no «2026-27», «2025/26», «1/1/2026» ni dentro de un marcador {{au.help-2026-27}}).
const RE_ANIO_SUELTO = /(?<![\d/\-])(19|20)\d{2}(?![\d/\-])/g;
const SIN_MARCADORES = (t: string) => t.replace(/\{\{[^}]*\}\}/g, " ");

// Intl.Segmenter: en japonés, chino y tailandés las palabras no van separadas por espacios y un split
// cuenta una oración entera como una palabra (Japón medía 45 «palabras» en páginas de 400).
const segmentadores = new Map<string, Intl.Segmenter>();
function palabras(t: string, locale: string): number {
  let seg = segmentadores.get(locale);
  if (!seg) segmentadores.set(locale, (seg = new Intl.Segmenter(locale, { granularity: "word" })));
  let n = 0;
  for (const s of seg.segment(SIN_MARCADORES(t))) if (s.isWordLike) n++;
  return n;
}

function cuerpo(c: ContenidoCalculadora): string[] {
  return [...c.intro, ...c.comoSeCalcula, ...(c.ejemplo ?? []), ...c.faq.flatMap((f) => [f.pregunta, f.respuesta]), ...c.glosario.map((g) => `${g.termino} ${g.definicion}`)];
}

// Oraciones normalizadas (sin marcadores, sin números, minúsculas): lo que queda igual cuando solo cambia
// el país, el monto o el organismo es lo que delata la copia.
function oraciones(textos: readonly string[]): Set<string> {
  const salida = new Set<string>();
  for (const t of textos) {
    for (const o of SIN_MARCADORES(t).split(/[.!?。؟]+/)) {
      const n = o.toLowerCase().replace(/\p{N}+/gu, "#").replace(/[\s\p{P}]+/gu, " ").trim();
      if (n.split(" ").length >= 5) salida.add(n);
    }
  }
  return salida;
}

function similitud(a: Set<string>, b: Set<string>): number {
  if (!a.size || !b.size) return 0;
  let comunes = 0;
  for (const o of a) if (b.has(o)) comunes++;
  return comunes / Math.min(a.size, b.size);
}

// Un año que nombra una norma («Employment Act 1955», «Ley 2000», «قانون العمل 2025») no es el año de la
// búsqueda: se deja pasar si lo precede una palabra de norma. Y solo los dos años anteriores cuentan como
// vencidos: «desde 2000» o «antes de 1995» son parte del nombre de la calculadora.
const RE_NORMA = /(act|law|ley|lei|loi|legge|gesetz|c[oó]digo|code|decreto|decree|d[eé]cret|lgt|n[°º]|no\.|№|قانون|закон|kanun|ustawa|zákon|törvény|lov|lag|laki|wet)(\s+\S+){0,3}\s*$/iu;
function aniosSueltos(t: string): { anio: number; norma: boolean }[] {
  const limpio = SIN_MARCADORES(t);
  return [...limpio.matchAll(RE_ANIO_SUELTO)].map((m) => ({ anio: Number(m[0]), norma: RE_NORMA.test(limpio.slice(Math.max(0, (m.index ?? 0) - 24), m.index)) }));
}

interface Pagina {
  id: string;
  carpeta: string;
  idioma: string;
  concepto: string;
  borrador: boolean;
  oraciones: Set<string>;
  palabras: number;
}

async function main() {
  const filtro = process.argv.slice(2).find((a) => !a.startsWith("--"));
  const medir = process.argv.includes("--medir");
  const fallas: string[] = [];
  const avisos: string[] = [];
  const paginas: Pagina[] = [];
  const distribucion: number[] = [];

  for (const { carpeta, pais } of await cargarPaises()) {
    if (!pais) continue;
    for (const entrada of pais.calculadoras) {
      if (esUniversal(entrada)) continue;
      const { definicion, contenido: c } = entrada;
      const id = definicion.id;
      const borrador = definicion.estado === "borrador";
      const propio = carpeta === filtro || !filtro;

      const texto = cuerpo(c);
      const n = texto.reduce((s, t) => s + palabras(t, pais.mercado.locale), 0);
      distribucion.push(n);
      paginas.push({ id, carpeta, idioma: pais.mercado.idioma, concepto: definicion.concepto, borrador, oraciones: oraciones(texto), palabras: n });
      if (!propio) continue;

      for (const [campo, valor] of [["title", c.title], ["description", c.description], ["h1", c.h1]] as const) {
        const anios = aniosSueltos(valor).filter((a) => !a.norma);
        const vencidos = anios.filter((a) => a.anio >= ANIO - 2 && a.anio < ANIO).map((a) => a.anio);
        // En la description un año viejo suele nombrar la escala («tasas de 2025»): aviso. En title y h1 es
        // el año de la búsqueda, y vencido es causa documentada de reescritura del título: falla.
        if (vencidos.length) (campo === "description" ? avisos : fallas).push(`${id}: ${campo} con un año vencido (${vencidos.join(", ")}): «${valor}»`);
        else if (anios.some((a) => a.anio === ANIO)) fallas.push(`${id}: ${campo} con el año tipeado (${ANIO}): usá {{anio}}: «${valor}»`);
      }
      if (/\{\{\s*anio\s*\}\}/.test(c.intro.join(" ") + c.comoSeCalcula.join(" "))) avisos.push(`${id}: {{anio}} en el cuerpo; ahí va la vigencia real del dato ({{id#desde}}), no el año del reloj`);

      if (borrador) continue;
      const intro = c.intro.join(" ");
      if (!marcadoresDe(intro).length && !/\p{N}/u.test(intro)) avisos.push(`${id}: la intro no da ningún número (respuesta primero: el valor vigente con su marcador)`);
      if (c.faq.length < MIN_FAQ) fallas.push(`${id}: ${c.faq.length} preguntas en faq (mínimo ${MIN_FAQ})`);
      if (!c.ejemplo?.length) avisos.push(`${id}: sin ejemplo resuelto (las calculadoras que rankean traen uno con un monto concreto)`);
      if (n < MIN_PALABRAS) fallas.push(`${id}: ${n} palabras propias (mínimo ${MIN_PALABRAS}); intro, cómo se calcula, ejemplo y FAQ tienen que explicar la norma del país`);
      else if (n < PALABRAS_OBJETIVO) avisos.push(`${id}: ${n} palabras propias (objetivo ${PALABRAS_OBJETIVO})`);
    }
  }

  // Copia entre países del mismo idioma y concepto (las ediciones de un mismo país no se comparan entre sí:
  // traducen la misma calculadora a otro idioma, no comparten idioma).
  const porClave = new Map<string, Pagina[]>();
  for (const p of paginas) {
    if (p.concepto === "propio") continue;
    const k = `${p.idioma}|${p.concepto}`;
    porClave.set(k, [...(porClave.get(k) ?? []), p]);
  }
  for (const grupo of porClave.values()) {
    for (let i = 0; i < grupo.length; i++) {
      for (let j = i + 1; j < grupo.length; j++) {
        const a = grupo[i];
        const b = grupo[j];
        if (a.carpeta.split("-")[0] === b.carpeta.split("-")[0]) continue;
        if (filtro && a.carpeta !== filtro && b.carpeta !== filtro) continue;
        const s = similitud(a.oraciones, b.oraciones);
        if (s > MAX_SIMILITUD) fallas.push(`${a.id} y ${b.id}: ${Math.round(s * 100)} % de oraciones iguales (máximo ${Math.round(MAX_SIMILITUD * 100)} %); cada país explica su propia norma con sus propias palabras`);
        else if (s > 0.4) avisos.push(`${a.id} y ${b.id}: ${Math.round(s * 100)} % de oraciones iguales`);
      }
    }
  }

  if (medir) {
    const pares: [number, string][] = [];
    for (const grupo of porClave.values()) {
      for (let i = 0; i < grupo.length; i++) for (let j = i + 1; j < grupo.length; j++) if (grupo[i].carpeta.split("-")[0] !== grupo[j].carpeta.split("-")[0]) pares.push([similitud(grupo[i].oraciones, grupo[j].oraciones), `${grupo[i].id} ~ ${grupo[j].id}`]);
    }
    pares.sort((a, b) => b[0] - a[0]);
    console.log("pares más parecidos entre países del mismo idioma y concepto:");
    for (const [s, k] of pares.slice(0, 15)) console.log(`  ${Math.round(s * 100)} %  ${k}`);
    const orden = [...distribucion].sort((x, y) => x - y);
    const p = (q: number) => orden[Math.floor((orden.length - 1) * q)];
    console.log(`palabras propias por calculadora local: n=${orden.length} min=${orden[0]} p10=${p(0.1)} p25=${p(0.25)} p50=${p(0.5)} p75=${p(0.75)} max=${orden.at(-1)}`);
    const pocas = paginas.filter((x) => !x.borrador && x.palabras < MIN_PALABRAS);
    console.log(`publicadas con menos de ${MIN_PALABRAS}: ${pocas.length}`);
    for (const x of pocas.slice(0, 40)) console.log(`  ${x.id}: ${x.palabras}`);
  }

  for (const a of avisos) console.log(`⚠️  ${a}`);
  for (const f of fallas) console.error(`❌ ${f}`);
  console.log(fallas.length ? `${fallas.length} FALLAS` : `TODO OK: ${paginas.length} calculadoras locales revisadas, ${avisos.length} avisos`);
  process.exit(fallas.length && !medir ? 1 : 0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
