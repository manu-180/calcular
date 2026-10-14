import type { TextosUi } from "../../tipos";
import type { UiPresupuesto } from "../definicion";

export const textosIt: TextosUi<UiPresupuesto> = {
  slug: "regola-50-30-20",
  ui: () => ({
    ingreso: "Stipendio netto mensile",
    ingresoAyuda: "Quello che ti arriva sul conto ogni mese, dopo tasse e trattenute.",
    pctNecesidades: "Spese necessarie (%)",
    pctNecesidadesAyuda: "Casa, spesa alimentare, bollette, trasporti, salute e rate minime dei debiti.",
    pctGustos: "Desideri (%)",
    pctGustosAyuda: "Cene fuori, acquisti non essenziali, abbonamenti, viaggi.",
    pctAhorro: "Risparmio (%)",
    pctAhorroAyuda: "Fondo di emergenza, obiettivi, pensione e rimborsi extra dei debiti.",
    necesidades: "Per le spese necessarie",
    gustos: "Per i desideri",
    ahorro: "Per il risparmio",
    ahorroAnual: "Risparmio in un anno",
    errorIngreso: "Inserisci il tuo reddito mensile.",
    errorSuma: (somma) => `Le tre percentuali sommate fanno ${somma}%. Devono fare 100%.`,
    observacionAhorroBajo: "Risparmiare meno del 10% lascia poco margine per gli imprevisti. Se puoi, taglia qualche desiderio.",
  }),
};
