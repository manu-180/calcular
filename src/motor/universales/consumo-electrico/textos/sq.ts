import type { TextosUi } from "../../tipos";
import type { UiConsumoElectrico } from "../definicion";

export const textosSq: TextosUi<UiConsumoElectrico> = {
  slug: "kalkulator-konsum-energjie",
  ui: () => ({
    potencia: "Fuqia e pajisjes (W)",
    potenciaAyuda: "Shkruhet në etiketë ose në manual, në vat (W). Nëse shkruan kW, shumëzojeni me 1000.",
    cantidad: "Numri i pajisjeve të njëjta",
    horas: "Orë përdorimi në ditë",
    dias: "Ditë përdorimi në muaj",
    precio: "Çmimi për kWh",
    precioAyuda: "E gjeni në faturën e energjisë elektrike: çmimi për kWh, me taksat nëse dëshironi koston e plotë.",
    kwhDia: "Konsumi në ditë (kWh)",
    kwhMes: "Konsumi në muaj (kWh)",
    kwhAnio: "Konsumi në vit (kWh)",
    costoDia: "Kosto në ditë",
    costoMes: "Kosto në muaj",
    costoAnio: "Kosto në vit",
    errorHoras: "Një ditë ka 24 orë: përdorimi duhet të jetë nga 0 deri në 24.",
  }),
};
