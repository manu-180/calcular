import { definirCasos } from "@/motor/calculo";
import trabajoDomestico from "./trabajo-domestico";

export default definirCasos(trabajoDomestico, [
  {
    nombre: "Mensual, categoría general, 44 horas, con el mínimo de julio 2026",
    origen: {
      tipo: "recalculado",
      detalle:
        "Mínimo general $ 32.051 (Comunicado BPS R 14/2026). Personales: montepío 15 % = 4.807,65; Fonasa 4,5 % (más de 2,5 BPC, sin cargas) = 1.442,30; FRL 0,1 % = 32,05; IRPF 0 (menos de 7 BPC). Líquido 25.769,00. Patronales: jubilatorio 7,5 % = 2.403,83; Fonasa 5 % = 1.602,55; FRL 0,1 % = 32,05; fondo de garantía 0,025 % = 8,01; BSE 1,87 % = 599,35. Total 4.645,79; costo 36.696,79.",
    },
    fecha: "2026-10-08",
    entrada: { categoria: "general", modalidad: "mensual", horas: 44, nominal: null, hijos: false, conyuge: false },
    esperado: {
      minimo: 32051,
      nominal: 32051,
      montepio: 4807.65,
      fonasa: 1442.3,
      frl: 32.05,
      irpf: 0,
      liquido: 25769,
      jubilatorioPatronal: 2403.83,
      fonasaPatronal: 1602.55,
      frlPatronal: 32.05,
      fondoGarantia: 8.01,
      bse: 599.35,
      aportesPatronales: 4645.79,
      aportesBps: 10927.79,
      costoTotal: 36696.79,
    },
  },
  {
    nombre: "Jornalera de cuidados, 60 horas en el mes, con hijos (menos de 2,5 BPC)",
    origen: {
      tipo: "recalculado",
      detalle:
        "184 × 60 = 11.040, menos de 2,5 BPC (17.160): Fonasa 3 %. Montepío 1.656; Fonasa 331,20; FRL 11,04; líquido 9.041,76. Patronales: 828 + 552 + 11,04 + 2,76 + 206,45 = 1.600,25; costo 12.640,25.",
    },
    fecha: "2026-10-08",
    entrada: { categoria: "cuidados", modalidad: "jornalero", horas: 60, nominal: null, hijos: true, conyuge: false },
    esperado: { minimo: 11040, montepio: 1656, fonasa: 331.2, frl: 11.04, liquido: 9041.76, aportesPatronales: 1600.25, costoTotal: 12640.25 },
  },
  {
    nombre: "Mensual de cocina a 22 horas por semana: mínimo a la mitad",
    origen: { tipo: "recalculado", detalle: "33.796 × 22 / 44 = 16.898." },
    fecha: "2026-10-08",
    entrada: { categoria: "cocina", modalidad: "mensual", horas: 22, nominal: 20000, hijos: false, conyuge: false },
    esperado: { minimo: 16898, nominal: 20000 },
  },
  {
    nombre: "Más de 44 horas por semana",
    origen: { tipo: "recalculado", detalle: "La jornada del sector es de 44 horas semanales como máximo." },
    fecha: "2026-10-08",
    entrada: { categoria: "general", modalidad: "mensual", horas: 50, nominal: null, hijos: false, conyuge: false },
    esperaError: true,
  },
]);
