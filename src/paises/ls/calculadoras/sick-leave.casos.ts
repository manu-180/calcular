import { definirCasos } from "@/motor/calculo";
import calculadora from "./sick-leave";

export default definirCasos(calculadora, [
  {
    nombre: "Two years of service, 20 days off sick",
    origen: { tipo: "recalculado", detalle: "s. 190(3): 12 days full pay and 24 at half pay. Day's pay 276.92. 12 × 276.92 + 8 × 138.46 = 3 323.04 + 1 107.68 = 4 430.72." },
    fecha: "2026-10-27",
    entrada: { salario: 6000, semana: "five-day", meses: 24, dias: 20 },
    esperado: { completos: 12, medios: 24, usadosCompletos: 12, usadosMedios: 8, sinPago: 0, pago: 4430.72 },
  },
  {
    nombre: "Eight months of service, 15 days off",
    origen: { tipo: "recalculado", detalle: "s. 190(2): 12 days full pay in months 7 to 12. 12 × 276.92 = 3 323.04, 3 days unpaid." },
    fecha: "2026-10-27",
    entrada: { salario: 6000, semana: "five-day", meses: 8, dias: 15 },
    esperado: { completos: 12, medios: 0, sinPago: 3, pago: 3323.04 },
  },
  {
    nombre: "First six months",
    origen: { tipo: "recalculado", detalle: "s. 190(1): no sick pay in the first six months." },
    fecha: "2026-10-27",
    entrada: { salario: 6000, semana: "five-day", meses: 3, dias: 2 },
    esperado: { completos: 0, sinPago: 2, pago: 0 },
  },
]);
