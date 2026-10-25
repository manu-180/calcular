import type { TextosUi } from "../../tipos";
import type { UiConsumoElectrico } from "../definicion";

export const textosRo: TextosUi<UiConsumoElectrico> = {
  slug: "calculator-consum-energie",
  ui: () => ({
    potencia: "Puterea aparatului (W)",
    potenciaAyuda: "Apare pe etichetă sau în manual, în wați (W). Dacă scrie kW, înmulțiți cu 1000.",
    cantidad: "Numărul de aparate identice",
    horas: "Ore de folosire pe zi",
    dias: "Zile de folosire pe lună",
    precio: "Prețul pe kWh",
    precioAyuda: "Îl găsiți pe factura de energie electrică: prețul pe kWh, cu taxe dacă vreți costul complet.",
    kwhDia: "Consum pe zi (kWh)",
    kwhMes: "Consum pe lună (kWh)",
    kwhAnio: "Consum pe an (kWh)",
    costoDia: "Cost pe zi",
    costoMes: "Cost pe lună",
    costoAnio: "Cost pe an",
    errorHoras: "O zi are 24 de ore: folosirea trebuie să fie între 0 și 24.",
  }),
};
