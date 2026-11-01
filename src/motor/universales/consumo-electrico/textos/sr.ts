import type { TextosUi } from "../../tipos";
import type { UiConsumoElectrico } from "../definicion";

export const textosSr: TextosUi<UiConsumoElectrico> = {
  slug: "potrosnja-struje",
  ui: () => ({
    potencia: "Snaga uređaja (W)",
    potenciaAyuda: "Piše na nalepnici ili u uputstvu, u vatima (W). Ako je data u kW, pomnožite je sa 1000.",
    cantidad: "Broj istih uređaja",
    horas: "Sati rada dnevno",
    dias: "Dana rada mesečno",
    precio: "Cena za 1 kWh",
    precioAyuda: "Nalazi se na računu za struju. Za stvarni trošak unesite cenu sa svim naknadama i PDV-om.",
    kwhDia: "Potrošnja dnevno (kWh)",
    kwhMes: "Potrošnja mesečno (kWh)",
    kwhAnio: "Potrošnja godišnje (kWh)",
    costoDia: "Trošak dnevno",
    costoMes: "Trošak mesečno",
    costoAnio: "Trošak godišnje",
    errorHoras: "Dan ima 24 sata: vreme rada mora biti od 0 do 24.",
  }),
};
