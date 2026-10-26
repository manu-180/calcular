import type { TextosUi } from "../../tipos";
import type { UiPresupuesto } from "../definicion";

export const textosSv: TextosUi<UiPresupuesto> = {
  slug: "budget-50-30-20",
  ui: () => ({
    ingreso: "Inkomst per månad efter skatt",
    ingresoAyuda: "Det som kommer in på kontot varje månad, efter skatt och avdrag.",
    pctNecesidades: "Nödvändiga utgifter (%)",
    pctNecesidadesAyuda: "Boende, mat, el, transporter, hälsa och de lägsta betalningarna på dina lån.",
    pctGustos: "Nöjen och annat (%)",
    pctGustosAyuda: "Restaurang, shopping du klarar dig utan, prenumerationer och resor.",
    pctAhorro: "Sparande (%)",
    pctAhorroAyuda: "Buffert, sparmål, pension och extra amortering på skulder.",
    necesidades: "Till nödvändiga utgifter",
    gustos: "Till nöjen och annat",
    ahorro: "Till sparande",
    ahorroAnual: "Sparande på ett år",
    errorIngreso: "Fyll i din inkomst per månad.",
    errorSuma: (suma) => `De tre procentsatserna blir tillsammans ${suma} %. De måste bli 100 %.`,
    observacionAhorroBajo: "Sparar du mindre än 10 % blir det lite utrymme för oväntade utgifter. Dra ner på några nöjen om du kan.",
  }),
};
