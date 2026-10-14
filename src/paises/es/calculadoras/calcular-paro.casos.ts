import { definirCasos } from "@/motor/calculo";
import paro from "./calcular-paro";

const LGSS = "https://www.boe.es/buscar/act.php?id=BOE-A-2015-11724";

export default definirCasos(paro, [
  {
    nombre: "Base de 2.000 euros y 1.500 días, sin hijos: tope máximo",
    origen: { tipo: "recalculado", url: LGSS, detalle: "1.500 días: 480 de paro. 70 % de 2.000 = 1.400, limitado a 1.225. Después, 60 % = 1.200. Total 1.225 × 6 + 1.200 × 10 = 19.350." },
    fecha: "2026-10-14",
    entrada: { base: 2000, dias: 1500, hijos: "sin-hijos", jornada: 100 },
    esperado: { duracion: 480, meses: 16, primeros: 1225, despues: 1200, total: 19350 },
  },
  {
    nombre: "Base baja con un hijo: cuantía mínima",
    origen: { tipo: "recalculado", url: "https://www.sepe.es/HomeSepe/prestaciones-desempleo/Cuantias-anuales.html", detalle: "400 días: 120 de paro. 70 % de 700 = 490, sube al mínimo con hijos de 749. Total 749 × 4 = 2.996." },
    fecha: "2026-10-14",
    entrada: { base: 700, dias: 400, hijos: "un-hijo", jornada: 100 },
    esperado: { duracion: 120, primeros: 749, despues: null, total: 2996 },
  },
  {
    nombre: "Media jornada: topes a la mitad",
    origen: { tipo: "recalculado", detalle: "720 días: 240 de paro. 70 % de 1.000 = 700, tope 1.225 × 50 % = 612,50. Después 600. Total 612,50 × 6 + 600 × 2 = 4.875." },
    fecha: "2026-10-14",
    entrada: { base: 1000, dias: 720, hijos: "sin-hijos", jornada: 50 },
    esperado: { primeros: 612.5, despues: 600, total: 4875 },
  },
  {
    nombre: "Menos de 360 días cotizados",
    origen: { tipo: "recalculado", url: LGSS, detalle: "No hay derecho a la prestación contributiva." },
    fecha: "2026-10-14",
    entrada: { base: 1500, dias: 300, hijos: "sin-hijos", jornada: 100 },
    esperaError: true,
  },
]);
