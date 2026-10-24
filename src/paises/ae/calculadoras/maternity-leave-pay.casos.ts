import { definirCasos } from "@/motor/calculo";
import calculadora from "./maternity-leave-pay";

export default definirCasos(calculadora, [
  {
    nombre: "AED 10,000 a month",
    origen: { tipo: "recalculado", detalle: "Article 30: 45 days full pay + 15 days half pay. 10,000 / 30 = 333.33: 15,000 + 2,500 = 17,500." },
    fecha: "2026-10-17",
    entrada: { salario: 10000, hijoEnfermo: false, metodoDiario: "30" },
    esperado: { llena: 15000, media: 2500, total: 17500, dias: 60 },
  },
  {
    nombre: "With 30 more days for a sick child",
    origen: { tipo: "recalculado", detalle: "Plus 30 days on full pay: 333.33 x 30 = 10,000. Total 27,500." },
    fecha: "2026-10-17",
    entrada: { salario: 10000, hijoEnfermo: true, metodoDiario: "30" },
    esperado: { extra: 10000, total: 27500 },
  },
]);
