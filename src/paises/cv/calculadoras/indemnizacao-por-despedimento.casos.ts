import { definirCasos } from "@/motor/calculo";
import indemnizacao from "./indemnizacao-por-despedimento";

const CL16 = "https://boe.incv.cv/Bulletins/Download/2139";

export default definirCasos(indemnizacao, [
  {
    nombre: "Despedimento coletivo após cinco anos",
    origen: { tipo: "recalculado", url: CL16, detalle: "Artigo 224.º, n.º 1: 20 dias por ano completo. 20 × 5 = 100 dias. Dia = 60 000 / 30 = 2 000. Indemnização 200 000." },
    fecha: "2026-10-29",
    entrada: { salario: 60000, anos: 5, meses: 0, motivo: "coletivo", divisor: 30 },
    esperado: { dias: 100, valorDia: 2000, indemnizacao: 200000 },
  },
  {
    nombre: "Justa causa objetiva com três anos e seis meses",
    origen: { tipo: "recalculado", url: CL16, detalle: "Artigo 238.º, n.º 1: 20 dias por ano. 20 × 3,5 = 70 dias. Dia = 45 000 / 30 = 1 500. Indemnização 105 000." },
    fecha: "2026-10-29",
    entrada: { salario: 45000, anos: 3, meses: 6, motivo: "objetiva", divisor: 30 },
    esperado: { dias: 70, indemnizacao: 105000 },
  },
  {
    nombre: "Divisor de 26 dias",
    origen: { tipo: "recalculado", url: CL16, detalle: "Dia = 52 000 / 26 = 2 000. 20 × 2 = 40 dias. Indemnização 80 000." },
    fecha: "2026-10-29",
    entrada: { salario: 52000, anos: 2, meses: 0, motivo: "coletivo", divisor: 26 },
    esperado: { dias: 40, valorDia: 2000, indemnizacao: 80000 },
  },
]);
