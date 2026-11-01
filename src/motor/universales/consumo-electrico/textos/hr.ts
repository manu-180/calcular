import type { TextosUi } from "../../tipos";
import type { UiConsumoElectrico } from "../definicion";

export const textosHr: TextosUi<UiConsumoElectrico> = {
  slug: "potrosnja-struje",
  ui: () => ({
    potencia: "Snaga uređaja (W)",
    potenciaAyuda: "Piše na naljepnici ili u uputama, u vatima (W). Ako je navedena u kW, pomnožite je s 1000.",
    cantidad: "Broj istih uređaja",
    horas: "Sati rada dnevno",
    dias: "Dana rada mjesečno",
    precio: "Cijena za 1 kWh",
    precioAyuda: "Nalazi se na računu za struju. Za stvarni trošak unesite cijenu sa svim naknadama i PDV-om.",
    kwhDia: "Potrošnja dnevno (kWh)",
    kwhMes: "Potrošnja mjesečno (kWh)",
    kwhAnio: "Potrošnja godišnje (kWh)",
    costoDia: "Trošak dnevno",
    costoMes: "Trošak mjesečno",
    costoAnio: "Trošak godišnje",
    errorHoras: "Dan ima 24 sata: vrijeme rada mora biti od 0 do 24.",
  }),
};
