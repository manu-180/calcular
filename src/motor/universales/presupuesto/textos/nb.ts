import type { TextosUi } from "../../tipos";
import type { UiPresupuesto } from "../definicion";

export const textosNb: TextosUi<UiPresupuesto> = {
  slug: "budsjett-50-30-20",
  ui: () => ({
    ingreso: "Inntekt per måned etter skatt",
    ingresoAyuda: "Det som kommer inn på kontoen hver måned, etter skatt og trekk.",
    pctNecesidades: "Nødvendige utgifter (%)",
    pctNecesidadesAyuda: "Bolig, mat, strøm, transport, helse og minstebeløpene på lånene dine.",
    pctGustos: "Kos og annet (%)",
    pctGustosAyuda: "Restaurant, kjøp du kan klare deg uten, abonnementer og reiser.",
    pctAhorro: "Sparing (%)",
    pctAhorroAyuda: "Buffer, sparemål, pensjon og ekstra nedbetaling av gjeld.",
    necesidades: "Til nødvendige utgifter",
    gustos: "Til kos og annet",
    ahorro: "Til sparing",
    ahorroAnual: "Sparing på ett år",
    errorIngreso: "Skriv inn inntekten din per måned.",
    errorSuma: (suma) => `De tre prosentsatsene blir til sammen ${suma} %. De må bli 100 %.`,
    observacionAhorroBajo: "Sparer du mindre enn 10 %, blir det lite rom for uventede utgifter. Kutt litt i kosen hvis du kan.",
  }),
};
