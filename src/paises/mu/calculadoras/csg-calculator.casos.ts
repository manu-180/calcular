import { definirCasos } from "@/motor/calculo";
import calculadora from "./csg-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Rs 25,000 basic wage",
    origen: {
      tipo: "recalculado",
      url: "https://www.mra.mu/index.php/employers/npf-nsf-contributions",
      detalle: "CSG 1.5% = 375 and 3% = 750. NSF 1% = 250 and 2.5% = 625. Employee 625, employer 1,375.",
    },
    fecha: "2026-10-24",
    entrada: { basico: 25000 },
    esperado: { empleado: 625, csgEmpleado: 375, nsfEmpleado: 250, empleador: 1375, total: 2000 },
  },
  {
    nombre: "Rs 50,000 is still at the lower CSG rates",
    origen: { tipo: "recalculado", detalle: "CSG 1.5% × 50,000 = 750 and 3% = 1,500. NSF on 29,710: 297.10 and 742.75." },
    fecha: "2026-10-24",
    entrada: { basico: 50000 },
    esperado: { csgEmpleado: 750, csgEmpleador: 1500, nsfEmpleado: 297.1, nsfEmpleador: 742.75, baseNsf: 29710 },
  },
  {
    nombre: "Rs 50,001 moves to 3% and 6%",
    origen: { tipo: "recalculado", detalle: "CSG 3% × 50,001 = 1,500.03 and 6% = 3,000.06." },
    fecha: "2026-10-24",
    entrada: { basico: 50001 },
    esperado: { csgEmpleado: 1500.03, csgEmpleador: 3000.06, tasaEmpleado: 3, tasaEmpleador: 6 },
  },
  {
    nombre: "Part-time wage below the NSF minimum",
    origen: { tipo: "recalculado", detalle: "NSF is worked out on the minimum of 4,580: 45.80 and 114.50. CSG 1.5% × 3,000 = 45." },
    fecha: "2026-10-24",
    entrada: { basico: 3000 },
    esperado: { nsfEmpleado: 45.8, nsfEmpleador: 114.5, csgEmpleado: 45, baseNsf: 4580 },
  },
]);
