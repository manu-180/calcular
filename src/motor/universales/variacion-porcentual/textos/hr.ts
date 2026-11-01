import type { TextosUi } from "../../tipos";
import type { UiVariacion } from "../definicion";

export const textosHr: TextosUi<UiVariacion> = {
  slug: "postotna-promjena",
  ui: () => ({
    inicial: "Početna vrijednost",
    final: "Nova vrijednost",
    variacion: "Postotna promjena",
    diferencia: "Razlika",
    vuelta: "Povratak na početnu vrijednost",
    vueltaAyuda: "Za koliko bi se nova vrijednost morala promijeniti da bi se vratila na početnu.",
    errorInicialCero: "Početna vrijednost ne može biti 0: od nule se postotna promjena ne može izračunati.",
    subio: (p) => `Vrijednost je porasla za ${p} %.`,
    bajo: (p) => `Vrijednost je pala za ${p} %.`,
    igual: "Nema promjene: obje vrijednosti su iste.",
  }),
};
