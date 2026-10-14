import { definirCasos } from "@/motor/calculo";
import calculadora from "./take-home-pay";

export default definirCasos(calculadora, [
  {
    nombre: "€50,000 single, June 2026",
    origen: {
      tipo: "recalculado",
      detalle:
        "Tax 44,000 × 20% = 8,800 + 6,000 × 40% = 2,400, less credits 4,000 = 7,200. USC 60.06 + 333.76 + 21,300 × 3% = 639 = 1,032.82 (Revenue's own example). PRSI 50,000 / 52 = 961.54 × 4.2% = 40.38 a week × 52 = 2,099.76. Net 39,667.42.",
    },
    fecha: "2026-06-15",
    entrada: { salario: 50000, estado: "single", alquiler: 0, reducida: false },
    esperado: { impuesto: 7200, usc: 1032.82, prsi: 2099.76, anual: 39667.42, marginal: 40 },
  },
  {
    nombre: "€50,000 single after the October 2026 PRSI rise",
    origen: { tipo: "recalculado", detalle: "PRSI 961.54 × 4.35% = 41.83 a week × 52 = 2,175.16. Net 50,000 − 7,200 − 1,032.82 − 2,175.16 = 39,592.02." },
    fecha: "2026-10-14",
    entrada: { salario: 50000, estado: "single", alquiler: 0, reducida: false },
    esperado: { prsi: 2175.16, anual: 39592.02 },
  },
  {
    nombre: "€30,000 married, one income, renting",
    origen: {
      tipo: "recalculado",
      detalle:
        "Band 53,000: tax 6,000 less credits 4,000 + 2,000 = 0, so the Rent Tax Credit has nothing to reduce. USC 60.06 + 333.76 + 1,300 × 3% = 432.82. PRSI 576.92 × 4.2% = 24.23 × 52 = 1,259.96. Net 28,307.22.",
    },
    fecha: "2026-06-15",
    entrada: { salario: 30000, estado: "married-one-income", alquiler: 12000, reducida: false },
    esperado: { impuesto: 0, usc: 432.82, prsi: 1259.96, anual: 28307.22, marginal: 20 },
  },
  {
    nombre: "€18,000 single, below the PRSI threshold",
    origen: { tipo: "recalculado", detalle: "Tax 3,600 less credits 4,000 = 0. USC 60.06 + 5,988 × 2% = 119.76, total 179.82. Weekly pay 346.15 is under €352, so no PRSI. Net 17,820.18." },
    fecha: "2026-06-15",
    entrada: { salario: 18000, estado: "single", alquiler: 0, reducida: false },
    esperado: { impuesto: 0, usc: 179.82, prsi: 0, anual: 17820.18 },
  },
  {
    nombre: "€70,000 single with the Rent Tax Credit",
    origen: {
      tipo: "recalculado",
      detalle:
        "Tax 8,800 + 26,000 × 40% = 10,400, total 19,200 − 4,000 = 15,200, less rent credit min(15,000 × 20%, 1,000) = 14,200. USC 60.06 + 333.76 + 41,300 × 3% = 1,239 = 1,632.82. PRSI 1,346.15 × 4.2% = 56.54 × 52 = 2,940.08. Net 51,227.10.",
    },
    fecha: "2026-06-15",
    entrada: { salario: 70000, estado: "single", alquiler: 15000, reducida: false },
    esperado: { impuesto: 14200, usc: 1632.82, prsi: 2940.08, anual: 51227.1 },
  },
  {
    nombre: "€377 a week, inside the PRSI Credit band",
    origen: {
      tipo: "oficial",
      url: "https://assets.gov.ie/static/documents/cb168977/PRSI_C20260116_Contribution_Rates_and_User_Guide_-_SW_14_-_English_Version_-_January_2026_.pdf-web.pdf",
      detalle: "SW14 2026: on €377 a week PRSI at 4.2% is 15.83, the credit is 7.83 and the weekly charge 8.00. A year of it is 416. USC on 19,604 is 211.90 and no Income Tax. Net 18,976.10.",
    },
    fecha: "2026-06-15",
    entrada: { salario: 19604, estado: "single", alquiler: 0, reducida: false },
    esperado: { prsi: 416, usc: 211.9, impuesto: 0, anual: 18976.1 },
  },
  {
    nombre: "Zero salary",
    origen: { tipo: "recalculado", detalle: "A salary of 0 is not a valid input." },
    fecha: "2026-06-15",
    entrada: { salario: 0, estado: "single", alquiler: 0, reducida: false },
    esperaError: true,
  },
]);
