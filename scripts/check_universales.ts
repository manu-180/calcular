// Valida las calculadoras universales (src/motor/universales) en mercados de prueba de cada idioma y
// trato: que la definición se arme, que los casos den, que el resultado se pueda mostrar y que los
// textos cumplan lo básico (largo de title y description, FAQ, sin rayas ni emojis). En las variantes
// de un idioma (es-ES, pt-PT, pt-AO, fr-CA, de-CH) revisa además que no se cuele el vocabulario de otra
// (pt-AO con el de pt-PT y el de la lusofonía, en el orden de variantesDeLocale).
// Uso: npx tsx scripts/check_universales.ts [id]
import { anchoVisual } from "../src/motor/ancho";
import { ErrorEntrada, crearContexto } from "../src/motor/calculo";
import { CONCEPTOS } from "../src/motor/conceptos";
import { formatearFilas } from "../src/motor/formulario";
import type { CodigoMercado, ContextoSerializado, Idioma, Moneda, ResultadoBase, TablaResultado, Trato } from "../src/motor/tipos";
import { variantesDeLocale, PT_LUSOFONIA } from "../src/motor/i18n/variantes";
import { UNIVERSALES } from "../src/motor/universales";
import { idiomasDe, instanciar, type ContextoUniversal } from "../src/motor/universales/tipos";
import { problemasDeTexto } from "./reglas_idioma";

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
    { mercado: "es" as CodigoMercado, pais: "ES", nombrePais: "España", locale: "es-ES", trato: "tu", moneda: "EUR" as Moneda, escala: 1 },
  ],
  en: [
    { mercado: "us" as CodigoMercado, pais: "US", nombrePais: "United States", locale: "en-US", trato: "tu", moneda: "USD" as Moneda, escala: 1, unidades: "imperial" },
    { mercado: "gb" as CodigoMercado, pais: "GB", nombrePais: "United Kingdom", locale: "en-GB", trato: "tu", moneda: "GBP" as Moneda, escala: 1 },
    { mercado: "vc" as CodigoMercado, pais: "VC", nombrePais: "Saint Vincent and the Grenadines", locale: "en-VC", trato: "tu", moneda: "XCD" as Moneda, escala: 2.5 },
  ],
  pt: [
    { mercado: "br", pais: "BR", nombrePais: "Brasil", locale: "pt-BR", trato: "tu", moneda: "BRL", escala: 5 },
    { mercado: "pt" as CodigoMercado, pais: "PT", nombrePais: "Portugal", locale: "pt-PT", trato: "usted", moneda: "EUR" as Moneda, escala: 1 },
    // Angola: norma europea (como todo pt-* menos pt-BR), sin lo que es propio de Portugal.
    { mercado: "ao" as CodigoMercado, pais: "AO", nombrePais: "Angola", locale: "pt-AO", trato: "usted", moneda: "AOA" as Moneda, escala: 900 },
  ],
  fr: [
    { mercado: "fr" as CodigoMercado, pais: "FR", nombrePais: "France", locale: "fr-FR", trato: "usted", moneda: "EUR" as Moneda, escala: 1 },
    { mercado: "ca-fr" as CodigoMercado, pais: "CA", nombrePais: "Canada", locale: "fr-CA", trato: "usted", moneda: "CAD" as Moneda, escala: 1.4 },
  ],
  de: [
    { mercado: "de" as CodigoMercado, pais: "DE", nombrePais: "Deutschland", locale: "de-DE", trato: "usted", moneda: "EUR" as Moneda, escala: 1 },
    { mercado: "ch" as CodigoMercado, pais: "CH", nombrePais: "Schweiz", locale: "de-CH", trato: "usted", moneda: "CHF" as Moneda, escala: 0.8 },
  ],
  it: [{ mercado: "it" as CodigoMercado, pais: "IT", nombrePais: "Italia", locale: "it-IT", trato: "tu", moneda: "EUR" as Moneda, escala: 1 }],
  nl: [{ mercado: "nl" as CodigoMercado, pais: "NL", nombrePais: "Nederland", locale: "nl-NL", trato: "tu", moneda: "EUR" as Moneda, escala: 1 }],
  ja: [
    { mercado: "jp" as CodigoMercado, pais: "JP", nombrePais: "日本", locale: "ja-JP", trato: "usted", moneda: "JPY" as Moneda, escala: 150 },
    { mercado: "vc" as CodigoMercado, pais: "VC", nombrePais: "セントビンセント及びグレナディーン諸島", locale: "ja-JP", trato: "usted", moneda: "XCD" as Moneda, escala: 2.5 },
  ],
  ko: [
    { mercado: "kr" as CodigoMercado, pais: "KR", nombrePais: "대한민국", locale: "ko-KR", trato: "usted", moneda: "KRW" as Moneda, escala: 1400 },
    { mercado: "vc" as CodigoMercado, pais: "VC", nombrePais: "세인트빈센트 그레나딘", locale: "ko-KR", trato: "usted", moneda: "XCD" as Moneda, escala: 2.5 },
  ],
  zh: [
    { mercado: "tw" as CodigoMercado, pais: "TW", nombrePais: "台灣", locale: "zh-TW", trato: "usted", moneda: "TWD" as Moneda, escala: 30 },
    { mercado: "hk-zh" as CodigoMercado, pais: "HK", nombrePais: "香港", locale: "zh-HK", trato: "usted", moneda: "HKD" as Moneda, escala: 8 },
    { mercado: "cn" as CodigoMercado, pais: "CN", nombrePais: "中国", locale: "zh-CN", trato: "usted", moneda: "CNY" as Moneda, escala: 7 },
    { mercado: "vc" as CodigoMercado, pais: "VC", nombrePais: "聖文森及格瑞那丁", locale: "zh-TW", trato: "usted", moneda: "XCD" as Moneda, escala: 2.5 },
  ],
};

// En ja, ko y zh las reglas de puntuación, registro y escritura (scripts/reglas_idioma.ts) corren
// sobre toda la página: los traductores de los idiomas latinos no las necesitaban.
const REGLAS_COMPLETAS: ReadonlySet<Idioma> = new Set<Idioma>(["ja", "ko", "zh"]);

// Palabras que delatan otra variante del idioma. `todo` revisa la página entera (contenido incluido);
// si no, solo lo que sale de ui (etiquetas, opciones, observaciones y errores), que es lo que hoy
// ramifica por locale en pt, fr y de.
interface Vocabulario {
  todo: boolean;
  prohibidas: readonly (readonly [RegExp, string])[];
}

const VOCABULARIO: Readonly<Record<string, Vocabulario>> = {
  "es-ES": {
    todo: true,
    prohibidas: [
      [/\bautos?\b/i, "coche"],
      [/\bcostos?\b/i, "coste"],
      [/\btasas? (de interés|anual(?! equivalente)|nominal|efectiva)/i, "tipo de interés / TAE"],
      [/\btasa(s)? del IVA|\btasas? de IVA/i, "tipo de IVA"],
      [/\bcomputadora/i, "ordenador"],
      [/\bcontrapiso/i, "solera"],
      [/\baguinaldo/i, "pagas extra"],
      [/\bpor mes\b/i, "al mes"],
      [/\b(te|le) ofrecieron\b/i, "te han ofrecido"],
      [/\bsin goce\b/i, "no retribuida"],
      [/\benganche\b|\bo pie\b|\bel pie\b/i, "entrada"],
      [/revisión técnica/i, "ITV"],
      [/\bheladera|\brefrigerador/i, "frigorífico"],
      [/\bnafta\b/i, "gasolina"],
      [/\bcelular/i, "móvil"],
      [/\bestacionamiento/i, "aparcamiento"],
      [/\bporcelanato/i, "gres porcelánico"],
      [/\bcerámicos\b/i, "baldosas"],
      [/\bmanej(ar|as|a|o)\b/i, "conducir"],
      [/\bdepartamento\b/i, "piso"],
      [/\bplata\b/i, "dinero"],
      [/\bacá\b/i, "aquí"],
      [/\bchequea/i, "comprueba"],
      [/\bmontos?\b/i, "importe / cantidad"],
      [/\baportes?\b/i, "aportación"],
      [/\bmercadería/i, "mercancía"],
      [/\bse prende|\bprender\b/i, "encender"],
    ],
  },
  "pt-PT": {
    todo: false,
    prohibidas: [
      [/\baluguel/i, "renda"],
      [/\bparcela/i, "prestação"],
      [/\beconomiz/i, "poupar"],
      [/\bconcreto\b/i, "betão"],
      [/\bgeladeira/i, "frigorífico"],
      [/\bcelular/i, "telemóvel"],
      [/(?<!\p{L})ônibus|\btrem\b/iu, "autocarro / comboio"],
      [/\bregistro/i, "registo"],
      [/\bcontato/i, "contacto"],
      [/ôm|ôn|(?<![tv])ên(?!c)|(?<![tv])êm/i, "acentuação de Portugal (económico, género, prémio)"],
      [/\bvocê/i, "sem «você»"],
      [/\bestá [a-z]+ndo\b/i, "está a + infinitivo"],
      [/\bpiso\b/i, "pavimento"],
      [/\bplano de saúde/i, "seguro de saúde"],
      [/\bporcentage/i, "percentagem"],
      [/\btaxa de juros\b/i, "taxa de juro"],
      [/\bfinanciamento\b/i, "crédito"],
      [/\bcoloque\b/i, "indique"],
      [/\bquit(ar|a|e|ou)\b/i, "liquidar"],
      [/\bmoradia\b/i, "habitação"],
      [/\baposentadoria/i, "reforma"],
      [/\bcorretagem/i, "comissão de mediação"],
      [/\bIPTU\b/, "IMI"],
      [/\busuário/i, "utilizador"],
      [/\bplanilha/i, "folha de cálculo"],
    ],
  },
  // Lo que en la norma europea es propio de Portugal y no vale en Angola, Mozambique o Cabo Verde.
  [PT_LUSOFONIA]: {
    todo: true,
    prohibidas: [
      [/IRS/, "imposto sobre o rendimento"],
      [/IM[IT]/, "imposto predial / impostos sobre a compra"],
      [/IUC/, "impostos do veículo"],
      [/PPR/, "poupança para a reforma"],
      [/Segurança Social/, "segurança social"],
      [/duodécimos/i, "salário de cada mês"],
      [/Portugal/, "o país do mercado"],
    ],
  },
  "fr-CA": {
    todo: false,
    prohibidas: [
      [/apport personnel/i, "mise de fonds"],
      [/\bcrédit immobilier|\bprêt immobilier/i, "prêt hypothécaire"],
      [/\bweek-end/i, "fin de semaine"],
      [/\bparking\b/i, "stationnement"],
      [/\bcarrelage/i, "céramique"],
      [/\bTVA\b/, "taxes de vente"],
      [/\bcharges de copropriété/i, "frais de condo"],
      [/\bmutuelle/i, "assurance collective"],
    ],
  },
  "de-CH": { todo: true, prohibidas: [[/ß/, "ss"]] },
};

// Todos los textos que devuelve ui, con las funciones llamadas con argumentos de prueba.
function textosDeUi(valor: unknown, salida: string[] = []): string[] {
  if (typeof valor === "string") salida.push(valor);
  else if (typeof valor === "function") {
    try {
      textosDeUi((valor as (...a: unknown[]) => unknown)("1", "2", "3", "4"), salida);
    } catch {
      try {
        textosDeUi((valor as (...a: unknown[]) => unknown)(1, 2, 3, 4), salida);
      } catch {
        // Una función de ui que no acepta argumentos de prueba no aporta texto para revisar.
      }
    }
  } else if (Array.isArray(valor)) valor.forEach((v) => textosDeUi(v, salida));
  else if (valor && typeof valor === "object") Object.values(valor).forEach((v) => textosDeUi(v, salida));
  return salida;
}

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
        const largoTitle = anchoVisual(k.title.replace(MARCADOR, "XXXXXXX"));
        if (largoTitle > 60) fallas.push(`${donde}: title de ${largoTitle} de ancho (máximo 60)`);
        const largoDesc = anchoVisual(k.description.replace(MARCADOR, "XXXXXXX"));
        if (largoDesc > 160 || largoDesc < 70) fallas.push(`${donde}: description de ${largoDesc} de ancho (entre 70 y 160)`);
        if (k.faq.length < 3) fallas.push(`${donde}: menos de 3 preguntas frecuentes`);
        if (!k.intro.length || !k.comoSeCalcula.length) fallas.push(`${donde}: falta intro o comoSeCalcula`);
        for (const t of textosVisibles(inst)) {
          if (RE_RAYA.test(t)) fallas.push(`${donde}: raya en «${t.slice(0, 60)}»`);
          if (RE_EMOJI.test(t)) fallas.push(`${donde}: emoji en «${t.slice(0, 60)}»`);
        }
        if (REGLAS_COMPLETAS.has(idioma)) {
          const ui = textosDeUi(u.textos[idioma]!.ui(ctx.trato, ctx.locale));
          for (const t of new Set([...ui, ...textosVisibles(inst)])) {
            for (const p of problemasDeTexto(t, idioma, ctx.trato, ctx.locale)) fallas.push(`${u.id} [${ctx.locale}]: ${p} en «${t.slice(0, 70)}»`);
          }
        }
        for (const vocabulario of variantesDeLocale(ctx.locale).flatMap((k) => VOCABULARIO[k] ?? [])) {
          const ui = textosDeUi(u.textos[idioma]!.ui(ctx.trato, ctx.locale));
          const revisar = vocabulario.todo ? [...ui, ...textosVisibles(inst)] : ui;
          const vistas = new Set<string>();
          for (const t of revisar) {
            for (const [re, va] of vocabulario.prohibidas) {
              const m = re.exec(t);
              if (!m) continue;
              const clave = `${m[0]}|${t}`;
              if (vistas.has(clave)) continue;
              vistas.add(clave);
              fallas.push(`${u.id} [${ctx.locale}]: «${m[0]}» (va ${va}) en «${t.slice(0, 90)}»`);
            }
          }
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
