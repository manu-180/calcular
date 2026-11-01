import { definirCasos } from "@/motor/calculo";
import calculadora from "./maam";

export default definirCasos(calculadora, [
  {
    nombre: "Sumar 18 % a 1.000",
    origen: { tipo: "recalculado", detalle: "1.000 x 18 % = 180; total 1.180." },
    fecha: "2026-10-24",
    entrada: { peula: "lehosif", schum: 1000 },
    esperado: { maam: 180, lifnei: 1000, kolel: 1180, shiur: 18 },
  },
  {
    nombre: "Sacar el מע\"מ de 1.180",
    origen: { tipo: "recalculado", detalle: "1.180 / 1,18 = 1.000; מע\"מ 180." },
    fecha: "2026-10-24",
    entrada: { peula: "lehotzi", schum: 1180 },
    esperado: { maam: 180, lifnei: 1000, kolel: 1180 },
  },
  {
    nombre: "La fórmula con la tasa anterior (17 %)",
    origen: { tipo: "recalculado", detalle: "Solo hay tramo desde el 1.1.2025: el caso pisa la tasa con 17 para probar la fórmula. 100 x 17 % = 17." },
    fecha: "2026-10-24",
    entrada: { peula: "lehosif", schum: 100 },
    valores: { "il.maam": 17 },
    esperado: { maam: 17, kolel: 117 },
  },
  {
    nombre: "Sacar el מע\"מ de 99,99",
    origen: { tipo: "recalculado", detalle: "99,99 / 1,18 = 84,737 -> 84,74; מע\"מ 15,25." },
    fecha: "2026-10-24",
    entrada: { peula: "lehotzi", schum: 99.99 },
    esperado: { lifnei: 84.74, maam: 15.25 },
  },
  {
    nombre: "Monto cero",
    origen: { tipo: "recalculado", detalle: "Monto 0." },
    fecha: "2026-10-24",
    entrada: { peula: "lehosif", schum: 0 },
    esperaError: true,
  },
]);
