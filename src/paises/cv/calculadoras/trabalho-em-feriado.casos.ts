import { definirCasos } from "@/motor/calculo";
import trabalhoEmFeriado from "./trabalho-em-feriado";

const CL = "https://boe.incv.cv/Bulletins/Download/348";

export default definirCasos(trabalhoEmFeriado, [
  {
    nombre: "Oito horas num feriado com 100 000$00",
    origen: { tipo: "recalculado", url: CL, detalle: "Artigo 208.º: acréscimo de 100 %, e o feriado equipara-se ao descanso semanal. Hora 524,4755. Acréscimo 8 × 524,4755 = 4 195,80. Total das horas 8 391,61." },
    fecha: "2026-10-29",
    entrada: { salarioBase: 100000, horasSemanais: 44, horas: 8 },
    esperado: { hora: 524.48, acrescimo: 4195.8, valorHoras: 8391.61 },
  },
  {
    nombre: "Seis horas com o salário mínimo",
    origen: { tipo: "recalculado", url: CL, detalle: "Hora = 17 000 × 12 / (52 × 44) = 89,1608. 6 × 89,1608 = 534,97. Total das horas 1 069,93." },
    fecha: "2026-10-29",
    entrada: { salarioBase: 17000, horasSemanais: 44, horas: 6 },
    esperado: { acrescimo: 534.97, valorHoras: 1069.93 },
  },
]);
