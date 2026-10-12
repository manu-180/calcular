import { definirCasos } from "@/motor/calculo";
import sueldoPorHora from "./sueldo-por-hora";

export default definirCasos(sueldoPorHora, [
  {
    nombre: "Sueldo de 960",
    origen: { tipo: "recalculado", detalle: "Art. 47 y 53 del Código del Trabajo: día 960 / 30 = 32; hora 32 / 8 = 4; semana 4 × 40 = 160. Hora del básico 482 / 240 = 2,01." },
    fecha: "2026-10-07",
    entrada: { sueldo: 960 },
    esperado: { dia: 32, hora: 4, semana: 160, horaBasico: 2.01 },
  },
  {
    nombre: "Salario básico 2026",
    origen: { tipo: "recalculado", detalle: "482 / 30 = 16,07 por día; / 8 = 2,01 por hora; × 40 = 80,33 por semana." },
    fecha: "2026-10-07",
    entrada: { sueldo: 482 },
    esperado: { dia: 16.07, hora: 2.01, semana: 80.33 },
  },
]);
