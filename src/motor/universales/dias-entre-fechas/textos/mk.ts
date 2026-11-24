import { formaMk, pluralMk } from "../../../i18n/plural";
import type { TextosUi } from "../../tipos";
import type { UiDiasEntreFechas } from "../definicion";

const anios = (n: number) => pluralMk(n, "година", "години");
const meses = (n: number) => pluralMk(n, "месец", "месеци");
const dias = (n: number) => pluralMk(n, "ден", "дена");

function enLista(partes: readonly string[]): string {
  return partes.length > 1 ? `${partes.slice(0, -1).join(", ")} и ${partes[partes.length - 1]}` : partes[0];
}

export function duracionMk(a: number, m: number, d: number): string {
  const partes: string[] = [];
  if (a) partes.push(anios(a));
  if (m) partes.push(meses(m));
  if (d || !partes.length) partes.push(dias(d));
  return enLista(partes);
}

export const textosMk: TextosUi<UiDiasEntreFechas> = {
  slug: "kalkulator-za-denovi-megju-datumi",
  ui: () => ({
    desde: "Почетен датум",
    hasta: "Краен датум",
    incluir: "Вклучете го и крајниот датум",
    incluirAyuda: "Означете го ова ако и последниот ден се брои, на пример при патување или одмор.",
    dias: "Календарски денови",
    semanas: "Во недели",
    duracionFila: "Во години, месеци и денови",
    habiles: "Работни денови",
    habilesAyuda: "Од понеделник до петок. Државните празници не се одземаат.",
    duracion: duracionMk,
    semanasYDias: (semanas, n, d) => {
      const parteSemanas = `${semanas} ${formaMk(n, "недела", "недели")}`;
      return d ? `${parteSemanas} и ${dias(d)}` : parteSemanas;
    },
    notaHabiles: "Работните денови се бројат од понеделник до петок, без да се одземаат државните празници, кои се разликуваат според државата и регионот.",
    notaInvertidas: "Крајниот датум беше пред почетниот, затоа двата се заменети.",
  }),
};
