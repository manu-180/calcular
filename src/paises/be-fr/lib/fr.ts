// Las calculadoras de be devuelven fechas y duraciones armadas en neerlandés ("19 oktober 2026",
// "6 jaar en 9 maanden"). La edición las traduce por patrón porque cambian con cada cálculo.
const MAANDEN = ["januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december"];
const MOIS = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];

function maand(nl: string): string | undefined {
  const i = MAANDEN.indexOf(nl);
  return i < 0 ? undefined : MOIS[i];
}

export function datumFr(texto: string): string | undefined {
  const m = /^(\d{1,2}) (\p{L}+) (\d{4})$/u.exec(texto);
  if (m) {
    const mois = maand(m[2]);
    return mois ? `${m[1] === "1" ? "1er" : m[1]} ${mois} ${m[3]}` : undefined;
  }
  const n = /^(\p{L}+) (\d{4})$/u.exec(texto);
  if (n) {
    const mois = maand(n[1]);
    return mois ? `${mois} ${n[2]}` : undefined;
  }
  return undefined;
}

export function duurFr(texto: string): string | undefined {
  const m = /^(\d+) jaar en (\d+) maanden$/.exec(texto);
  if (!m) return undefined;
  const ans = Number(m[1]);
  return `${ans} ${ans < 2 ? "an" : "ans"} et ${m[2]} mois`;
}

export const STATUUT = { bediende: "Employé", arbeider: "Ouvrier" } as const;

export const GEZIN = {
  alleenstaand: "Isolé",
  "partner-met-inkomen": "Marié ou cohabitant légal, partenaire avec revenus professionnels",
  "partner-zonder-inkomen": "Marié ou cohabitant légal, partenaire sans revenus professionnels",
} as const;
