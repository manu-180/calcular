import { definirCasos } from "@/motor/calculo";
import custoDoTrabalhador from "./custo-do-trabalhador";

const PORTARIA = "https://boe.incv.cv/Bulletins/Download/5858";

export default definirCasos(custoDoTrabalhador, [
  {
    nombre: "100 000$00 por mês, 12 pagamentos",
    origen: { tipo: "recalculado", url: PORTARIA, detalle: "INPS patronal 16 % × 100 000 = 16 000. Custo mensal 116 000. Em 12 meses 1 392 000." },
    fecha: "2026-10-29",
    entrada: { salario: 100000, pagamentos: 12 },
    esperado: { inps: 16000, custoMes: 116000, anual: 1392000, encargo: 16 },
  },
  {
    nombre: "Com 14 pagamentos por ano",
    origen: { tipo: "recalculado", url: PORTARIA, detalle: "60 000 × 14 = 840 000. INPS 16 % = 134 400. Custo anual 974 400. Custo do mês 69 600." },
    fecha: "2026-10-29",
    entrada: { salario: 60000, pagamentos: 14 },
    esperado: { custoMes: 69600, anual: 974400 },
  },
]);
