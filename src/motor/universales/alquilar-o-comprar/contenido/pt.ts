import { esPortuguesEuropeo } from "../../comun/locales";
import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { comparar } from "../definicion";

export const contenidoPt: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const precio = montoEjemplo(ctx, 200000);
  const alquiler = montoEjemplo(ctx, 1000);
  const base = { precio, entrada: 20, gastosCompra: 4, tasa: 7, aniosHipoteca: 25, alquiler, aumentoAlquiler: 3, gastosPropietario: 1.5, revalorizacion: 3, rendimiento: 5 };
  const a10 = comparar({ ...base, horizonte: 10 }).anios[9];
  const a3 = comparar({ ...base, horizonte: 3 }).anios[2];
  const pt = esPortuguesEuropeo(ctx.locale);
  const alugar = pt ? "arrendar" : "alugar";
  const oAluguel = pt ? "a renda" : "o aluguel";
  const umAluguel = pt ? "uma renda" : "um aluguel";
  const parcela = pt ? "a prestação" : "a parcela";
  const patrimonio = pt ? "património" : "patrimônio";
  const quien = (a: { comprar: number; alquilar: number }) => (a.comprar >= a.alquilar ? "comprar" : alugar);
  return {
    h1: pt ? "Arrendar ou comprar casa?" : "Alugar ou comprar imóvel?",
    title: pt
      ? tituloQueEntre(`Arrendar ou comprar casa: calculadora (${ctx.nombrePais})`, "Arrendar ou comprar casa: calculadora", "Arrendar ou comprar casa")
      : tituloQueEntre(`Alugar ou comprar imóvel: calculadora (${ctx.nombrePais})`, "Alugar ou comprar imóvel: calculadora", "Alugar ou comprar imóvel"),
    description: `Compare ${alugar} e comprar um imóvel nos anos que você escolher. Veja qual opção deixa você em melhor situação, a partir de quando e por quanto.`,
    intro: [
      `Comparar ${parcela} com ${oAluguel} não basta. Quem compra paga juros, manutenção e impostos, mas fica com o imóvel. Quem ${pt ? "arrenda" : "aluga"} pode deixar a entrada investida.`,
      `Esta calculadora soma tudo isso ano a ano e mostra qual opção deixa você com mais ${patrimonio}.`,
    ],
    comoSeCalcula: [
      `Comprando: todo mês você paga o financiamento e os gastos de proprietário. O seu ${patrimonio} é o valor do imóvel menos o que ainda deve.`,
      `${pt ? "Arrendando" : "Alugando"}: a entrada e os custos de compra ficam investidos com o rendimento alternativo, e ${oAluguel} sobe todo ano.`,
      "A cada mês, quem gasta menos investe a diferença, assim as duas opções saem do mesmo orçamento.",
      `A melhor opção é a que termina com mais ${patrimonio}.`,
    ],
    ejemplo: [
      `Um imóvel de ${m(precio)} com 20% de entrada e financiamento a 7% ao ano em 25 anos, contra ${umAluguel} de ${m(alquiler)} por mês.`,
      `Em 10 anos, ${quien(a10)} sai na frente por ${m(Math.abs(a10.comprar - a10.alquilar))}. Em 3 anos, ${quien(a3)} sai na frente por ${m(Math.abs(a3.comprar - a3.alquilar))}.`,
    ],
    faq: [
      {
        pregunta: pt ? "Pagar renda é deitar dinheiro fora?" : "Pagar aluguel é jogar dinheiro fora?",
        respuesta: "Não exatamente. Quem compra também tem gastos que não voltam: juros, impostos e manutenção. O que importa é quanto você tem no final em cada caso.",
      },
      {
        pregunta: "Por que a resposta muda com o número de anos?",
        respuesta: `Comprar tem custos altos no começo (custos de compra e os primeiros juros) que levam tempo para se recuperar. Se você pensa em se mudar logo, ${alugar} costuma sair na frente.`,
      },
      {
        pregunta: "Qual dado pesa mais?",
        respuesta: `A relação entre o valor do imóvel e ${oAluguel}, a taxa do financiamento e quanto os imóveis se valorizam. Mude a valorização e o rendimento do investimento para ver quanto a resposta muda.`,
      },
    ],
    glosario: [
      { termino: pt ? "Património" : "Patrimônio", definicion: "O que você tem menos o que deve." },
      { termino: "Valorização", definicion: "Quanto o valor do imóvel sobe a cada ano." },
      { termino: "Custo de oportunidade", definicion: "O que a entrada teria rendido se você a investisse." },
    ],
  };
};
