import type { TextosUi } from "../../tipos";
import type { UiConsumoElectrico } from "../definicion";

export const textosCs: TextosUi<UiConsumoElectrico> = {
  slug: "spotreba-elektriny",
  ui: () => ({
    potencia: "Příkon spotřebiče (W)",
    potenciaAyuda: "Najdete ho na štítku nebo v návodu ve wattech (W). Pokud je uvedený v kW, vynásobte ho 1000.",
    cantidad: "Počet stejných spotřebičů",
    horas: "Hodin provozu denně",
    dias: "Dní provozu za měsíc",
    precio: "Cena za 1 kWh",
    precioAyuda: "Najdete ji ve vyúčtování za elektřinu. Pro skutečné náklady zadejte cenu včetně distribuce a DPH.",
    kwhDia: "Spotřeba za den (kWh)",
    kwhMes: "Spotřeba za měsíc (kWh)",
    kwhAnio: "Spotřeba za rok (kWh)",
    costoDia: "Náklady za den",
    costoMes: "Náklady za měsíc",
    costoAnio: "Náklady za rok",
    errorHoras: "Den má 24 hodin: doba provozu musí být od 0 do 24.",
  }),
};
