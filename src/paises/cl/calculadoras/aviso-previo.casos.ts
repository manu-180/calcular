import { definirCasos } from "@/motor/calculo";
import avisoPrevio from "./aviso-previo";

export default definirCasos(avisoPrevio, [
  {
    nombre: "Despido el mismo día",
    origen: { tipo: "recalculado", detalle: "Art. 162: sin 30 días de anticipación se paga una remuneración. 0 días de aviso: 950.000." },
    fecha: "2026-10-07",
    entrada: { fechaAviso: "2026-10-05", termino: "2026-10-05", remuneracion: 950000 },
    esperado: { anticipacion: 0, indemnizacion: 950000 },
  },
  {
    nombre: "Aviso con 30 días justos",
    origen: { tipo: "recalculado", detalle: "Del 1/9 al 1/10 hay 30 días: cumple el art. 162 y no hay pago." },
    fecha: "2026-10-07",
    entrada: { fechaAviso: "2026-09-01", termino: "2026-10-01", remuneracion: 950000 },
    esperado: { anticipacion: 30, indemnizacion: 0 },
  },
  {
    nombre: "29 días y sueldo sobre el tope",
    origen: { tipo: "recalculado", detalle: "Del 2/9 al 1/10 hay 29 días. Tope 90 UF con UF 41.114,54 = 3.700.309 (art. 172)." },
    fecha: "2026-10-07",
    entrada: { fechaAviso: "2026-09-02", termino: "2026-10-01", remuneracion: 4500000 },
    esperado: { anticipacion: 29, indemnizacion: 3700309 },
  },
]);
