import { definirCasos } from "@/motor/calculo";
import salarioMinimo from "./salario-minimo";

const DGERT = "https://www.dgert.gov.pt/retribuicao-minima-mensal-garantida-para-2026";

export default definirCasos(salarioMinimo, [
  {
    nombre: "Tempo completo em 2026",
    origen: { tipo: "recalculado", url: DGERT, detalle: "920 €; × 14 = 12 880; / 30 = 30,67; hora (920 × 12) / (52 × 40) = 5,31 (artigo 271.º do Código do Trabalho)." },
    fecha: "2026-10-14",
    entrada: { horasSemanais: 40 },
    esperado: { mensal: 920, anual: 12880, diario: 30.67, horario: 5.31 },
  },
  {
    nombre: "Tempo parcial de 20 horas",
    origen: { tipo: "recalculado", url: DGERT, detalle: "920 × 20 / 40 = 460; × 14 = 6 440." },
    fecha: "2026-10-14",
    entrada: { horasSemanais: 20 },
    esperado: { mensal: 460, anual: 6440, horario: 5.31 },
  },
]);
