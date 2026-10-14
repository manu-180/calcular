import type { TextosUi } from "../../tipos";
import type { UiDiasEntreFechas } from "../definicion";

const plural = (n: number, uno: string, varios: string) => `${n} ${n === 1 ? uno : varios}`;

function enLista(partes: readonly string[]): string {
  return partes.length > 1 ? `${partes.slice(0, -1).join(", ")} e ${partes[partes.length - 1]}` : partes[0];
}

export function duracionPt(anios: number, meses: number, dias: number): string {
  const partes: string[] = [];
  if (anios) partes.push(plural(anios, "ano", "anos"));
  if (meses) partes.push(plural(meses, "mês", "meses"));
  if (dias || !partes.length) partes.push(plural(dias, "dia", "dias"));
  return enLista(partes);
}

export const textosPt: TextosUi<UiDiasEntreFechas> = {
  slug: "dias-entre-datas",
  ui: () => ({
    desde: "Data inicial",
    hasta: "Data final",
    incluir: "Contar também a data final",
    incluirAyuda: "Marque se o último dia também conta, como numa viagem ou nas férias.",
    dias: "Dias corridos",
    semanas: "Em semanas",
    duracionFila: "Em anos, meses e dias",
    habiles: "Dias úteis",
    habilesAyuda: "De segunda a sexta. Os feriados não são descontados.",
    duracion: duracionPt,
    semanasYDias: (semanas, n, dias) => {
      const parteSemanas = `${semanas} ${n === 1 ? "semana" : "semanas"}`;
      return dias ? `${parteSemanas} e ${plural(dias, "dia", "dias")}` : parteSemanas;
    },
    notaHabiles: "Os dias úteis contam de segunda a sexta e não descontam feriados, que mudam conforme o país e a região.",
    notaInvertidas: "A data final era anterior à inicial, então as duas foram trocadas.",
  }),
};
