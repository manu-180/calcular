import { definirCasos } from "@/motor/calculo";
import horasExtra from "./horas-extra";

export default definirCasos(horasExtra, [
  {
    nombre: "Diez horas extra en 2026, jornada diurna",
    origen: {
      tipo: "recalculado",
      detalle: "Hora 400 / 8 = 50. Límite 2026: 9 dobles = 9 × 100 = 900. Una más al triple: 150. Total 1050 (LFT arts. 66 y 68, transitorio cuarto del DOF 1/05/2026).",
    },
    fecha: "2026-10-15",
    entrada: { sueldo: 400, periodo: "diario", jornada: "diurna", horas: 10 },
    esperado: { hora: 50, dobles: 9, triples: 1, pagoDobles: 900, pagoTriples: 150, total: 1050, jornadaSemanal: 48 },
  },
  {
    nombre: "Las mismas diez horas en 2028",
    origen: { tipo: "recalculado", detalle: "Límite 2028: 10 horas dobles. 10 × 100 = 1000, sin triples. Jornada máxima 44." },
    fecha: "2028-03-01",
    entrada: { sueldo: 400, periodo: "diario", jornada: "diurna", horas: 10 },
    esperado: { dobles: 10, triples: 0, total: 1000, jornadaSemanal: 44 },
  },
  {
    nombre: "Último día de 2027 y primero de 2028",
    origen: { tipo: "recalculado", detalle: "El 31/12/2027 el límite es 9: 9 dobles y 1 triple. Jornada máxima 46." },
    fecha: "2027-12-31",
    entrada: { sueldo: 400, periodo: "diario", jornada: "diurna", horas: 10 },
    esperado: { dobles: 9, triples: 1, total: 1050, jornadaSemanal: 46 },
  },
  {
    nombre: "Jornada nocturna",
    origen: { tipo: "recalculado", detalle: "Hora 350 / 7 = 50. Cinco horas dobles: 5 × 100 = 500." },
    fecha: "2026-10-15",
    entrada: { sueldo: 350, periodo: "diario", jornada: "nocturna", horas: 5 },
    esperado: { hora: 50, total: 500 },
  },
]);
