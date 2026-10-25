import type { TextosUi } from "../../tipos";
import type { UiAhorroRetiro } from "../definicion";

export const textosRo: TextosUi<UiAhorroRetiro> = {
  slug: "calculator-economii-pensie",
  ui: () => ({
    edadActual: "Vârsta de acum",
    edadRetiro: "Vârsta la care vreți să vă pensionați",
    actual: "Economii pe care le aveți deja",
    aporte: "Contribuție lunară",
    rendimiento: "Randament real anual (%)",
    rendimientoAyuda: "Cât câștigă investiția peste inflație. Pe termen lung, între 2% și 5% este o estimare prudentă.",
    aniosRenta: "Ani de pensie de acoperit",
    aniosRentaAyuda: "Câți ani vreți să trăiți din aceste economii.",
    capital: "Economii la pensionare",
    renta: "Venit lunar din economii",
    aportado: "Total contribuit",
    intereses: "Câștig total din randament",
    tabla: "Evoluția pe vârste",
    colEdad: "Vârsta",
    colAportado: "Contribuit până atunci",
    colSaldo: "Economii",
    errorEdades: "Vârsta de pensionare trebuie să fie mai mare decât vârsta de acum.",
    errorSinAhorro: "Introduceți economiile actuale sau o contribuție lunară.",
    observacionDineroDeHoy: "Sumele sunt în banii de azi, pentru că randamentul real scade deja inflația.",
    observacionPublica: "Sunt doar economiile dumneavoastră. Nu include pensia de stat pe care o puteți primi.",
  }),
};
