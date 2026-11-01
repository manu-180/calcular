import { formaRu, pluralRu } from "../../../i18n/plural";
import type { TextosUi } from "../../tipos";
import type { UiDiasEntreFechas } from "../definicion";

const anios = (n: number) => pluralRu(n, "год", "года", "лет");
const meses = (n: number) => pluralRu(n, "месяц", "месяца", "месяцев");
const dias = (n: number) => pluralRu(n, "день", "дня", "дней");

function enLista(partes: readonly string[]): string {
  return partes.length > 1 ? `${partes.slice(0, -1).join(", ")} и ${partes[partes.length - 1]}` : partes[0];
}

export function duracionRu(a: number, m: number, d: number): string {
  const partes: string[] = [];
  if (a) partes.push(anios(a));
  if (m) partes.push(meses(m));
  if (d || !partes.length) partes.push(dias(d));
  return enLista(partes);
}

export const textosRu: TextosUi<UiDiasEntreFechas> = {
  slug: "kolichestvo-dney-mezhdu-datami",
  ui: () => ({
    desde: "Начальная дата",
    hasta: "Конечная дата",
    incluir: "Включить конечную дату",
    incluirAyuda: "Отметьте, если последний день тоже считается, например в поездке или отпуске.",
    dias: "Календарных дней",
    semanas: "В неделях",
    duracionFila: "В годах, месяцах и днях",
    habiles: "Рабочих дней",
    habilesAyuda: "С понедельника по пятницу. Праздничные дни не вычитаются.",
    duracion: duracionRu,
    semanasYDias: (semanas, n, d) => {
      const parteSemanas = `${semanas} ${formaRu(n, "неделя", "недели", "недель")}`;
      return d ? `${parteSemanas} и ${dias(d)}` : parteSemanas;
    },
    notaHabiles: "Рабочие дни считаются с понедельника по пятницу без учета праздников, которые зависят от страны и региона.",
    notaInvertidas: "Конечная дата была раньше начальной, поэтому даты поменяли местами.",
  }),
};
