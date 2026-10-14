import type { TextosUi } from "../../tipos";
import type { UiConsumoElectrico } from "../definicion";

export const textosIt: TextosUi<UiConsumoElectrico> = {
  slug: "calcolo-consumo-elettrico",
  ui: () => ({
    potencia: "Potenza dell'apparecchio (W)",
    potenciaAyuda: "La trovi sull'etichetta o nel libretto, in watt (W). Se è indicata in kW, moltiplica per 1000.",
    cantidad: "Numero di apparecchi uguali",
    horas: "Ore di utilizzo al giorno",
    dias: "Giorni di utilizzo al mese",
    precio: "Prezzo al kWh",
    precioAyuda: "Lo trovi in bolletta: il costo dell'energia al kWh, con tasse e oneri se vuoi il costo completo.",
    kwhDia: "Consumo al giorno (kWh)",
    kwhMes: "Consumo al mese (kWh)",
    kwhAnio: "Consumo all'anno (kWh)",
    costoDia: "Costo al giorno",
    costoMes: "Costo al mese",
    costoAnio: "Costo all'anno",
    errorHoras: "Un giorno ha 24 ore: l'utilizzo deve essere tra 0 e 24.",
  }),
};
