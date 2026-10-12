import { definirCasos } from "@/motor/calculo";
import valorUr from "./valor-ur";

export default definirCasos(valorUr, [
  {
    nombre: "20 UR a pesos en octubre de 2026",
    origen: { tipo: "oficial", url: "https://www.bps.gub.uy/5478/valores-actuales.html", detalle: "BPS, valores actuales: UR de octubre de 2026 = 1.946,95. 20 × 1.946,95 = 38.939." },
    fecha: "2026-10-12",
    entrada: { sentido: "a-pesos", monto: 20 },
    esperado: { valorUr: 1946.95, mes: "octubre de 2026", pesos: 38939, enUr: null },
  },
  {
    nombre: "UR de setiembre",
    origen: { tipo: "oficial", url: "https://www.bps.gub.uy/5478/valores-actuales.html", detalle: "UR de setiembre de 2026 = 1.940,77." },
    fecha: "2026-09-20",
    entrada: { sentido: "a-pesos", monto: 1 },
    esperado: { valorUr: 1940.77, mes: "setiembre de 2026" },
  },
  {
    nombre: "$ 50.000 a UR",
    origen: { tipo: "recalculado", detalle: "50.000 / 1.946,95 = 25,6812 UR." },
    fecha: "2026-10-12",
    entrada: { sentido: "desde-pesos", monto: 50000 },
    esperado: { enUr: 25.6812 },
    tolerancia: 0.0001,
  },
]);
