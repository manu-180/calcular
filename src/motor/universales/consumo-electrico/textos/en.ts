import type { TextosUi } from "../../tipos";
import type { UiConsumoElectrico } from "../definicion";

export const textosEn: TextosUi<UiConsumoElectrico> = {
  slug: "electricity-cost",
  ui: () => ({
    potencia: "Appliance power (W)",
    potenciaAyuda: "It's on the label or in the manual, in watts (W). If it says kW, multiply by 1000.",
    cantidad: "Number of identical appliances",
    horas: "Hours of use per day",
    dias: "Days of use per month",
    precio: "Price per kWh",
    precioAyuda: "It's on your electricity bill: the charge per kWh, with taxes if you want the full cost.",
    kwhDia: "Use per day (kWh)",
    kwhMes: "Use per month (kWh)",
    kwhAnio: "Use per year (kWh)",
    costoDia: "Cost per day",
    costoMes: "Cost per month",
    costoAnio: "Cost per year",
    errorHoras: "A day has 24 hours: use has to be between 0 and 24.",
  }),
};
