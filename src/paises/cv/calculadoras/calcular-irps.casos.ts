import { definirCasos } from "@/motor/calculo";
import calcularIrps from "./calcular-irps";

const IRPS = "https://boe.incv.cv/Bulletins/Download/3596";

export default definirCasos(calcularIrps, [
  {
    nombre: "120 000$00 no segundo escalão",
    origen: { tipo: "recalculado", url: IRPS, detalle: "0,21 × 120 000 − 10 725 = 14 475. Em 12 meses 173 700." },
    fecha: "2026-10-29",
    entrada: { bruto: 120000 },
    esperado: { irps: 14475, taxaFormula: 21, parcela: 10725, anual: 173700 },
  },
  {
    nombre: "Exatamente no limite de retenção",
    origen: { tipo: "recalculado", url: IRPS, detalle: "Artigo 71.º, n.º 7: a retenção ocorre a partir de 36 607; com 36 607 não há retenção." },
    fecha: "2026-10-29",
    entrada: { bruto: 36607 },
    esperado: { irps: 0 },
  },
  {
    nombre: "Um escudo acima do limite: mínimo de 100$00",
    origen: { tipo: "recalculado", url: IRPS, detalle: "Artigo 71.º, n.º 8: 0,14 × 36 608 − 5 125 é menos de 1, logo devido 100." },
    fecha: "2026-10-29",
    entrada: { bruto: 36608 },
    esperado: { irps: 100 },
  },
  {
    nombre: "Fim do primeiro escalão",
    origen: { tipo: "recalculado", url: IRPS, detalle: "0,14 × 80 000 − 5 125 = 6 075." },
    fecha: "2026-10-29",
    entrada: { bruto: 80000 },
    esperado: { irps: 6075, taxaFormula: 14 },
  },
  {
    nombre: "Começo do segundo escalão",
    origen: { tipo: "recalculado", url: IRPS, detalle: "0,21 × 80 001 − 10 725 = 6 075,21, arredondado ao escudo 6 075." },
    fecha: "2026-10-29",
    entrada: { bruto: 80001 },
    esperado: { irps: 6075, taxaFormula: 21 },
  },
  {
    nombre: "Terceiro escalão: 300 000$00",
    origen: { tipo: "recalculado", url: IRPS, detalle: "0,25 × 300 000 − 16 725 = 58 275." },
    fecha: "2026-10-29",
    entrada: { bruto: 300000 },
    esperado: { irps: 58275, taxaFormula: 25, parcela: 16725 },
  },
]);
