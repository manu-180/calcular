import { definirCasos } from "@/motor/calculo";
import trabajoDomestico from "./trabajo-domestico";

export default definirCasos(trabajoDomestico, [
  {
    nombre: "RD$15,000 desde marzo de 2025, cálculo al 15/12/2026",
    origen: { tipo: "recalculado", detalle: "Art. 263: salario de Navidad del art. 219 sobre lo pagado en efectivo. Del 1/1 al 15/12/2026: 11 meses y 15 días = 11.5 meses. 15,000 × 11.5 ÷ 12 = 14,375. Art. 260: comida y alojamiento = 50 % = 7,500." },
    fecha: "2026-10-12",
    entrada: { salario: 15000, inicio: "2025-03-01", corte: "2026-12-15" },
    esperado: { minimo: 13000, faltante: 0, meses: 11.5, regalia: 14375, especie: 7500 },
  },
  {
    nombre: "Salario por debajo del mínimo",
    origen: { tipo: "recalculado", detalle: "Mínimo del trabajo del hogar 13,000 desde el 1/5/2025. Con 12,000 faltan 1,000. Año completo: regalía 12,000." },
    fecha: "2026-10-12",
    entrada: { salario: 12000, inicio: "2024-01-01", corte: "2026-12-31" },
    esperado: { faltante: 1000, meses: 12, regalia: 12000 },
  },
  {
    nombre: "Fecha de cálculo anterior al ingreso",
    origen: { tipo: "recalculado", detalle: "Entrada imposible." },
    fecha: "2026-10-12",
    entrada: { salario: 15000, inicio: "2026-05-01", corte: "2026-04-01" },
    esperaError: true,
  },
]);
