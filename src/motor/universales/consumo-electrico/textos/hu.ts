import type { TextosUi } from "../../tipos";
import type { UiConsumoElectrico } from "../definicion";

export const textosHu: TextosUi<UiConsumoElectrico> = {
  slug: "aramfogyasztas-kalkulator",
  ui: () => ({
    potencia: "A készülék teljesítménye (W)",
    potenciaAyuda: "A címkén vagy a használati útmutatóban találod, wattban (W). Ha kW szerepel rajta, szorozd meg ezerrel.",
    cantidad: "Egyforma készülékek száma",
    horas: "Napi használat (óra)",
    dias: "Használati napok havonta",
    precio: "Ár kWh-nként",
    precioAyuda: "A villanyszámlán találod: az egy kWh-ra jutó díj, adókkal együtt, ha a teljes költségre vagy kíváncsi.",
    kwhDia: "Napi fogyasztás (kWh)",
    kwhMes: "Havi fogyasztás (kWh)",
    kwhAnio: "Éves fogyasztás (kWh)",
    costoDia: "Napi költség",
    costoMes: "Havi költség",
    costoAnio: "Éves költség",
    errorHoras: "Egy nap 24 órából áll: a használat 0 és 24 óra között lehet.",
  }),
};
