import { definirCasos } from "@/motor/calculo";
import revision from "./revision-hipoteca-euribor";

export default definirCasos(revision, [
  {
    nombre: "Revisión con el euríbor de septiembre de 2026",
    origen: {
      tipo: "recalculado",
      url: "https://app.bde.es/bierest/resources/srdatosapp/listaSeries?idioma=es&series=D_1NBAF472&rango=30M",
      detalle: "Euríbor 3,247 % (Banco de España, septiembre de 2026) + 0,75 = 3,997 %. 150.000 a 240 meses: cuota 908,73. Intereses 908,73 × 240 − 150.000 = 68.095,20.",
    },
    fecha: "2026-10-14",
    entrada: { capital: 150000, anios: 20, diferencial: 0.75, euribor: null, cuotaActual: 850 },
    esperado: { euribor: 3.247, cuota: 908.73, diferencia: 58.73, intereses: 68095.2, meses: 240 },
  },
  {
    nombre: "Euríbor indicado a mano",
    origen: { tipo: "recalculado", detalle: "2,5 + 0,75 = 3,25 %: cuota 850,79." },
    fecha: "2026-10-14",
    entrada: { capital: 150000, anios: 20, diferencial: 0.75, euribor: 2.5, cuotaActual: null },
    esperado: { tipo: 3.25, cuota: 850.79, diferencia: null },
  },
  {
    nombre: "Tipo negativo: se aplica cero",
    origen: { tipo: "recalculado", detalle: "−0,5 + 0,3 < 0. Cuota sin intereses: 100.000 / 120 = 833,33." },
    fecha: "2026-10-14",
    entrada: { capital: 100000, anios: 10, diferencial: 0.3, euribor: -0.5, cuotaActual: null },
    esperado: { tipo: 0, cuota: 833.33 },
  },
]);
