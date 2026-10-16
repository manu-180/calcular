import { definirCasos } from "@/motor/calculo";
import calculadora from "./cpf-contribution-calculator";

const TABLA = "https://www.cpf.gov.sg/service/sfc/servlet.shepherd/document/download/069IW00000DuRCiYAN";

export default definirCasos(calculadora, [
  {
    nombre: "$4,500 at age 40",
    origen: { tipo: "recalculado", url: TABLA, detalle: "37% × 4,500 = 1,665 total; 20% × 4,500 = 900 employee; employer 765." },
    fecha: "2026-10-14",
    entrada: { salario: 4500, edad: "55-y-menos" },
    esperado: { total: 1665, empleado: 900, empleador: 765 },
  },
  {
    nombre: "Maximum at age 62",
    origen: { tipo: "recalculado", url: TABLA, detalle: "Above 60 to 65: total 25% of 8,000 = max 2,000; employee 12.5% = max 1,000; employer 1,000." },
    fecha: "2026-10-14",
    entrada: { salario: 12000, edad: "60-65" },
    esperado: { total: 2000, empleado: 1000, empleador: 1000 },
  },
  {
    nombre: "Rounding at $3,333 age 67",
    origen: { tipo: "recalculado", url: TABLA, detalle: "16.5% × 3,333 = 549.945 rounds to 550 total; 7.5% × 3,333 = 249.975 rounds down to 249; employer 301." },
    fecha: "2026-10-14",
    entrada: { salario: 3333, edad: "65-70" },
    esperado: { total: 550, empleado: 249, empleador: 301 },
  },
  {
    nombre: "$700 above 70",
    origen: { tipo: "recalculado", url: TABLA, detalle: "7.5% × 700 + 0.15 × 200 = 52.5 + 30 = 82.5, rounds to 83; employee 0.15 × 200 = 30; employer 53." },
    fecha: "2026-10-14",
    entrada: { salario: 700, edad: "mas-70" },
    esperado: { total: 83, empleado: 30, empleador: 53 },
  },
  {
    nombre: "$400 employer only",
    origen: { tipo: "recalculado", url: TABLA, detalle: "Above $50 to $500: 17% × 400 = 68 total, employee nil." },
    fecha: "2026-10-14",
    entrada: { salario: 400, edad: "55-y-menos" },
    esperado: { total: 68, empleado: 0, empleador: 68 },
  },
  {
    nombre: "$50 has no CPF",
    origen: { tipo: "recalculado", url: TABLA, detalle: "$50 or less: nil." },
    fecha: "2026-10-14",
    entrada: { salario: 50, edad: "55-y-menos" },
    esperado: { total: 0, empleado: 0, empleador: 0 },
  },
]);
