import { formaSl, pluralSl } from "../../../i18n/plural";
import type { TextosUi } from "../../tipos";
import type { UiDiasEntreFechas } from "../definicion";

const anios = (n: number) => pluralSl(n, "leto", "leti", "leta", "let");
const meses = (n: number) => pluralSl(n, "mesec", "meseca", "meseci", "mesecev");
const dias = (n: number) => pluralSl(n, "dan", "dneva", "dni", "dni");

// Primer: 36 let, 4 meseci in 28 dni. Vejica med deli, veznik pred zadnjim.
export function duracionSl(a: number, m: number, d: number): string {
  const partes: string[] = [];
  if (a) partes.push(anios(a));
  if (m) partes.push(meses(m));
  if (d || !partes.length) partes.push(dias(d));
  return partes.length > 1 ? `${partes.slice(0, -1).join(", ")} in ${partes[partes.length - 1]}` : partes[0];
}

export const textosSl: TextosUi<UiDiasEntreFechas> = {
  slug: "dnevi-med-datumoma",
  ui: () => ({
    desde: "Začetni datum",
    hasta: "Končni datum",
    incluir: "Vključno z zadnjim dnem",
    incluirAyuda: "Označite, če se šteje tudi zadnji dan, na primer pri potovanju ali dopustu.",
    dias: "Koledarski dnevi",
    semanas: "V tednih",
    duracionFila: "V letih, mesecih in dnevih",
    habiles: "Delovni dnevi",
    habilesAyuda: "Od ponedeljka do petka. Praznikov ne odštevamo.",
    duracion: duracionSl,
    semanasYDias: (semanas, n, d) => {
      const parteSemanas = `${semanas} ${formaSl(n, "teden", "tedna", "tedni", "tednov")}`;
      return d ? `${parteSemanas} in ${dias(d)}` : parteSemanas;
    },
    notaHabiles: "Delovni dnevi so šteti od ponedeljka do petka. Praznikov ne odštevamo, ker se razlikujejo glede na državo in regijo.",
    notaInvertidas: "Končni datum je bil pred začetnim, zato smo datuma zamenjali.",
  }),
};
