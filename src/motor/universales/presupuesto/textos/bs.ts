import type { TextosUi } from "../../tipos";
import type { UiPresupuesto } from "../definicion";

export const textosBs: TextosUi<UiPresupuesto> = {
  slug: "kucni-budzet",
  ui: () => ({
    ingreso: "Neto mjesečni prihod",
    ingresoAyuda: "Koliko vam svakog mjeseca sjedne na račun nakon poreza i doprinosa.",
    pctNecesidades: "Osnovni troškovi (%)",
    pctNecesidadesAyuda: "Stanovanje, namirnice, računi za struju i grijanje, prevoz, zdravlje i obavezne rate dugova.",
    pctGustos: "Želje i zadovoljstva (%)",
    pctGustosAyuda: "Restorani, kupovina koja nije nužna, pretplate, putovanja.",
    pctAhorro: "Štednja (%)",
    pctAhorroAyuda: "Rezerva za nepredviđene troškove, ciljevi, štednja za penziju i dodatne otplate dugova.",
    necesidades: "Za osnovne troškove",
    gustos: "Za želje i zadovoljstva",
    ahorro: "Za štednju",
    ahorroAnual: "Ušteda godišnje",
    errorIngreso: "Unesite svoj mjesečni prihod.",
    errorSuma: (suma) => `Zbir sva tri procenta je ${suma} %. Ukupno mora biti 100 %.`,
    observacionAhorroBajo: "Kada štedite manje od 10 %, ostaje malo prostora za nepredviđene troškove. Ako možete, odvojite manje za želje i zadovoljstva.",
  }),
};
