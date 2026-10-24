export const OPCIONES_DIA = [
  { valor: "ordinary", etiqueta: "Ordinary working day" },
  { valor: "rest-day", etiqueta: "Scheduled rest day" },
  { valor: "special", etiqueta: "Special day" },
  { valor: "special-rest-day", etiqueta: "Special day on your rest day" },
  { valor: "regular-holiday", etiqueta: "Regular holiday" },
  { valor: "regular-holiday-rest-day", etiqueta: "Regular holiday on your rest day" },
] as const;

export type TipoDia = (typeof OPCIONES_DIA)[number]["valor"];

export const REQUIERE_JORNADA = {
  "ph.day-rates": "mapa",
  "ph.overtime-premium": "mapa",
  "ph.night-shift-differential": "numero",
  "ph.normal-hours": "numero",
} as const;

export interface ValoresJornada {
  "ph.day-rates": Readonly<Record<string, number>>;
  "ph.overtime-premium": Readonly<Record<string, number>>;
  "ph.night-shift-differential": number;
  "ph.normal-hours": number;
}

// Las Omnibus Rules calculan todo en cadena: la tarifa horaria del día (con su prima de descanso o
// feriado), sobre ella el recargo de horas extra y sobre la hora resultante el 10 % nocturno.
export function tarifas(diario: number, dia: TipoDia, v: ValoresJornada) {
  const horas = v["ph.normal-hours"];
  const factorDia = v["ph.day-rates"][dia] / 100;
  const horaBase = diario / horas;
  const horaDia = horaBase * factorDia;
  const recargo = dia === "ordinary" ? v["ph.overtime-premium"].ordinary : v["ph.overtime-premium"]["rest-or-holiday"];
  const horaExtra = horaDia * (1 + recargo / 100);
  const nocturno = v["ph.night-shift-differential"] / 100;
  return { horas, factorDia, horaBase, horaDia, horaExtra, recargo, nocturno };
}
