import { definirCasos } from "@/motor/calculo";
import salarioMinimo from "./salario-minimo";

const ACUERDO = "https://tsc.gob.hn/web/leyes/Acuerdo-SETRASS-233-2026.pdf";

export default definirCasos(salarioMinimo, [
  {
    nombre: "Agricultura con 1 a 10 trabajadores, 2026",
    origen: { tipo: "oficial", url: ACUERDO, detalle: "Acuerdo SETRASS-233-2026, tabla 2026, rama 1, de 1 a 10: 9,596.64 al mes, 319.89 por jornada y 39.99 por hora." },
    fecha: "2026-10-07",
    entrada: { rama: "agricultura", tamano: "1-10", sueldo: null },
    esperado: { mensual: 9596.64, diario: 319.89, hora: 39.99, diferencia: null },
  },
  {
    nombre: "Financieras con 151 o más trabajadores, 2026, y un salario por debajo",
    origen: { tipo: "oficial", url: ACUERDO, detalle: "Tabla 2026, rama 9, de 151 en adelante: 19,298.72, 643.29 y 80.41. 19000 menos 19298.72 = menos 298.72." },
    fecha: "2026-10-07",
    entrada: { rama: "financieros", tamano: "151-mas", sueldo: 19000 },
    esperado: { mensual: 19298.72, diario: 643.29, hora: 80.41, diferencia: -298.72 },
  },
  {
    nombre: "Último día de 2026: hospitales de 51 a 150",
    origen: { tipo: "oficial", url: ACUERDO, detalle: "Tabla 2026, rama 11, de 51 a 150: 15,979.13, 532.64 y 66.58." },
    fecha: "2026-12-31",
    entrada: { rama: "hospitales", tamano: "51-150", sueldo: null },
    esperado: { mensual: 15979.13, diario: 532.64, hora: 66.58 },
  },
  {
    nombre: "Primer día de 2027: hospitales de 51 a 150",
    origen: { tipo: "oficial", url: ACUERDO, detalle: "Tabla vigente desde el 01/01/2027, rama 11, de 51 a 150: 17,097.67, 569.92 y 71.24." },
    fecha: "2027-01-01",
    entrada: { rama: "hospitales", tamano: "51-150", sueldo: null },
    esperado: { mensual: 17097.67, diario: 569.92, hora: 71.24 },
  },
  {
    nombre: "Minas de 11 a 50 en 2027",
    origen: { tipo: "oficial", url: ACUERDO, detalle: "Tabla 2027, rama 2, de 11 a 50: 14,338.86, 477.96 y 59.75." },
    fecha: "2027-03-01",
    entrada: { rama: "minas", tamano: "11-50", sueldo: 15000 },
    esperado: { mensual: 14338.86, diario: 477.96, hora: 59.75, diferencia: 661.14 },
  },
]);
