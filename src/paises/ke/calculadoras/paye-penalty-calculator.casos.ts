import { definirCasos } from "@/motor/calculo";
import calculadora from "./paye-penalty-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "KSh 50,000 paid two months late, return on time",
    origen: { tipo: "recalculado", url: "https://www.kra.go.ke/individual/filing-paying/types-of-taxes/paye", detalle: "Penalty 5% = 2,500. Interest 1% × 2 = 1,000. Total 3,500." },
    fecha: "2026-10-17",
    entrada: { impuesto: 50000, presentoTarde: false, pagoTarde: true, meses: 2 },
    esperado: { total: 3500, recargo: 2500, interes: 1000, presentacion: 0 },
  },
  {
    nombre: "Small amount filed late pays the KSh 10,000 minimum",
    origen: { tipo: "recalculado", detalle: "25% of 20,000 is 5,000, so the minimum of 10,000 applies." },
    fecha: "2026-10-17",
    entrada: { impuesto: 20000, presentoTarde: true, pagoTarde: false, meses: null },
    esperado: { presentacion: 10000, total: 10000 },
  },
  {
    nombre: "KSh 200,000 filed and paid one month late",
    origen: { tipo: "recalculado", detalle: "Filing 25% = 50,000. Payment 5% = 10,000. Interest 1% = 2,000. Total 62,000." },
    fecha: "2026-10-17",
    entrada: { impuesto: 200000, presentoTarde: true, pagoTarde: true, meses: 1 },
    esperado: { total: 62000, conImpuesto: 262000 },
  },
]);
