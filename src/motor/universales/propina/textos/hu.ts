import type { TextosUi } from "../../tipos";
import type { UiPropina } from "../definicion";

export const textosHu: TextosUi<UiPropina> = {
  slug: "borravalo-kalkulator",
  ui: () => ({
    cuenta: "A számla összege",
    porcentaje: "Borravaló (%)",
    porcentajeAyuda: "A szokás országonként és helyenként is más. Válaszd azt, ami neked megfelelőnek tűnik.",
    personas: "Hányan fizettek",
    redondear: "Mindenki részét felfelé kerekíteni",
    redondearAyuda: "Hogy mindenki kerek összeget fizessen. A különbség a borravalóhoz kerül.",
    propina: "Borravaló",
    total: "Összesen borravalóval",
    porPersona: "Fejenként fizetendő",
    propinaEfectiva: "Borravaló kerekítés után",
    errorPersonas: "Legalább egy embernek fizetnie kell.",
    observacionRedondeo: (efectiva) => `Felfelé kerekítés után a borravaló a számla ennyi százaléka: ${efectiva}.`,
  }),
};
