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
export interface FormasUnidad {
  uno: string;
  otros: string;
  pocos?: string;
  muchos?: string;
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
  hu: { dias: { uno: "nap", otros: "nap" }, semanas: { uno: "hét", otros: "hét" }, horas: { uno: "óra", otros: "óra" }, meses: { uno: "hónap", otros: "hónap" }, anios: { uno: "év", otros: "év" } },
  // Búlgaro: «час» y «месец» van en forma numérica detrás de un número («5 часа», «3 месеца»).
  bg: { dias: { uno: "ден", otros: "дни" }, semanas: { uno: "седмица", otros: "седмици" }, horas: { uno: "час", otros: "часа" }, meses: { uno: "месец", otros: "месеца" }, anios: { uno: "година", otros: "години" } },
  he: { dias: DIAS_HE, semanas: SEMANAS_HE, horas: HORAS_HE, meses: MESES_HE, anios: ANIOS_HE },
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
