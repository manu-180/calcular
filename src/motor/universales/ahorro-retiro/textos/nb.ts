import type { TextosUi } from "../../tipos";
import type { UiAhorroRetiro } from "../definicion";

export const textosNb: TextosUi<UiAhorroRetiro> = {
  slug: "pensjonssparing",
  ui: () => ({
    edadActual: "Alderen din i dag",
    edadRetiro: "Alder når du vil gå av med pensjon",
    actual: "Det du allerede har spart",
    aporte: "Månedlig sparebeløp",
    rendimiento: "Realavkastning per år (%)",
    rendimientoAyuda: "Det sparingen gir utover prisveksten. 2 % til 5 % er et forsiktig anslag på lang sikt.",
    aniosRenta: "Antall år pensjonen skal vare",
    aniosRentaAyuda: "Hvor mange år du vil ta ut penger fra sparingen.",
    capital: "Oppspart beløp ved pensjonsalder",
    renta: "Månedlig utbetaling fra sparingen",
    aportado: "Satt inn totalt",
    intereses: "Verdiøkning totalt",
    tabla: "Utvikling etter alder",
    colEdad: "Alder",
    colAportado: "Satt inn til nå",
    colSaldo: "Oppspart beløp",
    errorEdades: "Pensjonsalderen må være høyere enn alderen din i dag.",
    errorSinAhorro: "Skriv inn det du har spart nå eller et månedlig sparebeløp.",
    observacionDineroDeHoy: "Beløpene er i dagens pengeverdi, fordi avkastningen allerede er regnet etter prisvekst.",
    observacionPublica: "Dette er bare din egen sparing. Offentlig pensjon og tjenestepensjon er ikke med.",
  }),
};
