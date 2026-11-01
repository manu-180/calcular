import { definirCasos } from "@/motor/calculo";
import horasExtraordinarias from "./horas-extraordinarias";

const CL = "https://boe.incv.cv/Bulletins/Download/348";
const CL16 = "https://boe.incv.cv/Bulletins/Download/2139";

export default definirCasos(horasExtraordinarias, [
  {
    nombre: "10 horas extraordinárias com 100 000$00",
    origen: { tipo: "recalculado", url: CL16, detalle: "Artigo 210.º: hora = 100 000 × 12 / (52 × 44) = 524,4755. Artigo 207.º: acréscimo de 35 %. 10 × 524,4755 × 1,35 = 7 080,42." },
    fecha: "2026-10-29",
    entrada: { salarioBase: 100000, horasSemanais: 44, horas: 10, horasNoturnas: 0, jaFeitas: 0 },
    esperado: { hora: 524.48, horaExtra: 708.04, total: 7080.42 },
  },
  {
    nombre: "Quatro das dez horas são noturnas",
    origen: { tipo: "recalculado", url: CL, detalle: "Artigo 209.º, n.º 1: o acréscimo noturno soma-se ao do trabalho extraordinário. 4 × 524,4755 × 25 % = 524,48. Total 7 080,42 + 524,48 = 7 604,90." },
    fecha: "2026-10-29",
    entrada: { salarioBase: 100000, horasSemanais: 44, horas: 10, horasNoturnas: 4, jaFeitas: 0 },
    esperado: { noturno: 524.48, total: 7604.9 },
  },
  {
    nombre: "Horário de 40 horas por semana",
    origen: { tipo: "recalculado", url: CL, detalle: "Hora = 60 000 × 12 / (52 × 40) = 346,1538. 6 × 346,1538 × 1,35 = 2 803,85." },
    fecha: "2026-10-29",
    entrada: { salarioBase: 60000, horasSemanais: 40, horas: 6, horasNoturnas: 0, jaFeitas: 0 },
    esperado: { hora: 346.15, total: 2803.85 },
  },
  {
    nombre: "Mais horas noturnas do que horas extraordinárias",
    origen: { tipo: "recalculado", url: CL, detalle: "Não é possível: as horas noturnas fazem parte das extraordinárias." },
    fecha: "2026-10-29",
    entrada: { salarioBase: 100000, horasSemanais: 44, horas: 3, horasNoturnas: 5, jaFeitas: 0 },
    esperaError: true,
  },
]);
