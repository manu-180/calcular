import { definirCasos } from "@/motor/calculo";
import tipoDeCambio from "./tipo-de-cambio";

export default definirCasos(tipoDeCambio, [
  {
    nombre: "Cien dólares con el tipo de cambio del 7 de octubre",
    origen: { tipo: "oficial", url: "https://sidofqa.segob.gob.mx/dof/sidof/indicadores/158/25-09-2026/07-10-2026", detalle: "Publicado en el DOF el 07/10/2026: 17.9670. 100 × 17.967 = 1796.70." },
    fecha: "2026-10-07",
    entrada: { sentido: "dolares-a-pesos", cantidad: 100 },
    esperado: { tipo: 17.967, pesos: 1796.7 },
  },
  {
    nombre: "Un domingo usa el último día hábil publicado",
    origen: { tipo: "recalculado", detalle: "El 04/10/2026 no hubo publicación: vale el del 02/10/2026, 18.3688. 18368.80 / 18.3688 = 1000." },
    fecha: "2026-10-04",
    entrada: { sentido: "pesos-a-dolares", cantidad: 18368.8 },
    esperado: { tipo: 18.3688, dolares: 1000 },
  },
]);
