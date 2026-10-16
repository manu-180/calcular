import { definirCasos } from "@/motor/calculo";
import calculadora from "./small-business-corporation-tax";

export default definirCasos(calculadora, [
  {
    nombre: "R400 000 taxable income",
    origen: { tipo: "recalculado", detalle: "18 620 + 21% × (400 000 − 365 000) = 25 970. At 27% it would be 108 000, so 82 030 less." },
    fecha: "2026-10-14",
    entrada: { renta: 400000 },
    esperado: { impuesto: 25970, ahorro: 82030 },
  },
  {
    nombre: "R1 000 000 taxable income",
    origen: { tipo: "recalculado", detalle: "57 470 + 27% × (1 000 000 − 550 000) = 178 970." },
    fecha: "2026-10-14",
    entrada: { renta: 1000000 },
    esperado: { impuesto: 178970 },
  },
  {
    nombre: "R90 000 taxable income",
    origen: { tipo: "recalculado", detalle: "0% up to 99 000." },
    fecha: "2026-10-14",
    entrada: { renta: 90000 },
    esperado: { impuesto: 0 },
  },
]);
