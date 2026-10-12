import { definirCasos } from "@/motor/calculo";
import renuncia from "./renuncia";

export default definirCasos(renuncia, [
  {
    nombre: "Renuncia a los 8 meses con preaviso",
    origen: { tipo: "recalculado", detalle: "Del 15/1 al 20/9/2026: 8 meses y 5 días. Diario 25,000 ÷ 23.83 = 1,049.10. Vacaciones art. 180: 9 días = 9,441.90. Regalía: 8.2 meses, 25,000 × 8.2 ÷ 12 = 17,083.33. Total 26,525.23." },
    fecha: "2026-10-12",
    entrada: { inicio: "2026-01-15", termino: "2026-09-20", salario: 25000, vacacionesPendientes: 0, diPreaviso: true, tamano: "pequena" },
    esperado: { diasVacaciones: 9, vacaciones: 9441.9, regalia: 17083.33, total: 26525.23, preavisoOmitido: 0 },
  },
  {
    nombre: "Renuncia sin preaviso",
    origen: { tipo: "recalculado", detalle: "Mismo caso. Preaviso de 14 días (art. 76 ordinal 2) que no se dio: 1,049.10 × 14 = 14,687.40 (art. 79)." },
    fecha: "2026-10-12",
    entrada: { inicio: "2026-01-15", termino: "2026-09-20", salario: 25000, vacacionesPendientes: 0, diPreaviso: false, tamano: "pequena" },
    esperado: { total: 26525.23, preavisoOmitido: 14687.4 },
  },
  {
    nombre: "Regalía con tope de 5 salarios mínimos",
    origen: { tipo: "recalculado", detalle: "Todo 2026 trabajado hasta el 31/12 con 200,000 al mes: la regalía sería 200,000, pero el tope es 5 × 18,421.20 = 92,106 (pequeña empresa, art. 219)." },
    fecha: "2026-10-12",
    entrada: { inicio: "2020-01-01", termino: "2026-12-31", salario: 200000, vacacionesPendientes: 0, diPreaviso: true, tamano: "pequena" },
    esperado: { regalia: 92106 },
  },
]);
