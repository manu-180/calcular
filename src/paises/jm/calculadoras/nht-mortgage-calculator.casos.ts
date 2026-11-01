import { definirCasos } from "@/motor/calculo";
import calculadora from "./nht-mortgage-calculator";

const NHT = "https://www.nht.gov.jm/index.php/loans";

export default definirCasos(calculadora, [
  {
    nombre: "J$9,000,000 over 30 years on J$45,000 a week",
    origen: { tipo: "recalculado", url: NHT, detalle: "Band $42,001 to $100,000.99: 4%. Payment 9,000,000 × 0.003333 / (1 − 1.003333^−360) = 42,967.38." },
    fecha: "2026-10-24",
    entrada: { prestamo: 9000000, ingreso: 45000, anios: 30 },
    esperado: { tasa: 4, cuota: 42967.38, total: 15468256.8, intereses: 6468256.8 },
  },
  {
    nombre: "Minimum wage band at 0%",
    origen: { tipo: "recalculado", url: NHT, detalle: "Minimum wage to $30,000.99 a week: 0%. 9,000,000 / 360 = 25,000." },
    fecha: "2026-10-24",
    entrada: { prestamo: 9000000, ingreso: 25000, anios: 30 },
    esperado: { tasa: 0, cuota: 25000, intereses: 0 },
  },
  {
    nombre: "J$35,000 a week at 2%",
    origen: { tipo: "recalculado", url: NHT, detalle: "$30,001 to $42,000.99: 2%. 5,000,000 over 25 years = 21,192.72." },
    fecha: "2026-10-24",
    entrada: { prestamo: 5000000, ingreso: 35000, anios: 25 },
    esperado: { tasa: 2, cuota: 21192.72 },
  },
  {
    nombre: "J$150,000 a week at 5%",
    origen: { tipo: "recalculado", url: NHT, detalle: "$100,001 and above: 5%. 12,000,000 over 40 years = 57,863.59." },
    fecha: "2026-10-24",
    entrada: { prestamo: 12000000, ingreso: 150000, anios: 40 },
    esperado: { tasa: 5, cuota: 57863.59 },
  },
  {
    nombre: "45 years is too long",
    origen: { tipo: "recalculado", detalle: "Up to 40 years to repay." },
    fecha: "2026-10-24",
    entrada: { prestamo: 5000000, ingreso: 35000, anios: 45 },
    esperaError: true,
  },
]);
