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

export const GRAMATICA: Readonly<Record<Idioma, GramaticaPais>> = { es, en, fr, pt, it, de, nl, ja, ko, zh, pl, sv, da, nb, fi, ar, id: idn, tr, bn, th, uk, uz, ru, ro, cs, el };
