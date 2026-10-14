import { definirCasos } from "@/motor/calculo";
import calculoFgts from "./calculo-fgts";

export default definirCasos(calculoFgts, [
  {
    nombre: "Um ano com salário de R$ 3.000",
    origen: { tipo: "recalculado", detalle: "8 % × 3000 = 240 por mês; 12 meses = 2880; 13º 240; terço de férias 8 % × 1000 = 80. Total 3200; multa 40 % = 1280." },
    fecha: "2026-10-14",
    entrada: { salario: 3000, meses: 12, aprendiz: false },
    esperado: { mensal: 240, salarios: 2880, decimo: 240, terco: 80, total: 3200, multa: 1280 },
  },
  {
    nombre: "Aprendiz com salário mínimo por seis meses",
    origen: { tipo: "recalculado", detalle: "Lei nº 8.036/1990, art. 15, § 7º: 2 %. 2 % × 1621 = 32,42; × 6 = 194,52; 13º 2 % × 810,50 = 16,21; terço 2 % × 270,17 = 5,40. Total 216,13." },
    fecha: "2026-10-14",
    entrada: { salario: 1621, meses: 6, aprendiz: true },
    esperado: { aliquota: 2, mensal: 32.42, salarios: 194.52, decimo: 16.21, terco: 5.4, total: 216.13 },
  },
]);
