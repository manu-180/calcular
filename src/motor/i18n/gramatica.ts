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

export const GRAMATICA: Readonly<Record<Idioma, GramaticaPais>> = { es, en, fr, pt, it, de, nl, ja, ko, zh, pl, sv, da, nb, fi, ar, id: idn, tr, bn, th, uk, uz };
