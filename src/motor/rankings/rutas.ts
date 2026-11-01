import type { Idioma } from "../tipos";

// Slug del índice de rankings por idioma. Cada uno es una carpeta en src/app/(intl)/intl/[mercado]/
// y tiene que ser distinto de los demás (dos idiomas no pueden compartir carpeta) y de cualquier slug
// de calculadora: una carpeta estática le gana a [slug]. Es el mismo en todas las ediciones de un
// idioma, así el clúster hreflang se arma solo para un país nuevo.
export const SLUG_RANKINGS: Record<Idioma, string> = {
  sq: "renditja-e-vendeve",
  es: "ranking-de-paises",
  pt: "ranking-dos-paises",
  en: "country-rankings",
  fr: "classement-des-pays",
  de: "laender-ranking",
  it: "classifica-dei-paesi",
  nl: "landenranglijst",
  ja: "kunibetsu-ranking",
  ko: "gukgabyeol-sunwi",
  zh: "guojia-paiming",
  bg: "klasatsia-na-darzhavite",
  mn: "ulsuudyn-jagsaalt",
  hy: "yerkrneri-varkanish",
  sl: "lestvice-drzav",
  et: "riikide-vordlus",
  is: "rodun-landa",
  mk: "rang-lista-na-drzhavite",
  vi: "xep-hang-quoc-gia",

  pl: "ranking-krajow",
  sv: "landsrankning",
  da: "landerangliste",
  nb: "landrangering",
  fi: "maiden-vertailu",
  ar: "tartib-alduwal",
  id: "peringkat-negara",
  tr: "ulke-siralamasi",
  // bn transliterado, como bishwe-beton (ADR 0002, D14).
  bn: "desher-ranking",
  th: "andap-prathet",
  uk: "reitynh-krain",
  uz: "mamlakatlar-reytingi",
  ru: "reyting-stran",
  ro: "clasamentul-tarilor",
  cs: "zebricek-zemi",
  el: "katataxi-choron",
  hu: "orszagok-rangsora",
  he: "dirug-medinot",
  sr: "rang-lista-zemalja",
  sk: "rebricek-krajin",
  ka: "kveqnebis-reitingi",
  hr: "ljestvica-zemalja",
  lv: "valstu-reitings",
};

export const IDS_RANKING = ["rinde", "libertad", "aumento"] as const;
export type IdRanking = (typeof IDS_RANKING)[number];

// Slug de cada ranking dentro del índice (/<m>/<índice>/<ranking>). ja, ko, zh, ar y th van con el slug
// en inglés, como las universales (ADR 0002, D8, D10 y D13). Ninguno puede ser «og»: esa carpeta es la imagen.
export const SLUGS_RANKING: Record<Idioma, Record<IdRanking, string>> = {
  es: { rinde: "donde-rinde-mas-el-sueldo", libertad: "dia-de-libertad-tributaria", aumento: "cuanto-queda-de-un-aumento" },
  pt: { rinde: "onde-o-salario-rende-mais", libertad: "dia-da-liberdade-de-impostos", aumento: "quanto-fica-de-um-aumento" },
  en: { rinde: "where-pay-goes-furthest", libertad: "tax-freedom-day-by-country", aumento: "how-much-of-a-raise-you-keep" },
  fr: { rinde: "ou-le-salaire-rapporte-le-plus", libertad: "jour-de-liberation-fiscale", aumento: "ce-qui-reste-d-une-augmentation" },
  de: { rinde: "wo-das-gehalt-am-meisten-bringt", libertad: "steuerzahlergedenktag", aumento: "was-von-der-gehaltserhoehung-bleibt" },
  it: { rinde: "dove-rende-di-piu-lo-stipendio", libertad: "giorno-di-liberazione-fiscale", aumento: "quanto-resta-di-un-aumento" },
  nl: { rinde: "waar-salaris-het-meest-oplevert", libertad: "belastingvrijheidsdag", aumento: "wat-overblijft-van-loonsverhoging" },
  ja: { rinde: "take-home-pay", libertad: "tax-freedom-day", aumento: "pay-raise" },
  ko: { rinde: "take-home-pay", libertad: "tax-freedom-day", aumento: "pay-raise" },
  zh: { rinde: "take-home-pay", libertad: "tax-freedom-day", aumento: "pay-raise" },
  // sq en ASCII sin diacríticos (ë→e, ç→c), con las palabras que se buscan (ADR 0002, D31).
  sq: { rinde: "ku-vlen-me-shume-paga", libertad: "dita-e-lirise-tatimore", aumento: "sa-mbetet-nga-rritja-e-pages" },
  // bg con la transliteración oficial búlgara (Закон за транслитерацията; ADR 0002, D24).
  bg: { rinde: "pokupatelna-sila-na-zaplatata", libertad: "den-na-danachnata-svoboda", aumento: "kolko-ostava-ot-uvelichenieto" },
  // mn en ASCII: х = kh, ц = ts, ө = o, ү = u, ж = j, ы = y (ADR 0002, D28).
  mn: { rinde: "tsalingiin-khudaldan-avakh-chadvar", libertad: "tatvaraas-choloot-odor", aumento: "nemegdlees-khed-uldekh" },
  // hy con la transliteración ASCII de ADR 0002, D30.
  hy: { rinde: "ashkhatavardzi-gnoghunakutyun", libertad: "harkayin-azatutyan-or", aumento: "inchkan-e-mnum-barcratsumits" },
  // sl en ASCII sin diacríticos, con las palabras que se buscan (ADR 0002, D32).
  sl: { rinde: "kje-placa-najvec-zaleze", libertad: "dan-davcne-svobode", aumento: "koliko-ostane-od-povisice" },
  // et en ASCII sin diacríticos, con las palabras que se buscan (ADR 0002, D33).
  et: { rinde: "kus-palk-kestab-kauem", libertad: "maksuvabaduse-paev", aumento: "kui-palju-palgatousust-jaab" },
  // is en ASCII (þ→th, ð→d, æ→ae, ö→o, sin tildes), con las palabras que se buscan (ADR 0002, D34).
  is: { rinde: "hvar-launin-duga-best", libertad: "skattfrelsisdagurinn", aumento: "hvad-verdur-eftir-af-launahaekkun" },
  // mk en ASCII con la transliteración oficial: ж = zh, ч = ch, ќ = kj, њ = nj, ј = j (ADR 0002, D36).
  mk: { rinde: "kupovna-mokj-na-platata", libertad: "den-na-danochna-sloboda", aumento: "kolku-ostanuva-od-pokachuvanjeto" },
  // vi en ASCII, sin diacríticos y con đ = d (ADR 0002, D37).
  vi: { rinde: "suc-mua-cua-luong", libertad: "ngay-tu-do-thue", aumento: "tang-luong-con-lai-bao-nhieu" },

  pl: { rinde: "gdzie-pensja-daje-najwiecej", libertad: "dzien-wolnosci-podatkowej", aumento: "ile-zostaje-z-podwyzki" },
  sv: { rinde: "dar-lonen-racker-langst", libertad: "skattefrihetsdagen", aumento: "vad-som-blir-kvar-av-en-loneokning" },
  da: { rinde: "hvor-lonnen-raekker-laengst", libertad: "skattefridag", aumento: "hvad-der-er-tilbage-af-en-lonforhojelse" },
  nb: { rinde: "der-lonnen-gir-mest", libertad: "skattefridagen", aumento: "hva-som-blir-igjen-av-et-lonnstillegg" },
  fi: { rinde: "missa-palkka-riittaa-pisimmalle", libertad: "verovapauden-paiva", aumento: "paljonko-palkankorotuksesta-jaa" },
  ar: { rinde: "take-home-pay", libertad: "tax-freedom-day", aumento: "pay-raise" },
  // id en indonesio ASCII con la búsqueda de Google Indonesia (ADR 0002, D11).
  id: { rinde: "gaji-paling-bernilai", libertad: "hari-bebas-pajak", aumento: "sisa-kenaikan-gaji" },
  // tr en ASCII turco con la búsqueda de Google Turquía (ADR 0002, D12).
  tr: { rinde: "maasin-alim-gucu", libertad: "vergi-ozgurluk-gunu", aumento: "zamdan-ne-kalir" },
  bn: { rinde: "kothay-beton-beshi-chole", libertad: "kor-mukti-dibos", aumento: "beton-briddhir-koto-thake" },
  th: { rinde: "take-home-pay", libertad: "tax-freedom-day", aumento: "pay-raise" },
  // uk con la transliteración oficial ucraniana (resolución 55/2010; ADR 0002, D15).
  uk: { rinde: "kupivelna-spromozhnist-zarplaty", libertad: "den-podatkovoi-svobody", aumento: "skilky-zalyshaietsia-vid-pidvyshchennia" },
  uz: { rinde: "maosh-qayerda-kop-yetadi", libertad: "soliqdan-ozodlik-kuni", aumento: "oshgan-maoshdan-qancha-qoladi" },
  // ru con transliteración ASCII simple (ADR 0002, D17).
  ru: { rinde: "pokupatelnaya-sposobnost-zarplaty", libertad: "den-nalogovoy-svobody", aumento: "skolko-ostaetsya-ot-povysheniya" },
  // ro con slugs ASCII sin diacríticos de la frase que se busca (ADR 0002, D18).
  ro: { rinde: "puterea-de-cumparare-a-salariului", libertad: "ziua-libertatii-fiscale", aumento: "cat-ramane-din-marire" },
  // cs en ASCII sin diacríticos, con las palabras que se buscan (ADR 0002, D19).
  cs: { rinde: "kde-mzda-vystaci-nejdal", libertad: "den-danove-svobody", aumento: "kolik-zbyde-ze-zvyseni-mzdy" },
  // el transliterado en ASCII con ELOT 743 sin tonos, sobre lo que se busca (ADR 0002, D20).
  el: { rinde: "pou-ftanei-o-misthos", libertad: "imera-forologikis-eleftherias", aumento: "posa-menoun-apo-tin-afxisi" },
  // hu en ASCII sin diacríticos, con las palabras que se buscan (ADR 0002, D21).
  hu: { rinde: "hol-er-tobbet-a-fizetes", libertad: "adoszabadsag-napja", aumento: "mennyi-marad-a-fizetesemelesbol" },
  he: { rinde: "take-home-pay", libertad: "tax-freedom-day", aumento: "pay-raise" },
  // sr en ASCII sin diacríticos, con las palabras que se buscan (ADR 0002, D23).
  sr: { rinde: "gde-plata-vredi-najvise", libertad: "dan-poreske-slobode", aumento: "koliko-ostaje-od-povisice" },
  // sk en ASCII sin diacríticos, con las palabras que se buscan (ADR 0002, D25).
  sk: { rinde: "kde-mzda-vystaci-najdalej", libertad: "den-danovej-slobody", aumento: "kolko-zostane-zo-zvysenia-mzdy" },
  ka: { rinde: "khelpasis-msqidveloba", libertad: "sagadasakhado-tavisuplebis-dghe", aumento: "ramdeni-rcheba-momatebidan" },
  // hr en ASCII sin diacríticos, con las palabras que se buscan (ADR 0002, D27).
  hr: { rinde: "gdje-placa-vrijedi-najvise", libertad: "dan-porezne-slobode", aumento: "koliko-ostaje-od-povisice" },
  // lv en ASCII sin diacríticos, con las palabras que se buscan (ADR 0002, D35).
  lv: { rinde: "kur-no-algas-paliek-visvairak", libertad: "nodoklu-brivibas-diena", aumento: "cik-paliek-no-algas-pielikuma" },
};

export function rankingDeSlug(idioma: Idioma, slug: string): IdRanking | null {
  const tabla = SLUGS_RANKING[idioma];
  return IDS_RANKING.find((id) => tabla[id] === slug) ?? null;
}

export function slugRanking(idioma: Idioma, id: IdRanking): string {
  return `${SLUG_RANKINGS[idioma]}/${SLUGS_RANKING[idioma][id]}`;
}

// Datos abiertos: un solo juego de archivos para todo el sitio, servido por la edición global
// (src/app/(intl)/intl/[mercado]/data). hosts.ts manda /data/<archivo> del host intl a global.
export const SEGMENTO_DATOS = "data";
export const ARCHIVOS_DATOS = { json: "country-rankings.json", csv: "country-rankings.csv" } as const;

export function rutaDatos(formato: keyof typeof ARCHIVOS_DATOS): string {
  return `/${SEGMENTO_DATOS}/${ARCHIVOS_DATOS[formato]}`;
}
