import { definirCasos } from "@/motor/calculo";
import trabalhoNoturno from "./trabalho-noturno";

const CL = "https://boe.incv.cv/Bulletins/Download/348";

export default definirCasos(trabalhoNoturno, [
  {
    nombre: "80 horas noturnas com 120 000$00",
    origen: { tipo: "recalculado", url: CL, detalle: "Hora = 120 000 × 12 / (52 × 44) = 629,3706. 25 % = 157,3427 por hora. 80 horas = 12 587,41." },
    fecha: "2026-10-29",
    entrada: { salarioBase: 120000, horasSemanais: 44, horasNoturnas: 80 },
    esperado: { hora: 629.37, porHora: 157.34, subsidio: 12587.41, total: 132587.41 },
  },
  {
    nombre: "Horário de 40 horas e 60 horas noturnas",
    origen: { tipo: "recalculado", url: CL, detalle: "Hora = 60 000 × 12 / (52 × 40) = 346,1538. 25 % × 60 horas = 5 192,31." },
    fecha: "2026-10-29",
    entrada: { salarioBase: 60000, horasSemanais: 40, horasNoturnas: 60 },
    esperado: { subsidio: 5192.31 },
  },
]);
