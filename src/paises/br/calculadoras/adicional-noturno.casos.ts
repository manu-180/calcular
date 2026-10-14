import { definirCasos } from "@/motor/calculo";
import adicionalNoturno from "./adicional-noturno";

export default definirCasos(adicionalNoturno, [
  {
    nombre: "70 horas de relógio com salário de R$ 2.200",
    origen: { tipo: "recalculado", detalle: "70 × 60 / 52,5 = 80 horas noturnas. Hora 2200 / 220 = 10; 20 % = 2. 80 × 2 = 160." },
    fecha: "2026-10-14",
    entrada: { salario: 2200, jornada: 44, horasRelogio: 70, percentual: 20 },
    esperado: { horasNoturnas: 80, valorHora: 10, adicionalHora: 2, adicional: 160 },
  },
  {
    nombre: "Adicional de convenção de 30 %",
    origen: { tipo: "recalculado", detalle: "35 horas de relógio = 40 noturnas. Hora 3000 / 200 = 15; 30 % = 4,50. 40 × 4,50 = 180." },
    fecha: "2026-10-14",
    entrada: { salario: 3000, jornada: 40, horasRelogio: 35, percentual: 30 },
    esperado: { horasNoturnas: 40, adicional: 180 },
  },
  {
    nombre: "Percentual abaixo do mínimo",
    origen: { tipo: "recalculado", detalle: "CLT art. 73: pelo menos 20 %." },
    fecha: "2026-10-14",
    entrada: { salario: 2200, jornada: 44, horasRelogio: 70, percentual: 10 },
    esperaError: true,
  },
]);
