import { definirCasos } from "@/motor/calculo";
import calculoInss from "./calculo-inss";

export default definirCasos(calculoInss, [
  {
    nombre: "Salário de R$ 3.000",
    origen: { tipo: "recalculado", detalle: "1621 × 7,5 % = 121,58; (2902,84 − 1621) × 9 % = 115,37; (3000 − 2902,84) × 12 % = 11,66. Total 121,575 + 115,3656 + 11,6592 = 248,60." },
    fecha: "2026-10-14",
    entrada: { salario: 3000 },
    esperado: { faixa1: 121.58, faixa2: 115.37, faixa3: 11.66, faixa4: 0, total: 248.6 },
  },
  {
    nombre: "Contribuição máxima no teto",
    origen: { tipo: "recalculado", detalle: "Teto 8475,55: 121,575 + 115,3656 + 174,1716 + 576,9792 = 988,09. Acima do teto não há desconto a mais." },
    fecha: "2026-10-14",
    entrada: { salario: 12000 },
    esperado: { base: 8475.55, total: 988.09 },
  },
  {
    nombre: "Salário mínimo",
    origen: { tipo: "recalculado", detalle: "1621 × 7,5 % = 121,575, arredondado para 121,58." },
    fecha: "2026-01-15",
    entrada: { salario: 1621 },
    esperado: { total: 121.58, faixa2: 0 },
  },
]);
