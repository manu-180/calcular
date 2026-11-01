import { formaLt, pluralLt } from "../../../i18n/plural";
import type { TextosUi } from "../../tipos";
import type { UiDiasEntreFechas } from "../definicion";

const anios = (n: number) => pluralLt(n, "metai", "metai", "metų");
const meses = (n: number) => pluralLt(n, "mėnuo", "mėnesiai", "mėnesių");
const dias = (n: number) => pluralLt(n, "diena", "dienos", "dienų");

// Coma entre las partes e „ir“ antes de la última: „36 metai, 4 mėnesiai ir 28 dienos“.
export function duracionLt(a: number, m: number, d: number): string {
  const partes: string[] = [];
  if (a) partes.push(anios(a));
  if (m) partes.push(meses(m));
  if (d || !partes.length) partes.push(dias(d));
  return partes.length > 1 ? `${partes.slice(0, -1).join(", ")} ir ${partes[partes.length - 1]}` : partes[0];
}

export const textosLt: TextosUi<UiDiasEntreFechas> = {
  slug: "dienu-skaicius-tarp-datu",
  ui: () => ({
    desde: "Pradžios data",
    hasta: "Pabaigos data",
    incluir: "Įskaičiuoti ir paskutinę dieną",
    incluirAyuda: "Pažymėkite, jei skaičiuojama ir paskutinė diena, pavyzdžiui, kelionės ar atostogų atveju.",
    dias: "Kalendorinės dienos",
    semanas: "Savaitėmis",
    duracionFila: "Metais, mėnesiais ir dienomis",
    habiles: "Darbo dienos",
    habilesAyuda: "Nuo pirmadienio iki penktadienio. Valstybinės šventės neatimamos.",
    duracion: duracionLt,
    semanasYDias: (semanas, n, d) => {
      const parteSemanas = `${semanas} ${formaLt(n, "savaitė", "savaitės", "savaičių", "savaitės")}`;
      return d ? `${parteSemanas} ir ${dias(d)}` : parteSemanas;
    },
    notaHabiles: "Darbo dienos skaičiuojamos nuo pirmadienio iki penktadienio, neatimant valstybinių švenčių, nes jos skiriasi pagal šalį ir regioną.",
    notaInvertidas: "Pabaigos data buvo ankstesnė už pradžios datą, todėl datas sukeitėme.",
  }),
};
