import { definirCasos } from "@/motor/calculo";
import calculoRescisao from "./calculo-rescisao";

export default definirCasos(calculoRescisao, [
  {
    nombre: "Sem justa causa com aviso indenizado de 36 dias",
    origen: {
      tipo: "recalculado",
      detalle:
        "Admissão 01/03/2024, saída 14/10/2026, R$ 3.000. Saldo 14 dias = 1400. Dois anos completos: aviso 30 + 6 = 36 dias = 3600, projeção até 19/11/2026. 13º: 11/12 (novembro com 19 dias) = 2750. Férias: período desde 01/03/2026, 8 meses e 19 dias = 9/12 = 2250 + 750. FGTS do mês 8 % × (1400 + 3600 + 2750) = 620. Multa 40 % × (6000 + 620) = 2648.",
    },
    fecha: "2026-10-14",
    entrada: { admissao: "2024-03-01", saida: "2026-10-14", salario: 3000, motivo: "sem-justa-causa", aviso: "indenizado", feriasVencidas: false, saldoFgts: 6000 },
    esperado: { saldoSalario: 1400, diasAviso: 36, avisoIndenizado: 3600, avos13: 11, decimo: 2750, avosFerias: 9, feriasProporcionais: 2250, tercoProporcionais: 750, verbas: 10750, depositoRescisao: 620, multaFgts: 2648, total: 13398 },
  },
  {
    nombre: "Pedido de demissão com aviso trabalhado",
    origen: {
      tipo: "recalculado",
      detalle: "Saída 14/10/2026: outubro tem 14 dias, não conta. 13º 9/12 = 2250. Férias de 01/03 a 14/10: 7 meses e 14 dias = 7/12 = 1750 + 583,33. Total 1400 + 2250 + 1750 + 583,33 = 5983,33. Sem multa.",
    },
    fecha: "2026-10-14",
    entrada: { admissao: "2024-03-01", saida: "2026-10-14", salario: 3000, motivo: "pedido", aviso: "trabalhado", feriasVencidas: false, saldoFgts: 6000 },
    esperado: { avos13: 9, decimo: 2250, avosFerias: 7, feriasProporcionais: 1750, tercoProporcionais: 583.33, verbas: 5983.33, multaFgts: 0 },
  },
  {
    nombre: "Acordo: metade do aviso e multa de 20 %",
    origen: {
      tipo: "recalculado",
      detalle: "CLT art. 484-A: aviso 36 / 2 = 18 dias = 1800, projeção até 01/11/2026. 13º 10/12 = 2500. Férias 8/12 = 2000 + 666,67. FGTS do mês 8 % × 5700 = 456. Multa 20 % × 6456 = 1291,20.",
    },
    fecha: "2026-10-14",
    entrada: { admissao: "2024-03-01", saida: "2026-10-14", salario: 3000, motivo: "acordo", aviso: "indenizado", feriasVencidas: false, saldoFgts: 6000 },
    esperado: { diasAviso: 18, avisoIndenizado: 1800, decimo: 2500, feriasProporcionais: 2000, verbas: 8366.67, multaFgts: 1291.2 },
  },
  {
    nombre: "Justa causa com férias vencidas",
    origen: { tipo: "recalculado", detalle: "Saldo 1400 + férias vencidas 3000 + 1/3 de 1000 = 5400. Sem 13º e férias proporcionais." },
    fecha: "2026-10-14",
    entrada: { admissao: "2024-03-01", saida: "2026-10-14", salario: 3000, motivo: "justa-causa", aviso: "trabalhado", feriasVencidas: true, saldoFgts: 6000 },
    esperado: { decimo: 0, feriasProporcionais: 0, feriasVencidas: 3000, tercoVencidas: 1000, verbas: 5400, multaFgts: 0 },
  },
  {
    nombre: "Pedido de demissão sem cumprir o aviso",
    origen: { tipo: "recalculado", detalle: "CLT art. 487, § 2º: desconto de 30 dias de salário. 5983,33 − 3000 = 2983,33." },
    fecha: "2026-10-14",
    entrada: { admissao: "2024-03-01", saida: "2026-10-14", salario: 3000, motivo: "pedido", aviso: "indenizado", feriasVencidas: false, saldoFgts: null },
    esperado: { descontoAviso: 3000, verbas: 2983.33, multaFgts: 0 },
  },
  {
    nombre: "Saldo do FGTS estimado",
    origen: { tipo: "recalculado", detalle: "Admissão 15/10/2025, saída 14/10/2026: 12 meses × 8 % × 3000 = 2880. Aviso 30 dias = 3000; saldo 1400; 13º até 13/11: 10/12 = 2500. FGTS do mês 8 % × 6900 = 552. Multa 40 % × 3432 = 1372,80." },
    fecha: "2026-10-14",
    entrada: { admissao: "2025-10-15", saida: "2026-10-14", salario: 3000, motivo: "sem-justa-causa", aviso: "indenizado", feriasVencidas: false, saldoFgts: null },
    esperado: { diasAviso: 30, decimo: 2500, depositoRescisao: 552, multaFgts: 1372.8 },
  },
]);
