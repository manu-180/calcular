import { definirCasos } from "@/motor/calculo";
import horasExtraEnFeriado from "./horas-extra-en-feriado";

export default definirCasos(horasExtraEnFeriado, [
  {
    nombre: "Dos horas extra de día en un feriado",
    origen: {
      tipo: "recalculado",
      detalle: "Art. 50: hora 1,000 ÷ 208 = 4.8077; con 150% de feriado = 12.0192; con 25% de hora extra diurna = 15.0240. Dos horas: 30.05.",
    },
    fecha: "2026-10-12",
    entrada: { salario: 1000, jornada: "diurna", dia: "feriado", horas: 2, periodo: "diurna" },
    esperado: { hora: 4.81, horaDelDia: 12.02, horaExtra: 15.02, total: 30.05 },
  },
  {
    nombre: "Tres horas extra de noche en domingo",
    origen: { tipo: "recalculado", detalle: "4.8077 × 1.5 (domingo) = 7.2115 × 1.5 (nocturna) = 10.8173. Tres horas: 32.45." },
    fecha: "2026-10-12",
    entrada: { salario: 1000, jornada: "diurna", dia: "domingo", horas: 3, periodo: "nocturna" },
    esperado: { horaDelDia: 7.21, horaExtra: 10.82, total: 32.45 },
  },
]);
