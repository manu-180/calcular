// Valida las calculadoras universales (src/motor/universales) en mercados de prueba de cada idioma y
// trato: que la definición se arme, que los casos den, que el resultado se pueda mostrar y que los
// textos cumplan lo básico (largo de title y description, FAQ, sin rayas ni emojis).
// Uso: npx tsx scripts/check_universales.ts [id]
import { ErrorEntrada, crearContexto } from "../src/motor/calculo";
import { CONCEPTOS } from "../src/motor/conceptos";
import { formatearFilas } from "../src/motor/formulario";
import type { CodigoMercado, ContextoSerializado, Idioma, Moneda, ResultadoBase, TablaResultado, Trato } from "../src/motor/tipos";
import { UNIVERSALES } from "../src/motor/universales";
import { idiomasDe, instanciar, type ContextoUniversal } from "../src/motor/universales/tipos";

const TOLERANCIA = 0.005;
const RE_SLUG = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const RE_RAYA = /[—–]| - /;
const RE_EMOJI = /\p{Extended_Pictographic}/u;
const MARCADOR = /\{\{[^}]+\}\}/g;

const PRUEBA: Readonly<Record<Idioma, readonly Partial<ContextoUniversal>[]>> = {
  es: [
    { mercado: "mx", pais: "MX", nombrePais: "México", locale: "es-MX", trato: "tu", moneda: "MXN", escala: 20 },
    { mercado: "co", pais: "CO", nombrePais: "Colombia", locale: "es-CO", trato: "usted", moneda: "COP", escala: 4000 },
    { mercado: "uy", pais: "UY", nombrePais: "Uruguay", locale: "es-UY", trato: "vos", moneda: "UYU", escala: 40 },
    { mercado: "vc" as CodigoMercado, pais: "VC", nombrePais: "San Vicente y las Granadinas", locale: "es", trato: "usted", moneda: "XCD" as Moneda, escala: 2.5 },
  ],
  en: [
    { mercado: "us" as CodigoMercado, pais: "US", nombrePais: "United States", locale: "en-US", trato: "tu", moneda: "USD" as Moneda, escala: 1, unidades: "imperial" },
    { mercado: "gb" as CodigoMercado, pais: "GB", nombrePais: "United Kingdom", locale: "en-GB", trato: "tu", moneda: "GBP" as Moneda, escala: 1 },
    { mercado: "vc" as CodigoMercado, pais: "VC", nombrePais: "Saint Vincent and the Grenadines", locale: "en-VC", trato: "tu", moneda: "XCD" as Moneda, escala: 2.5 },
  ],
  pt: [{ mercado: "br", pais: "BR", nombrePais: "Brasil", locale: "pt-BR", trato: "tu", moneda: "BRL", escala: 5 }],
  fr: [{ mercado: "fr" as CodigoMercado, pais: "FR", nombrePais: "France", locale: "fr-FR", trato: "usted", moneda: "EUR" as Moneda, escala: 1 }],
  de: [{ mercado: "de" as CodigoMercado, pais: "DE", nombrePais: "Deutschland", locale: "de-DE", trato: "usted", moneda: "EUR" as Moneda, escala: 1 }],
  it: [{ mercado: "it" as CodigoMercado, pais: "IT", nombrePais: "Italia", locale: "it-IT", trato: "tu", moneda: "EUR" as Moneda, escala: 1 }],
  nl: [{ mercado: "nl" as CodigoMercado, pais: "NL", nombrePais: "Nederland", locale: "nl-NL", trato: "tu", moneda: "EUR" as Moneda, escala: 1 }],
};

function contexto(id: string, idioma: Idioma, base: Partial<ContextoUniversal>, datos: readonly string[] = []): ContextoUniversal {
  const mercado = base.mercado as CodigoMercado;
  return {
    id: `${mercado}.${id}`,
    slug: "",
    mercado,
    pais: base.pais ?? "",
    nombrePais: base.nombrePais ?? "",
    locale: base.locale ?? "es",
    idioma,
    trato: (base.trato ?? "tu") as Trato,
    moneda: (base.moneda ?? "USD") as Moneda,
    escala: base.escala ?? 1,
    unidades: base.unidades ?? "metrico",
    estado: "publicado",
    datos: Object.fromEntries(datos.map((d) => [d, `${mercado}.${d}`])),
  };
}

function textosVisibles(c: ReturnType<typeof instanciar>): string[] {
  const { definicion: d, contenido: k } = c;
  const campos = d.campos.flatMap((f) => [f.etiqueta, f.ayuda ?? "", ...("opciones" in f ? f.opciones.map((o) => o.etiqueta) : [])]);
  return [
    k.h1,
    k.title,
    k.description,
    ...k.intro,
    ...k.comoSeCalcula,
    ...(k.ejemplo ?? []),
    ...k.faq.flatMap((f) => [f.pregunta, f.respuesta]),
    ...k.glosario.flatMap((g) => [g.termino, g.definicion]),
    ...campos,
    ...d.resultado.flatMap((r) => [r.etiqueta, r.ayuda ?? ""]),
    ...(d.tablas ?? []).map((t) => t.titulo),
  ];
}

function esTabla(v: unknown): v is TablaResultado {
  return typeof v === "object" && v !== null && (v as TablaResultado).tipo === "tabla";
}

async function main() {
  const filtro = process.argv[2];
  const fallas: string[] = [];
  let probados = 0;
  const ids = new Set<string>();

  for (const u of UNIVERSALES) {
    if (filtro && u.id !== filtro) continue;
    if (ids.has(u.id)) fallas.push(`${u.id}: id repetido`);
    ids.add(u.id);
    if (!(u.concepto in CONCEPTOS) || u.concepto === "propio") fallas.push(`${u.id}: concepto "${u.concepto}" no existe o es propio`);
    const idiomas = idiomasDe(u);
    if (!idiomas.includes("es")) fallas.push(`${u.id}: falta el español`);
    for (const i of Object.keys(u.textos) as Idioma[]) if (!u.contenido[i]) fallas.push(`${u.id}: tiene textos en ${i} pero no contenido`);
    for (const i of Object.keys(u.contenido) as Idioma[]) if (!u.textos[i]) fallas.push(`${u.id}: tiene contenido en ${i} pero no textos`);
    if (u.casos.length < 2) fallas.push(`${u.id}: necesita al menos 2 casos`);

    for (const idioma of idiomas) {
      const slug = u.textos[idioma]!.slug;
      if (!RE_SLUG.test(slug)) fallas.push(`${u.id} [${idioma}]: slug "${slug}" no es kebab-case ASCII`);
      for (const base of PRUEBA[idioma]) {
        const ctx = contexto(u.id, idioma, base, u.datos);
        const donde = `${u.id} [${idioma}-${ctx.trato} ${ctx.moneda}]`;
        let inst: ReturnType<typeof instanciar>;
        try {
          inst = instanciar(u, ctx);
        } catch (err) {
          fallas.push(`${donde}: no se arma (${(err as Error).message})`);
          continue;
        }
        const { definicion: d, contenido: k } = inst;
        if (d.id !== ctx.id || d.mercado !== ctx.mercado || d.slug !== slug || d.concepto !== u.concepto) fallas.push(`${donde}: id, mercado, slug o concepto no salen del contexto`);
        const idsCampos = d.campos.map((c) => c.id);
        if (new Set(idsCampos).size !== idsCampos.length) fallas.push(`${donde}: ids de campo repetidos`);
        const largoTitle = k.title.replace(MARCADOR, "XXXXXXX").length;
        if (largoTitle > 60) fallas.push(`${donde}: title de ${largoTitle} caracteres (máximo 60)`);
        const largoDesc = k.description.replace(MARCADOR, "XXXXXXX").length;
        if (largoDesc > 160 || largoDesc < 70) fallas.push(`${donde}: description de ${largoDesc} caracteres (entre 70 y 160)`);
        if (k.faq.length < 3) fallas.push(`${donde}: menos de 3 preguntas frecuentes`);
        if (!k.intro.length || !k.comoSeCalcula.length) fallas.push(`${donde}: falta intro o comoSeCalcula`);
        for (const t of textosVisibles(inst)) {
          if (RE_RAYA.test(t)) fallas.push(`${donde}: raya en «${t.slice(0, 60)}»`);
          if (RE_EMOJI.test(t)) fallas.push(`${donde}: emoji en «${t.slice(0, 60)}»`);
        }

        const mercadoPrueba = { codigo: ctx.mercado, monedas: [ctx.moneda] as const, redondeo: { decimales: 2, modo: "mitad-arriba" as const } };
        u.casos.forEach((caso, n) => {
          if (caso.contexto?.idioma && caso.contexto.idioma !== idioma) return;
          if (caso.contexto?.moneda && caso.contexto.moneda !== ctx.moneda) return;
          if (caso.contexto?.unidades && caso.contexto.unidades !== ctx.unidades) return;
          probados++;
          const id = `${donde} caso ${n + 1} «${caso.nombre}»`;
          if (!caso.detalle?.trim()) fallas.push(`${id}: sin detalle de la cuenta`);
          const valores = { ...Object.fromEntries(Object.entries(caso.valores ?? {}).map(([k2, v]) => [`${ctx.mercado}.${k2}`, v])) };
          let r: ResultadoBase;
          try {
            r = d.calcular(caso.entrada as never, valores as never, crearContexto(mercadoPrueba, caso.fecha, d));
          } catch (err) {
            if (caso.esperaError && err instanceof ErrorEntrada) return;
            return void fallas.push(`${id}: ${caso.esperaError ? "esperaba ErrorEntrada y salió" : "tiró"} ${(err as Error).message}`);
          }
          if (caso.esperaError) return void fallas.push(`${id}: esperaba ErrorEntrada y calculó`);
          for (const fila of d.resultado) if (!(fila.clave in r)) fallas.push(`${id}: la fila "${fila.clave}" no sale de calcular()`);
          for (const t of d.tablas ?? []) if (!esTabla(r[t.clave])) fallas.push(`${id}: la tabla "${t.clave}" no sale de calcular()`);
          const tol = caso.tolerancia ?? TOLERANCIA;
          for (const [clave, esperado] of Object.entries(caso.esperado ?? {})) {
            const real = r[clave];
            if (typeof esperado === "number") {
              if (typeof real !== "number" || Math.abs(real - esperado) > tol) fallas.push(`${id}: ${clave} dio ${String(real)}, esperado ${esperado}`);
            } else if (JSON.stringify(real) !== JSON.stringify(esperado)) fallas.push(`${id}: ${clave} dio ${JSON.stringify(real)}, esperado ${JSON.stringify(esperado)}`);
          }
          const ser: ContextoSerializado = {
            fecha: caso.fecha,
            mercado: ctx.mercado,
            locale: ctx.locale,
            idioma,
            trato: ctx.trato,
            moneda: ctx.moneda,
            redondeo: mercadoPrueba.redondeo,
            regiones: [],
          };
          try {
            formatearFilas(d, r, ser);
          } catch (err) {
            fallas.push(`${id}: el resultado no se puede mostrar (${(err as Error).message})`);
          }
        });
      }
    }
  }

  if (filtro && !ids.size) fallas.push(`no hay universal con id "${filtro}"`);
  if (fallas.length) {
    console.error(`check_universales: ${fallas.length} fallas\n${fallas.map((f) => `  ✗ ${f}`).join("\n")}`);
    process.exit(1);
  }
  console.log(`check_universales: ${ids.size} universales, ${probados} casos probados ✓`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
