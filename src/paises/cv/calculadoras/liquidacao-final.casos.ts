import { definirCasos } from "@/motor/calculo";
import liquidacaoFinal from "./liquidacao-final";

const CL = "https://boe.incv.cv/Bulletins/Download/348";

export default definirCasos(liquidacaoFinal, [
  {
    nombre: "Saída em junho com férias vencidas",
    origen: { tipo: "recalculado", url: CL, detalle: "Artigo 62.º. Dia de salário 60 000 / 30 = 2 000, vezes 10 = 20 000. Férias proporcionais: 22 × 6 / 12 = 11 dias, a 60 000 / 22 por dia = 30 000. Vencidas: 5 × 2 727,27 = 13 636,36. Total 63 636,36." },
    fecha: "2026-10-29",
    entrada: { salario: 60000, diasSalario: 10, meses: 6, gozadas: 0, vencidas: 5, indemnizacao: 0, diasAviso: 0, divisor: 30 },
    esperado: { salarioDias: 20000, diasProporcionais: 11, feriasProporcionais: 30000, feriasVencidas: 13636.36, total: 63636.36 },
  },
  {
    nombre: "Com férias gozadas, aviso em falta e indemnização",
    origen: { tipo: "recalculado", url: CL, detalle: "Proporcionais: 11 − 4 = 7 dias × 2 727,27 = 19 090,91. Aviso: 10 dias × 2 000 = 20 000. Indemnização 100 000. Salário dos dias 20 000. Total 159 090,91." },
    fecha: "2026-10-29",
    entrada: { salario: 60000, diasSalario: 10, meses: 6, gozadas: 4, vencidas: 0, indemnizacao: 100000, diasAviso: 10, divisor: 30 },
    esperado: { feriasProporcionais: 19090.91, aviso: 20000, total: 159090.91 },
  },
  {
    nombre: "Férias gozadas acima do proporcional",
    origen: { tipo: "recalculado", url: CL, detalle: "Se os dias gozados passam o proporcional, não há férias proporcionais por pagar: 0 dias." },
    fecha: "2026-10-29",
    entrada: { salario: 44000, diasSalario: 0, meses: 3, gozadas: 10, vencidas: 0, indemnizacao: 0, diasAviso: 0, divisor: 30 },
    esperado: { diasProporcionais: 0, total: 0 },
  },
]);
