import { definirCasos } from "@/motor/calculo";
import prestacionesLaborales from "./prestaciones-laborales";

export default definirCasos(prestacionesLaborales, [
  {
    nombre: "Desahucio después de 5 años y 6 meses, sin preaviso",
    origen: {
      tipo: "recalculado",
      detalle:
        "Del 1/3/2021 al 30/9/2026: 5 años, 6 meses y 29 días. Diario 40,000 ÷ 23.83 = 1,678.56. Preaviso 28 días (art. 76) = 46,999.68. Cesantía 5 × 23 + 13 por la fracción de más de 6 meses = 128 días (art. 80) = 214,855.68. Vacaciones de la fracción: más de 6 meses = 7 días (art. 180) = 11,749.92. Regalía: 9 meses de 2026, 40,000 × 9 ÷ 12 = 30,000. Total 303,605.28.",
    },
    fecha: "2026-10-07",
    entrada: { inicio: "2021-03-01", termino: "2026-09-30", salario: 40000, causa: "desahucio", preavisado: false, vacacionesPendientes: 0, tamano: "grande" },
    esperado: { diario: 1678.56, diasPreaviso: 28, preaviso: 46999.68, diasCesantia: 128, cesantia: 214855.68, diasVacaciones: 7, vacaciones: 11749.92, regalia: 30000, total: 303605.28 },
  },
  {
    nombre: "Despido injustificado con 2 años y 7 meses",
    origen: {
      tipo: "recalculado",
      detalle:
        "Del 10/1/2024 al 20/8/2026: 2 años, 7 meses y 10 días. Diario 50,000 ÷ 23.83 = 2,098.20. Preaviso 28 días = 58,749.60 (art. 95 lo manda aunque haya habido aviso). Cesantía 2 × 21 + 13 = 55 días = 115,401. Vacaciones 8 días = 16,785.60. Regalía 7 meses y 20 días = 7.6667 meses, 50,000 × 7.6667 ÷ 12 = 31,944.44. Total 222,880.64.",
    },
    fecha: "2026-10-07",
    entrada: { inicio: "2024-01-10", termino: "2026-08-20", salario: 50000, causa: "despido-injustificado", preavisado: true, vacacionesPendientes: 0, tamano: "mediana" },
    esperado: { diasPreaviso: 28, preaviso: 58749.6, diasCesantia: 55, cesantia: 115401, diasVacaciones: 8, vacaciones: 16785.6, regalia: 31944.44, total: 222880.64 },
  },
  {
    nombre: "Renuncia a los 8 meses",
    origen: {
      tipo: "recalculado",
      detalle:
        "Del 15/1/2026 al 20/9/2026: 8 meses y 5 días. Sin preaviso ni cesantía. Diario 25,000 ÷ 23.83 = 1,049.10. Vacaciones: más de 8 meses = 9 días = 9,441.90. Regalía: 8 meses y 6 días = 8.2 meses, 25,000 × 8.2 ÷ 12 = 17,083.33. Total 26,525.23.",
    },
    fecha: "2026-10-07",
    entrada: { inicio: "2026-01-15", termino: "2026-09-20", salario: 25000, causa: "renuncia", preavisado: false, vacacionesPendientes: 0, tamano: "pequena" },
    esperado: { preaviso: 0, cesantia: 0, diasVacaciones: 9, vacaciones: 9441.9, regalia: 17083.33, total: 26525.23 },
  },
  {
    nombre: "Desahucio con 2 meses y 28 días: no hay preaviso ni cesantía",
    origen: { tipo: "recalculado", detalle: "Menos de 3 meses (arts. 76 y 80). Solo la regalía: del 1/7 al 29/9 son 2.9667 meses, 30,000 × 2.9667 ÷ 12 = 7,416.67." },
    fecha: "2026-10-07",
    entrada: { inicio: "2026-07-01", termino: "2026-09-29", salario: 30000, causa: "desahucio", preavisado: false, vacacionesPendientes: 0, tamano: "grande" },
    esperado: { diasPreaviso: 0, diasCesantia: 0, vacaciones: 0, regalia: 7416.67, total: 7416.67 },
  },
  {
    nombre: "Desahucio con 3 meses justos",
    origen: {
      tipo: "recalculado",
      detalle: "Del 30/6 al 30/9: 3 meses. Preaviso 7 días y cesantía 6 días. Diario 30,000 ÷ 23.83 = 1,258.92. Preaviso 8,812.44; cesantía 7,553.52. Regalía 3.0333 meses = 7,583.33. Total 23,949.29.",
    },
    fecha: "2026-10-07",
    entrada: { inicio: "2026-06-30", termino: "2026-09-30", salario: 30000, causa: "desahucio", preavisado: false, vacacionesPendientes: 0, tamano: "grande" },
    esperado: { diasPreaviso: 7, preaviso: 8812.44, diasCesantia: 6, cesantia: 7553.52, regalia: 7583.33, total: 23949.29 },
  },
  {
    nombre: "Desahucio con preaviso dado y vacaciones vencidas",
    origen: {
      tipo: "recalculado",
      detalle: "Del 1/3/2025 al 1/9/2026: 1 año y 6 meses. Preaviso dado: 0. Cesantía 21 + 6 (fracción de 6 meses) = 27 días. Vacaciones: 6 días de la fracción más 14 vencidas = 20 días. Diario 30,000 ÷ 23.83 = 1,258.92.",
    },
    fecha: "2026-10-07",
    entrada: { inicio: "2025-03-01", termino: "2026-09-01", salario: 30000, causa: "desahucio", preavisado: true, vacacionesPendientes: 14, tamano: "grande" },
    esperado: { diasPreaviso: 0, diasCesantia: 27, cesantia: 33990.84, diasVacaciones: 20, vacaciones: 25178.4 },
  },
  {
    nombre: "Fecha de salida anterior a la de ingreso",
    origen: { tipo: "recalculado", detalle: "Entrada imposible." },
    fecha: "2026-10-07",
    entrada: { inicio: "2026-05-01", termino: "2026-04-01", salario: 30000, causa: "desahucio", preavisado: false, vacacionesPendientes: 0, tamano: "grande" },
    esperaError: true,
  },
]);
