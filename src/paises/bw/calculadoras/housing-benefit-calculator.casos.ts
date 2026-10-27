import { definirCasos } from "@/motor/calculo";
import calculadora from "./housing-benefit-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "House rented by the employer at P6 000, income P300 000",
    origen: {
      tipo: "recalculado",
      detalle: "Regulation 18: value = rent 72 000 a year. Cap 27.5% × 300 000 = 82 500, so 72 000 is taxed. Tax(372 000) − tax(300 000) = 67 050 − 49 050 = 18 000; 1 500 a month.",
    },
    fecha: "2026-10-27",
    entrada: { tipo: "leased", alquiler: 6000, valorFiscal: null, superficie: null, ingreso: 300000, pago: 0 },
    esperado: { valor: 72000, tope: 82500, beneficioAnual: 72000, beneficio: 6000, payeExtraAnual: 18000, payeExtra: 1500 },
  },
  {
    nombre: "Cap applies on a lower income",
    origen: {
      tipo: "recalculado",
      detalle: "Rent 72 000, income 200 000: cap 27.5% × 200 000 = 55 000, less 12 000 paid by the employee = 43 000. Tax(243 000) − tax(200 000) = 34 800 − 24 050 = 10 750.",
    },
    fecha: "2026-10-27",
    entrada: { tipo: "leased", alquiler: 6000, valorFiscal: null, superficie: null, ingreso: 200000, pago: 1000 },
    esperado: { tope: 43000, beneficioAnual: 43000, payeExtraAnual: 10750 },
  },
  {
    nombre: "Employer-owned house with rateable value P800 000",
    origen: { tipo: "recalculado", detalle: "Regulation 19: 10% × 800 000 = 80 000 a year, under the cap of 82 500 on P300 000." },
    fecha: "2026-10-27",
    entrada: { tipo: "rateable", alquiler: null, valorFiscal: 800000, superficie: null, ingreso: 300000, pago: 0 },
    esperado: { valor: 80000, beneficioAnual: 80000 },
  },
  {
    nombre: "Employer-owned house of 120 m² without rateable value",
    origen: { tipo: "recalculado", detalle: "Regulation 20: 120 × 2 500 = 300 000 capital valuation; 8% = 24 000 a year." },
    fecha: "2026-10-27",
    entrada: { tipo: "not-rateable", alquiler: null, valorFiscal: null, superficie: 120, ingreso: 300000, pago: 0 },
    esperado: { valor: 24000, beneficio: 2000 },
  },
  {
    nombre: "Income of P50 000 uses the table percentage",
    origen: { tipo: "oficial", url: "https://www.burs.org.bw/images/Tax%20Table_2026.pdf", detalle: "Housing Benefit Table: income 50 000, housing benefit 3 000.00 (6%)." },
    fecha: "2026-10-27",
    entrada: { tipo: "leased", alquiler: 6000, valorFiscal: null, superficie: null, ingreso: 50000, pago: 0 },
    esperado: { tope: 3000, beneficioAnual: 3000 },
  },
  {
    nombre: "Income of P58 600, top of the table",
    origen: { tipo: "oficial", url: "https://www.burs.org.bw/images/Tax%20Table_2026.pdf", detalle: "Housing Benefit Table: income 58 600, housing benefit 16 115.00 (27.5%)." },
    fecha: "2026-10-27",
    entrada: { tipo: "leased", alquiler: 6000, valorFiscal: null, superficie: null, ingreso: 58600, pago: 0 },
    esperado: { tope: 16115 },
  },
  {
    nombre: "No income",
    origen: { tipo: "recalculado", detalle: "Not valid." },
    fecha: "2026-10-27",
    entrada: { tipo: "leased", alquiler: 6000, valorFiscal: null, superficie: null, ingreso: 0, pago: 0 },
    esperaError: true,
  },
]);
