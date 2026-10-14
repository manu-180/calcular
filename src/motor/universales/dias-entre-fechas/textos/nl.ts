import type { TextosUi } from "../../tipos";
import type { UiDiasEntreFechas } from "../definicion";

const meervoud = (n: number, een: string, meer: string) => `${n} ${n === 1 ? een : meer}`;

function opsomming(delen: readonly string[]): string {
  return delen.length > 1 ? `${delen.slice(0, -1).join(", ")} en ${delen[delen.length - 1]}` : delen[0];
}

export function duracionNl(anios: number, meses: number, dias: number): string {
  const delen: string[] = [];
  if (anios) delen.push(meervoud(anios, "jaar", "jaar"));
  if (meses) delen.push(meervoud(meses, "maand", "maanden"));
  if (dias || !delen.length) delen.push(meervoud(dias, "dag", "dagen"));
  return opsomming(delen);
}

export const textosNl: TextosUi<UiDiasEntreFechas> = {
  slug: "dagen-tussen-datums",
  ui: () => ({
    desde: "Begindatum",
    hasta: "Einddatum",
    incluir: "Einddatum meetellen",
    incluirAyuda: "Vink dit aan als de laatste dag ook telt, zoals bij een reis of vrije dagen.",
    dias: "Kalenderdagen",
    semanas: "In weken",
    duracionFila: "In jaren, maanden en dagen",
    habiles: "Werkdagen",
    habilesAyuda: "Maandag tot en met vrijdag. Feestdagen gaan er niet af.",
    duracion: duracionNl,
    semanasYDias: (semanas, n, dias) => {
      const deelWeken = `${semanas} ${n === 1 ? "week" : "weken"}`;
      return dias ? `${deelWeken} en ${meervoud(dias, "dag", "dagen")}` : deelWeken;
    },
    notaHabiles: "Werkdagen zijn maandag tot en met vrijdag. Feestdagen gaan er niet af, want die verschillen per land en regio.",
    notaInvertidas: "De einddatum lag voor de begindatum, dus ze zijn omgedraaid.",
  }),
};
