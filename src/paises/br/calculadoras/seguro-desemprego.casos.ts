import { definirCasos } from "@/motor/calculo";
import seguroDesemprego from "./seguro-desemprego";

const MTE = "https://portalfat.trabalho.gov.br/mte-reajusta-valores-do-beneficio-seguro-desemprego/";

export default definirCasos(seguroDesemprego, [
  {
    nombre: "Média de R$ 3.000, segunda faixa, cinco parcelas",
    origen: { tipo: "recalculado", url: MTE, detalle: "1777,74 + (3000 − 2222,17) × 0,5 = 2166,655, arredondado 2166,66. 24 meses: 5 parcelas = 10833,30." },
    fecha: "2026-10-14",
    entrada: { salario1: 3000, salario2: 3000, salario3: 3000, pedido: "primeiro", meses: 24 },
    esperado: { media: 3000, parcela: 2166.66, quantidade: 5, total: 10833.3 },
  },
  {
    nombre: "Média baixa: parcela sobe para o salário mínimo",
    origen: { tipo: "recalculado", url: MTE, detalle: "1800 × 0,8 = 1440, abaixo do mínimo de 1621. 14 meses no primeiro pedido: 4 parcelas." },
    fecha: "2026-10-14",
    entrada: { salario1: 1800, salario2: null, salario3: null, pedido: "primeiro", meses: 14 },
    esperado: { parcela: 1621, quantidade: 4, total: 6484 },
  },
  {
    nombre: "Média acima da segunda faixa: teto",
    origen: { tipo: "oficial", url: MTE, detalle: "Média acima de R$ 3.703,99: valor fixo de R$ 2.518,65." },
    fecha: "2026-10-14",
    entrada: { salario1: 6000, salario2: 5000, salario3: 4000, pedido: "segundo", meses: 10 },
    esperado: { media: 5000, parcela: 2518.65, quantidade: 3 },
  },
  {
    nombre: "Primeiro pedido sem carência",
    origen: { tipo: "recalculado", detalle: "Primeiro pedido exige 12 meses: com 8, não há parcelas." },
    fecha: "2026-10-14",
    entrada: { salario1: 2500, salario2: 2500, salario3: 2500, pedido: "primeiro", meses: 8 },
    esperado: { quantidade: 0, total: 0 },
  },
]);
