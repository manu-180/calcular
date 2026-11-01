import type { Idioma } from "../tipos";

// El nombre del país llega suelto (mercado.nombre) y cada idioma le pone artículo y contracción a su
// manera: «la France», «au Canada», «do Brasil», «em Portugal», «in der Schweiz», «the Netherlands».
// Las tablas cubren los casos que una regla por terminación no adivina; un país nuevo con artículo
// raro se suma acá, no en cada frase del diccionario.
export interface GramaticaPais {
  // con artículo, como sujeto u objeto: «la France», «o Brasil», «the United States»
  nombre(pais: string): string;
  // pertenencia: «de la France», «do Brasil», «of the United States»
  de(pais: string): string;
  // lugar: «en France», «no Brasil», «in the United States»
  en(pais: string): string;
  // destino o beneficiario: «pour la France», «para o Brasil», «for the United States»
  para(pais: string): string;
}

const VOCAL = /^[aeiouáéíóúâêîôûàèìòùäëïöüAEIOUÁÉÍÓÚÂÊÎÔÛÀÈÌÒÙÄËÏÖÜ]/;

const es: GramaticaPais = (() => {
  const CON_ARTICULO: Readonly<Record<string, string>> = {
    "Reino Unido": "el",
    "Países Bajos": "los",
    "Emiratos Árabes Unidos": "los",
    "Estados Unidos": "",
    India: "la",
  };
  const nombre = (p: string) => (CON_ARTICULO[p] ? `${CON_ARTICULO[p]} ${p}` : p);
  const de = (p: string) => (CON_ARTICULO[p] === "el" ? `del ${p}` : `de ${nombre(p)}`);
  return { nombre, de, en: (p) => `en ${nombre(p)}`, para: (p) => `para ${nombre(p)}` };
})();

const en: GramaticaPais = (() => {
  const CON_THE = new Set([
    "United States",
    "United Kingdom",
    "Netherlands",
    "Philippines",
    "Bahamas",
    "Dominican Republic",
    "Czech Republic",
    "Central African Republic",
    "Democratic Republic of the Congo",
    "Republic of the Congo",
    "Maldives",
    "Seychelles",
    "United Arab Emirates",
    "Gambia",
    "Comoros",
    "Marshall Islands",
    "Solomon Islands",
    "Cayman Islands",
    "Faroe Islands",
  ]);
  const nombre = (p: string) => (CON_THE.has(p) ? `the ${p}` : p);
  return { nombre, de: (p) => `of ${nombre(p)}`, en: (p) => `in ${nombre(p)}`, para: (p) => `for ${nombre(p)}` };
})();

const fr: GramaticaPais = (() => {
  const MASCULINS = new Set(["Mexique", "Cambodge", "Mozambique", "Zimbabwe", "Belize", "Suriname", "Liechtenstein", "Luxembourg", "Danemark", "Royaume-Uni", "Sri Lanka", "Bangladesh"]);
  const PLURIELS = new Set(["États-Unis", "Pays-Bas", "Philippines", "Émirats arabes unis", "Bahamas", "Comores", "Maldives", "Seychelles", "Fidji"]);
  const SANS_ARTICLE = new Set(["Cuba", "Malte", "Chypre", "Singapour", "Monaco", "Israël", "Madagascar", "Haïti", "Taïwan", "Bahreïn", "Oman", "Hong Kong", "Maurice", "Porto Rico", "Andorre"]);
  type Genre = "m" | "f" | "pl" | "nu";
  const genre = (p: string): Genre =>
    PLURIELS.has(p) ? "pl" : SANS_ARTICLE.has(p) ? "nu" : MASCULINS.has(p) ? "m" : /e$/.test(p) ? "f" : "m";
  const nombre = (p: string) => {
    const g = genre(p);
    if (g === "nu") return p;
    if (g === "pl") return `les ${p}`;
    if (VOCAL.test(p)) return `l'${p}`;
    return `${g === "f" ? "la" : "le"} ${p}`;
  };
  const de = (p: string) => {
    const g = genre(p);
    if (g === "nu") return VOCAL.test(p) ? `d'${p}` : `de ${p}`;
    if (g === "pl") return `des ${p}`;
    if (VOCAL.test(p)) return `de l'${p}`;
    return g === "f" ? `de la ${p}` : `du ${p}`;
  };
  const en = (p: string) => {
    const g = genre(p);
    if (g === "nu") return VOCAL.test(p) || p === "Andorre" ? `en ${p}` : `à ${p}`;
    if (g === "pl") return `aux ${p}`;
    if (g === "f" || VOCAL.test(p)) return `en ${p}`;
    return `au ${p}`;
  };
  return { nombre, de, en, para: (p) => `pour ${nombre(p)}` };
})();

const pt: GramaticaPais = (() => {
  const SEM_ARTIGO = new Set([
    "Portugal",
    "Angola",
    "Moçambique",
    "Cabo Verde",
    "Cuba",
    "Israel",
    "Timor-Leste",
    "Andorra",
    "Mônaco",
    "Malta",
    "Singapura",
    "Macau",
    "Honduras",
    "El Salvador",
    "Porto Rico",
    "São Tomé e Príncipe",
    "Guiné-Bissau",
    "Madagascar",
    "Taiwan",
    "Hong Kong",
    "Omã",
    "Gana",
    "Chipre",
    "Luxemburgo",
  ]);
  const MASCULINOS = new Set(["Quênia", "Camboja"]);
  const PLURAIS: Readonly<Record<string, "os" | "as">> = {
    "Estados Unidos": "os",
    "Países Baixos": "os",
    "Emirados Árabes Unidos": "os",
    Filipinas: "as",
    Bahamas: "as",
    Maldivas: "as",
    Seychelles: "as",
  };
  const artigo = (p: string): "" | "o" | "a" | "os" | "as" =>
    SEM_ARTIGO.has(p) ? "" : (PLURAIS[p] ?? (MASCULINOS.has(p) ? "o" : /a$/.test(p) ? "a" : "o"));
  const comArtigo = (prep: "de" | "em", p: string) => {
    const a = artigo(p);
    if (!a) return `${prep} ${p}`;
    return `${prep === "de" ? "d" : "n"}${a} ${p}`;
  };
  const nombre = (p: string) => (artigo(p) ? `${artigo(p)} ${p}` : p);
  return { nombre, de: (p) => comArtigo("de", p), en: (p) => comArtigo("em", p), para: (p) => `para ${nombre(p)}` };
})();

const it: GramaticaPais = (() => {
  const SENZA_ARTICOLO = new Set(["Cuba", "Malta", "Cipro", "Singapore", "Israele", "Monaco", "Haiti", "Taiwan", "Hong Kong", "Madagascar", "San Marino"]);
  const CON_A = new Set(["Cuba", "Malta", "Cipro", "Singapore", "Monaco", "Haiti", "Taiwan", "Hong Kong", "San Marino"]);
  const PLURALI: Readonly<Record<string, "m" | "f">> = {
    "Stati Uniti": "m",
    "Paesi Bassi": "m",
    "Emirati Arabi Uniti": "m",
    Filippine: "f",
    Bahamas: "f",
    Maldive: "f",
    Seychelles: "f",
  };
  // Con modificador el país lleva artículo también después de «in» («nel Regno Unito»).
  const CON_IN_ARTICOLATO = new Set(["Regno Unito", "Repubblica Ceca", "Repubblica Dominicana", "Repubblica Centrafricana", "Sudafrica"]);
  const MASCHILI_IN_A = new Set(["Sri Lanka", "Canada", "Kenya", "Ghana", "Botswana", "Guatemala", "Nicaragua", "Panama", "Venezuela"]);
  const FEMMINILI_IN_A = new Set(["Costa Rica"]);
  const IMPURA = /^(?:s[^aeiou]|z|gn|ps|x|y)/i;
  type Forma = { art: string; elide: boolean };
  const articolo = (p: string): Forma => {
    if (SENZA_ARTICOLO.has(p)) return { art: "", elide: false };
    const pl = PLURALI[p];
    if (pl === "m") return { art: VOCAL.test(p) || IMPURA.test(p) ? "gli" : "i", elide: false };
    if (pl === "f") return { art: "le", elide: false };
    const femm = FEMMINILI_IN_A.has(p) || (/a$/.test(p) && !MASCHILI_IN_A.has(p));
    if (VOCAL.test(p)) return { art: "l'", elide: true };
    if (femm) return { art: "la", elide: false };
    return { art: IMPURA.test(p) ? "lo" : "il", elide: false };
  };
  const unisci = (art: string, p: string) => (art.endsWith("'") ? `${art}${p}` : `${art} ${p}`);
  const PREP: Readonly<Record<string, Readonly<Record<string, string>>>> = {
    di: { il: "del", lo: "dello", "l'": "dell'", la: "della", i: "dei", gli: "degli", le: "delle" },
    in: { il: "nel", lo: "nello", "l'": "nell'", la: "nella", i: "nei", gli: "negli", le: "nelle" },
  };
  const nombre = (p: string) => {
    const { art } = articolo(p);
    return art ? unisci(art, p) : p;
  };
  const di = (p: string) => {
    const { art } = articolo(p);
    return art ? unisci(PREP.di[art], p) : `di ${p}`;
  };
  const inn = (p: string) => {
    const { art } = articolo(p);
    if (!art) return CON_A.has(p) ? `a ${p}` : `in ${p}`;
    if (PLURALI[p] || CON_IN_ARTICOLATO.has(p)) return unisci(PREP.in[art], p);
    return `in ${p}`;
  };
  return { nombre, de: di, en: inn, para: (p) => `per ${nombre(p)}` };
})();

const de: GramaticaPais = (() => {
  // Formas declinadas para los países que llevan artículo: nominativo, dativo y acusativo.
  type Formas = { nom: string; dat: string; akk: string; im?: boolean };
  const f = (p: string): Formas => ({ nom: `die ${p}`, dat: `der ${p}`, akk: `die ${p}` });
  const m = (p: string): Formas => ({ nom: `der ${p}`, dat: `dem ${p}`, akk: `den ${p}`, im: true });
  const pl = (p: string, dat = p): Formas => ({ nom: `die ${p}`, dat: `den ${dat}`, akk: `die ${p}` });
  const TABELLE: Readonly<Record<string, Formas>> = {
    Schweiz: f("Schweiz"),
    Türkei: f("Türkei"),
    Slowakei: f("Slowakei"),
    Ukraine: f("Ukraine"),
    Mongolei: f("Mongolei"),
    "Dominikanische Republik": { nom: "die Dominikanische Republik", dat: "der Dominikanischen Republik", akk: "die Dominikanische Republik" },
    "Zentralafrikanische Republik": { nom: "die Zentralafrikanische Republik", dat: "der Zentralafrikanischen Republik", akk: "die Zentralafrikanische Republik" },
    Elfenbeinküste: f("Elfenbeinküste"),
    Iran: m("Iran"),
    Irak: m("Irak"),
    Jemen: m("Jemen"),
    Libanon: m("Libanon"),
    Sudan: m("Sudan"),
    Tschad: m("Tschad"),
    Niger: m("Niger"),
    Senegal: m("Senegal"),
    Kongo: m("Kongo"),
    USA: pl("USA"),
    "Vereinigte Staaten": pl("Vereinigten Staaten", "Vereinigten Staaten"),
    Niederlande: pl("Niederlande", "Niederlanden"),
    Philippinen: pl("Philippinen"),
    "Vereinigte Arabische Emirate": { nom: "die Vereinigten Arabischen Emirate", dat: "den Vereinigten Arabischen Emiraten", akk: "die Vereinigten Arabischen Emirate" },
    Bahamas: pl("Bahamas"),
    Malediven: pl("Malediven"),
    Seychellen: pl("Seychellen"),
    "Vereinigtes Königreich": { nom: "das Vereinigte Königreich", dat: "dem Vereinigten Königreich", akk: "das Vereinigte Königreich", im: true },
  };
  const verschmelzen = (prep: "in" | "von", x: Formas) => {
    if (x.im) return `${prep === "in" ? "im" : "vom"} ${x.dat.replace(/^dem /, "")}`;
    return `${prep} ${x.dat}`;
  };
  return {
    nombre: (p) => TABELLE[p]?.nom ?? p,
    de: (p) => (TABELLE[p] ? verschmelzen("von", TABELLE[p]) : `von ${p}`),
    en: (p) => (TABELLE[p] ? verschmelzen("in", TABELLE[p]) : `in ${p}`),
    para: (p) => `für ${TABELLE[p]?.akk ?? p}`,
  };
})();

const nl: GramaticaPais = (() => {
  const MET_LIDWOORD: Readonly<Record<string, "de" | "het">> = {
    "Verenigde Staten": "de",
    Filipijnen: "de",
    "Verenigde Arabische Emiraten": "de",
    "Bahama's": "de",
    Malediven: "de",
    Seychellen: "de",
    Comoren: "de",
    "Dominicaanse Republiek": "de",
    "Centraal-Afrikaanse Republiek": "de",
    "Tsjechische Republiek": "de",
    Salomonseilanden: "de",
    Marshalleilanden: "de",
    "Verenigd Koninkrijk": "het",
  };
  const nombre = (p: string) => (MET_LIDWOORD[p] ? `${MET_LIDWOORD[p]} ${p}` : p);
  return { nombre, de: (p) => `van ${nombre(p)}`, en: (p) => `in ${nombre(p)}`, para: (p) => `voor ${nombre(p)}` };
})();

// En polaco el nombre se declina: «Polska», «dla Polski», «w Polsce». La tabla cubre los países con
// forma irregular o con «na»/«we»; el resto sale por terminación (-ia y -ja dan -ii y -ji, -ka da
// -ki y -ce, -a da -y e -ie) y, si no termina en -a, se deja sin declinar.
const pl: GramaticaPais = (() => {
  const TABELA: Readonly<Record<string, readonly [string, string]>> = {
    Polska: ["Polski", "w Polsce"],
    Niemcy: ["Niemiec", "w Niemczech"],
    Francja: ["Francji", "we Francji"],
    Włochy: ["Włoch", "we Włoszech"],
    "Wielka Brytania": ["Wielkiej Brytanii", "w Wielkiej Brytanii"],
    "Stany Zjednoczone": ["Stanów Zjednoczonych", "w Stanach Zjednoczonych"],
    Czechy: ["Czech", "w Czechach"],
    Słowacja: ["Słowacji", "na Słowacji"],
    Ukraina: ["Ukrainy", "w Ukrainie"],
    Litwa: ["Litwy", "na Litwie"],
    Łotwa: ["Łotwy", "na Łotwie"],
    Węgry: ["Węgier", "na Węgrzech"],
    Niderlandy: ["Niderlandów", "w Niderlandach"],
    Chiny: ["Chin", "w Chinach"],
    Indie: ["Indii", "w Indiach"],
    Filipiny: ["Filipin", "na Filipinach"],
    Kanada: ["Kanady", "w Kanadzie"],
    Szwecja: ["Szwecji", "w Szwecji"],
    Meksyk: ["Meksyku", "w Meksyku"],
    Izrael: ["Izraela", "w Izraelu"],
    Cypr: ["Cypru", "na Cyprze"],
    Malta: ["Malty", "na Malcie"],
    Islandia: ["Islandii", "na Islandii"],
    Estonia: ["Estonii", "w Estonii"],
    Luksemburg: ["Luksemburga", "w Luksemburgu"],
    Singapur: ["Singapuru", "w Singapurze"],
    Japonia: ["Japonii", "w Japonii"],
  };
  const formy = (p: string): readonly [string, string] => {
    if (TABELA[p]) return TABELA[p];
    if (/[ij]a$/.test(p)) return [`${p.slice(0, -1)}i`, `w ${p.slice(0, -1)}i`];
    if (/ka$/.test(p)) return [`${p.slice(0, -1)}i`, `w ${p.slice(0, -2)}ce`];
    if (/[^aeiouy]a$/.test(p)) return [`${p.slice(0, -1)}y`, `w ${p.slice(0, -1)}ie`];
    return [p, `w ${p}`];
  };
  return { nombre: (p) => p, de: (p) => formy(p)[0], en: (p) => formy(p)[1], para: (p) => `dla ${formy(p)[0]}` };
})();


// Sin artículos ni plural: el país lleva la partícula detrás. Lugar y destino cambian el orden de
// toda la frase, así que los diccionarios de estos idiomas arman la oración con el nombre suelto y
// usan estas formas solo donde encajan tal cual.
const ja: GramaticaPais = { nombre: (p) => p, de: (p) => `${p}の`, en: (p) => `${p}で`, para: (p) => `${p}向け` };
const ko: GramaticaPais = { nombre: (p) => p, de: (p) => `${p}의`, en: (p) => `${p}에서`, para: (p) => `${p}용` };
// 的 y 在 se escriben igual en las dos escrituras; «para» se deja suelto porque 適用於/适用于 no.
const zh: GramaticaPais = { nombre: (p) => p, de: (p) => `${p}的`, en: (p) => `在${p}`, para: (p) => p };

// Búlgaro (ADR 0002, D24): no hay casos, pero sí artículo definido pospuesto. Los nombres propios de
// país van sin artículo («България», «Германия»); los que son una frase con sustantivo común
// («Съединени щати», «Доминиканска република», «Бахамски острови») o un plural («Филипини»,
// «Малдиви») lo llevan en la primera palabra («Съединените щати», «Доминиканската република»,
// «Филипините»). `de(p)` = «на» + nombre; `en(p)` = «в» + nombre, «във» delante de в o ф («във
// Франция», «във Виетнам») y «на» en los archipiélagos («на Малдивите», «на Бахамските острови»);
// `para(p)` = «за» + nombre. Los nombres llegan como los escribe Intl.DisplayNames en bg.
// Armenio oriental (ADR 0002, D30). Sin preposición: el caso es un sufijo que va solo en la última palabra
// del nombre («Բոսնիա և Հերցեգովինայում», «Միացյալ Նահանգների»). Lugar -ում, genitivo -ի, artículo -ը
// tras consonante y -ն tras vocal. «ա» y «ո» finales toman «յ» antes del sufijo que empieza por vocal
// («Կանադայում», «Կանադայի», «Մոնակոյի»), «ի», «ու», «ե», «է» no («Չիլիում», «Պերուի», «Զիմբաբվեում»).
// «-ություն» hace el genitivo en «-ության»; «կղզի» en «կղզու» y «կղզում». Lo que no es armenio lleva guion
// («Zetaland-ում», como «Google-ի»); una cifra queda sin sufijo. `para` = genitivo + «համար».
export function casosHy(pais: string): { nombre: string; lugar: string; genitivo: string } {
  const CORTOS: Readonly<Record<string, string>> = {
    "Հոնկոնգի ՀՎՇ": "Հոնկոնգ",
    "Չինաստանի Մակաո ՀՎՇ": "Մակաո",
    "Կոնգո - Կինշասա": "Կոնգոյի Դեմոկրատական Հանրապետություն",
    "Կոնգո - Բրազավիլ": "Կոնգոյի Հանրապետություն",
  };
  const p = CORTOS[pais] ?? pais.replace(/\s*\([^)]*\)$/, "");
  if (!/\p{L}/u.test(p)) return { nombre: p, lugar: p, genitivo: p };
  if (!/\p{sc=Armenian}$/u.test(p)) return { nombre: `${p}-ը`, lugar: `${p}-ում`, genitivo: `${p}-ի` };
  if (/(?:^|\s)կղզի$/.test(p)) {
    const raiz = p.slice(0, -1);
    return { nombre: `${p}ն`, lugar: `${raiz}ում`, genitivo: `${raiz}ու` };
  }
  const vocal = /[աեէիոօւ]$/.test(p);
  const puente = /[աո]$/.test(p) ? "յ" : "";
  const genitivo = /ություն$/.test(p) ? p.replace(/ություն$/, "ության") : `${p}${puente}ի`;
  return { nombre: `${p}${vocal ? "ն" : "ը"}`, lugar: `${p}${puente}ում`, genitivo };
}

const hy: GramaticaPais = {
  nombre: (p) => casosHy(p).nombre,
  de: (p) => casosHy(p).genitivo,
  en: (p) => casosHy(p).lugar,
  para: (p) => `${casosHy(p).genitivo} համար`,
};

const bg: GramaticaPais = (() => {
  const SUSTANTIVO_COMUN = new Set(["щати", "емирства", "република", "острови", "кралство", "федерация"]);
  const PLURALES = new Set(["Филипини", "Малдиви", "Сейшели", "Бахами", "Комори"]);
  const ARCHIPIELAGOS = new Set(["Малдиви", "Сейшели", "Бахами", "Комори"]);
  const YA_ARTICULADO = /(?:те|та|то|ят)$/;
  const articular = (w: string): string => {
    if (YA_ARTICULADO.test(w)) return w;
    if (/и$/.test(w)) return `${w}те`;
    if (/[ая]$/.test(w)) return `${w}та`;
    if (/о$/.test(w)) return `${w}то`;
    return w;
  };
  const nombre = (p: string): string => {
    if (PLURALES.has(p)) return `${p}те`;
    const palabras = p.split(" ");
    if (palabras.length >= 2 && !/[,(]/.test(p) && SUSTANTIVO_COMUN.has(palabras[palabras.length - 1])) {
      return [articular(palabras[0]), ...palabras.slice(1)].join(" ");
    }
    return p;
  };
  const en = (p: string): string => {
    const n = nombre(p);
    if (ARCHIPIELAGOS.has(p) || / острови$/.test(p)) return `на ${n}`;
    return `${/^[ВвФф]/.test(n) ? "във" : "в"} ${n}`;
  };
  return { nombre, de: (p) => `на ${nombre(p)}`, en, para: (p) => `за ${nombre(p)}` };
})();

// Sueco, danés y noruego no declinan el nombre del país: «i Sverige», «för Sverige».
const sv: GramaticaPais = { nombre: (p) => p, de: (p) => `för ${p}`, en: (p) => `i ${p}`, para: (p) => `för ${p}` };
const da: GramaticaPais = { nombre: (p) => p, de: (p) => `for ${p}`, en: (p) => `i ${p}`, para: (p) => `for ${p}` };
const nb: GramaticaPais = { nombre: (p) => p, de: (p) => `for ${p}`, en: (p) => `i ${p}`, para: (p) => `for ${p}` };

// En finés el nombre se declina y no lleva preposición: «Suomi», «Suomen» (genitivo), «Suomessa»
// (inesivo) o «Maltalla» (adesivo, islas y algunos países). `de` y `para` devuelven el genitivo, que
// va DELANTE del sustantivo («Suomen laskurit», «Suomen viralliset tiedot»); `en` devuelve el caso de
// lugar entero («Suomessa»). La tabla cubre los nombres compuestos, los plurales y los que van con
// -lla; el resto sale por regla: gradación consonántica en la última sílaba (Islanti → Islannin,
// Kreikka → Kreikan, Itävalta → Itävallan), -in/-issa tras consonante y armonía vocálica según la
// última palabra del nombre (Ruotsissa, Sveitsissä).
const fi: GramaticaPais = (() => {
  const TAULU: Readonly<Record<string, readonly [string, string]>> = {
    Suomi: ["Suomen", "Suomessa"],
    Yhdysvallat: ["Yhdysvaltojen", "Yhdysvalloissa"],
    "Iso-Britannia": ["Ison-Britannian", "Isossa-Britanniassa"],
    "Uusi-Seelanti": ["Uuden-Seelannin", "Uudessa-Seelannissa"],
    Alankomaat: ["Alankomaiden", "Alankomaissa"],
    Filippiinit: ["Filippiinien", "Filippiineillä"],
    "Arabiemiirikunnat": ["Arabiemiirikuntien", "Arabiemiirikunnissa"],
    "Yhdistyneet arabiemiirikunnat": ["Yhdistyneiden arabiemiirikuntien", "Yhdistyneissä arabiemiirikunnissa"],
    Seychellit: ["Seychellien", "Seychelleillä"],
    Malediivit: ["Malediivien", "Malediiveilla"],
    Bahama: ["Bahaman", "Bahamalla"],
    Venäjä: ["Venäjän", "Venäjällä"],
    Malta: ["Maltan", "Maltalla"],
    Kypros: ["Kyproksen", "Kyproksella"],
    Barbados: ["Barbadoksen", "Barbadoksella"],
    Mauritius: ["Mauritiuksen", "Mauritiuksella"],
    Jamaika: ["Jamaikan", "Jamaikalla"],
    Madagaskar: ["Madagaskarin", "Madagaskarilla"],
    Liechtenstein: ["Liechtensteinin", "Liechtensteinissa"],
    Belize: ["Belizen", "Belizessä"],
  };
  const VOKAALI = /[aeiouyäö]$/;
  const taka = (p: string) => /[aou]/.test(p.split(/[\s-]/).pop()!.toLowerCase());
  // Gradación consonántica de la última sílaba, solo en los patrones que aparecen en nombres de país.
  const vartalo = (p: string) =>
    p
      .replace(/nti$/, "nni")
      .replace(/lta$/, "lla")
      .replace(/kk([aeiouyäö])$/, "k$1")
      .replace(/tt([aeiouyäö])$/, "t$1")
      .replace(/pp([aeiouyäö])$/, "p$1");
  const muodot = (p: string): readonly [string, string] => {
    if (TAULU[p]) return TAULU[p];
    const ssa = taka(p) ? "ssa" : "ssä";
    if (!VOKAALI.test(p)) return [`${p}in`, `${p}i${ssa}`];
    const v = vartalo(p);
    return [`${v}n`, `${v}${ssa}`];
  };
  return { nombre: (p) => p, de: (p) => muodot(p)[0], en: (p) => muodot(p)[1], para: (p) => muodot(p)[0] };
})();

// La pertenencia va por idafa (el nombre suelto detrás del sustantivo, que no lleva «ال»: «حاسبات مصر»);
// «ل» se pega al nombre y con artículo queda «لل» («للسعودية»).
const ar: GramaticaPais = {
  nombre: (p) => p,
  de: (p) => p,
  en: (p) => `في ${p}`,
  para: (p) => (p.startsWith("ال") ? `لل${p.slice(2)}` : `ل${p}`),
};

// El indonesio no tiene artículos ni declinación: el poseedor va detrás del sustantivo sin preposición
// («pajak Indonesia», «kalkulator Malaysia»), el lugar con «di» y el destino con «untuk».
const idn: GramaticaPais = { nombre: (p) => p, de: (p) => p, en: (p) => `di ${p}`, para: (p) => `untuk ${p}` };

// El turco no tiene artículos: el caso va como sufijo detrás del nombre, separado con apóstrofo por
// ser nombre propio («Türkiye'de», «Almanya'nın»). El sufijo sigue la armonía vocálica de la última
// vocal (a/ı/o/u atrás, e/i/ö/ü adelante) y la consonante final: tras f, s, t, k, ç, ş, h, p el
// locativo endurece la d («Kuveyt'te», «Fas'ta»). Tras vocal, el genitivo suma n («Peru'nun»). Una
// sigla se lee por el nombre de sus letras («ABD'de», «BAE'nin»). Un nombre compuesto con posesivo
// («Dominik Cumhuriyeti», «Birleşik Arap Emirlikleri») toma la n pronominal: «Cumhuriyeti'nde».
// Las minúsculas van con la i del turco (toLocaleLowerCase("tr-TR"): «I» es «ı» e «İ» es «i»).
const tr: GramaticaPais = (() => {
  const VOCALES = "aıoueiöü";
  const ATRAS = new Set(["a", "ı", "o", "u"]);
  const SORDAS = new Set(["f", "s", "t", "k", "ç", "ş", "h", "p"]);
  // Vocales con acento de nombres extranjeros, a su vocal turca.
  const PLANAS: Readonly<Record<string, string>> = { â: "a", á: "a", à: "a", ä: "e", î: "i", í: "i", ì: "i", û: "u", ú: "u", ù: "u", é: "e", è: "e", ê: "e", ë: "e", ó: "o", ò: "o", ô: "o" };
  const POSESIVO = /(?:Cumhuriyeti|Devletleri|Emirlikleri|Adaları|Sahili|Federasyonu|Prensliği|Krallığı|Bölgesi|Topluluğu|Birliği)$/u;
  // La sigla se pronuncia por letras: la última suena «ka» (K) o con e («be», «de», «ce»).
  const sonidoDeSigla = (letra: string) => (VOCALES.includes(letra) ? letra : letra === "k" ? "ka" : `${letra}e`);
  const sonido = (p: string): string => {
    const ultima = p.trim().split(/\s+/).at(-1) ?? p;
    const limpia = ultima.replace(/[^\p{L}]/gu, "");
    const esSigla = limpia.length > 1 && limpia === limpia.toLocaleUpperCase("tr-TR") && limpia !== limpia.toLocaleLowerCase("tr-TR");
    const baja = [...limpia.toLocaleLowerCase("tr-TR")].map((c) => PLANAS[c] ?? c).join("");
    return esSigla ? sonidoDeSigla(baja.at(-1) ?? "e") : baja;
  };
  // La l final de algunos préstamos es palatal y pide sufijo de adelante («Senegal'de», «Nepal'de»).
  const L_PALATAL = /^(?:senegal|nepal)$/u;
  const ultimaVocal = (s: string) => (L_PALATAL.test(s) ? "e" : ([...s].reverse().find((c) => VOCALES.includes(c)) ?? "e"));
  // Armonía de dos formas (a/e) y de cuatro (ı/i/u/ü).
  const a2 = (v: string) => (ATRAS.has(v) ? "a" : "e");
  const i4 = (v: string) => (v === "a" || v === "ı" ? "ı" : v === "e" || v === "i" ? "i" : v === "o" || v === "u" ? "u" : "ü");
  const de = (p: string) => {
    const s = sonido(p);
    const trasVocal = VOCALES.includes(s.at(-1) ?? "") || POSESIVO.test(p);
    return `${p}'${trasVocal ? "n" : ""}${i4(ultimaVocal(s))}n`;
  };
  const en = (p: string) => {
    const s = sonido(p);
    const v = a2(ultimaVocal(s));
    if (POSESIVO.test(p)) return `${p}'nd${v}`;
    return `${p}'${SORDAS.has(s.at(-1) ?? "") ? "t" : "d"}${v}`;
  };
  return { nombre: (p) => p, de, en, para: (p) => `${p} için` };
})();

// El bengalí no tiene artículos y marca el caso con un sufijo pegado al nombre. Genitivo: «-এর» tras
// consonante (বাংলাদেশের, ভারতের, জাপানের) y «-র» tras vocal (কানাডার, ইতালির, মেক্সিকোর). Locativo:
// «-এ» tras consonante (বাংলাদেশে, জাপানে), «-য়» tras «া» (কানাডায়, অস্ট্রেলিয়ায়) y «-তে» tras las
// demás vocales (ইতালিতে, মেক্সিকোতে). El destino es el genitivo con «জন্য» (বাংলাদেশের জন্য). Tras
// «ং» o «ঃ» el sufijo lleva «য়» (হংকংয়ের, হংকংয়ে). Un nombre que termina en letra latina o número
// (raro en DisplayNames bn) lleva el sufijo separado por guion, como se escribe en la prensa.
const bn: GramaticaPais = (() => {
  const SIGNO_VOCAL = /[\u09BE-\u09CC\u09D7]$/u;
  const VOCAL_LIBRE = /[\u0985-\u0994]$/u;
  const NASAL = /[\u0982\u0983]$/u;
  const BENGALI = /[\u0980-\u09FF]$/u;
  const de = (p: string) => {
    if (!BENGALI.test(p)) return `${p}-এর`;
    if (NASAL.test(p)) return `${p}য়ের`;
    return SIGNO_VOCAL.test(p) || VOCAL_LIBRE.test(p) ? `${p}র` : `${p}ের`;
  };
  const en = (p: string) => {
    if (!BENGALI.test(p)) return `${p}-এ`;
    if (NASAL.test(p)) return `${p}য়ে`;
    if (/া$/u.test(p)) return `${p}য়`;
    return SIGNO_VOCAL.test(p) || VOCAL_LIBRE.test(p) ? `${p}তে` : `${p}ে`;
  };
  return { nombre: (p) => p, de, en, para: (p) => `${de(p)} জন্য` };
})();

// El tailandés no declina ni tiene artículos: «ของ» para el poseedor, «ใน» para el lugar y «สำหรับ»
// para el destino, pegados al nombre como se escribe en tailandés («ในประเทศไทย»).
const th: GramaticaPais = { nombre: (p) => p, de: (p) => `ของ${p}`, en: (p) => `ใน${p}`, para: (p) => `สำหรับ${p}` };

// Ucraniano (ADR 0002, D15): el nombre del país se declina. `de(p)` da el genitivo suelto
// («України», «Німеччини»), que va detrás del sustantivo («калькулятори України»); `en(p)` el lugar
// con su preposición («в Україні», «у Німеччині», «на Філіппінах») y `para(p)` «для» + genitivo. Los
// nombres llegan como los escribe Intl.DisplayNames en uk, así que la regla cubre los de una palabra
// (-ія da -ії; -а da -и/-і, con к→ц, г→з y х→с en el locativo; los masculinos en consonante, -у e -і;
// -й y -ь, -ю e -ї/-і; en -к el locativo también es -у: «в Іраку», «у Мозамбіку») y los compuestos (los adjetivos de delante en -а, -і, -е o -ий; los plurales
// en -и dan -ів y -ах). La tabla lleva los irregulares y los plurales femeninos, y CON_NA los nombres
// de isla que van con «на». La preposición es «в» ante vocal y «у» ante consonante (nunca «на
// Україні»). Lo que termina en otra vocal (Чилі, Перу, Марокко) y las siglas no se declinan.
const uk: GramaticaPais = (() => {
  // [genitivo, locativo] sin preposición.
  const TABLA: Readonly<Record<string, readonly [string, string]>> = {
    Білорусь: ["Білорусі", "Білорусі"],
    Єгипет: ["Єгипту", "Єгипті"],
    Філіппіни: ["Філіппін", "Філіппінах"],
    Багами: ["Багам", "Багамах"],
    Бангладеш: ["Бангладеш", "Бангладеш"],
    "Сент-Вінсент і Гренадіни": ["Сент-Вінсенту і Гренадин", "Сент-Вінсенті і Гренадинах"],
    "Демократична Республіка Конго": ["Демократичної Республіки Конго", "Демократичній Республіці Конго"],
  };
  const CON_NA = new Set([
    "Філіппіни", "Кіпр", "Мальта", "Куба", "Ямайка", "Маврикій", "Мадагаскар", "Багами", "Багамські Острови", "Мальдіви",
    "Сейшельські Острови", "Барбадос", "Гаїті", "Фіджі", "Шрі-Ланка", "Сент-Вінсент і Гренадіни", "Соломонові Острови",
    "Маршаллові Острови", "Кабо-Верде", "Коморські Острови", "Бермудські Острови", "Кайманові Острови", "Фарерські Острови",
  ]);
  const VOCAL = /^[АЕЄИІЇОУЮЯаеєиіїоуюя]/;
  const SIGLA = /^[А-ЩЬЮЯЄІЇҐ]{2,}$/;
  // Un sustantivo (la última palabra, o la última parte de un compuesto con guion).
  const sustantivo = (w: string): readonly [string, string] => {
    const guion = w.lastIndexOf("-");
    if (guion > 0) {
      const [g, l] = sustantivo(w.slice(guion + 1));
      return [w.slice(0, guion + 1) + g, w.slice(0, guion + 1) + l];
    }
    if (SIGLA.test(w)) return [w, w];
    const raiz = w.slice(0, -1);
    if (/ія$/.test(w)) return [`${w.slice(0, -2)}ії`, `${w.slice(0, -2)}ії`];
    if (/[аеєиіїоуюя]я$/.test(w)) return [`${raiz}ї`, `${raiz}ї`];
    if (/ій$/.test(w)) return [`${w.slice(0, -2)}ію`, `${w.slice(0, -2)}ії`];
    if (/[аеєиіїоуюя]а$/.test(w)) return [w, w];
    if (/а$/.test(w)) {
      const c = raiz.at(-1) ?? "";
      const gen = "жчшщ".includes(c) ? `${raiz}і` : `${raiz}и`;
      const base = raiz.slice(0, -1);
      const loc = c === "к" ? `${base}ці` : c === "г" ? `${base}зі` : c === "х" ? `${base}сі` : `${raiz}і`;
      return [gen, loc];
    }
    if (/и$/.test(w)) return [`${raiz}ів`, `${raiz}ах`];
    if (/й$/.test(w)) return [`${raiz}ю`, `${raiz}ї`];
    if (/ь$/.test(w)) return [`${raiz}ю`, `${raiz}і`];
    if (/г$/.test(w)) return [`${w}у`, `${raiz}зі`];
    if (/к$/.test(w)) return [`${w}у`, `${w}у`];
    if (/[бвґджзклмнпрстфхцчшщ]$/.test(w)) return [`${w}у`, `${w}і`];
    return [w, w];
  };
  // Un adjetivo delante del sustantivo: «Велика», «Сполучені», «Сполучене».
  const adjetivo = (w: string): readonly [string, string] => {
    if (/а$/.test(w)) return [`${w.slice(0, -1)}ої`, `${w.slice(0, -1)}ій`];
    if (/і$/.test(w)) return [`${w.slice(0, -1)}их`, `${w.slice(0, -1)}их`];
    if (/е$/.test(w)) return [`${w.slice(0, -1)}ого`, `${w.slice(0, -1)}ому`];
    if (/ий$/.test(w)) return [`${w.slice(0, -2)}ого`, `${w.slice(0, -2)}ому`];
    return [w, w];
  };
  const frase = (p: string): readonly [string, string] => {
    const palabras = p.split(" ");
    const formas = palabras.map((w, i) => (i === palabras.length - 1 ? sustantivo(w) : adjetivo(w)));
    return [formas.map((f) => f[0]).join(" "), formas.map((f) => f[1]).join(" ")];
  };
  const formas = (p: string): readonly [string, string] => {
    if (TABLA[p]) return TABLA[p];
    const coma = p.indexOf(", ");
    if (coma > 0) {
      const [g, l] = formas(p.slice(0, coma));
      return [g + p.slice(coma), l + p.slice(coma)];
    }
    if (p.includes(" і ")) {
      const partes = p.split(" і ").map(formas);
      return [partes.map((f) => f[0]).join(" і "), partes.map((f) => f[1]).join(" і ")];
    }
    return frase(p);
  };
  const en = (p: string) => {
    const loc = formas(p)[1];
    return `${CON_NA.has(p) ? "на" : VOCAL.test(loc) ? "в" : "у"} ${loc}`;
  };
  return { nombre: (p) => p, de: (p) => formas(p)[0], en, para: (p) => `для ${formas(p)[0]}` };
})();

// El uzbeko no tiene artículos: el caso va como sufijo pegado al nombre, sin apóstrofo y sin armonía
// vocálica (la ortografía latina de 1995 escribe «Oʻzbekistonda», «Germaniyaning», «AQShda»). Genitivo
// -ning, locativo -da y «para» con la posposición suelta «uchun». Un nombre compuesto toma el sufijo
// en la última palabra («Kongo Demokratik Respublikasida»). Los diccionarios no pegan sufijos a cifras
// ni a valores interpolados (ADR 0002, D16).
const uz: GramaticaPais = { nombre: (p) => p, de: (p) => `${p}ning`, en: (p) => `${p}da`, para: (p) => `${p} uchun` };

// Ruso (ADR 0002, D17): el nombre del país se declina. `de(p)` da el genitivo suelto («Казахстана»,
// «Германии»), que va detrás del sustantivo («калькуляторы Казахстана»); `en(p)` el lugar con su
// preposición («в Казахстане», «во Франции», «на Кипре») y `para(p)` «для» + genitivo. Los nombres
// llegan como los escribe Intl.DisplayNames en ru, así que la regla cubre los de una palabra (-ия da
// -ии; -а da -ы o -и tras г, к, х, ж, ч, ш, щ y -е en el lugar; -я da -и y -е; los masculinos en
// consonante, -а y -е; -й y -ь, -я y -е; -ий, -ия e -ии) y los compuestos (los adjetivos de delante en
// -ая, -ые/-ие, -ый/-ий/-ой, -ое o el posesivo -ы; los plurales en -ы dan -ов y -ах). La tabla lleva
// los irregulares (vocal que cae, femeninos en -ь, plurales sin -ов, aposiciones como «Республика
// Корея») y CON_NA los nombres de isla que van con «на». La preposición es «во» ante в o ф seguidas de
// consonante («во Франции», «во Вьетнаме») y «в» en el resto; Украина va con «в», como en la prensa de
// Kazajistán. Lo que termina en otra vocal (Чили, Перу, Марокко, Никарагуа) y las siglas (США, ОАЭ) no
// se declinan.
const ru: GramaticaPais = (() => {
  // [genitivo, locativo] sin preposición.
  const TABLA: Readonly<Record<string, readonly [string, string]>> = {
    Беларусь: ["Беларуси", "Беларуси"],
    Египет: ["Египта", "Египте"],
    Бангладеш: ["Бангладеш", "Бангладеш"],
    Филиппины: ["Филиппин", "Филиппинах"],
    Мальдивы: ["Мальдив", "Мальдивах"],
    Багамы: ["Багам", "Багамах"],
    Коморы: ["Комор", "Коморах"],
    Гренадины: ["Гренадин", "Гренадинах"],
    "Гвинея-Бисау": ["Гвинеи-Бисау", "Гвинее-Бисау"],
    "Республика Корея": ["Республики Корея", "Республике Корея"],
    "Республика Конго": ["Республики Конго", "Республике Конго"],
    "Демократическая Республика Конго": ["Демократической Республики Конго", "Демократической Республике Конго"],
    "Конго - Киншаса": ["Конго - Киншаса", "Конго - Киншаса"],
    "Конго - Браззавиль": ["Конго - Браззавиль", "Конго - Браззавиль"],
  };
  const CON_NA = new Set([
    "Филиппины", "Кипр", "Мальта", "Куба", "Ямайка", "Маврикий", "Мадагаскар", "Багамы", "Мальдивы", "Барбадос", "Гаити",
    "Фиджи", "Шри-Ланка", "Тайвань", "Гренада", "Доминика", "Сент-Люсия", "Сент-Винсент и Гренадины", "Сент-Китс и Невис",
    "Тринидад и Тобаго", "Антигуа и Барбуда", "Кабо-Верде", "Коморы", "Самоа", "Тонга", "Науру", "Тувалу", "Палау",
    "Кирибати", "Сан-Томе и Принсипи", "Мартиника", "Гваделупа", "Реюньон",
  ]);
  const VOCAL = /[аеёиоуыэюя]$/;
  const SIGLA = /^[А-ЯЁ]{2,}$/;
  // Un sustantivo (la última palabra, o la última parte de un compuesto con guion).
  const sustantivo = (w: string): readonly [string, string] => {
    if (TABLA[w]) return TABLA[w];
    const guion = w.lastIndexOf("-");
    if (guion > 0) {
      const [g, l] = sustantivo(w.slice(guion + 1));
      return [w.slice(0, guion + 1) + g, w.slice(0, guion + 1) + l];
    }
    if (SIGLA.test(w)) return [w, w];
    const raiz = w.slice(0, -1);
    if (/ия$/.test(w)) return [`${raiz}и`, `${raiz}и`];
    if (/я$/.test(w)) return [`${raiz}и`, `${raiz}е`];
    if (/[аеёиоуыэюя]а$/.test(w)) return [w, w];
    if (/а$/.test(w)) return [`${raiz}${/[гкхжчшщ]$/.test(raiz) ? "и" : "ы"}`, `${raiz}е`];
    if (/ы$/.test(w)) return [`${raiz}ов`, `${raiz}ах`];
    if (/ий$/.test(w)) return [`${raiz}я`, `${raiz}и`];
    if (/[йь]$/.test(w)) return [`${raiz}я`, `${raiz}е`];
    if (VOCAL.test(w)) return [w, w];
    if (/[бвгджзклмнпрстфхцчшщ]$/.test(w)) return [`${w}а`, `${w}е`];
    return [w, w];
  };
  // Un adjetivo delante del sustantivo: «Новая», «Соединенные», «Восточный», «Американское»,
  // «Соломоновы».
  const adjetivo = (w: string): readonly [string, string] => {
    if (/ая$/.test(w)) return [`${w.slice(0, -2)}ой`, `${w.slice(0, -2)}ой`];
    if (/яя$/.test(w)) return [`${w.slice(0, -2)}ей`, `${w.slice(0, -2)}ей`];
    if (/[ыи]е$/.test(w)) return [`${w.slice(0, -1)}х`, `${w.slice(0, -1)}х`];
    if (/[ыио]й$/.test(w)) return [`${w.slice(0, -2)}ого`, `${w.slice(0, -2)}ом`];
    if (/ое$/.test(w)) return [`${w.slice(0, -2)}ого`, `${w.slice(0, -2)}ом`];
    if (/ы$/.test(w)) return [`${w}х`, `${w}х`];
    return [w, w];
  };
  const frase = (p: string): readonly [string, string] => {
    const palabras = p.split(" ");
    const formas = palabras.map((w, i) => (i === palabras.length - 1 ? sustantivo(w) : adjetivo(w)));
    return [formas.map((f) => f[0]).join(" "), formas.map((f) => f[1]).join(" ")];
  };
  const formas = (p: string): readonly [string, string] => {
    if (TABLA[p]) return TABLA[p];
    // «Гонконг (САР)», «Мьянма (Бирма)»: se declina lo de antes del paréntesis.
    const parentesis = p.indexOf(" (");
    if (parentesis > 0) {
      const [g, l] = formas(p.slice(0, parentesis));
      return [g + p.slice(parentesis), l + p.slice(parentesis)];
    }
    const coma = p.indexOf(", ");
    if (coma > 0) {
      const [g, l] = formas(p.slice(0, coma));
      return [g + p.slice(coma), l + p.slice(coma)];
    }
    // «Папуа — Новая Гвинея»: se declina la última parte.
    const raya = p.lastIndexOf(" — ");
    if (raya > 0) {
      const [g, l] = formas(p.slice(raya + 3));
      return [p.slice(0, raya + 3) + g, p.slice(0, raya + 3) + l];
    }
    if (p.includes(" и ")) {
      const partes = p.split(" и ").map(formas);
      return [partes.map((f) => f[0]).join(" и "), partes.map((f) => f[1]).join(" и ")];
    }
    return frase(p);
  };
  const en = (p: string) => {
    const loc = formas(p)[1];
    return `${CON_NA.has(p) ? "на" : /^[ВвФф][^аеёиоуыэюяАЕЁИОУЫЭЮЯ]/.test(loc) ? "во" : "в"} ${loc}`;
  };
  return { nombre: (p) => p, de: (p) => formas(p)[0], en, para: (p) => `для ${formas(p)[0]}` };
})();

// Rumano (ADR 0002, D18): el artículo va pegado al final del nombre (enclítico) y el genitivo cambia
// la terminación. Los nombres llegan como los escribe Intl.DisplayNames en ro: los femeninos ya
// articulados («România», «Germania», «Franța»), los masculinos y neutros sin artículo («Mexic»,
// «Kazahstan», «Cipru») y los compuestos con el artículo en la primera palabra («Statele Unite ale
// Americii», «Regatul Unit», «Țările de Jos»). `nombre(p)` da la forma de sujeto («Mexicul»,
// «România»); `de(p)` el genitivo que va detrás de un sustantivo articulado («calculatoarele
// României», «salariul minim al Mexicului» no: «salariul Mexicului»). Los que no se declinan en el uso
// (Chile, Peru, Singapore, Haiti, Togo, siglas, nombres con coma, guion o paréntesis) van con «din»
// («calculatoarele din Chile»), que entra en el mismo lugar. `en(p)` da el lugar («în România», «în
// Mexic», «în Statele Unite ale Americii») y `para(p)` «pentru» con el nombre tal cual («pentru
// România», «pentru Republica Moldova»). Genitivo: -ia da -iei («României»), -ea da -eei («Coreei»),
// -ca da -căi («Jamaicăi»), el resto de -a da -ei («Franței», «Canadei», «Moldovei»); en la primera
// palabra de un compuesto -ul da -ului y -ele/-ile dan -elor/-ilor, y los adjetivos en -ă que siguen
// dan -e («Arabiei Saudite», «Republicii Dominicane»); los masculinos en consonante suman -ului
// («Mexicului», «Kazahstanului»). La tabla lleva lo que no sale por regla (Africa, Republica, Noua
// Zeelandă, Filipine, Costa Rica, Bosnia și Herțegovina).
const ro: GramaticaPais = (() => {
  // [genitivo, nominativo articulado]
  const TABLA: Readonly<Record<string, readonly [string, string]>> = {
    Africa: ["Africii", "Africa"],
    America: ["Americii", "America"],
    Republica: ["Republicii", "Republica"],
    "Noua Zeelandă": ["Noii Zeelande", "Noua Zeelandă"],
    Filipine: ["Filipinelor", "Filipinele"],
    "Costa Rica": ["Costa Ricăi", "Costa Rica"],
    "Bosnia și Herțegovina": ["Bosniei și Herțegovinei", "Bosnia și Herțegovina"],
  };
  // Van con «din» aunque la terminación pida otra cosa (vocal tónica final o nombre fijo).
  const CON_DIN = new Set(["Chile", "Peru", "El Salvador", "Bahamas", "Sierra Leone", "Burkina Faso", "Tuvalu", "Vanuatu", "Palau", "Nauru"]);
  const CONSONANTE = /[bcdfghjklmnpqrstvwxyzșț]$/;
  // La primera palabra de un nombre ya articulado (o un nombre de una sola palabra).
  const genitivoArticulado = (w: string): string | null => {
    if (TABLA[w]) return TABLA[w][0];
    if (/ia$/.test(w)) return `${w.slice(0, -1)}ei`;
    if (/ea$/.test(w)) return `${w.slice(0, -1)}i`;
    if (/ca$/.test(w)) return `${w.slice(0, -1)}ăi`;
    if (/a$/.test(w)) return `${w.slice(0, -1)}ei`;
    if (/ul$/.test(w)) return `${w}ui`;
    if (/[ei]le$/.test(w)) return `${w.slice(0, -1)}or`;
    return null;
  };
  const formas = (p: string): { gen: string | null; nom: string } => {
    if (TABLA[p]) return { gen: TABLA[p][0], nom: TABLA[p][1] };
    if (CON_DIN.has(p) || /[.,()’'\d-]/.test(p) || /^[A-ZĂÂÎȘȚ]{2,}$/.test(p) || p.includes(" și ")) return { gen: null, nom: p };
    const palabras = p.split(" ");
    if (palabras.length === 1) {
      const art = genitivoArticulado(p);
      if (art) return { gen: art, nom: p };
      if (/[bcdfghjklmnpqrstvwxzșț]ru$/.test(p)) return { gen: `${p}lui`, nom: `${p}l` };
      if (CONSONANTE.test(p)) return { gen: `${p}ului`, nom: `${p}ul` };
      return { gen: null, nom: p };
    }
    const primera = genitivoArticulado(palabras[0]);
    if (!primera) return { gen: null, nom: p };
    // Los adjetivos femeninos en -ă que siguen al sustantivo concuerdan («Saudită» da «Saudite»).
    const resto = palabras.slice(1).map((w) => (/^\p{Lu}/u.test(w) && /ă$/.test(w) ? `${w.slice(0, -1)}e` : w));
    return { gen: [primera, ...resto].join(" "), nom: p };
  };
  return {
    nombre: (p) => formas(p).nom,
    de: (p) => formas(p).gen ?? `din ${p}`,
    en: (p) => `în ${p}`,
    para: (p) => `pentru ${p}`,
  };
})();

// Checo (ADR 0002, D19): el nombre del país se declina. `de(p)` da el genitivo suelto («Česka»,
// «Německa», «Spojených států»), `en(p)` el lugar con su preposición («v Česku», «ve Francii», «na
// Slovensku», «na Filipínách») y `para(p)` «pro» + acusativo («pro Česko», «pro Kanadu», «pro
// Francii»). Los nombres llegan como los escribe Intl.DisplayNames en cs, así que la regla cubre los
// de una palabra por terminación (-o neutro: -a/-u; -ie: -ie/-ii/-ii; -a dura: -y, -ě/-e con la
// alternancia k→c, h/g→z, ch→š, r→ř, y -u; -a blanda: -e/-i/-u; consonante dura: -u; blanda: -e/-i;
// plurales en -y: sin -y y -ách) y los compuestos (adjetivos delante en -á, -ý, -é, -í y -ovy; partes
// unidas con « a »; un agregado entre paréntesis o tras « – » queda igual). La tabla lleva los
// irregulares y CON_NA los países e islas que van con «na». La preposición es «ve» ante v/f y ante
// s, z, š, ž seguidas de consonante (salvo r: «v Srbsku»). Lo que termina en -i, -u o -e (Chile,
// Peru, Haiti, Zimbabwe) no se declina. `padyCs` deja los tres casos y la preposición sueltos para
// las frases que los necesitan por separado.
export interface PadyCs {
  genitiv: string;
  lokal: string;
  akuzativ: string;
  // «v», «ve» o «na»
  predlozka: string;
}

export const padyCs: (pais: string) => PadyCs = (() => {
  // [genitivo, locativo, acusativo] sin preposición.
  type Formas = readonly [string, string, string];
  const TABLA: Readonly<Record<string, Formas>> = {
    Egypt: ["Egypta", "Egyptě", "Egypt"],
    Izrael: ["Izraele", "Izraeli", "Izrael"],
    Keňa: ["Keni", "Keni", "Keňu"],
    Uruguay: ["Uruguaye", "Uruguayi", "Uruguay"],
    Paraguay: ["Paraguaye", "Paraguayi", "Paraguay"],
    Mauricius: ["Mauricia", "Mauriciu", "Mauricius"],
    "Spojené státy": ["Spojených států", "Spojených státech", "Spojené státy"],
    "Spojené arabské emiráty": ["Spojených arabských emirátů", "Spojených arabských emirátech", "Spojené arabské emiráty"],
    "Burkina Faso": ["Burkiny Faso", "Burkině Faso", "Burkinu Faso"],
    "Guinea-Bissau": ["Guineje-Bissau", "Guineji-Bissau", "Guineu-Bissau"],
    "Papua-Nová Guinea": ["Papuy-Nové Guineje", "Papui-Nové Guineji", "Papuu-Novou Guineu"],
    "Pobřeží slonoviny": ["Pobřeží slonoviny", "Pobřeží slonoviny", "Pobřeží slonoviny"],
    "Palestinská území": ["Palestinských území", "Palestinských územích", "Palestinská území"],
    "Svatý Kryštof a Nevis": ["Svatého Kryštofa a Nevisu", "Svatém Kryštofu a Nevisu", "Svatý Kryštof a Nevis"],
    "Svatý Tomáš a Princův ostrov": ["Svatého Tomáše a Princova ostrova", "Svatém Tomáši a Princově ostrově", "Svatý Tomáš a Princův ostrov"],
    "Ostrov Man": ["Ostrova Man", "Ostrově Man", "Ostrov Man"],
    Ålandy: ["Ålandských ostrovů", "Ålandských ostrovech", "Ålandy"],
    "Svatý Martin": ["Svatého Martina", "Svatém Martinu", "Svatý Martin"],
    "Tristan da Cunha": ["Tristanu da Cunha", "Tristanu da Cunha", "Tristan da Cunha"],
    "Diego García": ["Diega Garcíi", "Diegu Garcíi", "Diega Garcíu"],
    "Francouzská jižní území": ["Francouzských jižních území", "Francouzských jižních územích", "Francouzská jižní území"],
    "Menší odlehlé ostrovy USA": ["Menších odlehlých ostrovů USA", "Menších odlehlých ostrovech USA", "Menší odlehlé ostrovy USA"],
  };
  const CON_NA = new Set([
    "Slovensko", "Ukrajina", "Kypr", "Malta", "Kuba", "Island", "Filipíny", "Jamajka", "Madagaskar", "Nový Zéland",
    "Srí Lanka", "Tchaj-wan", "Bahamy", "Maledivy", "Seychely", "Mauricius", "Barbados", "Haiti", "Fidži", "Bermudy",
    "Komory", "Kapverdy", "Dominika", "Grenada", "Trinidad a Tobago", "Antigua a Barbuda", "Svatá Lucie",
    "Svatý Vincenc a Grenadiny", "Svatý Kryštof a Nevis", "Svatý Tomáš a Princův ostrov", "Aruba", "Tonga", "Samoa",
    "Marshallovy ostrovy", "Šalamounovy ostrovy", "Kajmanské ostrovy", "Faerské ostrovy", "Kanárské ostrovy",
    "Cookovy ostrovy", "Kokosové ostrovy", "Falklandské ostrovy", "Martinik", "Guadeloupe", "Réunion", "Nauru",
    "Tuvalu", "Palau", "Vanuatu", "Kiribati", "Guam", "Špicberky a Jan Mayen", "Ostrov Man", "Ålandy",
    "Palestinská území", "Severní Mariany", "Britské Panenské ostrovy", "Americké Panenské ostrovy", "Curaçao",
    "Pitcairnovy ostrovy", "Wallis a Futuna", "Svatá Helena", "Turks a Caicos", "Svatý Martin (Francie)", "Svatý Martin (Nizozemsko)",
  ]);
  // -ey (Jersey, Guernsey) no se declina; «ostrov» y los posesivos en -ův van aparte.
  // Plurales masculinos (los demás plurales en -y se declinan como femeninos).
  const PLURAL_MASCULINO = /(?:ostrovy|státy|emiráty)$/;
  const ALTERNANCIA: Readonly<Record<string, string>> = { k: "c", h: "z", g: "z", r: "ř" };
  type Genero = "f" | "n" | "m" | "pl";
  const genero = (w: string): Genero => {
    if (/y$/.test(w)) return "pl";
    if (/[aeě]$/.test(w)) return "f";
    if (/[oí]$/.test(w)) return "n";
    return "m";
  };
  const sustantivo = (w: string): Formas => {
    const guion = w.lastIndexOf("-");
    if (guion > 0) {
      const [g, l, a] = sustantivo(w.slice(guion + 1));
      const pre = w.slice(0, guion + 1);
      return [pre + g, pre + l, pre + a];
    }
    if (/^[A-ZÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ]{2,}$/.test(w)) return [w, w, w];
    const raiz = w.slice(0, -1);
    if (/ey$/.test(w)) return [w, w, w];
    if (w === "ostrov") return ["ostrova", "ostrově", w];
    if (PLURAL_MASCULINO.test(w)) return [`${raiz}ů`, `${raiz}ech`, w];
    if (/y$/.test(w)) return [raiz, `${raiz}ách`, w];
    if (/[iy]e$/.test(w)) return [w, `${raiz}i`, `${raiz}i`];
    if (/ea$/.test(w)) return [`${raiz}je`, `${raiz}ji`, `${raiz}u`];
    if (/[aeiouyáéíóúůý]a$/.test(w)) return [`${raiz}y`, `${raiz}i`, `${raiz}u`];
    if (/[žščřcjďťň]a$/.test(w)) return [`${raiz}e`, `${raiz}i`, `${raiz}u`];
    if (/cha$/.test(w)) return [`${raiz}y`, `${w.slice(0, -3)}še`, `${raiz}u`];
    if (/a$/.test(w)) {
      const c = raiz.at(-1) ?? "";
      const base = raiz.slice(0, -1);
      const lok = ALTERNANCIA[c] ? `${base}${ALTERNANCIA[c]}e` : "lsz".includes(c) ? `${raiz}e` : `${raiz}ě`;
      return [`${raiz}y`, lok, `${raiz}u`];
    }
    if (/o$/.test(w)) return [`${raiz}a`, `${raiz}u`, w];
    if (/[žščřcjďťň]$/.test(w)) return [`${w}e`, `${w}i`, w];
    if (/[bcdfghjklmnpqrstvwxz]$/.test(w)) return [`${w}u`, `${w}u`, w];
    return [w, w, w];
  };
  // Un adjetivo delante del sustantivo, según el género del sustantivo.
  const adjetivo = (w: string, g: Genero): Formas => {
    const r = w.slice(0, -1);
    if (g === "pl") {
      if (/ovy$/.test(w)) return [`${r}ých`, `${r}ých`, w];
      if (/[éá]$/.test(w)) return [`${r}ých`, `${r}ých`, w];
      if (/í$/.test(w)) return [`${r}ích`, `${r}ích`, w];
      return [w, w, w];
    }
    if (/ův$/.test(w)) return [`${w.slice(0, -2)}ova`, `${w.slice(0, -2)}ově`, w];
    if (/á$/.test(w)) return [`${r}é`, `${r}é`, `${r}ou`];
    if (/[ýé]$/.test(w)) return [`${r}ého`, `${r}ém`, w];
    if (/í$/.test(w)) return g === "f" ? [w, w, w] : [`${w}ho`, `${w}m`, w];
    return [w, w, w];
  };
  const unir = (partes: readonly Formas[], sep: string): Formas => [
    partes.map((f) => f[0]).join(sep),
    partes.map((f) => f[1]).join(sep),
    partes.map((f) => f[2]).join(sep),
  ];
  const frase = (p: string): Formas => {
    const palabras = p.split(" ");
    const g = genero(palabras[palabras.length - 1]);
    return unir(palabras.map((w, i) => (i === palabras.length - 1 ? sustantivo(w) : adjetivo(w, g))), " ");
  };
  const formas = (p: string): Formas => {
    if (TABLA[p]) return TABLA[p];
    for (const sep of [" – ", " ("]) {
      const i = p.indexOf(sep);
      if (i > 0) {
        const [g, l, a] = formas(p.slice(0, i));
        return [g + p.slice(i), l + p.slice(i), a + p.slice(i)];
      }
    }
    if (p.includes(" a ")) return unir(p.split(" a ").map(formas), " a ");
    return frase(p);
  };
  const VE = /^(?:[VvFfWw]|[Rr]w|[SsZzŠšŽž][^aeiouyáéíóúůýěrAEIOUYÁÉÍÓÚŮÝĚ\s])/;
  return (p: string): PadyCs => {
    const [genitiv, lokal, akuzativ] = formas(p);
    const predlozka = CON_NA.has(p) || /ostrov/i.test(p) ? "na" : VE.test(lokal) ? "ve" : "v";
    return { genitiv, lokal, akuzativ, predlozka };
  };
})();

const cs: GramaticaPais = {
  nombre: (p) => p,
  de: (p) => padyCs(p).genitiv,
  en: (p) => {
    const f = padyCs(p);
    return `${f.predlozka} ${f.lokal}`;
  },
  para: (p) => `pro ${padyCs(p).akuzativ}`,
};

// Griego (ADR 0002, D20): el nombre del país lleva artículo con género y número, y se declina. Los
// nombres llegan como los escribe Intl.DisplayNames en el, así que la regla cubre los femeninos en
// -α/-η de una o varias palabras («η Ελλάδα», «της Ελλάδας», «η Νότια Αφρική», «της Νότιας
// Αφρικής»), y lo demás (Ισραήλ, Περού, Μονακό, Ιράν) va como neutro indeclinable («το Ισραήλ», «του
// Ισραήλ»). La tabla lleva los masculinos (Καναδάς, Λίβανος), los femeninos en -ος (Κύπρος,
// Αίγυπτος), los neutros que se declinan (Βέλγιο, Μεξικό, Ηνωμένο Βασίλειο), los plurales
// (Ηνωμένες Πολιτείες, Φιλιππίνες, Ηνωμένα Αραβικά Εμιράτα) y los femeninos con palabras
// extranjeras que no se declinan (Κόστα Ρίκα, Σρι Λάνκα). «Νήσος» y «Νήσοι» delante se declinan
// solos; lo que va entre paréntesis y la parte tras « - » de un neutro quedan igual. `en(p)` contrae
// «σε» con el artículo («στην Ελλάδα», «στον Καναδά», «στο Βέλγιο», «στις Ηνωμένες Πολιτείες») y
// `para(p)` es «για» + acusativo. El artículo femenino pierde la -ν ante consonante que no sea κ, π,
// τ, ξ, ψ, μπ, ντ, γκ, τσ o τζ («στη Γαλλία», «για τη Γερμανία», pero «στην Κύπρο», «στην
// Ιταλία»); el masculino «τον» la conserva siempre, como en la prensa, para no confundirlo con el
// neutro. `casosEl` deja los tres casos con artículo sueltos para las frases que los necesitan.
export type GeneroEl = "m" | "f" | "n" | "mpl" | "fpl" | "npl";

export interface CasosEl {
  genero: GeneroEl;
  // con artículo: «η Ελλάδα», «την Ελλάδα», «της Ελλάδας»
  nominativo: string;
  acusativo: string;
  genitivo: string;
}

export const casosEl: (pais: string) => CasosEl = (() => {
  // [género, acusativo, genitivo] sin artículo; el nominativo es el nombre tal cual.
  type Formas = readonly [GeneroEl, string, string];
  const igual = (g: GeneroEl, p: string): Formas => [g, p, p];
  const TABLA: Readonly<Record<string, Formas>> = {
    Κύπρος: ["f", "Κύπρο", "Κύπρου"],
    Αίγυπτος: ["f", "Αίγυπτο", "Αιγύπτου"],
    Καναδάς: ["m", "Καναδά", "Καναδά"],
    Παναμάς: ["m", "Παναμά", "Παναμά"],
    Ισημερινός: ["m", "Ισημερινό", "Ισημερινού"],
    Λίβανος: ["m", "Λίβανο", "Λιβάνου"],
    Νίγηρας: ["m", "Νίγηρα", "Νίγηρα"],
    Μαυρίκιος: ["m", "Μαυρίκιο", "Μαυρικίου"],
    "Άγιος Μαρίνος": ["m", "Άγιο Μαρίνο", "Αγίου Μαρίνου"],
    "Άγιος Βαρθολομαίος": ["m", "Άγιο Βαρθολομαίο", "Αγίου Βαρθολομαίου"],
    "Άγιος Μαρτίνος": ["m", "Άγιο Μαρτίνο", "Αγίου Μαρτίνου"],
    "Άγιος Βικέντιος και Γρεναδίνες": ["m", "Άγιο Βικέντιο και Γρεναδίνες", "Αγίου Βικεντίου και Γρεναδινών"],
    Βέλγιο: ["n", "Βέλγιο", "Βελγίου"],
    Μεξικό: ["n", "Μεξικό", "Μεξικού"],
    Μαρόκο: ["n", "Μαρόκο", "Μαρόκου"],
    Λουξεμβούργο: ["n", "Λουξεμβούργο", "Λουξεμβούργου"],
    Μαυροβούνιο: ["n", "Μαυροβούνιο", "Μαυροβουνίου"],
    Βατικανό: ["n", "Βατικανό", "Βατικανού"],
    Κοσσυφοπέδιο: ["n", "Κοσσυφοπέδιο", "Κοσσυφοπεδίου"],
    "Ηνωμένο Βασίλειο": ["n", "Ηνωμένο Βασίλειο", "Ηνωμένου Βασιλείου"],
    "Νότιο Σουδάν": ["n", "Νότιο Σουδάν", "Νότιου Σουδάν"],
    "Πράσινο Ακρωτήριο": ["n", "Πράσινο Ακρωτήριο", "Πράσινου Ακρωτηρίου"],
    "Ηνωμένες Πολιτείες": ["fpl", "Ηνωμένες Πολιτείες", "Ηνωμένων Πολιτειών"],
    Φιλιππίνες: ["fpl", "Φιλιππίνες", "Φιλιππινών"],
    "Κάτω Χώρες": ["fpl", "Κάτω Χώρες", "Κάτω Χωρών"],
    Μαλδίβες: ["fpl", "Μαλδίβες", "Μαλδιβών"],
    Σεϋχέλλες: ["fpl", "Σεϋχέλλες", "Σεϋχελλών"],
    Μπαχάμες: ["fpl", "Μπαχάμες", "Μπαχαμών"],
    Κομόρες: ["fpl", "Κομόρες", "Κομορών"],
    Βερμούδες: ["fpl", "Βερμούδες", "Βερμούδων"],
    "Κανάριοι Νήσοι": ["fpl", "Κανάριους Νήσους", "Καναρίων Νήσων"],
    "Βρετανικές Παρθένες Νήσοι": ["fpl", "Βρετανικές Παρθένες Νήσους", "Βρετανικών Παρθένων Νήσων"],
    "Αμερικανικές Παρθένες Νήσοι": ["fpl", "Αμερικανικές Παρθένες Νήσους", "Αμερικανικών Παρθένων Νήσων"],
    "Νήσοι Βόρειες Μαριάνες": ["fpl", "Νήσους Βόρειες Μαριάνες", "Νήσων Βόρειων Μαριανών"],
    "Ηνωμένα Αραβικά Εμιράτα": ["npl", "Ηνωμένα Αραβικά Εμιράτα", "Ηνωμένων Αραβικών Εμιράτων"],
    "Παλαιστινιακά Εδάφη": ["npl", "Παλαιστινιακά Εδάφη", "Παλαιστινιακών Εδαφών"],
    "Γαλλικά Νότια Εδάφη": ["npl", "Γαλλικά Νότια Εδάφη", "Γαλλικών Νότιων Εδαφών"],
    "Βρετανικά Εδάφη Ινδικού Ωκεανού": ["npl", "Βρετανικά Εδάφη Ινδικού Ωκεανού", "Βρετανικών Εδαφών Ινδικού Ωκεανού"],
    "Ακτή Ελεφαντοστού": ["f", "Ακτή Ελεφαντοστού", "Ακτής Ελεφαντοστού"],
    "Γουινέα Μπισάου": ["f", "Γουινέα Μπισάου", "Γουινέας Μπισάου"],
    "Ολλανδία Καραϊβικής": ["f", "Ολλανδία Καραϊβικής", "Ολλανδίας Καραϊβικής"],
    "Κόστα Ρίκα": igual("f", "Κόστα Ρίκα"),
    "Σρι Λάνκα": igual("f", "Σρι Λάνκα"),
    "Σιέρα Λεόνε": igual("f", "Σιέρα Λεόνε"),
    "Μπουρκίνα Φάσο": igual("f", "Μπουρκίνα Φάσο"),
    Σαμόα: igual("f", "Σαμόα"),
    "Αμερικανική Σαμόα": ["f", "Αμερικανική Σαμόα", "Αμερικανικής Σαμόα"],
    "Αντίγκουα και Μπαρμπούντα": igual("f", "Αντίγκουα και Μπαρμπούντα"),
    "Γουάλις και Φουτούνα": igual("n", "Γουάλις και Φουτούνα"),
    "Τριστάν ντα Κούνια": igual("n", "Τριστάν ντα Κούνια"),
    "Απομακρυσμένες Νησίδες ΗΠΑ": ["fpl", "Απομακρυσμένες Νησίδες ΗΠΑ", "Απομακρυσμένων Νησίδων ΗΠΑ"],
    "Ηνωμένα Έθνη": ["npl", "Ηνωμένα Έθνη", "Ηνωμένων Εθνών"],
  };
  // Una palabra en -α o -η (sustantivo o adjetivo: «Νέα», «Νότια», «Δημοκρατία») hace el genitivo
  // con -ς; las extranjeras que no se declinan («Κόστα Ρίκα», «ντα») van en la tabla.
  const genitivoFemenino = (w: string) => (/[αηάή]$/.test(w) ? `${w}ς` : w);
  const formas = (p: string): Formas => {
    if (TABLA[p]) return TABLA[p];
    const paren = p.indexOf(" (");
    if (paren > 0) {
      const [g, a, ge] = formas(p.slice(0, paren));
      return [g, a + p.slice(paren), ge + p.slice(paren)];
    }
    const guion = p.indexOf(" - ");
    if (guion > 0) {
      const [g, a, ge] = formas(p.slice(0, guion));
      if (g !== "f") return [g, a + p.slice(guion), ge + p.slice(guion)];
      const [, , resto] = formas(p.slice(guion + 3));
      return [g, p, `${ge} - ${resto}`];
    }
    if (p.startsWith("Νήσος ")) return ["f", `Νήσο ${p.slice(6)}`, `Νήσου ${p.slice(6)}`];
    if (p.startsWith("Νήσοι ")) return ["fpl", `Νήσους ${p.slice(6)}`, `Νήσων ${p.slice(6)}`];
    if (/[αηάή]$/.test(p)) return ["f", p, p.split(" ").map(genitivoFemenino).join(" ")];
    if (/ες$/.test(p)) return ["fpl", p, p];
    return ["n", p, p];
  };
  const ARTICULOS: Readonly<Record<GeneroEl, readonly [string, string, string]>> = {
    m: ["ο", "τον", "του"],
    f: ["η", "την", "της"],
    n: ["το", "το", "του"],
    mpl: ["οι", "τους", "των"],
    fpl: ["οι", "τις", "των"],
    npl: ["τα", "τα", "των"],
  };
  const CONSERVA_NI = /^(?:[αεηιουωάέήίόύώϊϋΐΰκπτξψ]|μπ|ντ|γκ|τσ|τζ)/iu;
  const unir = (art: string, p: string) => `${art === "την" && !CONSERVA_NI.test(p) ? "τη" : art} ${p}`;
  return (p: string): CasosEl => {
    const [genero, acc, gen] = formas(p);
    const [aNom, aAcc, aGen] = ARTICULOS[genero];
    return { genero, nominativo: `${aNom} ${p}`, acusativo: unir(aAcc, acc), genitivo: `${aGen} ${gen}` };
  };
})();

const el: GramaticaPais = {
  nombre: (p) => casosEl(p).nominativo,
  de: (p) => casosEl(p).genitivo,
  en: (p) => `σ${casosEl(p).acusativo}`,
  para: (p) => `για ${casosEl(p).acusativo}`,
};

// Húngaro (ADR 0002, D21). El artículo es «az» delante de vocal y «a» delante de consonante; delante
// de una cifra cuenta cómo se lee: «az 1» (egy), «az 5» (öt), «az 50», «az 1 500» (ezerötszáz), «az
// 1 000 000» (egymillió), pero «a 10» (tíz), «a 100» (száz), «a 15 %». Las siglas que se leen letra
// por letra («az SZJA», «az ÁFA», «a NAV») no se pueden adivinar: el texto las escribe a mano.
const VOCAL_HU = /^[aáeéiíoóöőuúüűåAÁEÉIÍOÓÖŐUÚÜŰÅ]/;

export function neveloHu(siguiente: string | number): "a" | "az" {
  const texto = String(siguiente).trim();
  const cifra = /^[-−]?\s*(\d[\d\s  .]*)/.exec(texto);
  if (cifra) {
    const entero = cifra[1].replace(/[^\d]/g, "");
    if (entero.startsWith("5")) return "az";
    return entero.startsWith("1") && entero.length % 3 === 1 ? "az" : "a";
  }
  return VOCAL_HU.test(texto) ? "az" : "a";
}

// El artículo y la palabra o cifra: «az 1 500 Ft», «a 3 legjobb», «az eredmény».
export function conNeveloHu(siguiente: string | number): string {
  return `${neveloHu(siguiente)} ${siguiente}`;
}

// El nombre del país no lleva preposición: el caso va como sufijo pegado a la última palabra y sigue la
// armonía vocálica. `esetekHu(p)` da el lugar («Németországban», «Magyarországon»), la dirección
// («Németországba», «Magyarországra»), el origen («Németországból», «Magyarországról») y el dativo
// («Németországnak»). Dos grupos: casi todos los países van con -ban/-ben (dentro), y Magyarország,
// las islas, lo que termina en -sziget(ek), -föld o -land y algunos más (FELSZIN) van con -on/-en/-ön
// (sobre). La armonía la decide la última vocal que no sea i/í de la última palabra (las i son
// neutras: «Mali» da «Maliban», «Izrael» da «Izraelben», «Fidzsi» da «Fidzsin»); la a, e, o y ö
// finales se alargan antes del sufijo («Kanadában», «Chilében», «Togóban»). Los nombres que son una
// frase con sustantivo común («Egyesült Államok», «Dominikai Köztársaság», «Fülöp-szigetek») llevan
// artículo en todas las formas («az Egyesült Államokban», «a Fülöp-szigeteken»). `de(p)` es el
// poseedor sin sufijo, que va delante del poseído, y es este el que lleva el posesivo («Magyarország
// adórendszere»); `para(p)` usa la posposición «számára», que no cambia el nombre. Ningún sufijo se
// pega a una cifra ni a un marcador: los textos usan dos puntos o posposiciones. Si una forma con
// artículo abre la oración, el texto la pasa por mayusculaHu.
export interface EsetekHu {
  // con artículo si lo lleva: «Magyarország», «az Egyesült Államok»
  nev: string;
  // lugar: «Magyarországon», «Németországban», «az Egyesült Államokban»
  hol: string;
  // dirección: «Magyarországra», «Németországba»
  hova: string;
  // origen: «Magyarországról», «Németországból»
  honnan: string;
  // dativo: «Magyarországnak», «az Egyesült Államoknak»
  nak: string;
}

export const esetekHu: (pais: string) => EsetekHu = (() => {
  // Formas fijas: el nombre que sale de Intl con un agregado, o un sufijo que la regla no adivina
  // (la e o la que finales mudas van con guion: «Belize-ben», «Guadeloupe-on»).
  const TABLA: Readonly<Record<string, Omit<EsetekHu, "nev"> & { nev?: string }>> = {
    "Hongkong KKT": { nev: "Hongkong", hol: "Hongkongban", hova: "Hongkongba", honnan: "Hongkongból", nak: "Hongkongnak" },
    "Makaó KKT": { nev: "Makaó", hol: "Makaóban", hova: "Makaóba", honnan: "Makaóból", nak: "Makaónak" },
    "Kongó \u2013 Kinshasa": {
      nev: "a Kongói Demokratikus Köztársaság",
      hol: "a Kongói Demokratikus Köztársaságban",
      hova: "a Kongói Demokratikus Köztársaságba",
      honnan: "a Kongói Demokratikus Köztársaságból",
      nak: "a Kongói Demokratikus Köztársaságnak",
    },
    "Kongó \u2013 Brazzaville": { nev: "a Kongói Köztársaság", hol: "a Kongói Köztársaságban", hova: "a Kongói Köztársaságba", honnan: "a Kongói Köztársaságból", nak: "a Kongói Köztársaságnak" },
    Belize: { hol: "Belize-ben", hova: "Belize-be", honnan: "Belize-ből", nak: "Belize-nek" },
    Suriname: { hol: "Suriname-ban", hova: "Suriname-ba", honnan: "Suriname-ból", nak: "Suriname-nak" },
    Zimbabwe: { hol: "Zimbabwéban", hova: "Zimbabwéba", honnan: "Zimbabwéból", nak: "Zimbabwénak" },
    "Sierra Leone": { hol: "Sierra Leonéban", hova: "Sierra Leonéba", honnan: "Sierra Leonéból", nak: "Sierra Leonénak" },
    Guadeloupe: { hol: "Guadeloupe-on", hova: "Guadeloupe-ra", honnan: "Guadeloupe-ról", nak: "Guadeloupe-nak" },
    Martinique: { hol: "Martinique-on", hova: "Martinique-ra", honnan: "Martinique-ról", nak: "Martinique-nak" },
    Mayotte: { hol: "Mayotte-on", hova: "Mayotte-ra", honnan: "Mayotte-ról", nak: "Mayotte-nak" },
    Jersey: { hol: "Jersey-n", hova: "Jersey-re", honnan: "Jersey-ről", nak: "Jersey-nek" },
    Guernsey: { hol: "Guernsey-n", hova: "Guernsey-re", honnan: "Guernsey-ről", nak: "Guernsey-nek" },
    "Az USA lakatlan külbirtokai": {
      nev: "az USA lakatlan külbirtokai",
      hol: "az USA lakatlan külbirtokain",
      hova: "az USA lakatlan külbirtokaira",
      honnan: "az USA lakatlan külbirtokairól",
      nak: "az USA lakatlan külbirtokainak",
    },
    "Saint-Barthélemy": { hol: "Saint-Barthélemyn", hova: "Saint-Barthélemyre", honnan: "Saint-Barthélemyről", nak: "Saint-Barthélemynek" },
  };
  // Países e islas que van con -on/-en/-ön (además de -sziget, -szigetek, -föld, -land, -part y
  // -terület: «Elefántcsontparton», «a Francia Déli Területeken»).
  const FELSZIN = new Set([
    "Magyarország", "Ciprus", "Málta", "Kuba", "Jamaica", "Haiti", "Madagaszkár", "Mauritius", "Srí Lanka", "Tajvan",
    "Barbados", "Bermuda", "Grenada", "Dominika", "Puerto Rico", "Trinidad és Tobago", "Antigua és Barbuda", "Saint Lucia",
    "Saint Kitts és Nevis", "Szamoa", "Amerikai Szamoa", "Tonga", "Fidzsi", "Nauru", "Tuvalu", "Palau", "Vanuatu", "Kiribati",
    "Guam", "Aruba", "Curaçao", "Réunion", "Sint Maarten", "Saint Martin", "Szent Ilona", "Új-Kaledónia", "Anguilla",
    "Montserrat", "Niue", "Tokelau", "Tristan da Cunha", "Diego Garcia", "Sark", "Svalbard és Jan Mayen",
    "Wallis és Futuna", "Saint-Pierre és Miquelon", "São Tomé és Príncipe", "Francia Polinézia",
  ]);
  const FELSZIN_FIN = /(?:sziget|szigetek|föld|land|part|Terület|Területek)$/;
  // Frases con sustantivo común: van con artículo.
  const CON_ARTICULO = /(?:Köztársaság|Királyság|Államok|Emírségek|sziget|szigetek|Autonómia|Terület|Területek|külbirtokai|Unió|Szervezete|térség|Közösség)$|^(?:Vatikán$|Egyesült )/;
  const ATRAS = "aáoóuú";
  const REDONDAS = "öőüű";
  const VOCALES = "aáeéiíoóöőuúüű";
  type Armonia = "atras" | "adelante" | "redonda";
  const armonia = (palabra: string): Armonia => {
    const v = [...palabra.toLowerCase()].filter((c) => VOCALES.includes(c) && c !== "i" && c !== "í").at(-1);
    if (!v) return "adelante";
    if (ATRAS.includes(v)) return "atras";
    return REDONDAS.includes(v) ? "redonda" : "adelante";
  };
  const ALARGA: Readonly<Record<string, string>> = { a: "á", e: "é", o: "ó", ö: "ő" };
  // String(): check_i18n llama a las funciones de los diccionarios con argumentos de muestra.
  return (nombre: string): EsetekHu => {
    const pais = String(nombre);
    const fija = TABLA[pais];
    const articulo = CON_ARTICULO.test(pais) ? `${neveloHu(pais)} ` : "";
    if (fija) return { nev: fija.nev ?? `${articulo}${pais}`, hol: fija.hol, hova: fija.hova, honnan: fija.honnan, nak: fija.nak };
    const ultima = pais.split(/[\s-]/).at(-1) ?? pais;
    const a = armonia(ultima);
    const atras = a === "atras";
    const final = pais.at(-1) ?? "";
    const tema = ALARGA[final] ? pais.slice(0, -1) + ALARGA[final] : pais;
    const terminaEnVocal = VOCALES.includes(tema.at(-1)?.toLowerCase() ?? "");
    const sobre = FELSZIN.has(pais) || FELSZIN_FIN.test(ultima);
    const hol = sobre ? (terminaEnVocal ? "n" : atras ? "on" : a === "redonda" ? "ön" : "en") : atras ? "ban" : "ben";
    const hova = sobre ? (atras ? "ra" : "re") : atras ? "ba" : "be";
    const honnan = sobre ? (atras ? "ról" : "ről") : atras ? "ból" : "ből";
    const con = (sufijo: string) => `${articulo}${tema}${sufijo}`;
    return { nev: `${articulo}${pais}`, hol: con(hol), hova: con(hova), honnan: con(honnan), nak: con(atras ? "nak" : "nek") };
  };
})();

// Mayúscula inicial para una forma que abre la oración («Az Egyesült Államokban»).
export function mayusculaHu(s: string): string {
  return s.charAt(0).toLocaleUpperCase("hu-HU") + s.slice(1);
}

const hu: GramaticaPais = {
  nombre: (p) => esetekHu(p).nev,
  de: (p) => esetekHu(p).nev,
  en: (p) => esetekHu(p).hol,
  para: (p) => `${esetekHu(p).nev} számára`,
};

// Hebreo: «ב» (lugar) y «ל» (destino) van pegadas al nombre: «בישראל», «לישראל». Si el nombre lleva
// el artículo «ה» («הממלכה המאוחדת»), la preposición lo absorbe: «בממלכה המאוחדת». Las «ה» del
// comienzo que son parte del nombre (הודו, הולנד, האיטי, הונגריה) no se tocan: por eso va una lista.
// Delante de un nombre en letras latinas o de una cifra la preposición lleva guion («ב-Zetaland»).
// La pertenencia va con «של» («המחשבונים של ישראל»), que nunca cambia el nombre.
const CON_ARTICULO_HE = new Set([
  "הממלכה המאוחדת",
  "האמירויות הערביות המאוחדות",
  "האמירויות",
  "הפיליפינים",
  "הרפובליקה הדומיניקנית",
  "הרפובליקה הצ'כית",
  "הרפובליקה המרכז-אפריקאית",
  "הרפובליקה הדמוקרטית של קונגו",
  "הרפובליקה של קונגו",
  "האיים המלדיביים",
  "איי שלמה",
  "איי מרשל",
  "האיים הקריביים",
  "הוותיקן",
]);
const preposicionHe = (letra: string, p: string): string => {
  if (!/^[\u05d0-\u05ea]/.test(p)) return `${letra}-${p}`;
  return CON_ARTICULO_HE.has(p) && p.startsWith("ה") ? `${letra}${p.slice(1)}` : `${letra}${p}`;
};
const he: GramaticaPais = {
  nombre: (p) => p,
  de: (p) => `של ${p}`,
  en: (p) => preposicionHe("ב", p),
  para: (p) => preposicionHe("ל", p),
};

// Serbio en latinica (ADR 0002, D23): el nombre del país se declina. `de(p)` da el genitivo suelto
// («Srbije», «Crne Gore», «Sjedinjenih Država»), `en(p)` el lugar con su preposición («u Srbiji», «u
// Crnoj Gori», «u Francuskoj», «na Kipru», «na Filipinima») y `para(p)` «za» + acusativo («za Srbiju»,
// «za Crnu Goru», «za Japan»). Los nombres llegan como los escribe Intl.DisplayNames en sr-Latn, así
// que la regla cubre los de una palabra por terminación (-a: -e/-i/-u; los adjetivos sustantivados en
// -ska, -čka, -ška como Francuska o Nemačka: -e/-oj/-u; consonante, -o, -e y -u: -a/-u; -i del
// singular, como Mali o Haiti: -ja/-ju) y los compuestos (adjetivos delante, que concuerdan con el
// sustantivo; partes unidas con « i » por separado; lo que va entre paréntesis o tras « - » queda
// igual; en un guion se declina la primera parte). La tabla lleva los irregulares (a móvil como
// Egipat o Kipar, Jamajka con sibilarización, nombres con el núcleo delante); CON_NA, los países e
// islas que van con «na». `padezSr` deja los tres casos y la preposición sueltos.
export interface PadeziSr {
  genitiv: string;
  lokativ: string;
  akuzativ: string;
  // «u» o «na»
  predlog: string;
}

export const padezSr: (pais: string) => PadeziSr = (() => {
  // [genitivo, locativo, acusativo] sin preposición.
  type Formas = readonly [string, string, string];
  const TABLA: Readonly<Record<string, Formas>> = {
    Egipat: ["Egipta", "Egiptu", "Egipat"],
    Kipar: ["Kipra", "Kipru", "Kipar"],
    Jamajka: ["Jamajke", "Jamajci", "Jamajku"],
    Kostarika: ["Kostarike", "Kostariki", "Kostariku"],
    "Papua Nova Gvineja": ["Papue Nove Gvineje", "Papui Novoj Gvineji", "Papuu Novu Gvineju"],
    "Burkina Faso": ["Burkine Faso", "Burkini Faso", "Burkinu Faso"],
    "Obala Slonovače": ["Obale Slonovače", "Obali Slonovače", "Obalu Slonovače"],
    "Sao Tome i Principe": ["Sao Tomea i Principa", "Sao Tomeu i Principu", "Sao Tome i Principe"],
    "Timor-Leste": ["Timor-Leste", "Timor-Leste", "Timor-Leste"],
    "SAR Hongkong": ["SAR Hongkong", "SAR Hongkong", "SAR Hongkong"],
    "SAR Makao": ["SAR Makao", "SAR Makao", "SAR Makao"],
    "Tristan da Kunja": ["Tristan da Kunje", "Tristan da Kunji", "Tristan da Kunju"],
    "Dijego Garsija": ["Dijega Garsije", "Dijegu Garsiji", "Dijega Garsiju"],
    "Kokosova (Kilingova) Ostrva": ["Kokosovih (Kilingovih) Ostrva", "Kokosovim (Kilingovim) Ostrvima", "Kokosova (Kilingova) Ostrva"],
    "Britanska teritorija Indijskog okeana": ["Britanske teritorije Indijskog okeana", "Britanskoj teritoriji Indijskog okeana", "Britansku teritoriju Indijskog okeana"],
    "Udaljena ostrva SAD": ["Udaljenih ostrva SAD", "Udaljenim ostrvima SAD", "Udaljena ostrva SAD"],
  };
  const CON_NA = new Set([
    "Kipar", "Malta", "Kuba", "Island", "Jamajka", "Filipini", "Madagaskar", "Novi Zeland", "Šri Lanka", "Tajvan",
    "Bahami", "Maldivi", "Sejšeli", "Mauricijus", "Barbados", "Haiti", "Fidži", "Bermudi", "Dominika", "Grenada",
    "Trinidad i Tobago", "Antigva i Barbuda", "Sveta Lucija", "Sent Vinsent i Grenadini", "Sent Kits i Nevis",
    "Sao Tome i Principe", "Aruba", "Tonga", "Samoa", "Američka Samoa", "Kosovo", "Grenland", "Portoriko", "Martinik",
    "Gvadelup", "Reinion", "Nauru", "Tuvalu", "Palau", "Vanuatu", "Kiribati", "Guam", "Kurasao", "Majot", "Sveta Jelena",
    "Sveti Bartolomej", "Sveti Martin", "Gernzi", "Džerzi", "Antarktik", "Svalbard i Jan Majen", "Tokelau", "Niue",
    "Sark", "Pitkern", "Monserat", "Angvila", "Tristan da Kunja",
    "Dijego Garsija", "Palestinske teritorije", "Sen Pjer i Mikelon", "Valis i Futuna",
  ]);
  // Sustantivos plurales: masculinos en -i, femeninos en -e y neutros en -a.
  const PLURAL_M = new Set(["Filipini", "Bahami", "Maldivi", "Bermudi", "Sejšeli", "Grenadini", "Emirati"]);
  const PLURAL_F = new Set(["Države", "teritorije", "Teritorije"]);
  const PLURAL_N = new Set(["Ostrva", "ostrva"]);
  const esPlural = (w: string) => PLURAL_M.has(w) || PLURAL_F.has(w) || PLURAL_N.has(w);
  const sustantivo = (w: string): Formas => {
    if (TABLA[w]) return TABLA[w];
    const guion = w.indexOf("-");
    if (guion > 0) {
      const [g, l, a] = sustantivo(w.slice(0, guion));
      const resto = w.slice(guion);
      return [g + resto, l + resto, a + resto];
    }
    if (/^[A-ZČĆŠŽĐ]{2,}$/.test(w)) return [w, w, w];
    const raiz = w.slice(0, -1);
    if (PLURAL_M.has(w)) return [`${raiz}a`, `${raiz}ima`, `${raiz}e`];
    if (PLURAL_F.has(w)) return [`${raiz}a`, `${raiz}ama`, w];
    if (PLURAL_N.has(w)) return [w, `${raiz}ima`, w];
    if (w === "Republika") return ["Republike", "Republici", "Republiku"];
    // Adjetivo sustantivado (Francuska, Nemačka, Hrvatska, Češka): se declina como adjetivo.
    if (/(?:sk|čk|šk|ck)a$/.test(w)) return [`${raiz}e`, `${raiz}oj`, `${raiz}u`];
    if (/a$/.test(w)) return [`${raiz}e`, `${raiz}i`, `${raiz}u`];
    // Masculino en -i del singular (Mali, Haiti, Malavi, Burundi): Malija, u Maliju.
    if (/i$/.test(w)) return [`${w}ja`, `${w}ju`, w];
    // -o tras vocal (Kurasao): Kurasaoa, na Kurasaou.
    if (/[aeiou]o$/.test(w)) return [`${w}a`, `${w}u`, w];
    // -o (Maroko, Meksiko, Kosovo, Ostrvo): Maroka, u Maroku.
    if (/o$/.test(w)) return [`${raiz}a`, `${raiz}u`, w];
    // Consonante, -e y -u (Brazil, Zimbabve, Peru): Brazila, u Brazilu; Zimbabvea; Perua.
    return [`${w}a`, `${w}u`, w];
  };
  // Un adjetivo delante del sustantivo, según el número del sustantivo. Lo que no termina como
  // adjetivo (Sent, San, Sao, Šri, Sijera) queda igual.
  const ADJETIVO = /(?:sk|čk|šk|ck|n|t|v|j|l|r|d|k)[aoie]$/;
  const INVARIABLES = new Set(["Sent", "Sen", "San", "Sao", "Šri", "Sijera", "Kot", "SAR", "da"]);
  const adjetivo = (w: string, plural: boolean): Formas => {
    if (INVARIABLES.has(w) || !ADJETIVO.test(w)) return [w, w, w];
    const r = w.slice(0, -1);
    if (plural) return [`${r}ih`, `${r}im`, /i$/.test(w) ? `${r}e` : w];
    if (/a$/.test(w)) return [`${r}e`, `${r}oj`, `${r}u`];
    if (/[io]$/.test(w)) return [`${r}og`, `${r}om`, w];
    return [w, w, w];
  };
  const unir = (partes: readonly Formas[], sep: string): Formas => [
    partes.map((f) => f[0]).join(sep),
    partes.map((f) => f[1]).join(sep),
    partes.map((f) => f[2]).join(sep),
  ];
  const frase = (p: string): Formas => {
    const palabras = p.split(" ");
    const plural = esPlural(palabras[palabras.length - 1]);
    return unir(palabras.map((w, i) => (i === palabras.length - 1 ? sustantivo(w) : adjetivo(w, plural))), " ");
  };
  const formas = (p: string): Formas => {
    if (TABLA[p]) return TABLA[p];
    for (const sep of [" - ", " ("]) {
      const i = p.indexOf(sep);
      if (i > 0) {
        const [g, l, a] = formas(p.slice(0, i));
        return [g + p.slice(i), l + p.slice(i), a + p.slice(i)];
      }
    }
    // Núcleo delante: «Ostrvo Man», «Ostrva Turks i Kaikos», «Ostrvo Herd i Mekdonaldova ostrva».
    const [primera, ...resto] = p.split(" ");
    if (resto.length && /^Ostrv[oa]$/.test(primera)) {
      const [g, l, a] = primera === "Ostrvo" ? ["Ostrva", "Ostrvu", "Ostrvo"] : sustantivo(primera);
      const cola = ` ${resto.join(" ")}`;
      return [g + cola, l + cola, a + cola];
    }
    if (p.includes(" i ")) return unir(p.split(" i ").map(formas), " i ");
    return frase(p);
  };
  return (p: string): PadeziSr => {
    const [genitiv, lokativ, akuzativ] = formas(p);
    const base = p.split(" (")[0];
    const predlog = CON_NA.has(base) || /(?:^|\s)[Oo]strv/.test(p) ? "na" : "u";
    return { genitiv, lokativ, akuzativ, predlog };
  };
})();

const sr: GramaticaPais = {
  nombre: (p) => p,
  de: (p) => padezSr(p).genitiv,
  en: (p) => {
    const f = padezSr(p);
    return `${f.predlog} ${f.lokativ}`;
  },
  para: (p) => `za ${padezSr(p).akuzativ}`,
};

// Eslovaco (ADR 0002, D25): el nombre del país se declina con reglas propias, no las del checo. `de(p)`
// da el genitivo suelto («Slovenska», «Nemecka», «Spojených štátov»), `en(p)` el lugar con su
// preposición («na Slovensku», «v Česku», «vo Francúzsku», «na Filipínach») y `para(p)` «pre» +
// acusativo («pre Slovensko», «pre Kanadu»). Los nombres llegan como los escribe Intl.DisplayNames en
// sk: -sko y -ko dan -a/-u; el resto de -o da -a/-e («v Kosove», «v Spojenom kráľovstve»); -ia y -ya
// dan -e/-i/-u («v Kolumbii»); -ea da -y/-i/-u («v Kórei»); -ua da -y/-e/-u («v Nikarague»); -a blanda
// da -e/-i/-u («v Keni», «v Kambodži»); -a dura da -y/-e/-u, sin alternancia de consonante («na
// Jamajke», «v Kanade»); la consonante dura da -u/-e, salvo k, g y ch que dan -u/-u («v Iraku»); la
// blanda da -a/-i («v Bangladéši»). Los plurales femeninos dan el genitivo sin -y y -ách o -ach según
// la ley rítmica («na Bahamách», «na Filipínach»); los masculinos -ov/-och. Los adjetivos delante
// concuerdan (-á y -a: -ej, -ú y -u; -ý y -é: -ého, -om; plural -ých o -ych). «vo» va ante v, f y
// «šv» («vo Švédsku»); «na» para Eslovaquia, Ucrania y las islas (CON_NA y todo nombre con «ostrov»).
// `padySk` deja los tres casos y la preposición sueltos para las frases que los necesitan.
export interface PadySk {
  genitiv: string;
  lokal: string;
  akuzativ: string;
  // «v», «vo» o «na»
  predlozka: string;
}

export const padySk: (pais: string) => PadySk = (() => {
  // [genitivo, locativo, acusativo] sin preposición.
  type Formas = readonly [string, string, string];
  const TABLA: Readonly<Record<string, Formas>> = {
    Egypt: ["Egypta", "Egypte", "Egypt"],
    Izrael: ["Izraela", "Izraeli", "Izrael"],
    Niger: ["Nigeru", "Nigeri", "Niger"],
    Cyprus: ["Cypru", "Cypre", "Cyprus"],
    Maurícius: ["Maurícia", "Mauríciu", "Maurícius"],
    Brunej: ["Bruneja", "Brunei", "Brunej"],
    Samoa: ["Samoy", "Samoe", "Samou"],
    "Americká Samoa": ["Americkej Samoy", "Americkej Samoe", "Americkú Samou"],
    "Burkina Faso": ["Burkiny Faso", "Burkine Faso", "Burkinu Faso"],
    "Guinea-Bissau": ["Guiney-Bissau", "Guinei-Bissau", "Guineu-Bissau"],
    "Papua-Nová Guinea": ["Papuy-Novej Guiney", "Papue-Novej Guinei", "Papuu-Novú Guineu"],
    "Pobrežie Slonoviny": ["Pobrežia Slonoviny", "Pobreží Slonoviny", "Pobrežie Slonoviny"],
    "Palestínske územia": ["Palestínskych území", "Palestínskych územiach", "Palestínske územia"],
    "Sierra Leone": ["Sierry Leone", "Sierre Leone", "Sierru Leone"],
    "San Maríno": ["San Marína", "San Maríne", "San Maríno"],
    "Svätý Vincent": ["Svätého Vincenta", "Svätom Vincente", "Svätý Vincent"],
    "Svätý Krištof": ["Svätého Krištofa", "Svätom Krištofe", "Svätý Krištof"],
    "Svätý Martin": ["Svätého Martina", "Svätom Martine", "Svätý Martin"],
    "Svätý Bartolomej": ["Svätého Bartolomeja", "Svätom Bartolomeji", "Svätý Bartolomej"],
    "Svätý Tomáš": ["Svätého Tomáša", "Svätom Tomášovi", "Svätý Tomáš"],
    "Princov ostrov": ["Princovho ostrova", "Princovom ostrove", "Princov ostrov"],
    "Bouvetov ostrov": ["Bouvetovho ostrova", "Bouvetovom ostrove", "Bouvetov ostrov"],
    "Heardov ostrov": ["Heardovho ostrova", "Heardovom ostrove", "Heardov ostrov"],
    "Ostrov Man": ["Ostrova Man", "Ostrove Man", "Ostrov Man"],
    "Kajmanie ostrovy": ["Kajmaních ostrovov", "Kajmaních ostrovoch", "Kajmanie ostrovy"],
    "Menšie odľahlé ostrovy USA": ["Menších odľahlých ostrovov USA", "Menších odľahlých ostrovoch USA", "Menšie odľahlé ostrovy USA"],
    "Turks a Caicos": ["Turks a Caicos", "Turks a Caicos", "Turks a Caicos"],
    "Tristan da Cunha": ["Tristana da Cunha", "Tristane da Cunha", "Tristan da Cunha"],
    "Diego Garcia": ["Diega Garciu", "Diegu Garcii", "Diega Garciu"],
    "Francúzske južné a antarktické územia": ["Francúzskych južných a antarktických území", "Francúzskych južných a antarktických územiach", "Francúzske južné a antarktické územia"],
    "Britské indickooceánske územie": ["Britského indickooceánskeho územia", "Britskom indickooceánskom území", "Britské indickooceánske územie"],
  };
  // Las palabras con genitivo plural que alarga la vocal o que no sale de quitar la -y.
  const GENITIVO_PLURAL: Readonly<Record<string, string>> = { Bahamy: "Bahám", Maldivy: "Maldív", Bermudy: "Bermúd" };
  const CON_NA = new Set([
    "Slovensko", "Ukrajina", "Cyprus", "Malta", "Kuba", "Island", "Filipíny", "Jamajka", "Madagaskar", "Nový Zéland",
    "Srí Lanka", "Taiwan", "Bahamy", "Maldivy", "Seychely", "Maurícius", "Barbados", "Haiti", "Fidži", "Bermudy",
    "Komory", "Kapverdy", "Dominika", "Grenada", "Trinidad a Tobago", "Antigua a Barbuda", "Svätá Lucia", "Svätá Helena",
    "Svätý Vincent a Grenadíny", "Svätý Krištof a Nevis", "Svätý Tomáš a Princov ostrov", "Svätý Bartolomej", "Svätý Martin",
    "Aruba", "Tonga", "Samoa", "Americká Samoa", "Alandy", "Falklandy", "Guam", "Martinik", "Guadeloupe", "Réunion",
    "Nauru", "Tuvalu", "Palau", "Vanuatu", "Kiribati", "Severné Mariány", "Turks a Caicos", "Wallis a Futuna", "Curaçao",
    "Svalbard a Jan Mayen", "Mayotte", "Nová Kaledónia", "Norfolk", "Francúzska Polynézia", "Palestínske územia",
  ]);
  const PLURAL_MASCULINO = /(?:ostrovy|štáty|emiráty|Falklandy|Alandy)$/;
  // Ley rítmica: tras una sílaba larga la terminación va breve («Filipínach», no «Filipínách»).
  const SILABA_LARGA = /(?:[áéíóúýô]|ia|ie|iu)[^aeiouyáéíóúýäô]*$/;
  const BLANDA_DURA: Readonly<Record<string, string>> = { ň: "n", ť: "t", ď: "d", ľ: "l" };
  type Genero = "f" | "n" | "m" | "pl";
  const genero = (w: string): Genero => {
    if (/y$/.test(w)) return "pl";
    if (/[aá]$/.test(w)) return "f";
    if (/o$/.test(w)) return "n";
    return "m";
  };
  const sustantivo = (w: string): Formas => {
    if (TABLA[w]) return TABLA[w];
    const guion = w.lastIndexOf("-");
    if (guion > 0) {
      const [g, l, a] = sustantivo(w.slice(guion + 1));
      const pre = w.slice(0, guion + 1);
      return [pre + g, pre + l, pre + a];
    }
    if (/^[A-ZÁÄČĎÉÍĹĽŇÓÔŔŠŤÚÝŽ]{2,}$/.test(w)) return [w, w, w];
    const raiz = w.slice(0, -1);
    if (/ey$/.test(w)) return [w, w, w];
    if (w === "ostrov") return ["ostrova", "ostrove", w];
    if (PLURAL_MASCULINO.test(w)) return [`${raiz}ov`, `${raiz}och`, w];
    if (/y$/.test(w)) return [GENITIVO_PLURAL[w] ?? raiz, `${raiz}${SILABA_LARGA.test(raiz) ? "ach" : "ách"}`, w];
    if (/[iy]a$/.test(w)) return [`${raiz}e`, `${raiz}i`, `${raiz}u`];
    if (/ua$/.test(w)) return [`${raiz}y`, `${raiz}e`, `${raiz}u`];
    if (/[aeioyáéíóúý]a$/.test(w)) return [`${raiz}y`, `${raiz}i`, `${raiz}u`];
    const blanda = /([žščľňťďcj])a$/.exec(w);
    if (blanda) {
      const dura = `${raiz.slice(0, -1)}${BLANDA_DURA[blanda[1]] ?? blanda[1]}`;
      return [`${dura}e`, `${dura}i`, `${raiz}u`];
    }
    if (/a$/.test(w)) return [`${raiz}y`, `${raiz}e`, `${raiz}u`];
    // Macao, Curaçao: vocal + o no se declina.
    if (/[aeiou]o$/.test(w)) return [w, w, w];
    if (/(?:k|g|ch)o$/.test(w)) return [`${raiz}a`, `${raiz}u`, w];
    if (/o$/.test(w)) return [`${raiz}a`, `${raiz}e`, w];
    if (/[žščľňťďcj]$/.test(w)) return [`${w}a`, `${w}i`, w];
    if (/(?:k|g|ch)$/.test(w)) return [`${w}u`, `${w}u`, w];
    if (/[bdfhlmnpqrstvwxz]$/.test(w)) return [`${w}u`, `${w}e`, w];
    return [w, w, w];
  };
  // Un adjetivo delante del sustantivo, según el género del sustantivo.
  const adjetivo = (w: string, g: Genero): Formas => {
    const r = w.slice(0, -1);
    if (g === "pl") {
      if (/ove$/.test(w)) return [`${r.slice(0, -1)}vých`, `${r.slice(0, -1)}vých`, w];
      if (/é$/.test(w)) return [`${r}ých`, `${r}ých`, w];
      if (/e$/.test(w)) return [`${r}ych`, `${r}ych`, w];
      return [w, w, w];
    }
    if (/á$/.test(w)) return [`${r}ej`, `${r}ej`, `${r}ú`];
    if (/[a-zäôíúýčšžťďňľ]a$/.test(w) && g === "f") return [`${r}ej`, `${r}ej`, `${r}u`];
    if (/[ýé]$/.test(w)) return [`${r}ého`, `${r}om`, w];
    return [w, w, w];
  };
  const unir = (partes: readonly Formas[], sep: string): Formas => [
    partes.map((f) => f[0]).join(sep),
    partes.map((f) => f[1]).join(sep),
    partes.map((f) => f[2]).join(sep),
  ];
  const frase = (p: string): Formas => {
    const palabras = p.split(" ");
    const g = genero(palabras[palabras.length - 1]);
    return unir(palabras.map((w, i) => (i === palabras.length - 1 ? sustantivo(w) : adjetivo(w, g))), " ");
  };
  const formas = (p: string): Formas => {
    if (TABLA[p]) return TABLA[p];
    for (const sep of [" – ", " ("]) {
      const i = p.indexOf(sep);
      if (i > 0) {
        const [g, l, a] = formas(p.slice(0, i));
        return [g + p.slice(i), l + p.slice(i), a + p.slice(i)];
      }
    }
    if (p.includes(" a ")) return unir(p.split(" a ").map(formas), " a ");
    return frase(p);
  };
  const VO = /^(?:[VvFf]|Šv|šv)/;
  return (p: string): PadySk => {
    const [genitiv, lokal, akuzativ] = formas(p);
    const base = p.split(" (")[0];
    const predlozka = CON_NA.has(base) || /ostrov/i.test(p) ? "na" : VO.test(lokal) ? "vo" : "v";
    return { genitiv, lokal, akuzativ, predlozka };
  };
})();

const sk: GramaticaPais = {
  nombre: (p) => p,
  de: (p) => padySk(p).genitiv,
  en: (p) => {
    const f = padySk(p);
    return `${f.predlozka} ${f.lokal}`;
  },
  para: (p) => `pre ${padySk(p).akuzativ}`,
};

// Georgiano (ADR 0002, D26): sin artículo ni género. El país lleva sufijo. Lugar: dativo + «ში»
// («საქართველოში», «საფრანგეთში», «კანადაში»). Genitivo: «ის» o «ს» («საფრანგეთის», «კანადის»,
// «საქართველოს»). Destinatario: genitivo + «თვის» («საქართველოსთვის»). Se aplica solo a nombres,
// nunca a cifras ni a marcadores. El adjetivo delante del nombre pierde la «ი» en el lugar y la
// conserva en el genitivo («ახალ ზელანდიაში», «ახალი ზელანდიის»). En «X და Y» el primero lleva
// «სა» en el lugar y «ისა» o «სა» en el genitivo («ტრინიდადსა და ტობაგოში», «ტრინიდადისა და ტობაგოს»).
// La «ი» que es parte de la raíz no se cae: tabla KA_I_DE_RAIZ («მალიში», no «მალში»).
const KA_I_DE_RAIZ = new Set(["ბურუნდი", "ბრუნეი", "ჯიბუტი", "ფიჯი", "ჰაიტი", "კირიბატი", "მალი", "მალავი", "სომალი", "ჯერსი", "გერნსი", "სარკი", "ტაიტი", "სენ-ბართელმი"]);
// «ე» y «ა» que se caen en el genitivo salvo estos nombres, que la conservan.
const KA_E_TRUNCA = new Set(["ეგვიპტე"]);

function raizKa(palabra: string): { dativo: string; genitivo: string } {
  const ultima = palabra.split("-").at(-1) ?? palabra;
  if (KA_I_DE_RAIZ.has(palabra) || KA_I_DE_RAIZ.has(ultima) || /[აეოუ]ი$/.test(palabra)) return { dativo: palabra, genitivo: `${palabra}ს` };
  if (palabra.endsWith("ი")) {
    const tema = palabra.slice(0, -1);
    return { dativo: tema, genitivo: `${tema}ის` };
  }
  if (palabra.endsWith("ა")) {
    if (palabra.endsWith("ოა")) return { dativo: palabra, genitivo: `${palabra}ს` };
    return { dativo: palabra, genitivo: `${palabra.slice(0, -1)}ის` };
  }
  if (KA_E_TRUNCA.has(palabra)) return { dativo: palabra, genitivo: `${palabra.slice(0, -1)}ის` };
  return { dativo: palabra, genitivo: `${palabra}ს` };
}

// Las palabras delante del núcleo: las que ya están en genitivo («ამერიკის», «არაბთა») y las que no
// llevan «ი» («სამხრეთ») quedan igual; los adjetivos pierden la «ი» solo en el lugar.
function delanteKa(palabra: string, enLugar: boolean): string {
  if (!enLugar || !palabra.endsWith("ი") || KA_I_DE_RAIZ.has(palabra)) return palabra;
  return palabra.slice(0, -1);
}

function casosFraseKa(frase: string): { lugar: string; genitivo: string; primeroLugar: string; primeroGenitivo: string } {
  const palabras = frase.split(" ");
  const nucleo = palabras.pop() ?? frase;
  const r = raizKa(nucleo);
  const conDelante = (enLugar: boolean, fin: string) => [...palabras.map((p) => delanteKa(p, enLugar)), fin].join(" ");
  return {
    lugar: conDelante(true, `${r.dativo}ში`),
    genitivo: conDelante(false, r.genitivo),
    primeroLugar: conDelante(true, `${r.dativo}სა`),
    primeroGenitivo: conDelante(false, `${r.genitivo}ა`),
  };
}

// Nombres de Intl en ka que llevan un agregado: se declinan por la forma corta.
const KA_CORTOS: Readonly<Record<string, string>> = {
  "მიანმარი (ბირმა)": "მიანმარი",
  "კონგო - კინშასა": "კონგოს დემოკრატიული რესპუბლიკა",
  "კონგო - ბრაზავილი": "კონგოს რესპუბლიკა",
  "ჰონკონგის სპეციალური ადმინისტრაციული რეგიონი, ჩინეთი": "ჰონკონგი",
  "მაკაოს სპეციალური ადმინისტრაციული რეგიონი, ჩინეთი": "მაკაო",
  "ქალაქი ვატიკანი": "ვატიკანი",
  "ქოქოსის (კილინგის) კუნძულები": "ქოქოსის კუნძულები",
};
// «ცენტრალური აფრიკა» funciona como un nombre: el adjetivo no cambia delante de «რესპუბლიკა».
const KA_FIJOS: Readonly<Record<string, { lugar: string; genitivo: string }>> = {
  "ბრიტანეთის ტერიტორია ინდოეთის ოკეანეში": { lugar: "ბრიტანეთის ტერიტორიაზე ინდოეთის ოკეანეში", genitivo: "ბრიტანეთის ტერიტორიის ინდოეთის ოკეანეში" },
  "ცენტრალური აფრიკის რესპუბლიკა": { lugar: "ცენტრალური აფრიკის რესპუბლიკაში", genitivo: "ცენტრალური აფრიკის რესპუბლიკის" },
};

export function casosKa(p: string): { lugar: string; genitivo: string } {
  const nombre = KA_CORTOS[p] ?? p;
  const fijo = KA_FIJOS[nombre];
  if (fijo) return fijo;
  // Una cifra nunca lleva sufijo; un nombre en letras latinas lo lleva con guion, como «Google-ის».
  if (!/\p{L}/u.test(nombre)) return { lugar: nombre, genitivo: nombre };
  if (!/[\u10D0-\u10FF]/.test(nombre)) return { lugar: `${nombre}-ში`, genitivo: `${nombre}-ის` };
  const partes = nombre.split(" და ");
  if (partes.length === 2) {
    const uno = casosFraseKa(partes[0]);
    const dos = casosFraseKa(partes[1]);
    return { lugar: `${uno.primeroLugar} და ${dos.lugar}`, genitivo: `${uno.primeroGenitivo} და ${dos.genitivo}` };
  }
  const c = casosFraseKa(nombre);
  return { lugar: c.lugar, genitivo: c.genitivo };
}

const ka: GramaticaPais = {
  nombre: (p) => p,
  de: (p) => casosKa(p).genitivo,
  en: (p) => casosKa(p).lugar,
  para: (p) => (/\p{L}/u.test(p) ? `${casosKa(p).genitivo}თვის` : p),
};

// Croata (ADR 0002, D27): el nombre del país se declina. `de(p)` da el genitivo suelto («Hrvatske», «Crne
// Gore», «Sjedinjenih Američkih Država»), `en(p)` el lugar con su preposición («u Hrvatskoj», «u Crnoj
// Gori», «na Cipru», «na Filipinima») y `para(p)` «za» + acusativo («za Hrvatsku», «za Crnu Goru», «za
// Japan»). Los nombres llegan como los escribe Intl.DisplayNames en hr, así que la regla cubre los de una
// palabra por terminación (-a: -e/-i/-u, con -ka: -ci; los adjetivos sustantivados en -ska, -čka, -ška como
// Hrvatska o Njemačka: -e/-oj/-u; consonante, -o, -e y -u: -a/-u; -i del singular, como Mali o Haiti:
// -ja/-ju) y los compuestos (adjetivos delante, que concuerdan con el sustantivo; partes unidas con « i »
// por separado; lo que va entre paréntesis o tras « - » queda igual). La tabla lleva los irregulares (a
// móvil como Egipat o Cipar, nombres con el núcleo delante); CON_NA, los países e islas que van con «na».
// `padezHr` deja los tres casos y la preposición sueltos.
export interface PadeziHr {
  genitiv: string;
  lokativ: string;
  akuzativ: string;
  // «u» o «na»
  predlog: string;
}

export const padezHr: (pais: string) => PadeziHr = (() => {
  // [genitivo, locativo, acusativo] sin preposición.
  type Formas = readonly [string, string, string];
  const TABLA: Readonly<Record<string, Formas>> = {
    Egipat: ["Egipta", "Egiptu", "Egipat"],
    Cipar: ["Cipra", "Cipru", "Cipar"],
    Petar: ["Petra", "Petru", "Petar"],
    Kostarika: ["Kostarike", "Kostariki", "Kostariku"],
    "Šri Lanka": ["Šri Lanke", "Šri Lanki", "Šri Lanku"],
    "Papua Nova Gvineja": ["Papue Nove Gvineje", "Papui Novoj Gvineji", "Papuu Novu Gvineju"],
    "Gvineja Bisau": ["Gvineje Bisau", "Gvineji Bisau", "Gvineju Bisau"],
    "Burkina Faso": ["Burkine Faso", "Burkini Faso", "Burkinu Faso"],
    "Sijera Leone": ["Sijere Leone", "Sijeri Leone", "Sijeru Leone"],
    "Obala Bjelokosti": ["Obale Bjelokosti", "Obali Bjelokosti", "Obalu Bjelokosti"],
    "Sveti Toma i Princip": ["Svetog Tome i Principa", "Svetom Tomi i Principu", "Sveti Toma i Princip"],
    "Timor-Leste": ["Timor-Leste", "Timor-Leste", "Timor-Leste"],
    "PUP Hong Kong Kina": ["PUP Hong Kong Kina", "PUP Hong Kong Kina", "PUP Hong Kong Kina"],
    "PUP Makao Kina": ["PUP Makao Kina", "PUP Makao Kina", "PUP Makao Kina"],
    "Tristan da Cunha": ["Tristana da Cunhe", "Tristanu da Cunhi", "Tristan da Cunhu"],
    "Diego Garcia": ["Diega Garcije", "Diegu Garciji", "Diega Garciju"],
    Guernsey: ["Guernseyja", "Guernseyju", "Guernsey"],
    Jersey: ["Jerseyja", "Jerseyju", "Jersey"],
    "Saint Barthélemy": ["Saint Barthélemyja", "Saint Barthélemyju", "Saint Barthélemy"],
    "Palestinsko područje": ["Palestinskog područja", "Palestinskom području", "Palestinsko područje"],
    "Vanjska područja Oceanije": ["Vanjskih područja Oceanije", "Vanjskim područjima Oceanije", "Vanjska područja Oceanije"],
    "Kokosovi (Keelingovi) Otoci": ["Kokosovih (Keelingovih) Otoka", "Kokosovim (Keelingovim) Otocima", "Kokosove (Keelingove) Otoke"],
    "Karipski otoci Nizozemske": ["Karipskih otoka Nizozemske", "Karipskim otocima Nizozemske", "Karipske otoke Nizozemske"],
    "Mali udaljeni otoci SAD-a": ["Malih udaljenih otoka SAD-a", "Malim udaljenim otocima SAD-a", "Male udaljene otoke SAD-a"],
    "Južna Georgia i Otoci Južni Sandwich": ["Južne Georgije i Otoka Južni Sandwich", "Južnoj Georgiji i Otocima Južni Sandwich", "Južnu Georgiju i Otoke Južni Sandwich"],
  };
  const CON_NA = new Set([
    "Cipar", "Malta", "Kuba", "Island", "Jamajka", "Filipini", "Madagaskar", "Novi Zeland", "Šri Lanka", "Tajvan",
    "Bahami", "Maldivi", "Sejšeli", "Mauricijus", "Barbados", "Haiti", "Fidži", "Bermudi", "Dominika", "Grenada",
    "Trinidad i Tobago", "Antigva i Barbuda", "Sveta Lucija", "Sveti Vincent i Grenadini", "Sveti Kristofor i Nevis",
    "Sveti Toma i Princip", "Aruba", "Tonga", "Samoa", "Američka Samoa", "Kosovo", "Grenland", "Martinik",
    "Guadalupe", "Réunion", "Nauru", "Tuvalu", "Palau", "Vanuatu", "Kiribati", "Guam", "Curaçao", "Mayotte", "Sveta Helena",
    "Saint Barthélemy", "Saint Martin", "Sint Maarten", "Guernsey", "Jersey", "Antarktika", "Svalbard i Jan Mayen", "Tokelau", "Niue",
    "Sark", "Montserrat", "Angvila", "Tristan da Cunha", "Komori", "Kanari",
    "Diego Garcia", "Palestinsko područje", "Sveti Petar i Mikelon", "Wallis i Futuna", "Vanjska područja Oceanije",
  ]);
  // Sustantivos plurales: masculinos en -i (Filipini, Otoci) y femeninos en -e (Države).
  const PLURAL_M = new Set(["Filipini", "Bahami", "Maldivi", "Bermudi", "Sejšeli", "Grenadini", "Emirati", "Komori", "Kanari", "Teritoriji"]);
  const OTOCI = new Set(["Otoci", "otoci"]);
  const PLURAL_F = new Set(["Države"]);
  const esPlural = (w: string) => PLURAL_M.has(w) || OTOCI.has(w) || PLURAL_F.has(w);
  const sustantivo = (w: string): Formas => {
    if (TABLA[w]) return TABLA[w];
    if (/^[A-ZČĆŠŽĐ]{2,}$/.test(w)) return [w, w, w];
    const raiz = w.slice(0, -1);
    if (OTOCI.has(w)) {
      const o = w[0];
      return [`${o}toka`, `${o}tocima`, `${o}toke`];
    }
    if (PLURAL_M.has(w)) return [`${raiz}a`, `${raiz}ima`, `${raiz}e`];
    if (PLURAL_F.has(w)) return [`${raiz}a`, `${raiz}ama`, w];
    // Adjetivo sustantivado (Hrvatska, Francuska, Njemačka, Češka): se declina como adjetivo.
    if (/(?:sk|čk|šk|ck)a$/.test(w)) return [`${raiz}e`, `${raiz}oj`, `${raiz}u`];
    // -ka: Republika, Jamajka, Dominika, Antarktika (locativo en -ci).
    if (/ka$/.test(w)) return [`${raiz}e`, `${w.slice(0, -2)}ci`, `${raiz}u`];
    if (/a$/.test(w)) return [`${raiz}e`, `${raiz}i`, `${raiz}u`];
    // Masculino en -i del singular (Mali, Haiti, Malavi, Burundi): Malija, u Maliju.
    if (/i$/.test(w)) return [`${w}ja`, `${w}ju`, w];
    // -o tras vocal (Curaçao): Curaçaoa, na Curaçaou.
    if (/[aeiou]o$/.test(w)) return [`${w}a`, `${w}u`, w];
    // -o (Maroko, Meksiko, Kosovo, Kraljevstvo): Maroka, u Maroku.
    if (/o$/.test(w)) return [`${raiz}a`, `${raiz}u`, w];
    // Consonante, -e y -u (Brazil, Zimbabve, Peru): Brazila, u Brazilu; Zimbabvea; Perua.
    return [`${w}a`, `${w}u`, w];
  };
  // Un adjetivo delante del sustantivo, según el número del sustantivo. Lo que no termina como adjetivo
  // (Saint, Sint, San) queda igual.
  const ADJETIVO = /(?:sk|čk|šk|ck|n|t|v|j|l|r|d|k|ć)[aoie]$/;
  const INVARIABLES = new Set(["Saint", "Sint", "San", "PUP", "da", "Jan"]);
  const adjetivo = (w: string, plural: boolean): Formas => {
    if (INVARIABLES.has(w) || !ADJETIVO.test(w)) return [w, w, w];
    const r = w.slice(0, -1);
    if (plural) return [`${r}ih`, `${r}im`, /i$/.test(w) ? `${r}e` : w];
    if (/a$/.test(w)) return [`${r}e`, `${r}oj`, `${r}u`];
    if (/[io]$/.test(w)) return [`${r}og`, `${r}om`, w];
    return [w, w, w];
  };
  const unir = (partes: readonly Formas[], sep: string): Formas => [
    partes.map((f) => f[0]).join(sep),
    partes.map((f) => f[1]).join(sep),
    partes.map((f) => f[2]).join(sep),
  ];
  const frase = (p: string): Formas => {
    const palabras = p.split(" ");
    const plural = esPlural(palabras[palabras.length - 1]);
    return unir(palabras.map((w, i) => (i === palabras.length - 1 ? sustantivo(w) : adjetivo(w, plural))), " ");
  };
  const formas = (p: string): Formas => {
    if (TABLA[p]) return TABLA[p];
    for (const sep of [" - ", " ("]) {
      const i = p.indexOf(sep);
      if (i > 0) {
        const [g, l, a] = formas(p.slice(0, i));
        return [g + p.slice(i), l + p.slice(i), a + p.slice(i)];
      }
    }
    // Núcleo delante: «Otok Man», «Otoci Turks i Caicos», «Otoci Heard i McDonald».
    const [primera, ...resto] = p.split(" ");
    if (resto.length && /^Oto(?:k|ci)$/.test(primera)) {
      const [g, l, a] = sustantivo(primera);
      const cola = ` ${resto.join(" ")}`;
      return [g + cola, l + cola, a + cola];
    }
    if (p.includes(" i ")) return unir(p.split(" i ").map(formas), " i ");
    return frase(p);
  };
  return (p: string): PadeziHr => {
    const [genitiv, lokativ, akuzativ] = formas(p);
    const base = p.split(" (")[0];
    const predlog = CON_NA.has(base) || /(?:^|\s)[Oo]to(?:k|ci)(?:\s|$)/.test(p) ? "na" : "u";
    return { genitiv, lokativ, akuzativ, predlog };
  };
})();

const hr: GramaticaPais = {
  nombre: (p) => p,
  de: (p) => padezHr(p).genitiv,
  en: (p) => {
    const f = padezHr(p);
    return `${f.predlog} ${f.lokativ}`;
  },
  para: (p) => `za ${padezHr(p).akuzativ}`,
};

// Mongol (ADR 0002, D28): los sufijos de caso dependen de la armonía vocálica y de la consonante final, y
// un nombre extranjero suelto se equivoca fácil («Германд» pero «Францад», «Орост», «Швейцарьт»). Por eso
// el sufijo nunca se pega al nombre: lo lleva «улс», que siempre declina igual («Герман улсад», «Герман
// улсын», «Герман улсад зориулсан»), como se escribe en la prensa y en los sitios del Estado. Si el
// nombre ya termina en «Улс» o en «арлууд» el sufijo va sobre esa palabra, cuya armonía se conoce
// («Монгол Улсад», «Соломоны арлуудын»). Hong Kong, Macao, Puerto Rico y Taiwán van con «нутаг
// дэвсгэр»: «улс» diría algo que el sitio no quiere afirmar. Intl.DisplayNames da «Монгол» a secas y
// el nombre oficial es «Монгол Улс».
const mn: GramaticaPais = (() => {
  const TERRITORIO = /(?:Хонг-Конг|Макао|Пуэрто-Рико|Тайвань)$/u;
  const nombre = (p: string) => (p === "Монгол" ? "Монгол Улс" : p);
  const sufijo = (p: string, adUlsArlad: string, tDevsger: string): string => {
    const n = nombre(p);
    if (/(?:Улс|улс|[аА]рлууд)$/u.test(n)) return `${n}${adUlsArlad}`;
    if (/нутаг дэвсгэр$/u.test(n)) return `${n}${tDevsger}`;
    if (TERRITORIO.test(n)) return `${n} нутаг дэвсгэр${tDevsger}`;
    return `${n} улс${adUlsArlad}`;
  };
  const en = (p: string) => sufijo(p, "ад", "т");
  return { nombre, de: (p) => sufijo(p, "ын", "ийн"), en, para: (p) => `${en(p)} зориулсан` };
})();

// Albanés (ADR 0002, D31): el nombre llega indefinido, como lo escribe Intl.DisplayNames en sq
// («Shqipëri», «Francë», «Brazil»), y se declina. `nombre(p)` da el nominativo definido («Shqipëria»),
// `de(p)` el genitivo con «të» («të Shqipërisë»), `en(p)` el lugar con «në» («në Shqipëri»; los compuestos
// y los plurales van en acusativo definido: «në Zelandën e Re», «në Emiratet e Bashkuara Arabe») y
// `para(p)` «për» + acusativo definido («për Shqipërinë»). El artículo del genitivo concuerda con lo que
// tiene delante (Banka e Shqipërisë, Presidenti i Shqipërisë, pagat të Shqipërisë): `de` trae el «të»,
// que es el que va tras un plural o un indefinido, y `rasatSq(p).gjinore` da el genitivo solo para las
// frases que necesitan «e» o «i». La regla va por terminación: -ë (a/ës/ën), -i femenino (ia/isë/inë),
// consonante (i/it/in, con k, g y h: u/ut/un), -o (oja/os/on), -u y -e (ja/së/në), -a (a/ës/ën) y -ia, -ua,
// -oa (a/s/n). La tabla lleva los irregulares, MASC_I los masculinos en -i (Kili, Mali) y PLURAL los
// plurales. «A dhe B» y «A e B» se declinan por partes; lo que va entre paréntesis queda igual.
export interface RasatSq {
  // nominativo definido: «Shqipëria»
  emerore: string;
  // genitivo sin artículo: «Shqipërisë»
  gjinore: string;
  // acusativo definido: «Shqipërinë»
  kallezore: string;
  // lo que va tras «në»: «Shqipëri», «Zelandën e Re»
  vendore: string;
}

export const rasatSq: (pais: string) => RasatSq = (() => {
  // [emerore, gjinore, kallezore, vendore]
  type Formas = readonly [string, string, string, string];
  const TABLA: Readonly<Record<string, Formas>> = {
    "Shqipëria": ["Shqipëria", "Shqipërisë", "Shqipërinë", "Shqipëri"],
    Zvicër: ["Zvicra", "Zvicrës", "Zvicrën", "Zvicër"],
    Kanada: ["Kanadaja", "Kanadasë", "Kanadanë", "Kanada"],
    Panama: ["Panamaja", "Panamasë", "Panamanë", "Panama"],
    Brunei: ["Bruneji", "Bruneit", "Brunein", "Brunei"],
    SHBA: ["SHBA-të", "SHBA-së", "SHBA-në", "SHBA"],
    "Shtetet e Bashkuara": ["Shtetet e Bashkuara", "Shteteve të Bashkuara", "Shtetet e Bashkuara", "Shtetet e Bashkuara"],
    "Mal i Zi": ["Mali i Zi", "Malit të Zi", "Malin e Zi", "Mal të Zi"],
    "Mali i Zi": ["Mali i Zi", "Malit të Zi", "Malin e Zi", "Mal të Zi"],
    "Maqedonia e Veriut": ["Maqedonia e Veriut", "Maqedonisë së Veriut", "Maqedoninë e Veriut", "Maqedoninë e Veriut"],
    "Mbretëria e Bashkuar": ["Mbretëria e Bashkuar", "Mbretërisë së Bashkuar", "Mbretërinë e Bashkuar", "Mbretërinë e Bashkuar"],
    "Zelandë e Re": ["Zelanda e Re", "Zelandës së Re", "Zelandën e Re", "Zelandën e Re"],
    "Kaledoni e Re": ["Kaledonia e Re", "Kaledonisë së Re", "Kaledoninë e Re", "Kaledoninë e Re"],
    "Kore e Veriut": ["Koreja e Veriut", "Koresë së Veriut", "Korenë e Veriut", "Korenë e Veriut"],
    "Kore e Jugut": ["Koreja e Jugut", "Koresë së Jugut", "Korenë e Jugut", "Korenë e Jugut"],
    "Afrika e Jugut": ["Afrika e Jugut", "Afrikës së Jugut", "Afrikën e Jugut", "Afrikën e Jugut"],
    "Sudani i Jugut": ["Sudani i Jugut", "Sudanit të Jugut", "Sudanin e Jugut", "Sudanin e Jugut"],
    "Arabi Saudite": ["Arabia Saudite", "Arabisë Saudite", "Arabinë Saudite", "Arabinë Saudite"],
    "Republika Dominikane": ["Republika Dominikane", "Republikës Dominikane", "Republikën Dominikane", "Republikën Dominikane"],
    "Republika e Afrikës Qendrore": ["Republika e Afrikës Qendrore", "Republikës së Afrikës Qendrore", "Republikën e Afrikës Qendrore", "Republikën e Afrikës Qendrore"],
    "Emiratet e Bashkuara Arabe": ["Emiratet e Bashkuara Arabe", "Emirateve të Bashkuara Arabe", "Emiratet e Bashkuara Arabe", "Emiratet e Bashkuara Arabe"],
    "Kepi i Gjelbër": ["Kepi i Gjelbër", "Kepit të Gjelbër", "Kepin e Gjelbër", "Kepin e Gjelbër"],
    "Guineja Ekuatoriale": ["Guineja Ekuatoriale", "Guinesë Ekuatoriale", "Guinenë Ekuatoriale", "Guinenë Ekuatoriale"],
    "Guineja e Re-Papua": ["Guineja e Re-Papua", "Guinesë së Re-Papua", "Guinenë e Re-Papua", "Guinenë e Re-Papua"],
    "Saharaja Perëndimore": ["Saharaja Perëndimore", "Saharasë Perëndimore", "Saharanë Perëndimore", "Saharanë Perëndimore"],
    "Samoa Amerikane": ["Samoa Amerikane", "Samoas Amerikane", "Samoan Amerikane", "Samoan Amerikane"],
    "Guajana Franceze": ["Guajana Franceze", "Guajanës Franceze", "Guajanën Franceze", "Guajanën Franceze"],
    "Polinezia Franceze": ["Polinezia Franceze", "Polinezisë Franceze", "Polinezinë Franceze", "Polinezinë Franceze"],
    "Territoret Palestineze": ["Territoret Palestineze", "Territoreve Palestineze", "Territoret Palestineze", "Territoret Palestineze"],
    "Territoret Jugore Franceze": ["Territoret Jugore Franceze", "Territoreve Jugore Franceze", "Territoret Jugore Franceze", "Territoret Jugore Franceze"],
    "Karaibet holandeze": ["Karaibet holandeze", "Karaibeve holandeze", "Karaibet holandeze", "Karaibet holandeze"],
    "Ishujt e Virgjër Britanikë": ["Ishujt e Virgjër Britanikë", "Ishujve të Virgjër Britanikë", "Ishujt e Virgjër Britanikë", "Ishujt e Virgjër Britanikë"],
    "Ishujt e Virgjër të SHBA-së": ["Ishujt e Virgjër të SHBA-së", "Ishujve të Virgjër të SHBA-së", "Ishujt e Virgjër të SHBA-së", "Ishujt e Virgjër të SHBA-së"],
    "Ishujt e Marianës Veriore": ["Ishujt e Marianës Veriore", "Ishujve të Marianës Veriore", "Ishujt e Marianës Veriore", "Ishujt e Marianës Veriore"],
    "Ishulli i Krishtlindjes": ["Ishulli i Krishtlindjes", "Ishullit të Krishtlindjes", "Ishullin e Krishtlindjes", "Ishullin e Krishtlindjes"],
    "Ishulli i Manit": ["Ishulli i Manit", "Ishullit të Manit", "Ishullin e Manit", "Ishullin e Manit"],
    "Territori Britanik i Oqeanit Indian": ["Territori Britanik i Oqeanit Indian", "Territorit Britanik të Oqeanit Indian", "Territorin Britanik të Oqeanit Indian", "Territorin Britanik të Oqeanit Indian"],
    "Bashkimi Evropian": ["Bashkimi Evropian", "Bashkimit Evropian", "Bashkimin Evropian", "Bashkimin Evropian"],
  };
  const MASC_I = new Set(["Kili", "Mali", "Haiti", "Fixhi", "Burundi", "Malavi", "Kiribati", "Uruguai", "Paraguai", "Surinami"]);
  const PLURAL = new Set(["Filipine", "Bahama", "Bermude", "Maldive", "Sejshelle", "Komore", "Grenadine"]);
  // Nombres de una palabra (o unidos con guion: declina la última parte).
  const palabra = (w: string): Formas => {
    if (TABLA[w]) return TABLA[w];
    if (PLURAL.has(w)) {
      // Bahama, Filipine: Bahamet, Bahameve, «në Bahama».
      const raiz = /[ae]$/.test(w) ? w.slice(0, -1) : w;
      return [`${raiz}et`, `${raiz}eve`, `${raiz}et`, w];
    }
    if (MASC_I.has(w)) return [w, `${w}t`, `${w}n`, w];
    // -ë: Francë, Kinë, Ukrainë.
    if (/ë$/.test(w)) {
      const raiz = w.slice(0, -1);
      return [`${raiz}a`, `${raiz}ës`, `${raiz}ën`, w];
    }
    // -i femenino: Shqipëri, Gjermani, Itali.
    if (/i$/.test(w)) return [`${w}a`, `${w}së`, `${w}në`, w];
    // Ya definido con -ia, -ua, -oa: Kenia, Kamboxhia, Nikaragua, Samoa.
    if (/[iuo]a$/.test(w)) return [w, `${w}s`, `${w}n`, w];
    // -a: Tonga, Barbuda.
    if (/a$/.test(w)) {
      const raiz = w.slice(0, -1);
      return [w, `${raiz}ës`, `${raiz}ën`, w];
    }
    // -o: Monako, Togo, Porto-Riko.
    if (/o$/.test(w)) return [`${w}ja`, `${w}s`, `${w}n`, w];
    // -u y -e: Peru, Vanuatu, Guine, Eritre, Zimbabve.
    if (/[ue]$/.test(w)) return [`${w}ja`, `${w}së`, `${w}në`, w];
    // Consonante velar: Irak, Marok, Luksemburg, Mozambik.
    if (/[kgh]$/.test(w) && !/sh$/.test(w)) return [`${w}u`, `${w}ut`, `${w}un`, w];
    // Otra consonante: Brazil, Egjipt, Bangladesh, Katar.
    return [`${w}i`, `${w}it`, `${w}in`, w];
  };
  const formas = (p: string): Formas => {
    if (TABLA[p]) return TABLA[p];
    const par = p.indexOf(" (");
    if (par > 0) {
      const f = formas(p.slice(0, par));
      const cola = p.slice(par);
      return [f[0] + cola, f[1] + cola, f[2] + cola, f[3] + cola];
    }
    for (const sep of [" dhe ", " e "]) {
      const i = p.indexOf(sep);
      if (i > 0 && /^\p{Lu}/u.test(p.slice(i + sep.length))) {
        const a = formas(p.slice(0, i));
        const b = formas(p.slice(i + sep.length));
        return [a[0] + sep + b[0], a[1] + sep + b[1], a[2] + sep + b[2], a[3] + sep + b[3]];
      }
    }
    const [primera, ...resto] = p.split(" ");
    // Núcleo delante: «Ishujt Kajman», «Ishulli Norfolk».
    if (resto.length && primera === "Ishujt") return [p, `Ishujve ${resto.join(" ")}`, p, p];
    if (resto.length && primera === "Ishulli") return [p, `Ishullit ${resto.join(" ")}`, `Ishullin ${resto.join(" ")}`, `Ishullin ${resto.join(" ")}`];
    // Lo que no se sabe declinar queda igual, con la preposición delante.
    if (resto.length) return [p, p, p, p];
    return palabra(p);
  };
  return (p: string): RasatSq => {
    const [emerore, gjinore, kallezore, vendore] = formas(p);
    return { emerore, gjinore, kallezore, vendore };
  };
})();

const sq: GramaticaPais = {
  nombre: (p) => rasatSq(p).emerore,
  de: (p) => `të ${rasatSq(p).gjinore}`,
  en: (p) => `në ${rasatSq(p).vendore}`,
  para: (p) => `për ${rasatSq(p).kallezore}`,
};

// Esloveno (ADR 0002, D32): el nombre del país se declina. `de(p)` da el genitivo suelto («Slovenije», «Črne
// gore», «Združenih držav Amerike»), `en(p)` el lugar con su preposición («v Sloveniji», «na Hrvaškem», «na
// Cipru», «na Filipinih») y `para(p)` «za» + acusativo («za Slovenijo», «za Črno goro», «za Japonsko»). Los
// nombres llegan como los escribe Intl.DisplayNames en sl: una regla por terminación para los de una palabra
// (-a: -e/-i/-o; adjetivos sustantivados en -ska, -ška, -čka: -e/-em/-o con «na»; consonante: -a/-u; -r:
// -rja/-rju; -i, -u, -e, -y: -ja/-ju; -o: -a/-u) y otra para los compuestos (adjetivos que concuerdan con el
// sustantivo final; partes unidas con « in » por separado; lo que va entre paréntesis o tras « - » queda
// igual). La tabla lleva lo irregular y CON_NA los países e islas que van con «na». `sklonSl` deja los tres
// casos y la preposición sueltos.
export interface SkloniSl {
  rodilnik: string;
  mestnik: string;
  tozilnik: string;
  // «v» o «na»
  predlog: string;
}

export const sklonSl: (pais: string) => SkloniSl = (() => {
  // [genitivo, locativo, acusativo] sin preposición.
  type Formas = readonly [string, string, string];
  const igual = (p: string): Formas => [p, p, p];
  const TABLA: Readonly<Record<string, Formas>> = {
    Ciper: ["Cipra", "Cipru", "Ciper"],
    Niger: ["Nigra", "Nigru", "Niger"],
    Čile: ["Čila", "Čilu", "Čile"],
    "Burkina Faso": ["Burkine Faso", "Burkini Faso", "Burkino Faso"],
    "Sierra Leone": ["Sierre Leone", "Sierri Leone", "Sierro Leone"],
    "Papua Nova Gvineja": ["Papue Nove Gvineje", "Papui Novi Gvineji", "Papuo Novo Gvinejo"],
    "Gvineja Bissau": ["Gvineje Bissau", "Gvineji Bissau", "Gvinejo Bissau"],
    "San Marino": ["San Marina", "San Marinu", "San Marino"],
    "Združene države Amerike": ["Združenih držav Amerike", "Združenih državah Amerike", "Združene države Amerike"],
    "Demokratična republika Kongo": ["Demokratične republike Kongo", "Demokratični republiki Kongo", "Demokratično republiko Kongo"],
    "Timor-Leste": igual("Timor-Leste"),
    "Posebno upravno območje Ljudske republike Kitajske Hongkong": [
      "Posebnega upravnega območja Ljudske republike Kitajske Hongkong",
      "Posebnem upravnem območju Ljudske republike Kitajske Hongkong",
      "Posebno upravno območje Ljudske republike Kitajske Hongkong",
    ],
    "Posebno upravno območje Kitajske Makav": ["Posebnega upravnega območja Kitajske Makav", "Posebnem upravnem območju Kitajske Makav", "Posebno upravno območje Kitajske Makav"],
    "Britansko ozemlje v Indijskem oceanu": ["Britanskega ozemlja v Indijskem oceanu", "Britanskem ozemlju v Indijskem oceanu", "Britansko ozemlje v Indijskem oceanu"],
    "Stranski zunanji otoki Združenih držav": ["Stranskih zunanjih otokov Združenih držav", "Stranskih zunanjih otokih Združenih držav", "Stranske zunanje otoke Združenih držav"],
    "Južna Georgia in Južni Sandwichevi otoki": ["Južne Georgie in Južnih Sandwichevih otokov", "Južni Georgii in Južnih Sandwichevih otokih", "Južno Georgio in Južne Sandwicheve otoke"],
    "Sveta Peter in Mihael": ["Svetega Petra in Mihaela", "Svetem Petru in Mihaelu", "Sveti Peter in Mihael"],
    "Svalbard in Jan Mayen": ["Svalbarda in Jana Mayena", "Svalbardu in Janu Mayenu", "Svalbard in Jan Mayen"],
    "Tristan da Cunha": ["Tristana da Cunhe", "Tristanu da Cunhi", "Tristan da Cunho"],
    "Diego Garcia": ["Diega Garcie", "Diegu Garcii", "Diega Garcio"],
  };
  const CON_NA = new Set([
    "Ciper", "Malta", "Kuba", "Islandija", "Jamajka", "Filipini", "Madagaskar", "Šrilanka", "Tajvan", "Nova Zelandija",
    "Bahami", "Maldivi", "Sejšeli", "Mavricij", "Barbados", "Haiti", "Fidži", "Bermudi", "Dominika", "Grenada",
    "Trinidad in Tobago", "Antigva in Barbuda", "Sveta Lucija", "Sveti Vincencij in Grenadine", "Sveti Krištof in Nevis",
    "Sveti Tomaž in Princ", "Aruba", "Tonga", "Samoa", "Ameriška Samoa", "Kosovo", "Grenlandija", "Martinik", "Gvadelup",
    "Reunion", "Nauru", "Tuvalu", "Palav", "Vanuatu", "Kiribati", "Gvam", "Curaçao", "Mayotte", "Sveta Helena", "Sveti Bartolomej",
    "Guernsey", "Jersey", "Antarktika", "Svalbard in Jan Mayen", "Tokelav", "Niue", "Sark", "Montserrat", "Angvila", "Tristan da Cunha",
    "Komori", "Diego Garcia", "Sveta Peter in Mihael", "Wallis in Futuna", "Francoski Sveti Martin", "Nizozemski Sveti Martin",
    "Nizozemski Karibi", "Slonokoščena obala", "Južna Georgia in Južni Sandwichevi otoki",
  ]);
  const PLURAL_M = new Set(["Filipini", "Bahami", "Maldivi", "Bermudi", "Sejšeli", "Komori", "Karibi", "emirati", "Emirati"]);
  const PLURAL_F = new Set(["Grenadine", "države"]);
  const OTOKI = new Set(["Otoki", "otoki"]);
  const INVARIABLES = new Set(["San", "da", "Jan"]);
  const esPlural = (w: string) => PLURAL_M.has(w) || PLURAL_F.has(w) || OTOKI.has(w);
  const sustantivo = (w: string): Formas => {
    if (TABLA[w]) return TABLA[w];
    if (/^[A-ZČŠŽ]{2,}$/.test(w)) return igual(w);
    const raiz = w.slice(0, -1);
    if (OTOKI.has(w)) return [`${w[0]}tokov`, `${w[0]}tokih`, `${w[0]}toke`];
    if (PLURAL_M.has(w)) return [`${raiz}ov`, `${raiz}ih`, `${raiz}e`];
    if (PLURAL_F.has(w)) return [raiz, `${raiz}ah`, w];
    // Adjetivo sustantivado (Hrvaška, Madžarska, Češka): «Hrvaške», «na Hrvaškem», «Hrvaško».
    if (/(?:sk|šk|čk)a$/.test(w)) return [`${raiz}e`, `${raiz}em`, `${raiz}o`];
    if (/a$/.test(w)) return [`${raiz}e`, `${raiz}i`, `${raiz}o`];
    // Neutros en -je (ozemlje, območje): «ozemlja», «ozemlju».
    if (/je$/.test(w)) return [`${raiz}a`, `${raiz}u`, w];
    // -o tras vocal (Curaçao) como las vocales; -o tras consonante (Maroko, Kosovo, kraljestvo): Maroka, v Maroku.
    if (/[aeiou]o$/.test(w)) return [`${w}ja`, `${w}ju`, w];
    if (/o$/.test(w)) return [`${raiz}a`, `${raiz}u`, w];
    // Vocal e -y (Peru, Mali, Zimbabve, Guernsey) y -r (Katar, Singapur, Madagaskar): llevan -j-.
    if (/[eiuyr]$/.test(w)) return [`${w}ja`, `${w}ju`, w];
    return [`${w}a`, `${w}u`, w];
  };
  // Un adjetivo delante del sustantivo, según el género y el número del sustantivo final.
  const adjetivo = (w: string, plural: boolean): Formas => {
    if (INVARIABLES.has(w)) return igual(w);
    const r = w.slice(0, -1);
    if (plural) return [`${r}ih`, `${r}ih`, `${r}e`];
    if (/a$/.test(w)) return [`${r}e`, `${r}i`, `${r}o`];
    if (/i$/.test(w)) return [`${r}ega`, `${r}em`, w];
    if (/[oe]$/.test(w)) return [`${r}ega`, `${r}em`, w];
    // Posesivo masculino sin -i (Bouvetov otok, Heardov otok).
    return [`${w}ega`, `${w}em`, w];
  };
  const unir = (partes: readonly Formas[], sep: string): Formas => [
    partes.map((f) => f[0]).join(sep),
    partes.map((f) => f[1]).join(sep),
    partes.map((f) => f[2]).join(sep),
  ];
  const frase = (p: string): Formas => {
    const palabras = p.split(" ");
    const plural = esPlural(palabras[palabras.length - 1]);
    return unir(palabras.map((w, i) => (i === palabras.length - 1 ? sustantivo(w) : adjetivo(w, plural))), " ");
  };
  const formas = (p: string): Formas => {
    if (TABLA[p]) return TABLA[p];
    for (const sep of [" - ", " ("]) {
      const i = p.indexOf(sep);
      if (i > 0) {
        const [g, l, a] = formas(p.slice(0, i));
        return [g + p.slice(i), l + p.slice(i), a + p.slice(i)];
      }
    }
    // Núcleo delante: «Otok Man», «Otoki Turks in Caicos».
    const [primera, ...resto] = p.split(" ");
    if (resto.length && /^Otok(?:i)?$/.test(primera)) {
      const [g, l, a] = sustantivo(primera);
      const cola = ` ${resto.join(" ")}`;
      return [g + cola, l + cola, a + cola];
    }
    if (p.includes(" in ")) return unir(p.split(" in ").map(formas), " in ");
    return frase(p);
  };
  return (p: string): SkloniSl => {
    const [rodilnik, mestnik, tozilnik] = formas(p);
    const base = p.split(" (")[0];
    const predlog = CON_NA.has(base) || /^\p{Lu}\p{Ll}*(?:sk|šk|čk)a$/u.test(p) || /(?:^|\s)[Oo]tok(?:i)?(?:\s|$)/.test(p) ? "na" : "v";
    return { rodilnik, mestnik, tozilnik, predlog };
  };
})();

const sl: GramaticaPais = {
  nombre: (p) => p,
  de: (p) => sklonSl(p).rodilnik,
  en: (p) => {
    const f = sklonSl(p);
    return `${f.predlog} ${f.mestnik}`;
  },
  para: (p) => `za ${sklonSl(p).tozilnik}`,
};

// Intl en sl da el mes en nominativo («15. oktober 2026»). Tras «od» o «do» va en genitivo («od 15. oktobra
// 2026»). Lo que no sea un mes queda igual.
const MESES_GEN_SL: Readonly<Record<string, string>> = {
  januar: "januarja", februar: "februarja", marec: "marca", april: "aprila", maj: "maja", junij: "junija",
  julij: "julija", avgust: "avgusta", september: "septembra", oktober: "oktobra", november: "novembra", december: "decembra",
};
export function fechaGenSl(fecha: string): string {
  return fecha.replace(/\p{L}+/gu, (m) => MESES_GEN_SL[m] ?? m);
}

// Estonio (ADR 0002, D33): el nombre se declina y no lleva preposición. `de` da el genitivo, que va DELANTE
// del sustantivo («Eesti kalkulaatorid», «Saksamaa andmed»); `en` el caso de lugar entero, inesivo -s
// («Eestis», «Soomes», «Hispaanias») o adesivo -l (los -maa y las islas: «Saksamaal», «Maltal», «Küprosel»,
// «Filipiinidel»); `para` el genitivo con la posposición («Eesti jaoks»). Por regla: vocal final, genitivo
// igual; consonante, -i («Portugali», «Jaapani»); -us, -os, -as, -se («Egiptuse», «Laose», «Hondurase»);
// plurales -id, -ide; -saared, -saarte; -vabariik, -vabariigi. Los compuestos con «ja» se declinan por partes
// y lo que va entre paréntesis queda igual. Una sigla lleva el caso con guion («Kongo DV-s»). La tabla
// cubre las gradaciones que la regla no adivina.
const et: GramaticaPais = (() => {
  const TABLA: Readonly<Record<string, readonly [string, string]>> = {
    "Ameerika Ühendriigid": ["Ameerika Ühendriikide", "Ameerika Ühendriikides"],
    "Araabia Ühendemiraadid": ["Araabia Ühendemiraatide", "Araabia Ühendemiraatides"],
    Ühendkuningriik: ["Ühendkuningriigi", "Ühendkuningriigis"],
    "Kongo Demokraatlik Vabariik": ["Kongo Demokraatliku Vabariigi", "Kongo Demokraatlikus Vabariigis"],
    Iraak: ["Iraagi", "Iraagis"],
    Kuveit: ["Kuveidi", "Kuveidis"],
    Mosambiik: ["Mosambiigi", "Mosambiigis"],
    Elevandiluurannik: ["Elevandiluuranniku", "Elevandiluurannikul"],
    "Hongkongi erihalduspiirkond": ["Hongkongi erihalduspiirkonna", "Hongkongi erihalduspiirkonnas"],
    "Macau erihalduspiirkond": ["Macau erihalduspiirkonna", "Macau erihalduspiirkonnas"],
    "Palestiina alad": ["Palestiina alade", "Palestiina aladel"],
    Madalmaad: ["Madalmaade", "Madalmaades"],
  };
  // Islas y lo que va con adesivo aunque no termine en -maa.
  const ADESIVO = new Set(["Malta", "Küpros", "Island", "Kuuba", "Jamaica", "Haiti", "Sri Lanka", "Bahama", "Barbados", "Mauritius", "Madagaskar", "Fidži", "Grenada", "Dominica", "Saint Lucia", "Samoa", "Tonga", "Vanuatu", "Tuvalu", "Nauru", "Kiribati", "Aruba", "Bermuda", "Guam", "Taiwan", "Saint Vincent", "Saint Kitts", "Nevis", "Trinidad", "Tobago", "Antigua", "Barbuda", "São Tomé", "Príncipe", "Turks", "Caicos"]);
  const uno = (p: string): readonly [string, string] => {
    const fila = TABLA[p];
    if (fila) return fila;
    if (/[A-ZÕÄÖÜŠŽ]{2,}$/.test(p)) return [p, `${p}-s`];
    let gen: string;
    let adesivo = /maa$/.test(p) || ADESIVO.has(p);
    if (/saared$/i.test(p)) {
      gen = p.replace(/saared$/i, (m) => (m[0] === "S" ? "Saarte" : "saarte"));
      adesivo = true;
    } else if (/id$/.test(p)) {
      gen = `${p.slice(0, -1)}de`;
      adesivo = true;
    } else if (/[Vv]abariik$/.test(p)) {
      gen = `${p.slice(0, -2)}igi`;
    } else if (/[aeiouõäöüyéí]$/.test(p)) {
      gen = p;
    } else if (/[aou]s$/.test(p)) {
      gen = `${p}e`;
    } else {
      gen = `${p}i`;
    }
    return [gen, `${gen}${adesivo ? "l" : "s"}`];
  };
  const formas = (p: string): readonly [string, string] => {
    if (TABLA[p]) return TABLA[p];
    // Lo que va entre paréntesis no se declina: «Myanmari (Birma)», «Myanmaris (Birma)».
    const par = /^(.*?)( \(.*\))$/.exec(p);
    if (par) {
      const [g, l] = formas(par[1]);
      return [`${g}${par[2]}`, `${l}${par[2]}`];
    }
    const partes = p.split(" ja ").map(uno);
    return [partes.map((f) => f[0]).join(" ja "), partes.map((f) => f[1]).join(" ja ")];
  };
  return { nombre: (p) => p, de: (p) => formas(p)[0], en: (p) => formas(p)[1], para: (p) => `${formas(p)[0]} jaoks` };
})();

// Islandés (ADR 0002, D34): el nombre del país se declina y además elige preposición. `de(p)` da el
// genitivo suelto («Íslands», «Þýskalands», «Bandaríkjanna»), `en(p)` el lugar con «á» o «í» y dativo («á
// Íslandi», «í Þýskalandi», «á Spáni», «í Bandaríkjunum») y `para(p)` «fyrir» con acusativo («fyrir Ísland»,
// «fyrir Noreg»). Los nombres llegan como los escribe Intl.DisplayNames en is. Reglas por terminación: -land
// (neutro: -landi, -lands), -eyjar (femenino plural: -eyjum, -eyja, con «á»), -eyja, -ey, -ía y -ea (débil:
// -u en los tres casos), -lýðveldið; un nombre extranjero terminado en vocal o -s no se declina («í Perú»,
// «í Kanada», «í Sviss») y uno en consonante suma -s en genitivo («Pakistans», «Japans»). La tabla lleva lo
// irregular y CON_A los lugares que van con «á» (islas y los que la lengua fijó: Ísland, Spánn, Ítalía,
// Indland, Írland, Grikkland, Nýja-Sjáland...).
export interface FallIs {
  // «á» o «í»
  forsetning: string;
  thagufall: string;
  eignarfall: string;
  tholfall: string;
}

export const fallIs: (pais: string) => FallIs = (() => {
  // [dativo, genitivo, acusativo]
  type Formas = readonly [string, string, string];
  const igual = (p: string): Formas => [p, p, p];
  const TABLA: Readonly<Record<string, Formas>> = {
    Noregur: ["Noregi", "Noregs", "Noreg"],
    Spánn: ["Spáni", "Spánar", "Spán"],
    Danmörk: ["Danmörku", "Danmerkur", "Danmörku"],
    Svíþjóð: ["Svíþjóð", "Svíþjóðar", "Svíþjóð"],
    Lúxemborg: ["Lúxemborg", "Lúxemborgar", "Lúxemborg"],
    Austurríki: ["Austurríki", "Austurríkis", "Austurríki"],
    Malta: ["Möltu", "Möltu", "Möltu"],
    Kúba: ["Kúbu", "Kúbu", "Kúbu"],
    Úkraína: ["Úkraínu", "Úkraínu", "Úkraínu"],
    Argentína: ["Argentínu", "Argentínu", "Argentínu"],
    Moldóva: ["Moldóvu", "Moldóvu", "Moldóvu"],
    Kostaríka: ["Kostaríku", "Kostaríku", "Kostaríku"],
    Dóminíka: ["Dóminíku", "Dóminíku", "Dóminíku"],
    Kýpur: igual("Kýpur"),
    Madagaskar: igual("Madagaskar"),
    Singapúr: igual("Singapúr"),
    Gíbraltar: igual("Gíbraltar"),
    "El Salvador": igual("El Salvador"),
    Gvam: igual("Gvam"),
    Mön: ["Mön", "Manar", "Mön"],
    Bandaríkin: ["Bandaríkjunum", "Bandaríkjanna", "Bandaríkin"],
    "Sameinuðu arabísku furstadæmin": ["Sameinuðu arabísku furstadæmunum", "Sameinuðu arabísku furstadæmanna", "Sameinuðu arabísku furstadæmin"],
    "Sameinuðu þjóðirnar": ["Sameinuðu þjóðunum", "Sameinuðu þjóðanna", "Sameinuðu þjóðirnar"],
    "Bosnía og Hersegóvína": ["Bosníu og Hersegóvínu", "Bosníu og Hersegóvínu", "Bosníu og Hersegóvínu"],
    "Suður-Afríka": ["Suður-Afríku", "Suður-Afríku", "Suður-Afríku"],
    Fílabeinsströndin: ["Fílabeinsströndinni", "Fílabeinsstrandarinnar", "Fílabeinsströndina"],
    Suðurskautslandið: ["Suðurskautslandinu", "Suðurskautslandsins", "Suðurskautslandið"],
    Vatíkanið: ["Vatíkaninu", "Vatíkansins", "Vatíkanið"],
    Evrópusambandið: ["Evrópusambandinu", "Evrópusambandsins", "Evrópusambandið"],
    Evrusvæðið: ["Evrusvæðinu", "Evrusvæðisins", "Evrusvæðið"],
    "Franska Gvæjana": ["Frönsku Gvæjana", "Frönsku Gvæjana", "Frönsku Gvæjana"],
    "Franska Pólýnesía": ["Frönsku Pólýnesíu", "Frönsku Pólýnesíu", "Frönsku Pólýnesíu"],
    "Nýja-Kaledónía": ["Nýju-Kaledóníu", "Nýju-Kaledóníu", "Nýju-Kaledóníu"],
    "Papúa Nýja-Gínea": ["Papúa Nýju-Gíneu", "Papúa Nýju-Gíneu", "Papúa Nýju-Gíneu"],
    "Gínea-Bissá": ["Gíneu-Bissá", "Gíneu-Bissá", "Gíneu-Bissá"],
    "Bandaríska Samóa": ["Bandarísku Samóa", "Bandarísku Samóa", "Bandarísku Samóa"],
    "Sankti Lúsía": ["Sankti Lúsíu", "Sankti Lúsíu", "Sankti Lúsíu"],
    "Sankti Helena": ["Sankti Helenu", "Sankti Helenu", "Sankti Helenu"],
    "Svalbarði og Jan Mayen": ["Svalbarða og Jan Mayen", "Svalbarða og Jan Mayen", "Svalbarða og Jan Mayen"],
    "Suður-Georgía og Suður-Sandvíkureyjar": ["Suður-Georgíu og Suður-Sandvíkureyjum", "Suður-Georgíu og Suður-Sandvíkureyja", "Suður-Georgíu og Suður-Sandvíkureyjar"],
    "Heimastjórnarsvæði Palestínumanna": ["Heimastjórnarsvæði Palestínumanna", "Heimastjórnarsvæðis Palestínumanna", "Heimastjórnarsvæði Palestínumanna"],
    "sérstjórnarsvæðið Hong Kong": ["sérstjórnarsvæðinu Hong Kong", "sérstjórnarsvæðisins Hong Kong", "sérstjórnarsvæðið Hong Kong"],
    "sérstjórnarsvæðið Makaó": ["sérstjórnarsvæðinu Makaó", "sérstjórnarsvæðisins Makaó", "sérstjórnarsvæðið Makaó"],
    "Karíbahafshluti Hollands": ["Karíbahafshluta Hollands", "Karíbahafshluta Hollands", "Karíbahafshluta Hollands"],
    "Frönsku suðlægu landsvæðin": ["Frönsku suðlægu landsvæðunum", "Frönsku suðlægu landsvæðanna", "Frönsku suðlægu landsvæðin"],
    "Bresku Indlandshafseyjar": ["Bresku Indlandshafseyjum", "Bresku Indlandshafseyja", "Bresku Indlandshafseyjar"],
    "Smáeyjar Bandaríkjanna": ["Smáeyjum Bandaríkjanna", "Smáeyja Bandaríkjanna", "Smáeyjar Bandaríkjanna"],
  };
  const CON_A = new Set([
    "Ísland", "Grænland", "Írland", "Indland", "Grikkland", "Nýja-Sjáland", "Spánn", "Ítalía", "Malta", "Kúba", "Kýpur", "Madagaskar",
    "Srí Lanka", "Taívan", "Haítí", "Jamaíka", "Barbados", "Máritíus", "Dóminíka", "Grenada", "Arúba", "Angvilla", "Samóa", "Bandaríska Samóa",
    "Tonga", "Vanúatú", "Nárú", "Túvalú", "Kíribatí", "Palá", "Tókelá", "Niue", "Gvam", "Mön", "Jersey", "Guernsey", "Sark", "Gíbraltar", "Martiník",
    "Réunion", "Mayotte", "Montserrat", "Curacao", "Saint-Martin", "Sint Maarten", "Púertó Ríkó", "Fílabeinsströndin", "Suðurskautslandið",
    "Antígva og Barbúda", "Trínidad og Tóbagó", "Saó Tóme og Prinsípe", "Sankti Kitts og Nevis", "Sankti Lúsía", "Sankti Helena",
    "Sankti Pierre og Miquelon", "Svalbarði og Jan Mayen", "Tímor-Leste", "Nýja-Kaledónía", "Heimastjórnarsvæði Palestínumanna", "Tristan da Cunha",
    "Diego Garcia", "Suður-Georgía og Suður-Sandvíkureyjar",
  ]);
  const formas = (p: string): Formas => {
    if (TABLA[p]) return TABLA[p];
    const parentesis = p.indexOf(" (");
    if (parentesis > 0) {
      const cola = p.slice(parentesis);
      const [d, g, a] = formas(p.slice(0, parentesis));
      return [d + cola, g + cola, a + cola];
    }
    if (/eyjar$/.test(p)) return [`${p.slice(0, -2)}um`, p.slice(0, -1), p];
    if (/eyja$/.test(p)) return [`${p.slice(0, -1)}u`, `${p.slice(0, -1)}u`, `${p.slice(0, -1)}u`];
    if (/ey$/.test(p)) return [p, `${p}jar`, p];
    if (/land$/.test(p)) return [`${p}i`, `${p}s`, p];
    if (/lýðveldið$/.test(p)) return [`${p.slice(0, -1)}nu`, `${p.slice(0, -1)}sins`, p];
    if (/[íe]a$/.test(p)) {
      const u = `${p.slice(0, -1)}u`;
      return [u, u, u];
    }
    if (/[aáeéiíoóuúyýæös]$/i.test(p)) return igual(p);
    return [p, `${p}s`, p];
  };
  return (p: string): FallIs => {
    const [thagufall, eignarfall, tholfall] = formas(p);
    const base = p.split(" (")[0];
    const forsetning = CON_A.has(base) || (/ey(?:jar|ja)?$/.test(base) && base !== "Færeyjar") ? "á" : "í";
    return { forsetning, thagufall, eignarfall, tholfall };
  };
})();

const is: GramaticaPais = {
  nombre: (p) => p,
  de: (p) => fallIs(p).eignarfall,
  en: (p) => {
    const f = fallIs(p);
    return `${f.forsetning} ${f.thagufall}`;
  },
  para: (p) => `fyrir ${fallIs(p).tholfall}`,
};

export const GRAMATICA: Readonly<Record<Idioma, GramaticaPais>> = { es, en, fr, pt, it, de, nl, ja, ko, zh, pl, sv, da, nb, fi, ar, id: idn, tr, bn, th, uk, uz, ru, ro, cs, el, hu, he, sr, bg, sk, ka, hr, mn, hy, sq, sl, et, is };
