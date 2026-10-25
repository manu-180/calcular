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

export const GRAMATICA: Readonly<Record<Idioma, GramaticaPais>> = { es, en, fr, pt, it, de, nl, ja, ko, zh, sr };
