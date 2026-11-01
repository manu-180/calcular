import { formaUk, pluralUk } from "../../../i18n/plural";
import type { TextosUi } from "../../tipos";
import type { UiDiasEntreFechas } from "../definicion";

const anios = (n: number) => pluralUk(n, "рік", "роки", "років");
const meses = (n: number) => pluralUk(n, "місяць", "місяці", "місяців");
const dias = (n: number) => pluralUk(n, "день", "дні", "днів");

// «36 років, 4 місяці і 28 днів»: coma entre las partes e «і» antes de la última.
export function duracionUk(a: number, m: number, d: number): string {
  const partes: string[] = [];
  if (a) partes.push(anios(a));
  if (m) partes.push(meses(m));
  if (d || !partes.length) partes.push(dias(d));
  return partes.length > 1 ? `${partes.slice(0, -1).join(", ")} і ${partes[partes.length - 1]}` : partes[0];
}

export const textosUk: TextosUi<UiDiasEntreFechas> = {
  slug: "kilkist-dniv-mizh-datamy",
  ui: () => ({
    desde: "Дата початку",
    hasta: "Дата завершення",
    incluir: "Враховувати останній день",
    incluirAyuda: "Позначте, якщо останній день теж рахується, наприклад для подорожі чи відпустки.",
    dias: "Календарні дні",
    semanas: "У тижнях",
    duracionFila: "У роках, місяцях і днях",
    habiles: "Робочі дні",
    habilesAyuda: "З понеділка по пʼятницю. Святкові дні не віднімаються.",
    duracion: duracionUk,
    semanasYDias: (semanas, n, d) => {
      const parteSemanas = `${semanas} ${formaUk(n, "тиждень", "тижні", "тижнів", "тижня")}`;
      return d ? `${parteSemanas} і ${dias(d)}` : parteSemanas;
    },
    notaHabiles: "Робочі дні рахуються з понеділка по пʼятницю без вирахування святкових днів, які залежать від країни і регіону.",
    notaInvertidas: "Дата завершення була раніше за дату початку, тому дати поміняно місцями.",
  }),
};
