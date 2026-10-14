import type { Idioma } from "../tipos";

export type UnidadDeTiempo = "dias" | "horas" | "meses" | "anios";

// La forma se elige con Intl.PluralRules del locale: "uno" es la categoría "one" y "otros" todas las
// demás. Alcanza para estos idiomas; uno con dual o paucal (ar, ru, pl) va a pedir más formas.
export const NOMBRES_UNIDAD: Readonly<Record<Idioma, Readonly<Record<UnidadDeTiempo, { uno: string; otros: string }>>>> = {
  es: { dias: { uno: "día", otros: "días" }, horas: { uno: "hora", otros: "horas" }, meses: { uno: "mes", otros: "meses" }, anios: { uno: "año", otros: "años" } },
  pt: { dias: { uno: "dia", otros: "dias" }, horas: { uno: "hora", otros: "horas" }, meses: { uno: "mês", otros: "meses" }, anios: { uno: "ano", otros: "anos" } },
  en: { dias: { uno: "day", otros: "days" }, horas: { uno: "hour", otros: "hours" }, meses: { uno: "month", otros: "months" }, anios: { uno: "year", otros: "years" } },
  fr: { dias: { uno: "jour", otros: "jours" }, horas: { uno: "heure", otros: "heures" }, meses: { uno: "mois", otros: "mois" }, anios: { uno: "an", otros: "ans" } },
  de: { dias: { uno: "Tag", otros: "Tage" }, horas: { uno: "Stunde", otros: "Stunden" }, meses: { uno: "Monat", otros: "Monate" }, anios: { uno: "Jahr", otros: "Jahre" } },
  it: { dias: { uno: "giorno", otros: "giorni" }, horas: { uno: "ora", otros: "ore" }, meses: { uno: "mese", otros: "mesi" }, anios: { uno: "anno", otros: "anni" } },
  nl: { dias: { uno: "dag", otros: "dagen" }, horas: { uno: "uur", otros: "uur" }, meses: { uno: "maand", otros: "maanden" }, anios: { uno: "jaar", otros: "jaar" } },
};
