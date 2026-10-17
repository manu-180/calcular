import type { Idioma } from "../tipos";

export type UnidadDeTiempo = "dias" | "semanas" | "horas" | "meses" | "anios";

// La forma se elige con Intl.PluralRules del locale: "uno" es la categoría "one" y "otros" todas las
// demás. En polaco "pocos" es la categoría "few" (2 dni, 3 tygodnie) y "muchos" la "many" (5 lat);
// "otros" queda para las fracciones, que van en genitivo singular (1,5 roku).
export interface FormasUnidad {
  uno: string;
  otros: string;
  pocos?: string;
  muchos?: string;
}

export const NOMBRES_UNIDAD: Readonly<Record<Idioma, Readonly<Record<UnidadDeTiempo, FormasUnidad>>>> = {
  es: { dias: { uno: "día", otros: "días" }, semanas: { uno: "semana", otros: "semanas" }, horas: { uno: "hora", otros: "horas" }, meses: { uno: "mes", otros: "meses" }, anios: { uno: "año", otros: "años" } },
  pt: { dias: { uno: "dia", otros: "dias" }, semanas: { uno: "semana", otros: "semanas" }, horas: { uno: "hora", otros: "horas" }, meses: { uno: "mês", otros: "meses" }, anios: { uno: "ano", otros: "anos" } },
  en: { dias: { uno: "day", otros: "days" }, semanas: { uno: "week", otros: "weeks" }, horas: { uno: "hour", otros: "hours" }, meses: { uno: "month", otros: "months" }, anios: { uno: "year", otros: "years" } },
  fr: { dias: { uno: "jour", otros: "jours" }, semanas: { uno: "semaine", otros: "semaines" }, horas: { uno: "heure", otros: "heures" }, meses: { uno: "mois", otros: "mois" }, anios: { uno: "an", otros: "ans" } },
  de: { dias: { uno: "Tag", otros: "Tage" }, semanas: { uno: "Woche", otros: "Wochen" }, horas: { uno: "Stunde", otros: "Stunden" }, meses: { uno: "Monat", otros: "Monate" }, anios: { uno: "Jahr", otros: "Jahre" } },
  it: { dias: { uno: "giorno", otros: "giorni" }, semanas: { uno: "settimana", otros: "settimane" }, horas: { uno: "ora", otros: "ore" }, meses: { uno: "mese", otros: "mesi" }, anios: { uno: "anno", otros: "anni" } },
  nl: { dias: { uno: "dag", otros: "dagen" }, semanas: { uno: "week", otros: "weken" }, horas: { uno: "uur", otros: "uur" }, meses: { uno: "maand", otros: "maanden" }, anios: { uno: "jaar", otros: "jaar" } },
  pl: {
    dias: { uno: "dzień", pocos: "dni", muchos: "dni", otros: "dnia" },
    semanas: { uno: "tydzień", pocos: "tygodnie", muchos: "tygodni", otros: "tygodnia" },
    horas: { uno: "godzina", pocos: "godziny", muchos: "godzin", otros: "godziny" },
    meses: { uno: "miesiąc", pocos: "miesiące", muchos: "miesięcy", otros: "miesiąca" },
    anios: { uno: "rok", pocos: "lata", muchos: "lat", otros: "roku" },
  },
};
