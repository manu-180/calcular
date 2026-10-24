import { definirCasos } from "@/motor/calculo";
import calculadora from "./nssf-midterm-access-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Aged 45 with 10 years and Ushs 40,000,000",
    origen: { tipo: "recalculado", url: "https://www.nssfug.org/benefits-products/benefits/benefits-midterm/", detalle: "45 or older and 10 years of contributions: up to 20% of 40,000,000 = 8,000,000." },
    fecha: "2026-10-24",
    entrada: { saldo: 40000000, edad: 45, anios: 10, discapacidad: false },
    esperado: { monto: 8000000, elegible: "Yes", share: 20, restante: 32000000 },
  },
  {
    nombre: "Member with a disability aged 41",
    origen: { tipo: "recalculado", detalle: "40 or older with a disability and 10 years: 50% of 20,000,000 = 10,000,000." },
    fecha: "2026-10-24",
    entrada: { saldo: 20000000, edad: 41, anios: 12, discapacidad: true },
    esperado: { monto: 10000000, elegible: "Yes", share: 50 },
  },
  {
    nombre: "Aged 44",
    origen: { tipo: "recalculado", detalle: "Below 45 without a disability: not eligible yet." },
    fecha: "2026-10-24",
    entrada: { saldo: 30000000, edad: 44, anios: 15, discapacidad: false },
    esperado: { monto: 0, elegible: "Not yet", restante: 30000000 },
  },
  {
    nombre: "Only 8 years of contributions",
    origen: { tipo: "recalculado", detalle: "10 years needed: not eligible yet." },
    fecha: "2026-10-24",
    entrada: { saldo: 30000000, edad: 50, anios: 8, discapacidad: false },
    esperado: { monto: 0, elegible: "Not yet" },
  },
]);
