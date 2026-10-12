import { definirCasos } from "@/motor/calculo";
import semanaCorrida from "./semana-corrida";

export default definirCasos(semanaCorrida, [
  {
    nombre: "Mes con 22 días hábiles y 4 domingos",
    origen: {
      tipo: "recalculado",
      detalle: "Código del Trabajo art. 45: promedio de lo variable devengado dividido por los días que debió trabajar. 440.000 / 22 = 20.000 por día. × 4 domingos = 80.000.",
    },
    fecha: "2026-10-07",
    entrada: { variable: 440000, diasLaborables: 22, domingosFestivos: 4 },
    esperado: { promedioDiario: 20000, semanaCorrida: 80000 },
  },
  {
    nombre: "Mes con un festivo",
    origen: { tipo: "recalculado", detalle: "300.000 / 21 = 14.285,71 por día. 4 domingos y 1 festivo: × 5 = 71.428,57 → 71.429." },
    fecha: "2026-10-07",
    entrada: { variable: 300000, diasLaborables: 21, domingosFestivos: 5 },
    esperado: { promedioDiario: 14286, semanaCorrida: 71429 },
  },
  {
    nombre: "Días imposibles",
    origen: { tipo: "recalculado", detalle: "28 días de trabajo más 5 domingos pasan de 31." },
    fecha: "2026-10-07",
    entrada: { variable: 300000, diasLaborables: 28, domingosFestivos: 5 },
    esperaError: true,
  },
]);
