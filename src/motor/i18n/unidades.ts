import type { Idioma } from "../tipos";
import { escrituraZh } from "./escritura";

export type UnidadDeTiempo = "dias" | "semanas" | "horas" | "meses" | "anios";

// La forma se elige con Intl.PluralRules del locale: "uno" es la categoría "one", "pocos" la "few",
// "muchos" la "many" y "otros" todas las demás (sin "pocos" o "muchos" se usa "otros"). En checo
// "few" es 2 a 4 (2 dny, 3 týdny), "other" 0 y 5 en adelante (5 let) y "many" las fracciones, que van
// en genitivo singular (1,5 roku): por eso en cs "muchos" lleva la forma de fracción.
export interface FormasUnidad {
  uno: string;
  otros: string;
  pocos?: string;
  muchos?: string;
}

type Formas = Readonly<Record<UnidadDeTiempo, FormasUnidad>>;

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
  cs: {
    dias: { uno: "den", pocos: "dny", muchos: "dne", otros: "dní" },
    semanas: { uno: "týden", pocos: "týdny", muchos: "týdne", otros: "týdnů" },
    horas: { uno: "hodina", pocos: "hodiny", muchos: "hodiny", otros: "hodin" },
    meses: { uno: "měsíc", pocos: "měsíce", muchos: "měsíce", otros: "měsíců" },
    anios: { uno: "rok", pocos: "roky", muchos: "roku", otros: "let" },
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
