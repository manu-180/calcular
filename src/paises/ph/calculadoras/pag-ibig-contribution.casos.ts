import { definirCasos } from "@/motor/calculo";
import calculadora from "./pag-ibig-contribution";

const DBM = "https://www.dbm.gov.ph/wp-content/uploads/Issuances/2024/Circular-Letter/CIRCULAR-LETTER-NO-2024-2-DATED-FEBRUARY-01-2024.pdf" as const;

export default definirCasos(calculadora, [
  {
    nombre: "Fund salary at the ₱10,000 maximum",
    origen: { tipo: "oficial", url: DBM, detalle: "Maximum fund salary P10,000; over P1,500 the rates are 2.0% employee and 2.0% employer: 200 each." },
    fecha: "2026-10-16",
    entrada: { sueldo: 25000 },
    esperado: { empleado: 200, empleador: 200, total: 400, base: 10000, anual: 4800 },
  },
  {
    nombre: "₱1,500 or less pays 1%",
    origen: { tipo: "oficial", url: DBM, detalle: "Fund salary of P1,500 and below: employee 1.0%, employer 2.0%. 1,500 × 1% = 15, × 2% = 30." },
    fecha: "2026-10-16",
    entrada: { sueldo: 1500 },
    esperado: { empleado: 15, empleador: 30, tasaEmpleado: 1 },
  },
  {
    nombre: "₱8,000 pays 2% each",
    origen: { tipo: "recalculado", detalle: "8,000 × 2% = 160 each." },
    fecha: "2026-10-16",
    entrada: { sueldo: 8000 },
    esperado: { empleado: 160, empleador: 160, total: 320 },
  },
  {
    nombre: "Zero compensation",
    origen: { tipo: "recalculado", detalle: "Not valid." },
    fecha: "2026-10-16",
    entrada: { sueldo: 0 },
    esperaError: true,
  },
]);
