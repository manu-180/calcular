import type { TextosUi } from "../../tipos";
import type { UiConsumoElectrico } from "../definicion";

export const textosSk: TextosUi<UiConsumoElectrico> = {
  slug: "spotreba-elektriny",
  ui: () => ({
    potencia: "Príkon spotrebiča (W)",
    potenciaAyuda: "Nájdete ho na štítku alebo v návode vo wattoch (W). Ak je uvedený v kW, vynásobte ho 1000.",
    cantidad: "Počet rovnakých spotrebičov",
    horas: "Hodín prevádzky denne",
    dias: "Dní prevádzky za mesiac",
    precio: "Cena za 1 kWh",
    precioAyuda: "Nájdete ju vo vyúčtovaní za elektrinu. Pre skutočné náklady zadajte cenu vrátane distribúcie a DPH.",
    kwhDia: "Spotreba za deň (kWh)",
    kwhMes: "Spotreba za mesiac (kWh)",
    kwhAnio: "Spotreba za rok (kWh)",
    costoDia: "Náklady za deň",
    costoMes: "Náklady za mesiac",
    costoAnio: "Náklady za rok",
    errorHoras: "Deň má 24 hodín: čas prevádzky musí byť od 0 do 24.",
  }),
};
