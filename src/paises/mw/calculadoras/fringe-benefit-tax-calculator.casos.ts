import { definirCasos } from "@/motor/calculo";
import calculadora from "./fringe-benefit-tax-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Car that cost K30,000,000",
    origen: { tipo: "recalculado", detalle: "Taxable value 15% of 30,000,000 = 4,500,000. FBT 30% = 1,350,000; 337,500 a quarter." },
    fecha: "2026-10-27",
    entrada: { beneficio: "vehicle", monto: 30000000, salario: null, amueblada: null },
    esperado: { valorImponible: 4500000, fbt: 1350000, trimestral: 337500 },
  },
  {
    nombre: "School fees of K2,000,000 paid to the school",
    origen: { tipo: "recalculado", detalle: "Taxable value 50% = 1,000,000. FBT 300,000." },
    fecha: "2026-10-27",
    entrada: { beneficio: "school-direct", monto: 2000000, salario: null, amueblada: null },
    esperado: { valorImponible: 1000000, fbt: 300000 },
  },
  {
    nombre: "School fees of K2,000,000 paid to the employee",
    origen: { tipo: "recalculado", detalle: "The whole amount is the taxable value. FBT 600,000." },
    fecha: "2026-10-27",
    entrada: { beneficio: "school-employee", monto: 2000000, salario: null, amueblada: null },
    esperado: { valorImponible: 2000000, fbt: 600000 },
  },
  {
    nombre: "Owned unfurnished house, rent K1,000,000, salary K12,000,000",
    origen: { tipo: "recalculado", detalle: "Greater of 1,000,000 and 10% × 12,000,000 = 1,200,000. 50% of it = 600,000. FBT 180,000." },
    fecha: "2026-10-27",
    entrada: { beneficio: "house-owned", monto: 1000000, salario: 12000000, amueblada: false },
    esperado: { valorImponible: 600000, fbt: 180000 },
  },
  {
    nombre: "Rented furnished house, rent K2,400,000, salary K12,000,000",
    origen: { tipo: "recalculado", detalle: "Greater of 2,400,000 and 12% × 12,000,000 = 1,440,000 is 2,400,000. FBT 720,000." },
    fecha: "2026-10-27",
    entrada: { beneficio: "house-rented", monto: 2400000, salario: 12000000, amueblada: true },
    esperado: { valorImponible: 2400000, fbt: 720000 },
  },
  {
    nombre: "Zero cost is rejected",
    origen: { tipo: "recalculado", detalle: "The cost has to be above zero." },
    fecha: "2026-10-27",
    entrada: { beneficio: "other", monto: 0, salario: null, amueblada: null },
    esperaError: true,
  },
]);
