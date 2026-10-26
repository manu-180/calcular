import type { TextosUi } from "../../tipos";
import type { UiPropina } from "../definicion";

export const textosPl: TextosUi<UiPropina> = {
  slug: "kalkulator-napiwku",
  ui: () => ({
    cuenta: "Kwota rachunku",
    porcentaje: "Napiwek (%)",
    porcentajeAyuda: "Zwyczaje różnią się w zależności od kraju i lokalu. Wybierz to, co uważasz za stosowne.",
    personas: "Liczba osób, które płacą",
    redondear: "Zaokrąglij każdą część w górę",
    redondearAyuda: "Żeby każdy zapłacił pełną kwotę. Nadwyżka trafia do napiwku.",
    propina: "Napiwek",
    total: "Razem z napiwkiem",
    porPersona: "Każda osoba płaci",
    propinaEfectiva: "Napiwek po zaokrągleniu",
    errorPersonas: "Musi płacić co najmniej jedna osoba.",
    observacionRedondeo: (efectiva) => `Po zaokrągleniu w górę napiwek wynosi ${efectiva}% rachunku.`,
  }),
};
