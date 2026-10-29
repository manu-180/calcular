import { definirCasos } from "@/motor/calculo";
import calculadora from "./spk-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Salary of BND 400, lowest group",
    origen: { tipo: "oficial", url: "https://www.tap.com.bn/employers-responsibilities-contribution", detalle: "TAP example: 400 x 8.5% = 34.00, employer pays the minimum 57.50." },
    fecha: "2026-10-29",
    entrada: { sueldo: 400 },
    esperado: { empleado: 34, empleador: 57.5, total: 91.5 },
  },
  {
    nombre: "Salary of BND 1,000",
    origen: { tipo: "oficial", url: "https://www.tap.com.bn/employers-responsibilities-contribution", detalle: "TAP example: employee 1,000 x 8.5% = 85.00, employer 1,000 x 10.5% = 105.00." },
    fecha: "2026-10-29",
    entrada: { sueldo: 1000 },
    esperado: { empleado: 85, empleador: 105, total: 190 },
  },
  {
    nombre: "Salary of BND 2,500",
    origen: { tipo: "oficial", url: "https://www.tap.com.bn/employers-responsibilities-contribution", detalle: "TAP example: employee 212.50, employer 2,500 x 9.5% = 237.50." },
    fecha: "2026-10-29",
    entrada: { sueldo: 2500 },
    esperado: { empleado: 212.5, empleador: 237.5, total: 450 },
  },
  {
    nombre: "Salary of BND 3,000, no cap",
    origen: { tipo: "oficial", url: "https://www.tap.com.bn/employers-responsibilities-contribution", detalle: "TAP example: employee 255.00, employer 3,000 x 8.5% = 255.00." },
    fecha: "2026-10-29",
    entrada: { sueldo: 3000 },
    esperado: { empleado: 255, empleador: 255, total: 510, anual: 6120 },
  },
  {
    nombre: "Salary of BND 2,000",
    origen: { tipo: "recalculado", detalle: "Employee 2,000 x 8.5% = 170.00. Employer 2,000 x 9.5% = 190.00." },
    fecha: "2026-10-29",
    entrada: { sueldo: 2000 },
    esperado: { empleado: 170, empleador: 190, total: 360 },
  },
  {
    nombre: "Salary of BND 505 hits the employer minimum",
    origen: { tipo: "recalculado", detalle: "505 x 10.5% = 53.03, below the minimum, so the employer pays 57.50." },
    fecha: "2026-10-29",
    entrada: { sueldo: 505 },
    esperado: { empleado: 42.93, empleador: 57.5 },
  },
  {
    nombre: "No salary",
    origen: { tipo: "recalculado", detalle: "A salary of zero is rejected." },
    fecha: "2026-10-29",
    entrada: { sueldo: 0 },
    esperaError: true,
  },
]);
