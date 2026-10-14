import { segunTrato, type TextosUi } from "../../tipos";
import type { UiDiasEntreFechas } from "../definicion";

const plural = (n: number, uno: string, varios: string) => `${n} ${n === 1 ? uno : varios}`;

function enLista(partes: readonly string[]): string {
  return partes.length > 1 ? `${partes.slice(0, -1).join(", ")} y ${partes[partes.length - 1]}` : partes[0];
}

export function duracionEs(anios: number, meses: number, dias: number): string {
  const partes: string[] = [];
  if (anios) partes.push(plural(anios, "año", "años"));
  if (meses) partes.push(plural(meses, "mes", "meses"));
  if (dias || !partes.length) partes.push(plural(dias, "día", "días"));
  return enLista(partes);
}

export const textosEs: TextosUi<UiDiasEntreFechas> = {
  slug: "dias-entre-fechas",
  ui: (trato) => ({
    desde: "Fecha de inicio",
    hasta: "Fecha final",
    incluir: "Contar también el último día",
    incluirAyuda: segunTrato(trato, {
      tu: "Márcalo si el día final también cuenta, como en un viaje o una licencia.",
      usted: "Márquelo si el día final también cuenta, como en un viaje o una licencia.",
      vos: "Marcalo si el día final también cuenta, como en un viaje o una licencia.",
    }),
    dias: "Días corridos",
    semanas: "En semanas",
    duracionFila: "En años, meses y días",
    habiles: "Días hábiles",
    habilesAyuda: "De lunes a viernes. No descuenta feriados.",
    duracion: duracionEs,
    semanasYDias: (semanas, n, dias) => {
      const parteSemanas = `${semanas} ${n === 1 ? "semana" : "semanas"}`;
      return dias ? `${parteSemanas} y ${plural(dias, "día", "días")}` : parteSemanas;
    },
    notaHabiles: "Los días hábiles cuentan de lunes a viernes y no restan feriados, que cambian según el país y la región.",
    notaInvertidas: "La fecha final era anterior a la de inicio: se calcularon al revés.",
  }),
};
