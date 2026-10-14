import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { costoMensual, type GastosAuto } from "../definicion";

export const contenidoPt: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const imperial = ctx.unidades === "imperial";
  const pt = ctx.locale === "pt-PT";
  const g: GastosAuto = {
    precio: montoEjemplo(ctx, 25000),
    depreciacion: 15,
    seguro: montoEjemplo(ctx, 100),
    distancia: 1000,
    consumo: imperial ? 28 : 8,
    precioCombustible: montoEjemplo(ctx, imperial ? 3.5 : 1.2),
    mantenimiento: montoEjemplo(ctx, 60),
    estacionamiento: 0,
    otros: 0,
  };
  const mensual = costoMensual(g, imperial);
  const unidad = imperial ? "milha" : "quilômetro";
  return {
    h1: "Quanto custa manter um carro",
    title: tituloQueEntre(`Quanto custa manter um carro: calculadora (${ctx.nombrePais})`, "Quanto custa manter um carro: calculadora", "Quanto custa manter um carro"),
    description: `Calcule quanto o seu carro custa de verdade por mês, por ano e por ${unidad}: combustível, seguro, manutenção, estacionamento e o valor que ele perde.`,
    intro: [
      "Quase todo mundo sabe quanto gasta de combustível. Poucos somam o seguro, a manutenção, o estacionamento e, principalmente, o valor que o carro perde todo ano.",
      pt
        ? "Preencha os seus gastos e mostramos quanto o carro lhe custa de facto. Ajuda a decidir se compra, se troca ou se se desloca de outra forma."
        : "Preencha os seus gastos e mostramos quanto o carro custa de verdade para você. Ajuda a decidir se vale comprar, trocar ou se locomover de outro jeito.",
    ],
    comoSeCalcula: [
      imperial
        ? "Combustível por mês = milhas por mês ÷ milhas por galão × preço do galão."
        : "Combustível por mês = quilômetros por mês × litros a cada 100 km ÷ 100 × preço do litro.",
      "Valor perdido por mês = valor do carro × perda anual ÷ 12.",
      "Custo real = combustível + seguro + manutenção + estacionamento + outros gastos + valor perdido.",
      `Custo por ${unidad} = custo real por mês ÷ distância rodada no mês.`,
    ],
    ejemplo: [
      imperial
        ? `Um carro de ${m(g.precio)} que roda ${formatearNumero(ctx, g.distancia)} milhas por mês custa ${m(mensual)} por mês, contando o valor que perde.`
        : `Um carro de ${m(g.precio)} que roda ${formatearNumero(ctx, g.distancia)} km por mês e gasta 8 litros a cada 100 km (${formatearNumero(ctx, 100 / 8, 1)} km por litro) custa ${m(mensual)} por mês, contando o valor que perde.`,
      `São ${m(mensual * 12)} por ano e ${formatearMonto(ctx, mensual / g.distancia)} por ${unidad}.`,
    ],
    faq: [
      {
        pregunta: "O que é a depreciação do carro?",
        respuesta: "É o valor que o carro perde com o tempo. Você não paga isso todo mês, mas sente na hora de vender. Num carro novo, costuma ser o maior custo.",
      },
      {
        pregunta: "Por que a parcela do financiamento não entra na conta?",
        respuesta: "Uma parte da parcela paga o próprio carro, que já está contado como valor perdido. Somar as duas coisas contaria o carro duas vezes. Os juros do financiamento são um custo a mais.",
      },
      {
        pregunta: "Como gastar menos com o carro?",
        respuesta: "Faça cotação do seguro todo ano, mantenha a calibragem dos pneus e as revisões em dia e evite trocar de carro com frequência: é nos primeiros anos que ele mais perde valor.",
      },
    ],
    glosario: [
      { termino: "Depreciação", definicion: "O valor que o carro perde com o tempo e o uso." },
      { termino: `Custo por ${unidad}`, definicion: `O custo médio de cada ${unidad} rodado, com todos os gastos incluídos.` },
    ],
  };
};
