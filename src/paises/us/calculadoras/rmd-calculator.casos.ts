import { definirCasos } from "@/motor/calculo";
import calculadora from "./rmd-calculator";

const P = "https://www.irs.gov/pub/irs-pdf/p590b.pdf" as const;

export default definirCasos(calculadora, [
  {
    nombre: "Age 75 with $500,000",
    origen: { tipo: "recalculado", url: P, detalle: "Table III: 24.6 at age 75. 500000 / 24.6 = 20325.20." },
    fecha: "2026-10-14",
    entrada: { edad: 75, saldo: 500000 },
    esperado: { factor: 24.6, rmd: 20325.2, porMes: 1693.77, porcentajeSaldo: 4.07 },
  },
  {
    nombre: "First RMD at 73",
    origen: { tipo: "recalculado", url: P, detalle: "26.5 at age 73. 100000 / 26.5 = 3773.58." },
    fecha: "2026-10-14",
    entrada: { edad: 73, saldo: 100000 },
    esperado: { factor: 26.5, rmd: 3773.58 },
  },
  {
    nombre: "Too young for an RMD",
    origen: { tipo: "recalculado", url: P, detalle: "RMDs start at 73." },
    fecha: "2026-10-14",
    entrada: { edad: 72, saldo: 100000 },
    esperado: { factor: null, rmd: 0 },
  },
  {
    nombre: "Over 120 uses the last row",
    origen: { tipo: "recalculado", url: P, detalle: "120 and over: 2.0. 10000 / 2 = 5000." },
    fecha: "2026-10-14",
    entrada: { edad: 122, saldo: 10000 },
    esperado: { factor: 2, rmd: 5000 },
  },
]);
