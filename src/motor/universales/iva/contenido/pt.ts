import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoPt: ContenidoUniversal = (ctx) => {
  const tasa = `{{${ctx.datos.tasa}}}`;
  const precio = formatearMonto(ctx, montoEjemplo(ctx, 100));
  return {
    h1: `Calculadora de IVA (${ctx.nombrePais})`,
    title: tituloQueEntre(`Calculadora de IVA (${tasa}) em ${ctx.nombrePais}`, `IVA (${tasa}) em ${ctx.nombrePais}`, `Calculadora de IVA (${tasa})`),
    description: `Some ou tire o IVA de ${tasa} de qualquer preço num passo só: o preço sem imposto, o imposto e o total, até o centavo.`,
    intro: [
      `A taxa normal que esta calculadora usa para ${ctx.nombrePais} é de ${tasa}.`,
      "Escolha se quer somar o imposto a um preço sem imposto ou tirá-lo de um preço que já o inclui, e depois coloque o valor.",
    ],
    comoSeCalcula: [
      "Para somar: imposto = preço sem imposto × taxa ÷ 100. Total = preço sem imposto + imposto.",
      "Para tirar: preço sem imposto = preço com imposto ÷ (1 + taxa ÷ 100). O imposto é a diferença.",
      "Se um produto tem uma taxa reduzida, coloque-a em “Outra taxa de imposto”.",
    ],
    ejemplo: [
      `Para somar o imposto a ${precio}, multiplique esse valor por ${tasa} e some o resultado ao preço.`,
      `Para ver quanto imposto há num total de ${precio}, divida por 1 mais a taxa e subtraia.`,
    ],
    faq: [
      {
        pregunta: "Como tirar o IVA de um preço?",
        respuesta: "Divida o preço por 1 mais a taxa em decimal. O que sobra é o preço sem imposto, e a diferença é o imposto.",
      },
      {
        pregunta: "Por que não posso só tirar a porcentagem do total?",
        respuesta: "Porque o imposto foi calculado sobre o preço menor, sem imposto. Tirar a porcentagem do total desconta demais.",
      },
      {
        pregunta: `Tudo paga ${tasa}?`,
        respuesta: "Nem sempre. Alguns alimentos, remédios ou serviços têm taxa reduzida ou são isentos. Nesse caso, use “Outra taxa de imposto”.",
      },
    ],
    glosario: [
      { termino: "IVA", definicion: "Imposto sobre o valor acrescentado. Soma-se ao preço de bens e serviços. Em alguns países o imposto sobre o consumo tem outro nome e outras regras." },
      { termino: "Preço sem imposto", definicion: "O preço antes de somar o imposto." },
    ],
  };
};
