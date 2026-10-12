import { definirCasos } from "@/motor/calculo";
import jubilacion from "./jubilacion";

export default definirCasos(jubilacion, [
  {
    nombre: "Nacido en 1980, 65 años y 30 de servicio",
    origen: {
      tipo: "recalculado",
      url: "https://www.impo.com.uy/bases/leyes/20130-2023/46",
      detalle: "Ley 20.130, art. 46: 1,5 % por año a la edad normal. 30 × 1,5 = 45 % de 60.000 = 27.000.",
    },
    fecha: "2026-10-12",
    entrada: { nacimiento: 1980, edad: 65, anios: 30, sbj: 60000 },
    esperado: { edadMinima: 65, tasa: 1.5, reemplazo: 45, jubilacion: 27000 },
  },
  {
    nombre: "Retiro a los 70 con 35 años",
    origen: { tipo: "recalculado", detalle: "Tabla del art. 46 B: 70 años, 1,96 %. 35 × 1,96 = 68,6 % de 60.000 = 41.160." },
    fecha: "2026-10-12",
    entrada: { nacimiento: 1980, edad: 70, anios: 35, sbj: 60000 },
    esperado: { tasa: 1.96, reemplazo: 68.6, jubilacion: 41160 },
  },
  {
    nombre: "Nacido en 1975, retiro a los 63 (edad normal)",
    origen: { tipo: "recalculado", detalle: "Edad normal 63 (art. 35 A). La tabla da 1,37 % a los 63, menor que 1,5 %: se usa 1,5 %. 32 × 1,5 = 48 % de 80.000 = 38.400." },
    fecha: "2026-10-12",
    entrada: { nacimiento: 1975, edad: 63, anios: 32, sbj: 80000 },
    esperado: { edadMinima: 63, tasa: 1.5, reemplazo: 48, jubilacion: 38400 },
  },
  {
    nombre: "Antes de la edad mínima",
    origen: { tipo: "recalculado", detalle: "Con 30 años y nacido en 1980 la edad mínima es 65: a los 63 no hay causal." },
    fecha: "2026-10-12",
    entrada: { nacimiento: 1980, edad: 63, anios: 30, sbj: 60000 },
    esperaError: true,
  },
]);
