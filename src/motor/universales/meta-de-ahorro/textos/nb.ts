import type { TextosUi } from "../../tipos";
import type { UiMetaDeAhorro } from "../definicion";

export const textosNb: TextosUi<UiMetaDeAhorro> = {
  slug: "sparekalkulator",
  ui: () => ({
    meta: "Hvor mye vil du spare?",
    actual: "Det du allerede har spart (valgfritt)",
    meses: "Antall måneder til målet",
    rendimiento: "Avkastning eller rente per år (%, valgfritt)",
    rendimientoAyuda: "Hvis pengene står på en sparekonto eller i fond som gir avkastning. La feltet stå tomt hvis de ikke gir noe.",
    aporteMensual: "Du må spare per måned",
    aporteSemanal: "Det tilsvarer per uke",
    totalAportado: "Satt inn totalt",
    intereses: "Renter og avkastning",
    errorMeta: "Skriv inn hvor mye du vil spare.",
    yaLlegas: "Det du allerede har, holder til målet på den tiden uten at du setter inn mer.",
  }),
};
