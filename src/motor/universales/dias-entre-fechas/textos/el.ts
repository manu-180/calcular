import { formaEl, pluralEl } from "../../../i18n/plural";
import type { TextosUi } from "../../tipos";
import type { UiDiasEntreFechas } from "../definicion";

const anios = (n: number) => pluralEl(n, "έτος", "έτη");
const meses = (n: number) => pluralEl(n, "μήνας", "μήνες");
const dias = (n: number) => pluralEl(n, "ημέρα", "ημέρες");

// «36 έτη, 4 μήνες και 28 ημέρες»: κόμμα ανάμεσα στα μέρη και «και» πριν από το τελευταίο.
export function duracionEl(a: number, m: number, d: number): string {
  const partes: string[] = [];
  if (a) partes.push(anios(a));
  if (m) partes.push(meses(m));
  if (d || !partes.length) partes.push(dias(d));
  return partes.length > 1 ? `${partes.slice(0, -1).join(", ")} και ${partes[partes.length - 1]}` : partes[0];
}

export const textosEl: TextosUi<UiDiasEntreFechas> = {
  slug: "imeres-metaxy-imerominion",
  ui: () => ({
    desde: "Ημερομηνία έναρξης",
    hasta: "Ημερομηνία λήξης",
    incluir: "Να μετρηθεί και η τελευταία ημέρα",
    incluirAyuda: "Επιλέξτε το αν μετράει και η τελευταία ημέρα, για παράδειγμα σε ταξίδι ή άδεια.",
    dias: "Ημερολογιακές ημέρες",
    semanas: "Σε εβδομάδες",
    duracionFila: "Σε έτη, μήνες και ημέρες",
    habiles: "Εργάσιμες ημέρες",
    habilesAyuda: "Από Δευτέρα έως Παρασκευή. Οι επίσημες αργίες δεν αφαιρούνται.",
    duracion: duracionEl,
    semanasYDias: (semanas, n, d) => {
      const parteSemanas = `${semanas} ${formaEl(n, "εβδομάδα", "εβδομάδες")}`;
      return d ? `${parteSemanas} και ${dias(d)}` : parteSemanas;
    },
    notaHabiles: "Οι εργάσιμες ημέρες μετρώνται από Δευτέρα έως Παρασκευή, χωρίς να αφαιρούνται οι επίσημες αργίες, που αλλάζουν ανά χώρα και περιοχή.",
    notaInvertidas: "Η ημερομηνία λήξης ήταν πριν από την ημερομηνία έναρξης, γι' αυτό τις αντιστρέψαμε.",
  }),
};
