import { formaBg, pluralBg } from "../../../i18n/plural";
import type { TextosUi } from "../../tipos";
import type { UiDiasEntreFechas } from "../definicion";

const anios = (n: number) => pluralBg(n, "година", "години");
const meses = (n: number) => pluralBg(n, "месец", "месеца");
const dias = (n: number) => pluralBg(n, "ден", "дни");

function enLista(partes: readonly string[]): string {
  return partes.length > 1 ? `${partes.slice(0, -1).join(", ")} и ${partes[partes.length - 1]}` : partes[0];
}

export function duracionBg(a: number, m: number, d: number): string {
  const partes: string[] = [];
  if (a) partes.push(anios(a));
  if (m) partes.push(meses(m));
  if (d || !partes.length) partes.push(dias(d));
  return enLista(partes);
}

export const textosBg: TextosUi<UiDiasEntreFechas> = {
  slug: "dni-mezhdu-dve-dati",
  ui: () => ({
    desde: "Начална дата",
    hasta: "Крайна дата",
    incluir: "Включете и крайната дата",
    incluirAyuda: "Отбележете, ако последният ден също се брои, например при пътуване или отпуск.",
    dias: "Календарни дни",
    semanas: "В седмици",
    duracionFila: "В години, месеци и дни",
    habiles: "Работни дни",
    habilesAyuda: "От понеделник до петък. Официалните празници не се изваждат.",
    duracion: duracionBg,
    semanasYDias: (semanas, n, d) => {
      const parteSemanas = `${semanas} ${formaBg(n, "седмица", "седмици")}`;
      return d ? `${parteSemanas} и ${dias(d)}` : parteSemanas;
    },
    notaHabiles: "Работните дни се броят от понеделник до петък, без да се изваждат официалните празници, които са различни според държавата и региона.",
    notaInvertidas: "Крайната дата беше преди началната, затова двете бяха разменени.",
  }),
};
