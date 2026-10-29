import { definirCasos } from "@/motor/calculo";
import calculadora from "./employer-cost-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "BND 2,000 salary, citizen",
    origen: { tipo: "recalculado", detalle: "Employer SPK 2,000 x 9.5% = 190.00, so 2,190.00 a person." },
    fecha: "2026-10-29",
    entrada: { sueldo: 2000, ciudadano: true, empleados: 1 },
    esperado: { spk: 190, porPersona: 2190, mensual: 2190, anual: 26280, recargo: 9.5 },
  },
  {
    nombre: "Ten employees at BND 1,000",
    origen: { tipo: "oficial", url: "https://www.tap.com.bn/employers-responsibilities-contribution", detalle: "TAP example: 1,000 x 10.5% = 105.00 a person." },
    fecha: "2026-10-29",
    entrada: { sueldo: 1000, ciudadano: true, empleados: 10 },
    esperado: { spk: 105, porPersona: 1105, mensual: 11050 },
  },
  {
    nombre: "Foreign employee",
    origen: { tipo: "recalculado", detalle: "No SPK, so the cost is the salary." },
    fecha: "2026-10-29",
    entrada: { sueldo: 1500, ciudadano: false, empleados: 1 },
    esperado: { spk: 0, porPersona: 1500 },
  },
  {
    nombre: "BND 300 salary pays the fixed contribution",
    origen: { tipo: "oficial", url: "https://www.tap.com.bn/employers-responsibilities-contribution", detalle: "TAP: the lowest group is set at 57.50." },
    fecha: "2026-10-29",
    entrada: { sueldo: 300, ciudadano: true, empleados: 1 },
    esperado: { spk: 57.5, porPersona: 357.5 },
  },
]);
