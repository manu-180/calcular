// Reglas de redacción por idioma (docs/GUIA-REDACCION.md) que comparten check_textos_paises y
// check_i18n. Las de todos los idiomas: sin rayas, sin guion como pausa, sin emojis. Las del español
// (muletillas y trato tú/vos/usted) solo corren en textos en español; cada otro idioma suma lo
// mínimo propio: signos de exclamación de vendedor y el registro equivocado (Sie en un mercado de
// du, tu en uno de vous).
import { escrituraZh } from "../src/motor/i18n/escritura";
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
  "país", "días", "maíz", "raíz", "anís", "parís", "lis", "adiós", "dieciséis", "veintiséis", "seis",
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

// ja y zh escriben con puntuación de ancho completo (。、「」（）：？); un signo de ancho medio pegado a
// un carácter CJK es mezcla. Entre dígitos («1,000», «3.5») y en marcadores no cuenta.
const CJK = String.raw`[\p{sc=Han}\p{sc=Hiragana}\p{sc=Katakana}]`;
const ANCHO_MEDIO_TRAS_CJK = new RegExp(`${CJK}[,.!?:;()]`, "u");
const PARENTESIS_ANTES_DE_CJK = new RegExp(`[()]${CJK}`, "u");
const COMILLAS_LATINAS_CJK = new RegExp(`${CJK}["“”]|["“”]${CJK}`, "u");
const CORCHETES_JA = /[「」『』]/;

// Pares simplificado/tradicional frecuentes en el vocabulario de las calculadoras. Solo caracteres
// que no existen como forma normal en la otra escritura (nada de 台, 后, 里, 干, 准, 只, 面).
const PARES_ZH =
  "们們 这這 个個 来來 时時 对對 会會 为為 发發 动動 务務 经經 进進 过過 还還 关關 开開 门門 问問 间間 题題 种種 实實 现現 东東 车車 费費 贷貸 价價 钱錢 买買 卖賣 资資 产產 税稅 计計 数數 据據 银銀 额額 总總 让讓 认認 证證 说說 读讀 请請 选選 输輸 结結 统統 历歷 页頁 显顯 应應 该該 网網 络絡 设設 备備 从從 与與 么麼 样樣 国國 区區 万萬 亿億 预預 报報 险險 养養 医醫 疗療 体體 积積 长長 宽寬 电電 气氣 热熱 减減 优優 单單 换換 载載 龄齡 笔筆 层層 钟鐘 录錄 岁歲 条條 营營 业業 汇匯 换換 宝寶 险險 购購 运運 线線 场場 园園 项項 务務 际際 级級 时時 视視 观觀 记記 订訂 议議 课課 调調 质質 双雙 贴貼 账帳";
const SIMPLIFICADOS = new Set(PARES_ZH.split(" ").map((p) => p[0]));
const TRADICIONALES = new Set(PARES_ZH.split(" ").map((p) => p[1]));

// Escritura del chino según el locale: un carácter de la otra escritura delata una conversión mal
// hecha o un texto copiado de la otra variante.
export function problemasDeEscritura(texto: string, locale: string): string[] {
  const hans = escrituraZh(locale) === "hans";
  const ajenos = [...new Set([...texto].filter((c) => (hans ? TRADICIONALES : SIMPLIFICADOS).has(c)))];
  const p = ajenos.length ? [`${hans ? "tradicional" : "simplificado"} en ${locale}: ${ajenos.join(" ")}`] : [];
  if (hans && CORCHETES_JA.test(texto)) p.push(`「」 en ${locale}: el chino simplificado usa “”`);
  if (!hans && /[“”]/.test(texto) && new RegExp(CJK, "u").test(texto)) p.push(`“” en ${locale}: el chino tradicional usa 「」`);
  return p;
}

function reglasCjk(texto: string, idioma: Idioma): string[] {
  const p: string[] = [];
  if (/[!！]/.test(texto)) p.push("signo de exclamación");
  if (idioma === "ko") {
    if (/[。、「」『』]/.test(texto)) p.push("puntuación de ancho completo en coreano (va . , y comillas “”)");
    if (/(?:니다|니까|십시오)(?=[.?\s]|$)/.test(texto)) p.push("합니다체 en un mercado de 해요체");
    if (/[가-힣](?<!니)다\.(?:\s|$)/u.test(texto)) p.push("반말 (해라체) en un mercado de 해요체");
    return p;
  }
  if (ANCHO_MEDIO_TRAS_CJK.test(texto) || PARENTESIS_ANTES_DE_CJK.test(texto)) p.push("puntuación de ancho medio junto a texto CJK (va 。、，：？（）)");
  if (idioma === "ja") {
    if (/[，．]/.test(texto)) p.push("，o ． en japonés (va 、 y 。)");
    if (COMILLAS_LATINAS_CJK.test(texto)) p.push("comillas latinas en japonés (va 「」)");
    if (/(?:だ|である|だろう)。/.test(texto)) p.push("常体 (だ／である) en un mercado de です／ます");
    if (texto.includes("あなた")) p.push("«あなた»: en la web se omite el sujeto");
  }
  if (idioma === "zh" && /你/.test(texto)) p.push("«你» en un mercado de «您»");
  return p;
}

// Bengalí (ADR 0002, D14). Un solo registro, el de los bancos y servicios digitales de Bangladés
// (bKash, Sonali Bank, NBR e-Return): «আপনি» con las formas verbales corteses (করুন, দিন, লিখুন). Se
// atrapan «তুমি» y «তুই» con sus formas y los imperativos de তুমি más comunes (করো, দাও, দেখো). No se
// busca «নাও», que también es «না ও» («নাও হতে পারে»), ni «কর», que es «impuesto». La oración termina
// con el dari «।», no con punto latino; los montos van con dígitos bengalíes (০-৯) porque el motor
// formatea bn-BD así: una cifra latina suelta delata un número que no pasó por Intl.
const palabrasBn = (lista: string) => new RegExp(`(?<![\\p{L}\\p{M}])(?:${lista})(?![\\p{L}\\p{M}])`, "u");
const TUMI_TUI = palabrasBn("তুমি|তোমার|তোমাকে|তোমায়|তোমরা|তোমাদের|তোমারই|তুই|তোর|তোকে|তোদের|তোরা");
const IMPERATIVO_TUMI = palabrasBn("করো|দাও|দেখো|লেখো|জানাও|চাপো|রাখো|পড়ো|শোনো|বলো|এসো|যাও|ভাবো|নিও|দিও|কোরো");
const PUNTO_LATINO_BN = /[\p{sc=Beng}%)]\.(?=\s|$)/u;

function reglasBn(texto: string): string[] {
  const p: string[] = [];
  if (texto.includes("!")) p.push("signo de exclamación");
  if (PUNTO_LATINO_BN.test(texto)) p.push("punto latino al final de una oración en bengalí (va el dari «।»)");
  if (/\s।/.test(texto)) p.push("espacio antes del dari «।»");
  if (/।(?=[\p{L}\p{N}])/u.test(texto)) p.push("dari «।» pegado a la palabra siguiente");
  if (/(?<![A-Za-z0-9])[0-9]+(?![A-Za-z])/.test(texto)) p.push("cifra latina en bengalí (van dígitos ০-৯, con formatearNumero o cifrasBn)");
  if (TUMI_TUI.test(texto)) p.push("«তুমি»/«তুই» en un mercado de «আপনি»");
  if (IMPERATIVO_TUMI.test(texto)) p.push(`imperativo de তুমি («${IMPERATIVO_TUMI.exec(texto)![0]}») en un mercado de «আপনি» (va করুন, দিন, দেখুন)`);
  return p;
}

export function problemasDeTexto(texto: string, idioma: Idioma, trato: Trato, locale?: string): string[] {
  const p: string[] = [];
  if (RAYA.test(texto)) p.push("raya («—» o «–»): usá paréntesis o dos oraciones");
  if (GUION_PAUSA.test(texto)) p.push("guion como pausa ( - ): usá paréntesis o dos oraciones");
  if (EMOJI.test(texto)) p.push("emoji");
  if (idioma === "es") {
    const bajo = texto.toLowerCase();
    for (const mul of MULETILLAS_ES) if (bajo.includes(mul)) p.push(`muletilla «${mul}»`);
    return [...p, ...tratoEs(texto, trato)];
  }
  if (idioma === "bn") return [...p, ...reglasBn(texto)];
  if (idioma === "ja" || idioma === "ko" || idioma === "zh") {
    p.push(...reglasCjk(texto, idioma));
    if (idioma === "zh") p.push(...problemasDeEscritura(texto, locale ?? "zh-TW"));
    return p;
  }
  if (EXCLAMACION.test(texto)) p.push("signo de exclamación de vendedor");
  return [...p, ...registro(texto, idioma, trato)];
}
