import { formaSq, pluralSq } from "../../../i18n/plural";
import type { TextosUi } from "../../tipos";
import type { UiDiasEntreFechas } from "../definicion";

const anios = (n: number) => pluralSq(n, "vit", "vjet");
const meses = (n: number) => pluralSq(n, "muaj", "muaj");
const dias = (n: number) => pluralSq(n, "ditë", "ditë");

function enLista(partes: readonly string[]): string {
  return partes.length > 1 ? `${partes.slice(0, -1).join(", ")} dhe ${partes[partes.length - 1]}` : partes[0];
}

export function duracionSq(a: number, m: number, d: number): string {
  const partes: string[] = [];
  if (a) partes.push(anios(a));
  if (m) partes.push(meses(m));
  if (d || !partes.length) partes.push(dias(d));
  return enLista(partes);
}

export const textosSq: TextosUi<UiDiasEntreFechas> = {
  slug: "dite-midis-dy-datave",
  ui: () => ({
    desde: "Data e fillimit",
    hasta: "Data e mbarimit",
    incluir: "Përfshini edhe ditën e fundit",
    incluirAyuda: "Shënojeni nëse numërohet edhe dita e fundit, si te një udhëtim ose te pushimet.",
    dias: "Ditë kalendarike",
    semanas: "Në javë",
    duracionFila: "Në vite, muaj dhe ditë",
    habiles: "Ditë pune",
    habilesAyuda: "Nga e hëna në të premte. Festat zyrtare nuk zbriten.",
    duracion: duracionSq,
    semanasYDias: (semanas, n, d) => {
      const parteSemanas = `${semanas} ${formaSq(n, "javë", "javë")}`;
      return d ? `${parteSemanas} dhe ${dias(d)}` : parteSemanas;
    },
    notaHabiles: "Ditët e punës numërohen nga e hëna në të premte, pa zbritur festat zyrtare, që ndryshojnë nga një vend në tjetrin.",
    notaInvertidas: "Data e mbarimit ishte para datës së fillimit, ndaj i ndërruam.",
  }),
};
