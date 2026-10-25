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

// Sin artículos ni plural: el país lleva la partícula detrás. Lugar y destino cambian el orden de
// toda la frase, así que los diccionarios de estos idiomas arman la oración con el nombre suelto y
// usan estas formas solo donde encajan tal cual.
const ja: GramaticaPais = { nombre: (p) => p, de: (p) => `${p}の`, en: (p) => `${p}で`, para: (p) => `${p}向け` };
const ko: GramaticaPais = { nombre: (p) => p, de: (p) => `${p}의`, en: (p) => `${p}에서`, para: (p) => `${p}용` };
// 的 y 在 se escriben igual en las dos escrituras; «para» se deja suelto porque 適用於/适用于 no.
const zh: GramaticaPais = { nombre: (p) => p, de: (p) => `${p}的`, en: (p) => `在${p}`, para: (p) => p };

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

export const GRAMATICA: Readonly<Record<Idioma, GramaticaPais>> = { es, en, fr, pt, it, de, nl, ja, ko, zh, hu };
