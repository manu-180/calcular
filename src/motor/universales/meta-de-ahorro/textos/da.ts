import type { TextosUi } from "../../tipos";
import type { UiMetaDeAhorro } from "../definicion";

export const textosDa: TextosUi<UiMetaDeAhorro> = {
  slug: "opsparingsberegner",
  ui: () => ({
    meta: "Hvor meget vil du spare op?",
    actual: "Det, du allerede har sparet op (valgfrit)",
    meses: "Antal måneder til målet",
    rendimiento: "Afkast eller rente om året (%, valgfrit)",
    rendimientoAyuda: "Hvis pengene står på en opsparingskonto eller i en investering, der giver afkast. Lad feltet stå tomt, hvis de ikke giver noget.",
    aporteMensual: "Du skal spare op pr. måned",
    aporteSemanal: "Det svarer til pr. uge",
    totalAportado: "Indbetalt i alt",
    intereses: "Renter og afkast",
    errorMeta: "Skriv, hvor meget du vil spare op.",
    yaLlegas: "Det, du allerede har, rækker til målet på den tid, uden at du sætter mere ind.",
  }),
};
