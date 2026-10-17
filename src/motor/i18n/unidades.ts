import type { Idioma } from "../tipos";
import type { FormasAr } from "./arabe";

export type UnidadDeTiempo = "dias" | "semanas" | "horas" | "meses" | "anios";

// La forma se elige con Intl.PluralRules del locale: "uno" es la categoría "one" y "otros" todas las
// demás. Un idioma con dual o paucal (ar) trae todas las formas de FormasAr, con {n} donde va el número.
export const NOMBRES_UNIDAD: Readonly<Record<Idioma, Readonly<Record<UnidadDeTiempo, { uno: string; otros: string } | FormasAr>>>> = {
  es: { dias: { uno: "día", otros: "días" }, semanas: { uno: "semana", otros: "semanas" }, horas: { uno: "hora", otros: "horas" }, meses: { uno: "mes", otros: "meses" }, anios: { uno: "año", otros: "años" } },
  pt: { dias: { uno: "dia", otros: "dias" }, semanas: { uno: "semana", otros: "semanas" }, horas: { uno: "hora", otros: "horas" }, meses: { uno: "mês", otros: "meses" }, anios: { uno: "ano", otros: "anos" } },
  en: { dias: { uno: "day", otros: "days" }, semanas: { uno: "week", otros: "weeks" }, horas: { uno: "hour", otros: "hours" }, meses: { uno: "month", otros: "months" }, anios: { uno: "year", otros: "years" } },
  fr: { dias: { uno: "jour", otros: "jours" }, semanas: { uno: "semaine", otros: "semaines" }, horas: { uno: "heure", otros: "heures" }, meses: { uno: "mois", otros: "mois" }, anios: { uno: "an", otros: "ans" } },
  de: { dias: { uno: "Tag", otros: "Tage" }, semanas: { uno: "Woche", otros: "Wochen" }, horas: { uno: "Stunde", otros: "Stunden" }, meses: { uno: "Monat", otros: "Monate" }, anios: { uno: "Jahr", otros: "Jahre" } },
  it: { dias: { uno: "giorno", otros: "giorni" }, semanas: { uno: "settimana", otros: "settimane" }, horas: { uno: "ora", otros: "ore" }, meses: { uno: "mese", otros: "mesi" }, anios: { uno: "anno", otros: "anni" } },
  nl: { dias: { uno: "dag", otros: "dagen" }, semanas: { uno: "week", otros: "weken" }, horas: { uno: "uur", otros: "uur" }, meses: { uno: "maand", otros: "maanden" }, anios: { uno: "jaar", otros: "jaar" } },
  ar: {
    dias: { uno: "يوم واحد", dos: "يومان", pocos: "{n} أيام", muchos: "{n} يومًا", otros: "{n} يوم" },
    semanas: { uno: "أسبوع واحد", dos: "أسبوعان", pocos: "{n} أسابيع", muchos: "{n} أسبوعًا", otros: "{n} أسبوع" },
    horas: { uno: "ساعة واحدة", dos: "ساعتان", pocos: "{n} ساعات", muchos: "{n} ساعة", otros: "{n} ساعة" },
    meses: { uno: "شهر واحد", dos: "شهران", pocos: "{n} أشهر", muchos: "{n} شهرًا", otros: "{n} شهر" },
    anios: { uno: "سنة واحدة", dos: "سنتان", pocos: "{n} سنوات", muchos: "{n} سنة", otros: "{n} سنة" },
  },
};
