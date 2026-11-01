import { definirCasos } from "@/motor/calculo";
import trabalhoNocturno from "./trabalho-nocturno";

const LGT = "https://faolex.fao.org/docs/pdf/ang223057.pdf";

export default definirCasos(trabalhoNocturno, [
  {
    nombre: "Horário todo nocturno",
    origen: { tipo: "recalculado", url: LGT, detalle: "Artigo 182.º, n.º 1: 20 % do salário de base. 350 000 × 20 % = 70 000." },
    fecha: "2026-10-24",
    entrada: { salarioBase: 350000, modo: "todo", horas: null, horasSemanais: null },
    esperado: { adicional: 70000 },
  },
  {
    nombre: "40 horas nocturnas no mês",
    origen: { tipo: "recalculado", url: LGT, detalle: "Hora = 350 000 × 12 / (52 × 44) = 1 835,6643. Adicional = 40 × 20 % × 1 835,6643 = 14 685,31. Hora nocturna 2 202,80." },
    fecha: "2026-10-24",
    entrada: { salarioBase: 350000, modo: "horas", horas: 40, horasSemanais: 44 },
    esperado: { adicional: 14685.31, hora: 1835.66, horaNocturna: 2202.8 },
  },
]);
