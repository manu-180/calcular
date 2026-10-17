import { definirCasos } from "@/motor/calculo";
import calculoDeFerias from "./calculo-de-ferias";

export default definirCasos(calculoDeFerias, [
  {
    nombre: "30 dias com salário de R$ 3.000",
    origen: { tipo: "recalculado", detalle: "Férias 3000 + 1/3 de 1000 = 4000. INSS 121,575 + 115,3656 + (4000 − 2902,84) × 12 % = 368,60. Base 4000 − 607,20 = 3392,80 dá 114,76, zerado pela redução (até 5000). Líquido 3631,40." },
    fecha: "2026-10-14",
    entrada: { salario: 3000, mediaVariaveis: 0, faltas: 0, venderDias: false, dependentes: 0 },
    esperado: { dias: 30, ferias: 3000, terco: 1000, bruto: 4000, inss: 368.6, irrf: 0, liquido: 3631.4 },
  },
  {
    nombre: "Vendendo 10 dias",
    origen: { tipo: "recalculado", detalle: "20 dias: 2000 + 666,67. Abono 10 dias: 1000 + 333,33. INSS só sobre 2666,67: 121,575 + (2666,67 − 1621) × 9 % = 215,69. Sem IRRF. Líquido 4000 − 215,69 = 3784,31." },
    fecha: "2026-10-14",
    entrada: { salario: 3000, mediaVariaveis: 0, faltas: 0, venderDias: true, dependentes: 0 },
    esperado: { diasGozo: 20, diasAbono: 10, ferias: 2000, terco: 666.67, abono: 1000, tercoAbono: 333.33, inss: 215.69, liquido: 3784.31 },
  },
  {
    nombre: "Dez faltas: 24 dias",
    origen: { tipo: "recalculado", detalle: "CLT art. 130, II: de 6 a 14 faltas, 24 dias. 100 × 24 = 2400 + 800 = 3200. INSS 121,575 + 115,3656 + (3200 − 2902,84) × 12 % = 272,60." },
    fecha: "2026-10-14",
    entrada: { salario: 3000, mediaVariaveis: 0, faltas: 10, venderDias: false, dependentes: 0 },
    esperado: { dias: 24, bruto: 3200, inss: 272.6, irrf: 0, liquido: 2927.4 },
  },
  {
    nombre: "Mais de 32 faltas",
    origen: { tipo: "recalculado", detalle: "CLT art. 130 só prevê férias até 32 faltas." },
    fecha: "2026-10-14",
    entrada: { salario: 3000, mediaVariaveis: 0, faltas: 40, venderDias: false, dependentes: 0 },
    esperaError: true,
  },
]);
