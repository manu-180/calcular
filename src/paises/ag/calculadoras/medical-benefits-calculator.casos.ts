import { definirCasos } from "@/motor/calculo";
import calculadora from "./medical-benefits-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Employee under 60 on EC$4,000",
    origen: { tipo: "recalculado", url: "https://laws.gov.ag/wp-content/uploads/2020/07/No.-27-of-2011-Medical-benefits-Regulations-2011.pdf", detalle: "Regulation 17: 3.5% each. 4,000 x 3.5% = 140 for the employee and 140 for the employer. Total 280." },
    fecha: "2026-10-29",
    entrada: { bruto: 4000, edad: "under60" },
    esperado: { empleado: 140, empleador: 140, total: 280 },
  },
  {
    nombre: "Employee aged 60 to 69 on EC$4,000",
    origen: { tipo: "recalculado", detalle: "Regulation 17(3): 2.5%. 4,000 x 2.5% = 100. No employer share under 17(1)." },
    fecha: "2026-10-29",
    entrada: { bruto: 4000, edad: "60to69" },
    esperado: { empleado: 100, empleador: 0, total: 100 },
  },
  {
    nombre: "Higher pay is not capped",
    origen: { tipo: "recalculado", detalle: "9,000 x 3.5% = 315 for each side. Regulation 17 sets no ceiling." },
    fecha: "2026-10-29",
    entrada: { bruto: 9000, edad: "under60" },
    esperado: { empleado: 315, empleador: 315 },
  },
]);
