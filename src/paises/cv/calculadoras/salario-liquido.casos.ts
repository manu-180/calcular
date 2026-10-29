import { definirCasos } from "@/motor/calculo";
import salarioLiquido from "./salario-liquido";

const IRPS = "https://boe.incv.cv/Bulletins/Download/3596";
const INPS = "https://boe.incv.cv/Bulletins/Download/5858";

export default definirCasos(salarioLiquido, [
  {
    nombre: "100 000$00 de remuneração bruta",
    origen: { tipo: "recalculado", url: IRPS, detalle: "INPS 8,5 % = 8 500. Segundo escalão: 0,21 × 100 000 − 10 725 = 10 275. Líquido = 100 000 − 8 500 − 10 275 = 81 225." },
    fecha: "2026-10-29",
    entrada: { bruto: 100000 },
    esperado: { inps: 8500, irps: 10275, liquido: 81225 },
  },
  {
    nombre: "Salário mínimo: abaixo do limite de retenção",
    origen: { tipo: "recalculado", url: INPS, detalle: "17 000 não passa de 36 607, logo IRPS 0. INPS 8,5 % = 1 445. Líquido 15 555." },
    fecha: "2026-10-29",
    entrada: { bruto: 17000 },
    esperado: { inps: 1445, irps: 0, liquido: 15555 },
  },
  {
    nombre: "Primeiro escalão: 40 000$00",
    origen: { tipo: "recalculado", url: IRPS, detalle: "0,14 × 40 000 − 5 125 = 475. INPS 3 400. Líquido 36 125." },
    fecha: "2026-10-29",
    entrada: { bruto: 40000 },
    esperado: { inps: 3400, irps: 475, liquido: 36125 },
  },
  {
    nombre: "Pouco acima do limite: retenção mínima de 100$00",
    origen: { tipo: "recalculado", url: IRPS, detalle: "36 700 > 36 607 e a fórmula dá 0,14 × 36 700 − 5 125 = 13, abaixo de 100, logo 100. INPS 3 119,5 arredondado a 3 120. Líquido 33 480." },
    fecha: "2026-10-29",
    entrada: { bruto: 36700 },
    esperado: { inps: 3120, irps: 100, liquido: 33480 },
  },
  {
    nombre: "Fim do segundo escalão: 150 000$00",
    origen: { tipo: "recalculado", url: IRPS, detalle: "0,21 × 150 000 − 10 725 = 20 775. INPS 12 750. Líquido 116 475." },
    fecha: "2026-10-29",
    entrada: { bruto: 150000 },
    esperado: { irps: 20775, inps: 12750, liquido: 116475 },
  },
  {
    nombre: "Terceiro escalão: 200 000$00",
    origen: { tipo: "recalculado", url: IRPS, detalle: "0,25 × 200 000 − 16 725 = 33 275. INPS 17 000. Líquido 149 725." },
    fecha: "2026-10-29",
    entrada: { bruto: 200000 },
    esperado: { irps: 33275, inps: 17000, liquido: 149725 },
  },
]);
