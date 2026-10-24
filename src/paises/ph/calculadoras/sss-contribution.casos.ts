import { definirCasos } from "@/motor/calculo";
import calculadora from "./sss-contribution";

const CIRCULAR = "https://www.sss.gov.ph/wp-content/uploads/2024/12/Cir-2024-006-Employers-scaled.jpg" as const;

export default definirCasos(calculadora, [
  {
    nombre: "Below ₱5,250",
    origen: { tipo: "oficial", url: CIRCULAR, detalle: "Row 'Below 5,250': MSC 5,000, ER 500 + EC 10 = 510, EE 250, total 760." },
    fecha: "2026-10-16",
    entrada: { sueldo: 4000 },
    esperado: { credito: 5000, empleador: 510, empleado: 250, total: 760, ec: 10 },
  },
  {
    nombre: "₱14,750 is the first row with EC of ₱30",
    origen: { tipo: "oficial", url: CIRCULAR, detalle: "Row 14,750 to 15,249.99: MSC 15,000, ER 1,500 + 30 = 1,530, EE 750, total 2,280." },
    fecha: "2026-10-16",
    entrada: { sueldo: 14750 },
    esperado: { credito: 15000, empleador: 1530, empleado: 750, total: 2280 },
  },
  {
    nombre: "₱14,749.99 still pays EC of ₱10",
    origen: { tipo: "oficial", url: CIRCULAR, detalle: "Row 14,250 to 14,749.99: MSC 14,500, ER 1,450 + 10 = 1,460, EE 725, total 2,185." },
    fecha: "2026-10-16",
    entrada: { sueldo: 14749.99 },
    esperado: { credito: 14500, empleador: 1460, empleado: 725, total: 2185 },
  },
  {
    nombre: "₱25,000 with MPF",
    origen: { tipo: "oficial", url: CIRCULAR, detalle: "Row 24,750 to 25,249.99: MSC 20,000 + MPF 5,000. ER 2,000 + 500 + 30 = 2,530, EE 1,000 + 250 = 1,250, total 3,780." },
    fecha: "2026-10-16",
    entrada: { sueldo: 25000 },
    esperado: { credito: 25000, regular: 20000, mpf: 5000, empleador: 2530, empleado: 1250, total: 3780, empleadoMpf: 250 },
  },
  {
    nombre: "Top bracket",
    origen: { tipo: "oficial", url: CIRCULAR, detalle: "Row 34,750 and over: MSC 35,000. ER 3,530, EE 1,750, total 5,280." },
    fecha: "2026-10-16",
    entrada: { sueldo: 80000 },
    esperado: { credito: 35000, empleador: 3530, empleado: 1750, total: 5280 },
  },
  {
    nombre: "Zero compensation",
    origen: { tipo: "recalculado", detalle: "Not valid." },
    fecha: "2026-10-16",
    entrada: { sueldo: 0 },
    esperaError: true,
  },
]);
