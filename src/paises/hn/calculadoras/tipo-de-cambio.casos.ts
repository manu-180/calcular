import { definirCasos } from "@/motor/calculo";
import tipoDeCambio from "./tipo-de-cambio";

const BCH = "https://www.bch.hn/_api/web/lists(guid'08a9876c-c6f1-4e73-8d13-0039b0442fab')/items?$select=Fecha,Valor,Observacion&$top=25&$orderby=Fecha%20desc";

export default definirCasos(tipoDeCambio, [
  {
    nombre: "Cien dólares con el valor del 7 de octubre",
    origen: { tipo: "oficial", url: BCH, detalle: "BCH, tipo de cambio de referencia del 07/10/2026: 26.8883. 100 × 26.8883 = 2688.83." },
    fecha: "2026-10-07",
    entrada: { sentido: "dolares-a-lempiras", cantidad: 100 },
    esperado: { tipo: 26.8883, fecha: "2026-10-07", lempiras: 2688.83 },
  },
  {
    nombre: "Un domingo usa el valor cargado el sábado",
    origen: { tipo: "oficial", url: BCH, detalle: "El valor del 03/10/2026 (26.8901) cubre del sábado 3 al lunes 5. 26890.10 / 26.8901 = 1000." },
    fecha: "2026-10-04",
    entrada: { sentido: "lempiras-a-dolares", cantidad: 26890.1 },
    esperado: { tipo: 26.8901, fecha: "2026-10-03", dolares: 1000 },
  },
]);
