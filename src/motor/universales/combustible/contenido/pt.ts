import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoPt: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const imperial = ctx.unidades === "imperial";
  const pt = ctx.locale === "pt-PT";
  const ejemplo = imperial
    ? (() => {
        const precio = montoEjemplo(ctx, 3.5);
        const galones = 300 / 30;
        return [
          `Uma viagem de 150 milhas, ida e volta, num carro que faz 30 mpg gasta ${formatearNumero(ctx, galones)} galões.`,
          `A ${m(precio)} o galão, são ${m(galones * precio)}. Dividindo entre 2 pessoas, ${m((galones * precio) / 2)} para cada uma.`,
        ];
      })()
    : pt
      ? (() => {
          const precio = montoEjemplo(ctx, 1.2);
          const litros = (600 * 8) / 100;
          return [
            `Uma viagem de 300 km, ida e volta, num carro que gasta 8 litros aos 100 km precisa de ${formatearNumero(ctx, litros)} litros.`,
            `A ${m(precio)} o litro, são ${m(litros * precio)}. Dividindo entre 2 pessoas, ${m((litros * precio) / 2)} para cada uma.`,
          ];
        })()
      : (() => {
          const precio = montoEjemplo(ctx, 1.2);
          const litros = 600 / 12;
          return [
            `Uma viagem de 300 km, ida e volta, num carro que faz 12 km por litro precisa de ${formatearNumero(ctx, litros)} litros.`,
            `A ${m(precio)} o litro, são ${m(litros * precio)}. Dividindo entre 2 pessoas, ${m((litros * precio) / 2)} para cada uma.`,
          ];
        })();
  return {
    h1: "Calculadora de combustível para viagem",
    title: tituloQueEntre(`Calculadora de combustível para viagem (${ctx.nombrePais})`, "Calculadora de combustível para viagem", "Calculadora de combustível"),
    description: "Calcule quanto uma viagem custa de combustível com a distância, o consumo do carro e o preço do litro, e quanto cada pessoa paga.",
    intro: [
      `Coloque a distância, o consumo do veículo e o preço do ${imperial ? "galão" : "litro"}. Você vê quanto combustível precisa e quanto custa a viagem.`,
      imperial ? "O consumo vai em milhas por galão." : "O consumo pode ir em quilômetros por litro ou em litros a cada 100 km.",
    ],
    comoSeCalcula: imperial
      ? ["Galões = distância ÷ milhas por galão.", "Gasto = galões × preço do galão. Ida e volta dobra a distância."]
      : [
          "Com quilômetros por litro: litros = distância ÷ consumo.",
          "Com litros a cada 100 km: litros = distância × consumo ÷ 100.",
          "Gasto = litros × preço do litro. Ida e volta dobra a distância.",
        ],
    ejemplo,
    faq: [
      {
        pregunta: "Como passar de km por litro para litros a cada 100 km?",
        respuesta: `Divida 100 pelos km por litro. Um carro que faz 12 km por litro gasta cerca de ${formatearNumero(ctx, 100 / 12, 1)} litros a cada 100 km.`,
      },
      {
        pregunta: pt ? "Inclui as portagens?" : "Inclui o pedágio?",
        respuesta: pt
          ? "Não. Só conta o combustível. Some as portagens e o estacionamento à parte."
          : "Não. Só conta o combustível. Some o pedágio e o estacionamento à parte.",
      },
      {
        pregunta: "Por que o carro gasta mais na cidade?",
        respuesta: "Parar e arrancar exige mais energia que rodar em velocidade constante na estrada, por isso o consumo na cidade costuma ser maior.",
      },
    ],
    glosario: [
      { termino: "Consumo", definicion: "Quanto o veículo anda com uma certa quantidade de combustível." },
      { termino: "km/l", definicion: "Quilômetros por litro. Quanto maior, mais econômico é o carro." },
    ],
  };
};
