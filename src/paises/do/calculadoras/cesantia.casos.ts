import { definirCasos } from "@/motor/calculo";
import cesantia from "./cesantia";

export default definirCasos(cesantia, [
  {
    nombre: "Desahucio después de 5 años y 6 meses",
    origen: { tipo: "recalculado", detalle: "Del 1/3/2021 al 30/9/2026: 5 años, 6 meses y 29 días. Art. 80: 5 × 23 días + 13 por la fracción de más de 6 meses = 128 días. Diario 40,000 ÷ 23.83 = 1,678.56. Cesantía 1,678.56 × 128 = 214,855.68." },
    fecha: "2026-10-12",
    entrada: { inicio: "2021-03-01", termino: "2026-09-30", salario: 40000 },
    esperado: { diario: 1678.56, dias: 128, cesantia: 214855.68 },
  },
  {
    nombre: "2 años y 7 meses",
    origen: { tipo: "recalculado", detalle: "Del 10/1/2024 al 20/8/2026: 2 × 21 + 13 = 55 días. Diario 50,000 ÷ 23.83 = 2,098.20. Cesantía 115,401." },
    fecha: "2026-10-12",
    entrada: { inicio: "2024-01-10", termino: "2026-08-20", salario: 50000 },
    esperado: { dias: 55, cesantia: 115401 },
  },
  {
    nombre: "3 meses justos: 6 días",
    origen: { tipo: "recalculado", detalle: "Del 30/6 al 30/9/2026: 3 meses. Art. 80 ordinal 1: 6 días. Diario 30,000 ÷ 23.83 = 1,258.92. Cesantía 7,553.52." },
    fecha: "2026-10-12",
    entrada: { inicio: "2026-06-30", termino: "2026-09-30", salario: 30000 },
    esperado: { dias: 6, cesantia: 7553.52 },
  },
  {
    nombre: "Menos de 3 meses: no hay cesantía",
    origen: { tipo: "recalculado", detalle: "Del 1/7 al 29/9/2026: 2 meses y 28 días. Art. 80: hace falta un trabajo continuo no menor de 3 meses." },
    fecha: "2026-10-12",
    entrada: { inicio: "2026-07-01", termino: "2026-09-29", salario: 30000 },
    esperado: { dias: 0, cesantia: 0 },
  },
  {
    nombre: "Fecha de salida anterior al ingreso",
    origen: { tipo: "recalculado", detalle: "Entrada imposible." },
    fecha: "2026-10-12",
    entrada: { inicio: "2026-05-01", termino: "2026-04-01", salario: 30000 },
    esperaError: true,
  },
]);
