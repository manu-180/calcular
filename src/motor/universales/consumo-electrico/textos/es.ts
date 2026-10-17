import { conVariantes } from "../../comun/locales";
import { segunTrato, type TextosUi } from "../../tipos";
import type { UiConsumoElectrico } from "../definicion";

const base: TextosUi<UiConsumoElectrico> = {
  slug: "consumo-electrico",
  ui: (trato) => ({
    potencia: "Potencia del aparato (W)",
    potenciaAyuda: segunTrato(trato, {
      tu: "Está en la etiqueta o en el manual, en vatios (W). Si dice kW, multiplica por 1000.",
      usted: "Está en la etiqueta o en el manual, en vatios (W). Si dice kW, multiplique por 1000.",
      vos: "Está en la etiqueta o en el manual, en vatios (W). Si dice kW, multiplicá por 1000.",
    }),
    cantidad: "Cantidad de aparatos iguales",
    horas: "Horas de uso por día",
    dias: "Días de uso por mes",
    precio: "Precio del kWh",
    precioAyuda: segunTrato(trato, {
      tu: "Lo ves en tu factura de luz: el cargo por kWh, con impuestos si quieres el total.",
      usted: "Lo ve en su factura de luz: el cargo por kWh, con impuestos si quiere el total.",
      vos: "Lo ves en tu factura de luz: el cargo por kWh, con impuestos si querés el total.",
    }),
    kwhDia: "Consumo por día (kWh)",
    kwhMes: "Consumo por mes (kWh)",
    kwhAnio: "Consumo por año (kWh)",
    costoDia: "Costo por día",
    costoMes: "Costo por mes",
    costoAnio: "Costo por año",
    errorHoras: "Un día tiene 24 horas: el uso tiene que estar entre 0 y 24.",
  }),
};

const espana = (): Partial<UiConsumoElectrico> => ({
  horas: "Horas de uso al día",
  dias: "Días de uso al mes",
  kwhDia: "Consumo al día (kWh)",
  kwhMes: "Consumo al mes (kWh)",
  kwhAnio: "Consumo al año (kWh)",
  costoDia: "Coste al día",
  costoMes: "Coste al mes",
  costoAnio: "Coste al año",
});

export const textosEs = conVariantes(base, { "es-ES": espana });
