import type { TextosUi } from "../../tipos";
import type { UiAhorroRetiro } from "../definicion";

export const textosIt: TextosUi<UiAhorroRetiro> = {
  slug: "risparmio-per-la-pensione",
  ui: () => ({
    edadActual: "La tua età oggi",
    edadRetiro: "Età a cui vuoi andare in pensione",
    actual: "Quanto hai già da parte",
    aporte: "Versamento mensile",
    rendimiento: "Rendimento reale annuo (%)",
    rendimientoAyuda: "Quanto rende l'investimento al netto dell'inflazione. Sul lungo periodo, dal 2% al 5% è un'ipotesi prudente.",
    aniosRenta: "Anni di pensione da coprire",
    aniosRentaAyuda: "Per quanti anni vuoi attingere a questi risparmi.",
    capital: "Risparmi al momento della pensione",
    renta: "Rendita mensile da quei risparmi",
    aportado: "Totale versato",
    intereses: "Crescita totale",
    tabla: "Crescita per età",
    colEdad: "Età",
    colAportado: "Versato fino a quel momento",
    colSaldo: "Risparmi",
    errorEdades: "L'età della pensione deve essere più alta della tua età di oggi.",
    errorSinAhorro: "Inserisci i risparmi che hai oggi o un versamento mensile.",
    observacionDineroDeHoy: "Le cifre sono in soldi di oggi, perché il rendimento reale toglie già l'inflazione.",
    observacionPublica: "Sono solo i tuoi risparmi personali. Non comprende la pensione pubblica che potresti ricevere.",
  }),
};
