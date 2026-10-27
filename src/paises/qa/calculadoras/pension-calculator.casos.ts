import { definirCasos } from "@/motor/calculo";
import calculadora from "./pension-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Man resigning at 52 with 27 years",
    origen: { tipo: "recalculado", detalle: "Law 1/2022 art. 34: 30,000 × 27 ÷ 30 = 27,000. Art. 36: (60 - 52) × 2.5% = 20%. 27,000 × 0.8 = 21,600." },
    fecha: "2026-10-26",
    entrada: { salario: 30000, anios: 27, edad: 52, motivo: "renuncia", sexo: "hombre" },
    esperado: { bruta: 27000, reduccion: 20, pension: 21600, desde: 52 },
  },
  {
    nombre: "Woman resigning at 52 with 27 years",
    origen: { tipo: "recalculado", detalle: "Reference age 55: (55 - 52) × 2.5% = 7.5%. 27,000 × 0.925 = 24,975." },
    fecha: "2026-10-26",
    entrada: { salario: 30000, anios: 27, edad: 52, motivo: "renuncia", sexo: "mujer" },
    esperado: { reduccion: 7.5, pension: 24975 },
  },
  {
    nombre: "Retirement at 60 with 35 years is capped at the salary",
    origen: { tipo: "recalculado", detalle: "40,000 × 35 ÷ 30 = 46,666 capped at 40,000. No reduction." },
    fecha: "2026-10-26",
    entrada: { salario: 40000, anios: 35, edad: 60, motivo: "edad", sexo: "hombre" },
    esperado: { bruta: 40000, pension: 40000, reduccion: 0 },
  },
  {
    nombre: "Resigning at 47 starts paying at 50",
    origen: { tipo: "recalculado", detalle: "25,000 × 26 ÷ 30 = 21,666.67. (60 - 47) × 2.5% = 32.5%. 21,666.67 × 0.675 = 14,625. From age 50." },
    fecha: "2026-10-26",
    entrada: { salario: 25000, anios: 26, edad: 47, motivo: "renuncia", sexo: "hombre" },
    esperado: { bruta: 21666.67, reduccion: 32.5, pension: 14625, desde: 50 },
  },
  {
    nombre: "Not enough years",
    origen: { tipo: "recalculado", detalle: "20 years < 25: no pension." },
    fecha: "2026-10-26",
    entrada: { salario: 25000, anios: 20, edad: 60, motivo: "edad", sexo: "hombre" },
    esperado: { pension: 0 },
  },
]);
