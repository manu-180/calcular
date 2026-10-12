import { definirCasos } from "@/motor/calculo";
import riesgosDelTrabajo from "./riesgos-del-trabajo";

export default definirCasos(riesgosDelTrabajo, [
  {
    nombre: "Salario alto, 60 días: se calculan los primeros 45",
    origen: { tipo: "recalculado", detalle: "1.500.000 / 30 = 50.000; 60 % = 30.000 por día (art. 236). 45 días: 1.350.000. Quedan 15 días sin calcular." },
    fecha: "2026-10-12",
    entrada: { salario: 1500000, dias: 60, jornadaCompleta: true },
    esperado: { subsidioDiario: 30000, diasCalculados: 45, diasSinCalcular: 15, subsidio: 1350000 },
  },
  {
    nombre: "Salario bajo: sube al mínimo diario",
    origen: {
      tipo: "recalculado",
      detalle: "600.000 / 30 = 20.000; 60 % = 12.000, menos que el mínimo por jornada de ocupación no calificada (12.436,41, Decreto 45303-MTSS). 10 días × 12.436,41 = 124.364,10.",
    },
    fecha: "2026-10-12",
    entrada: { salario: 600000, dias: 10, jornadaCompleta: true },
    esperado: { subsidioDiario: 12436.41, subsidio: 124364.1 },
  },
  {
    nombre: "Jornada parcial: sin piso",
    origen: { tipo: "recalculado", detalle: "300.000 / 30 = 10.000; 60 % = 6.000; 5 días = 30.000." },
    fecha: "2026-10-12",
    entrada: { salario: 300000, dias: 5, jornadaCompleta: false },
    esperado: { subsidioDiario: 6000, subsidio: 30000 },
  },
]);
