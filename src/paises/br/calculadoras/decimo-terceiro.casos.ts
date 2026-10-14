import { definirCasos } from "@/motor/calculo";
import decimoTerceiro from "./decimo-terceiro";

export default definirCasos(decimoTerceiro, [
  {
    nombre: "Ano completo com R$ 3.000",
    origen: { tipo: "recalculado", detalle: "13º = 3000. Primeira parcela 1500. INSS 248,60. Desconto simplificado 607,20: base 2392,80, abaixo da faixa isenta. Segunda parcela 3000 − 1500 − 248,60 = 1251,40." },
    fecha: "2026-12-10",
    entrada: { salario: 3000, meses: 12, mediaVariaveis: 0, dependentes: 0 },
    esperado: { bruto: 3000, primeira: 1500, inss: 248.6, irrf: 0, segunda: 1251.4, liquido: 2751.4 },
  },
  {
    nombre: "R$ 6.000 com redução parcial do imposto",
    origen: { tipo: "recalculado", detalle: "INSS 641,51. Base 6000 − 641,51 = 5358,49; tabela 564,85; redução 978,62 − 0,133145 × 6000 = 179,75; IRRF 385,10. Segunda parcela 6000 − 3000 − 641,51 − 385,10 = 1973,39." },
    fecha: "2026-12-10",
    entrada: { salario: 6000, meses: 12, mediaVariaveis: 0, dependentes: 0 },
    esperado: { inss: 641.51, irrf: 385.1, segunda: 1973.39, liquido: 4973.39 },
  },
  {
    nombre: "R$ 8.000 sem redução",
    origen: { tipo: "recalculado", detalle: "INSS 921,51. Base 7078,49 × 27,5 % − 908,73 = 1037,85. Acima de 7350, sem redução. Segunda parcela 8000 − 4000 − 921,51 − 1037,85 = 2040,64." },
    fecha: "2026-12-10",
    entrada: { salario: 8000, meses: 12, mediaVariaveis: 0, dependentes: 0 },
    esperado: { inss: 921.51, irrf: 1037.85, segunda: 2040.64 },
  },
  {
    nombre: "Seis meses com média de horas extras",
    origen: { tipo: "recalculado", detalle: "(4500 + 500) × 6 / 12 = 2500. INSS 121,575 + (2500 − 1621) × 9 % = 200,69. Sem IRRF." },
    fecha: "2026-12-10",
    entrada: { salario: 4500, meses: 6, mediaVariaveis: 500, dependentes: 0 },
    esperado: { bruto: 2500, primeira: 1250, inss: 200.69, irrf: 0, segunda: 1049.31 },
  },
]);
