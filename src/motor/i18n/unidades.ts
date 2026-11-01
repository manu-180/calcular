import type { Idioma } from "../tipos";
import type { FormasAr } from "./arabe";
import { ANIOS_HE, DIAS_HE, HORAS_HE, MESES_HE, SEMANAS_HE, type FormasHe } from "./hebreo";
import { escrituraZh } from "./escritura";

export type UnidadDeTiempo = "dias" | "semanas" | "horas" | "meses" | "anios";

// La forma se elige con Intl.PluralRules del locale: "uno" es la categoría "one" y "otros" todas las
// demás. En polaco, ucraniano y ruso "pocos" es la categoría "few" (2 dni, 3 tygodnie; 2 дні, 3 тижні;
// 2 дня, 3 недели) y "muchos" la "many" (5 lat; 5 років; 5 лет); "otros" queda para las fracciones, que
// van en genitivo singular (1,5 roku; 1,5 року; 1,5 года). En rumano "pocos" es la "few" (0, 2 a 19,
// 101: «2 ani», «1,5 ani») y "otros" la "other", que lleva «de» delante del sustantivo («20 de ani»,
// «100 de zile»; ADR 0002, D18). En checo "few" es 2 a 4 (2 dny, 3 týdny), "other" 0 y 5 en adelante
// (5 let) y "many" las fracciones, que van en genitivo singular (1,5 roku): por eso en cs "muchos" lleva
// la forma de fracción. Un idioma con dual trae sus formas con {n} donde va el número: el árabe
// FormasAr y el hebreo FormasHe (uno, dual y plural: «יום אחד», «יומיים», «{n} ימים»).
// En serbio "uno" es 1, 21, 31... (no 11), "pocos" 2 a 4, 22 a 24... (no 12 a 14) y "otros" el resto,
// fracciones incluidas: «1 dan», «2 dana», «5 dana», «21 dan», «1,5 godina».
// En croata "uno" es 1, 21, 31... (no 11), "pocos" 2 a 4, 22 a 24... (no 12 a 14) y "otros" el resto,
// fracciones incluidas: «1 dan», «2 dana», «5 dana», «21 dan», «1,5 godina».
// En esloveno, "dual" es la categoría "two" (2, 102...): «2 dneva», «2 leti»; ADR 0002, D32.
// En letón "uno" es 1, 21, 31... (no 11) y "otros" el resto (2, 10, 11, 1,5), fracciones incluidas; "cero"
// es la forma del 0 exacto, en genitivo plural: «1 gads», «2 gadi», «10 gadi», «21 gads», «0 gadu».
export interface FormasUnidad {
  uno: string;
  dual?: string;
  otros: string;
  pocos?: string;
  muchos?: string;
  cero?: string;
}

type Formas = Readonly<Record<UnidadDeTiempo, FormasUnidad | FormasAr | FormasHe>>;

// ja, ko y zh no tienen plural: las dos formas son iguales y la unidad va pegada al número (3日).
export const NOMBRES_UNIDAD: Readonly<Record<Idioma, Formas>> = {
  es: { dias: { uno: "día", otros: "días" }, semanas: { uno: "semana", otros: "semanas" }, horas: { uno: "hora", otros: "horas" }, meses: { uno: "mes", otros: "meses" }, anios: { uno: "año", otros: "años" } },
  pt: { dias: { uno: "dia", otros: "dias" }, semanas: { uno: "semana", otros: "semanas" }, horas: { uno: "hora", otros: "horas" }, meses: { uno: "mês", otros: "meses" }, anios: { uno: "ano", otros: "anos" } },
  en: { dias: { uno: "day", otros: "days" }, semanas: { uno: "week", otros: "weeks" }, horas: { uno: "hour", otros: "hours" }, meses: { uno: "month", otros: "months" }, anios: { uno: "year", otros: "years" } },
  fr: { dias: { uno: "jour", otros: "jours" }, semanas: { uno: "semaine", otros: "semaines" }, horas: { uno: "heure", otros: "heures" }, meses: { uno: "mois", otros: "mois" }, anios: { uno: "an", otros: "ans" } },
  de: { dias: { uno: "Tag", otros: "Tage" }, semanas: { uno: "Woche", otros: "Wochen" }, horas: { uno: "Stunde", otros: "Stunden" }, meses: { uno: "Monat", otros: "Monate" }, anios: { uno: "Jahr", otros: "Jahre" } },
  it: { dias: { uno: "giorno", otros: "giorni" }, semanas: { uno: "settimana", otros: "settimane" }, horas: { uno: "ora", otros: "ore" }, meses: { uno: "mese", otros: "mesi" }, anios: { uno: "anno", otros: "anni" } },
  nl: { dias: { uno: "dag", otros: "dagen" }, semanas: { uno: "week", otros: "weken" }, horas: { uno: "uur", otros: "uur" }, meses: { uno: "maand", otros: "maanden" }, anios: { uno: "jaar", otros: "jaar" } },
  ja: { dias: { uno: "日", otros: "日" }, semanas: { uno: "週間", otros: "週間" }, horas: { uno: "時間", otros: "時間" }, meses: { uno: "か月", otros: "か月" }, anios: { uno: "年", otros: "年" } },
  ko: { dias: { uno: "일", otros: "일" }, semanas: { uno: "주", otros: "주" }, horas: { uno: "시간", otros: "시간" }, meses: { uno: "개월", otros: "개월" }, anios: { uno: "년", otros: "년" } },
  zh: { dias: { uno: "天", otros: "天" }, semanas: { uno: "週", otros: "週" }, horas: { uno: "小時", otros: "小時" }, meses: { uno: "個月", otros: "個月" }, anios: { uno: "年", otros: "年" } },
  pl: {
    dias: { uno: "dzień", pocos: "dni", muchos: "dni", otros: "dnia" },
    semanas: { uno: "tydzień", pocos: "tygodnie", muchos: "tygodni", otros: "tygodnia" },
    horas: { uno: "godzina", pocos: "godziny", muchos: "godzin", otros: "godziny" },
    meses: { uno: "miesiąc", pocos: "miesiące", muchos: "miesięcy", otros: "miesiąca" },
    anios: { uno: "rok", pocos: "lata", muchos: "lat", otros: "roku" },
  },
  sv: { dias: { uno: "dag", otros: "dagar" }, semanas: { uno: "vecka", otros: "veckor" }, horas: { uno: "timme", otros: "timmar" }, meses: { uno: "månad", otros: "månader" }, anios: { uno: "år", otros: "år" } },
  da: { dias: { uno: "dag", otros: "dage" }, semanas: { uno: "uge", otros: "uger" }, horas: { uno: "time", otros: "timer" }, meses: { uno: "måned", otros: "måneder" }, anios: { uno: "år", otros: "år" } },
  nb: { dias: { uno: "dag", otros: "dager" }, semanas: { uno: "uke", otros: "uker" }, horas: { uno: "time", otros: "timer" }, meses: { uno: "måned", otros: "måneder" }, anios: { uno: "år", otros: "år" } },
  // Finés: tras un número distinto de 1 (fracciones incluidas) el sustantivo va en partitivo singular.
  fi: { dias: { uno: "päivä", otros: "päivää" }, semanas: { uno: "viikko", otros: "viikkoa" }, horas: { uno: "tunti", otros: "tuntia" }, meses: { uno: "kuukausi", otros: "kuukautta" }, anios: { uno: "vuosi", otros: "vuotta" } },
  // Estonio: tras un número distinto de 1 (fracciones incluidas) el sustantivo va en partitivo singular
  // («1 aasta», «2 aastat», «5 päeva», «1,5 tundi»; ADR 0002, D33).
  et: { dias: { uno: "päev", otros: "päeva" }, semanas: { uno: "nädal", otros: "nädalat" }, horas: { uno: "tund", otros: "tundi" }, meses: { uno: "kuu", otros: "kuud" }, anios: { uno: "aasta", otros: "aastat" } },
  ar: {
    dias: { uno: "يوم واحد", dos: "يومان", pocos: "{n} أيام", muchos: "{n} يومًا", otros: "{n} يوم" },
    semanas: { uno: "أسبوع واحد", dos: "أسبوعان", pocos: "{n} أسابيع", muchos: "{n} أسبوعًا", otros: "{n} أسبوع" },
    horas: { uno: "ساعة واحدة", dos: "ساعتان", pocos: "{n} ساعات", muchos: "{n} ساعة", otros: "{n} ساعة" },
    meses: { uno: "شهر واحد", dos: "شهران", pocos: "{n} أشهر", muchos: "{n} شهرًا", otros: "{n} شهر" },
    anios: { uno: "سنة واحدة", dos: "سنتان", pocos: "{n} سنوات", muchos: "{n} سنة", otros: "{n} سنة" },
  },
  // El indonesio no marca el plural después de un número (3 hari, 1,5 tahun): las dos formas son iguales.
  id: { dias: { uno: "hari", otros: "hari" }, semanas: { uno: "minggu", otros: "minggu" }, horas: { uno: "jam", otros: "jam" }, meses: { uno: "bulan", otros: "bulan" }, anios: { uno: "tahun", otros: "tahun" } },
  // El turco no pone plural después de un número (3 gün, 1,5 yıl): las dos formas son iguales.
  tr: { dias: { uno: "gün", otros: "gün" }, semanas: { uno: "hafta", otros: "hafta" }, horas: { uno: "saat", otros: "saat" }, meses: { uno: "ay", otros: "ay" }, anios: { uno: "yıl", otros: "yıl" } },
  // El bengalí no flexiona el sustantivo detrás de un número (৩ দিন, ১ বছর, ১.৫ বছর): las dos formas
  // son iguales. Va separado del número por un espacio.
  bn: { dias: { uno: "দিন", otros: "দিন" }, semanas: { uno: "সপ্তাহ", otros: "সপ্তাহ" }, horas: { uno: "ঘণ্টা", otros: "ঘণ্টা" }, meses: { uno: "মাস", otros: "মাস" }, anios: { uno: "বছর", otros: "বছর" } },
  // El tailandés no marca el plural (3 วัน, 1.5 ปี) y la unidad va separada del número por un espacio.
  th: { dias: { uno: "วัน", otros: "วัน" }, semanas: { uno: "สัปดาห์", otros: "สัปดาห์" }, horas: { uno: "ชั่วโมง", otros: "ชั่วโมง" }, meses: { uno: "เดือน", otros: "เดือน" }, anios: { uno: "ปี", otros: "ปี" } },
  uk: {
    dias: { uno: "день", pocos: "дні", muchos: "днів", otros: "дня" },
    semanas: { uno: "тиждень", pocos: "тижні", muchos: "тижнів", otros: "тижня" },
    horas: { uno: "година", pocos: "години", muchos: "годин", otros: "години" },
    meses: { uno: "місяць", pocos: "місяці", muchos: "місяців", otros: "місяця" },
    anios: { uno: "рік", pocos: "роки", muchos: "років", otros: "року" },
  },
  // El uzbeko no pone plural después de un número («3 kun», «1,5 yil»): las dos formas son iguales.
  uz: { dias: { uno: "kun", otros: "kun" }, semanas: { uno: "hafta", otros: "hafta" }, horas: { uno: "soat", otros: "soat" }, meses: { uno: "oy", otros: "oy" }, anios: { uno: "yil", otros: "yil" } },
  ru: {
    dias: { uno: "день", pocos: "дня", muchos: "дней", otros: "дня" },
    semanas: { uno: "неделя", pocos: "недели", muchos: "недель", otros: "недели" },
    horas: { uno: "час", pocos: "часа", muchos: "часов", otros: "часа" },
    meses: { uno: "месяц", pocos: "месяца", muchos: "месяцев", otros: "месяца" },
    anios: { uno: "год", pocos: "года", muchos: "лет", otros: "года" },
  },
  ro: {
    dias: { uno: "zi", pocos: "zile", otros: "de zile" },
    semanas: { uno: "săptămână", pocos: "săptămâni", otros: "de săptămâni" },
    horas: { uno: "oră", pocos: "ore", otros: "de ore" },
    meses: { uno: "lună", pocos: "luni", otros: "de luni" },
    anios: { uno: "an", pocos: "ani", otros: "de ani" },
  },
  cs: {
    dias: { uno: "den", pocos: "dny", muchos: "dne", otros: "dní" },
    semanas: { uno: "týden", pocos: "týdny", muchos: "týdne", otros: "týdnů" },
    horas: { uno: "hodina", pocos: "hodiny", muchos: "hodiny", otros: "hodin" },
    meses: { uno: "měsíc", pocos: "měsíce", muchos: "měsíce", otros: "měsíců" },
    anios: { uno: "rok", pocos: "roky", muchos: "roku", otros: "let" },
  },
  // Griego: one/other, como los idiomas latinos; «έτος/έτη» es el registro de los bancos y de gov.gr.
  el: { dias: { uno: "ημέρα", otros: "ημέρες" }, semanas: { uno: "εβδομάδα", otros: "εβδομάδες" }, horas: { uno: "ώρα", otros: "ώρες" }, meses: { uno: "μήνας", otros: "μήνες" }, anios: { uno: "έτος", otros: "έτη" } },
  // El húngaro no pone plural después de un número («3 nap», «1,5 év»): las dos formas son iguales.
  // Georgiano: el sustantivo no cambia detrás de un número («3 დღე», «1,5 წელი»); D26.
  ka: { dias: { uno: "დღე", otros: "დღე" }, semanas: { uno: "კვირა", otros: "კვირა" }, horas: { uno: "საათი", otros: "საათი" }, meses: { uno: "თვე", otros: "თვე" }, anios: { uno: "წელი", otros: "წელი" } },
  hu: { dias: { uno: "nap", otros: "nap" }, semanas: { uno: "hét", otros: "hét" }, horas: { uno: "óra", otros: "óra" }, meses: { uno: "hónap", otros: "hónap" }, anios: { uno: "év", otros: "év" } },
  // Búlgaro: «час» y «месец» van en forma numérica detrás de un número («5 часа», «3 месеца»).
  // Armenio: el sustantivo no cambia detrás de un número («3 օր», «1,5 տարի»); D30.
  hy: { dias: { uno: "օր", otros: "օր" }, semanas: { uno: "շաբաթ", otros: "շաբաթ" }, horas: { uno: "ժամ", otros: "ժամ" }, meses: { uno: "ամիս", otros: "ամիս" }, anios: { uno: "տարի", otros: "տարի" } },
  // Albanés (ADR 0002, D31): «1 vit», «2 vjet»; ditë, javë, orë y muaj no cambian.
  sq: { dias: { uno: "ditë", otros: "ditë" }, semanas: { uno: "javë", otros: "javë" }, horas: { uno: "orë", otros: "orë" }, meses: { uno: "muaj", otros: "muaj" }, anios: { uno: "vit", otros: "vjet" } },
  bg: { dias: { uno: "ден", otros: "дни" }, semanas: { uno: "седмица", otros: "седмици" }, horas: { uno: "час", otros: "часа" }, meses: { uno: "месец", otros: "месеца" }, anios: { uno: "година", otros: "години" } },
  // El vietnamita no tiene plural («3 ngày», «1,5 năm»): las dos formas son iguales.
  vi: { dias: { uno: "ngày", otros: "ngày" }, semanas: { uno: "tuần", otros: "tuần" }, horas: { uno: "giờ", otros: "giờ" }, meses: { uno: "tháng", otros: "tháng" }, anios: { uno: "năm", otros: "năm" } },
  // El mongol no pone plural después de un número («3 өдөр», «1.5 жил»): las dos formas son iguales.
  mn: { dias: { uno: "өдөр", otros: "өдөр" }, semanas: { uno: "долоо хоног", otros: "долоо хоног" }, horas: { uno: "цаг", otros: "цаг" }, meses: { uno: "сар", otros: "сар" }, anios: { uno: "жил", otros: "жил" } },
  // Macedonio: forma numérica de los masculinos («2 дена», «5 часа»); «месеци» es lo que escriben bancos y leyes.
  mk: { dias: { uno: "ден", otros: "дена" }, semanas: { uno: "недела", otros: "недели" }, horas: { uno: "час", otros: "часа" }, meses: { uno: "месец", otros: "месеци" }, anios: { uno: "година", otros: "години" } },
  he: { dias: DIAS_HE, semanas: SEMANAS_HE, horas: HORAS_HE, meses: MESES_HE, anios: ANIOS_HE },
  lv: {
    dias: { uno: "diena", otros: "dienas", cero: "dienu" },
    semanas: { uno: "nedēļa", otros: "nedēļas", cero: "nedēļu" },
    horas: { uno: "stunda", otros: "stundas", cero: "stundu" },
    meses: { uno: "mēnesis", otros: "mēneši", cero: "mēnešu" },
    anios: { uno: "gads", otros: "gadi", cero: "gadu" },
  },
  // Serbio en latinica y ekavski (ADR 0002, D23).
  sr: {
    dias: { uno: "dan", pocos: "dana", otros: "dana" },
    semanas: { uno: "nedelja", pocos: "nedelje", otros: "nedelja" },
    horas: { uno: "sat", pocos: "sata", otros: "sati" },
    meses: { uno: "mesec", pocos: "meseca", otros: "meseci" },
    anios: { uno: "godina", pocos: "godine", otros: "godina" },
  },
  // Eslovaco: como el checo, "few" 2 a 4 (2 dni, 3 roky), "other" 0 y 5 en adelante (5 rokov) y "many"
  // las fracciones en genitivo singular (1,5 roka): en sk "muchos" lleva la forma de fracción.
  sk: {
    dias: { uno: "deň", pocos: "dni", muchos: "dňa", otros: "dní" },
    semanas: { uno: "týždeň", pocos: "týždne", muchos: "týždňa", otros: "týždňov" },
    horas: { uno: "hodina", pocos: "hodiny", muchos: "hodiny", otros: "hodín" },
    meses: { uno: "mesiac", pocos: "mesiace", muchos: "mesiaca", otros: "mesiacov" },
    anios: { uno: "rok", pocos: "roky", muchos: "roka", otros: "rokov" },
  },
  // Croata (ADR 0002, D27).
  hr: {
    dias: { uno: "dan", pocos: "dana", otros: "dana" },
    semanas: { uno: "tjedan", pocos: "tjedna", otros: "tjedana" },
    horas: { uno: "sat", pocos: "sata", otros: "sati" },
    meses: { uno: "mjesec", pocos: "mjeseca", otros: "mjeseci" },
    anios: { uno: "godina", pocos: "godine", otros: "godina" },
  },
  // Esloveno (ADR 0002, D32): con dual. «uno» es 1, 101..., «dual» 2, 102..., «pocos» 3, 4, 103... y las
  // fracciones («1,5 leta»), «otros» el resto: «1 dan», «2 dneva», «3 dni», «5 dni»; «1 leto», «2 leti», «3 leta», «5 let».
  sl: {
    dias: { uno: "dan", dual: "dneva", pocos: "dni", otros: "dni" },
    semanas: { uno: "teden", dual: "tedna", pocos: "tedni", otros: "tednov" },
    horas: { uno: "ura", dual: "uri", pocos: "ure", otros: "ur" },
    meses: { uno: "mesec", dual: "meseca", pocos: "meseci", otros: "mesecev" },
    anios: { uno: "leto", dual: "leti", pocos: "leta", otros: "let" },
  },
  // Islandés (ADR 0002, D34): one/other de Intl.PluralRules («1 dagur», «2 dagar», «21 dagur», «11 dagar»).
  is: {
    dias: { uno: "dagur", otros: "dagar" },
    semanas: { uno: "vika", otros: "vikur" },
    horas: { uno: "klukkustund", otros: "klukkustundir" },
    meses: { uno: "mánuður", otros: "mánuðir" },
    anios: { uno: "ár", otros: "ár" },
  },
};

const ZH_SIMPLIFICADO: Formas = {
  dias: { uno: "天", otros: "天" },
  semanas: { uno: "周", otros: "周" },
  horas: { uno: "小时", otros: "小时" },
  meses: { uno: "个月", otros: "个月" },
  anios: { uno: "年", otros: "年" },
};

export const UNIDAD_PEGADA: ReadonlySet<Idioma> = new Set<Idioma>(["ja", "ko", "zh"]);

export function nombresUnidad(idioma: Idioma, locale: string): Formas {
  return idioma === "zh" && escrituraZh(locale) === "hans" ? ZH_SIMPLIFICADO : NOMBRES_UNIDAD[idioma];
}
