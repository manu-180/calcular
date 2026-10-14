import { definirCasos } from "@/motor/calculo";
import jubilacion from "./pension-jubilacion";

const LGSS = "https://www.boe.es/buscar/act.php?id=BOE-A-2015-11724";

export default definirCasos(jubilacion, [
  {
    nombre: "36 años y 6 meses: el 100 %",
    origen: { tipo: "recalculado", url: LGSS, detalle: "15 años: 50 %. 258 meses más: 49 × 0,21 + 209 × 0,19 = 50 %. Total 100 %. Con 438 meses (menos de 459) la edad ordinaria es 66 años y 10 meses." },
    fecha: "2026-10-14",
    entrada: { base: 2000, anios: 36, meses: 6 },
    esperado: { porcentaje: 100, pension: 2000, anual: 28000, edad: "66 años y 10 meses" },
  },
  {
    nombre: "25 años cotizados",
    origen: { tipo: "recalculado", url: LGSS, detalle: "120 meses más de 15 años: 49 × 0,21 + 71 × 0,19 = 23,78. Total 73,78 % de 1.500 = 1.106,70." },
    fecha: "2026-10-14",
    entrada: { base: 1500, anios: 25, meses: 0 },
    esperado: { porcentaje: 73.78, pension: 1106.7 },
  },
  {
    nombre: "Base alta: pensión máxima",
    origen: { tipo: "recalculado", url: "https://www.boe.es/diario_boe/txt.php?id=BOE-A-2026-6977", detalle: "40 años: 100 % de 4.000, limitado a 3.359,60. 480 meses: jubilación a los 65." },
    fecha: "2026-10-14",
    entrada: { base: 4000, anios: 40, meses: 0 },
    esperado: { pension: 3359.6, edad: "65 años" },
  },
  {
    nombre: "Menos de 15 años",
    origen: { tipo: "recalculado", url: LGSS, detalle: "Sin el periodo mínimo no hay pensión contributiva." },
    fecha: "2026-10-14",
    entrada: { base: 1500, anios: 10, meses: 0 },
    esperaError: true,
  },
]);
