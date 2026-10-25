import type { TextosUi } from "../../tipos";
import type { UiVariacion } from "../definicion";

export const textosSr: TextosUi<UiVariacion> = {
  slug: "procentualna-promena",
  ui: () => ({
    inicial: "Početna vrednost",
    final: "Nova vrednost",
    variacion: "Procentualna promena",
    diferencia: "Razlika",
    vuelta: "Povratak na početnu vrednost",
    vueltaAyuda: "Za koliko bi nova vrednost morala da se promeni da bi se vratila na početnu.",
    errorInicialCero: "Početna vrednost ne može biti 0: od nule se procentualna promena ne može izračunati.",
    subio: (p) => `Vrednost je porasla za ${p}%.`,
    bajo: (p) => `Vrednost je pala za ${p}%.`,
    igual: "Nema promene: obe vrednosti su iste.",
  }),
};
