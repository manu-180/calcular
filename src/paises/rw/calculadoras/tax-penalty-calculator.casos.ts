import { definirCasos } from "@/motor/calculo";
import calculadora from "./tax-penalty-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "RWF 1,000,000 not declared, paid 45 days late",
    origen: { tipo: "recalculado", detalle: "Fine 40% (31 to 60 days) = 400,000. Two started months at 0.5% = 10,000. Total 1,410,000." },
    fecha: "2026-10-26",
    entrada: { impuesto: 1000000, tipo: "national", declarado: false, dias: 45 },
    esperado: { multa: 400000, interes: 10000, total: 1410000, meses: 2 },
  },
  {
    nombre: "RWF 1,000,000 declared on time, paid 20 days late",
    origen: { tipo: "recalculado", detalle: "Fine 5% = 50,000. One month at 0.5% = 5,000. Total 1,055,000." },
    fecha: "2026-10-26",
    entrada: { impuesto: 1000000, tipo: "national", declarado: true, dias: 20 },
    esperado: { multa: 50000, interes: 5000, total: 1055000 },
  },
  {
    nombre: "RWF 1,000,000 not declared, 400 days late",
    origen: { tipo: "recalculado", detalle: "Fine 60% = 600,000. 14 started months, more than 12, so 1.5% a month: 210,000." },
    fecha: "2026-10-26",
    entrada: { impuesto: 1000000, tipo: "national", declarado: false, dias: 400 },
    esperado: { multa: 600000, interes: 210000, meses: 14, tasaMensual: 1.5 },
  },
  {
    nombre: "District tax of RWF 100,000 declared late, 45 days",
    origen: { tipo: "recalculado", detalle: "Fine 40% = 40,000. Interest 1.5% × 2 months = 3,000. Extra 10% = 10,000. Total 153,000." },
    fecha: "2026-10-26",
    entrada: { impuesto: 100000, tipo: "district", declarado: false, dias: 45 },
    esperado: { multa: 40000, interes: 3000, recargo: 10000, total: 153000 },
  },
  {
    nombre: "District tax of RWF 5,000,000 declared on time, paid 10 days late",
    origen: { tipo: "recalculado", detalle: "No declaration fine. Interest 1.5% = 75,000. Extra 10% capped at 100,000." },
    fecha: "2026-10-26",
    entrada: { impuesto: 5000000, tipo: "district", declarado: true, dias: 10 },
    esperado: { multa: 0, interes: 75000, recargo: 100000 },
  },
]);
