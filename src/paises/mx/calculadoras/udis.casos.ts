import { definirCasos } from "@/motor/calculo";
import udis from "./udis";

export default definirCasos(udis, [
  {
    nombre: "Mil UDIS al 7 de octubre de 2026",
    origen: { tipo: "oficial", url: "https://sidofqa.segob.gob.mx/dof/sidof/indicadores/159/25-09-2026/07-10-2026", detalle: "UDI del 07/10/2026: 8.847651. 1000 × 8.847651 = 8847.65." },
    fecha: "2026-10-07",
    entrada: { sentido: "udis-a-pesos", cantidad: 1000 },
    esperado: { udi: 8.847651, pesos: 8847.65 },
  },
  {
    nombre: "Pesos a UDIS con el valor del 5 de octubre",
    origen: { tipo: "recalculado", detalle: "UDI del 05/10/2026: 8.843775. 8843.775 / 8.843775 = 1000." },
    fecha: "2026-10-05",
    entrada: { sentido: "pesos-a-udis", cantidad: 8843.775 },
    esperado: { udis: 1000 },
  },
]);
