// Reglas de redacción por idioma (docs/GUIA-REDACCION.md) que comparten check_textos_paises y
// check_i18n. Las de todos los idiomas: sin rayas, sin guion como pausa, sin emojis. Las del español
// (muletillas y trato tú/vos/usted) solo corren en textos en español; cada otro idioma suma lo
// mínimo propio: signos de exclamación de vendedor y el registro equivocado (Sie en un mercado de
// du, tu en uno de vous).
import type { Idioma, Trato } from "../src/motor/tipos";

const RAYA = /[–—]/;
const GUION_PAUSA = /[\p{L})] - [\p{L}(]/u;
const EMOJI = /(?![©®™])\p{Extended_Pictographic}/u;
const EXCLAMACION = /\p{L}!(?:\s|$)/u;

const MULETILLAS_ES = [
  "cabe destacar",
  "es importante mencionar",
  "es importante destacar",
  "en este sentido",
  "a continuación",
  "asimismo",
  "no obstante",
  "en resumen",
  "sin lugar a dudas",
  "te contamos",
  "le contamos",
];

const PALABRA = /[a-záéíóúüñ]+/gi;
// Formas del voseo rioplatense. Las terminadas en -ás/-és/-ís se detectan por patrón; estas son
// palabras de todo el español que terminan igual y no son voseo.
const NO_VOSEO = new Set([
  "además", "atrás", "detrás", "jamás", "quizás", "demás", "más", "compás", "tomás", "goiás", "mamás", "papás", "sofás", "satanás",
  "interés", "después", "través", "inglés", "francés", "portugués", "holandés", "japonés", "irlandés", "escocés", "cortés", "marqués",
  "estrés", "revés", "ciempiés", "bebés", "cafés", "comités", "vaupés", "moisés", "andrés", "inés", "ginés", "bufés", "clichés", "chalés",
  "país", "maíz", "raíz", "anís", "parís", "lis", "adiós", "dieciséis", "veintiséis", "seis",
]);
const IMPERATIVO_VOS = new Set([
  "calculá", "ingresá", "completá", "revisá", "mirá", "fijate", "tené", "poné", "hacé", "decí", "elegí", "escribí", "pedí", "salí", "vení",
  "consultá", "descargá", "cargá", "indicá", "seleccioná", "probá", "usá", "sumá", "restá", "tocá", "averiguá", "guardá", "compará", "simulá",
  "presioná", "andá", "leé", "sabé", "mové", "volvé", "acordate", "anotate", "registrate", "enterate", "olvidate", "suscribite", "contá",
  "pagá", "cobrá", "sacá", "dejá", "llamá", "esperá", "agregá", "cambiá", "buscá", "abrí", "recibí", "viví", "compartí", "imprimí",
]);
const PRONOMBRES_VOS = new Set(["vos", "sos"]);
// «estás» y el futuro («recibirás», «podrás») son iguales en tú y en vos. Se aceptan aunque así se
// escape algún presente voseante con raíz en -ar/-er/-ir («comparás»): el imperativo, que es lo que
// más aparece en una calculadora, lo sigue atrapando IMPERATIVO_VOS.
const FUTURO_O_TU = /^(?:estás|estés|harás|dirás|sabrás|habrás|cabrás)$|(?:arás|erás|irás|drás)$/;
const FORMAS_TU = new Set(["tú", "tu", "tus", "te", "ti", "contigo", "tienes", "puedes", "debes", "quieres", "sabes", "necesitas", "eres", "estás", "cobras", "ganas", "trabajas", "recibes", "pagas"]);
const FORMAS_TU_EN_VOS = new Set(["tienes", "puedes", "debes", "quieres", "sabes", "eres"]);

function tratoEs(texto: string, trato: Trato): string[] {
  const p: string[] = [];
  for (const m of texto.matchAll(PALABRA)) {
    const w = m[0].toLowerCase();
    if (trato !== "vos") {
      const voseo = PRONOMBRES_VOS.has(w) || IMPERATIVO_VOS.has(w) || (/(?:ás|és|ís)$/.test(w) && w.length > 3 && !NO_VOSEO.has(w) && !FUTURO_O_TU.test(w));
      if (voseo) p.push(`voseo «${m[0]}» en un mercado de ${trato}`);
    }
    if (trato === "usted" && FORMAS_TU.has(w)) p.push(`«${m[0]}» es de tú y el mercado es de usted`);
    if (trato === "vos" && FORMAS_TU_EN_VOS.has(w)) p.push(`«${m[0]}» es de tú y el mercado es de vos`);
    if (trato === "tu" && w === "usted") p.push(`«usted» en un mercado de tú`);
    if (/(?:áis|éis)$/.test(w) && w !== "dieciséis" && w !== "veintiséis") p.push(`«${m[0]}» es de vosotros (España)`);
  }
  return p;
}

// Formas del otro registro por idioma: [informal, formal]. En alemán e italiano el pronombre formal
// se escribe con mayúscula, así que se busca sensible a mayúsculas y fuera del comienzo de oración
// (al comienzo «Sie» también puede ser «ellos»).
type Detector = { re: RegExp; nombre: string };
// \b de JavaScript no conoce letras acentuadas: «êtes» daría «tes» como palabra suelta.
const palabras = (lista: string) => new RegExp(`(?<!\\p{L})(?:${lista})(?!\\p{L})`, "iu");
const REGISTRO: Partial<Record<Idioma, { informal: Detector[]; formal: Detector[] }>> = {
  fr: {
    informal: [{ re: palabras("tu|te|toi|ton|ta|tes"), nombre: "tutoiement" }],
    formal: [{ re: palabras("vous|votre|vos"), nombre: "vouvoiement" }],
  },
  de: {
    informal: [{ re: palabras("du|dich|dir|dein|deine|deinen|deinem|deiner|deines"), nombre: "Duzen" }],
    formal: [{ re: /[^.?!:„\s]\s+(?:Sie|Ihnen|Ihr|Ihre|Ihren|Ihrem|Ihrer|Ihres)(?!\p{L})/u, nombre: "Siezen" }],
  },
  it: {
    informal: [{ re: palabras("tu|ti|tuo|tua|tuoi|tue"), nombre: "dare del tu" }],
    formal: [{ re: /[^.?!\s]\s+(?:Lei|La|Le|Suo|Sua|Suoi|Sue)(?!\p{L})/u, nombre: "dare del Lei" }],
  },
  nl: {
    informal: [{ re: palabras("je|jij|jou|jouw|jezelf"), nombre: "je-vorm" }],
    formal: [{ re: palabras("u|uw|uzelf"), nombre: "u-vorm" }],
  },
};

function registro(texto: string, idioma: Idioma, trato: Trato): string[] {
  const r = REGISTRO[idioma];
  if (!r) return [];
  const prohibidos = trato === "usted" ? r.informal : r.formal;
  return prohibidos.filter((d) => d.re.test(texto)).map((d) => `${d.nombre} en un mercado ${idioma} de ${trato === "usted" ? "registro formal" : "registro informal"}`);
}

export function problemasDeTexto(texto: string, idioma: Idioma, trato: Trato): string[] {
  const p: string[] = [];
  if (RAYA.test(texto)) p.push("raya («—» o «–»): usá paréntesis o dos oraciones");
  if (GUION_PAUSA.test(texto)) p.push("guion como pausa ( - ): usá paréntesis o dos oraciones");
  if (EMOJI.test(texto)) p.push("emoji");
  if (idioma === "es") {
    const bajo = texto.toLowerCase();
    for (const mul of MULETILLAS_ES) if (bajo.includes(mul)) p.push(`muletilla «${mul}»`);
    return [...p, ...tratoEs(texto, trato)];
  }
  if (EXCLAMACION.test(texto)) p.push("signo de exclamación de vendedor");
  return [...p, ...registro(texto, idioma, trato)];
}
