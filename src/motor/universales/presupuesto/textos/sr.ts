import type { TextosUi } from "../../tipos";
import type { UiPresupuesto } from "../definicion";

export const textosSr: TextosUi<UiPresupuesto> = {
  slug: "kucni-budzet",
  ui: () => ({
    ingreso: "Neto mesečni prihod",
    ingresoAyuda: "Koliko vam svakog meseca legne na račun posle poreza i doprinosa.",
    pctNecesidades: "Osnovni troškovi (%)",
    pctNecesidadesAyuda: "Stanovanje, namirnice, računi za struju i grejanje, prevoz, zdravlje i obavezne rate dugova.",
    pctGustos: "Želje i zadovoljstva (%)",
    pctGustosAyuda: "Restorani, kupovina koja nije neophodna, pretplate, putovanja.",
    pctAhorro: "Štednja (%)",
    pctAhorroAyuda: "Rezerva za nepredviđene troškove, ciljevi, štednja za penziju i dodatne otplate dugova.",
    necesidades: "Za osnovne troškove",
    gustos: "Za želje i zadovoljstva",
    ahorro: "Za štednju",
    ahorroAnual: "Uštedite godišnje",
    errorIngreso: "Unesite svoj mesečni prihod.",
    errorSuma: (suma) => `Zbir sva tri procenta je ${suma}%. Ukupno mora da bude 100%.`,
    observacionAhorroBajo: "Kada štedite manje od 10%, ostaje malo prostora za nepredviđene troškove. Ako možete, odvojite manje za želje i zadovoljstva.",
  }),
};
