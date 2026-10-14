import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { MARGEN } from "../definicion";

export const contenidoPt: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 1) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const pt = ctx.locale === "pt-PT";
  const comodo = pt ? "uma divisão" : "um cômodo";
  const ejemplo = imperial
    ? (() => {
        const neta = 48 * 8 - 40;
        const gal = (neta * 2) / 350;
        return [
          `Um cômodo com 48 ft de paredes, 8 ft de altura e 40 ft² de portas e janelas tem ${n(neta, 0)} ft² para pintar.`,
          `Com 2 demãos e uma tinta que rende 350 ft² por galão, você precisa de ${n(gal, 2)} galões. Com a margem, ${n(gal * (1 + MARGEN), 2)} galões.`,
        ];
      })()
    : (() => {
        const neta = 14 * 2.6 - 4;
        const litros = (neta * 2) / 10;
        return [
          `${pt ? "Uma divisão" : "Um cômodo"} com 14 m de paredes, ${n(2.6)} m de altura e 4 m² de portas e janelas tem ${n(neta)} m² para pintar.`,
          `Com 2 demãos e uma tinta que rende 10 m² por litro, você precisa de ${n(litros, 2)} litros. Com a margem, ${n(litros * (1 + MARGEN), 2)} litros.`,
        ];
      })();
  return {
    h1: "Calculadora de tinta",
    title: tituloQueEntre(`Calculadora de tinta para parede (${ctx.nombrePais})`, "Calculadora de tinta para parede", "Calculadora de tinta"),
    description: "Calcule quanta tinta você precisa para as paredes com as medidas, as portas e janelas, o número de demãos e o rendimento da lata.",
    intro: [
      "Coloque o comprimento e a altura das paredes (ou a área direto), o que ocupam as portas e janelas e quantas demãos vai dar.",
      `A conta soma 10% a mais para a tinta não acabar no meio da pintura de ${comodo}.`,
    ],
    comoSeCalcula: [
      "Área = comprimento total das paredes × altura, menos portas e janelas.",
      "Tinta = área × demãos ÷ rendimento.",
      `Depois soma uma margem de ${MARGEN * 100}%.`,
    ],
    ejemplo,
    faq: [
      {
        pregunta: "Quantos metros quadrados rende um litro de tinta?",
        respuesta: "A maioria das tintas para parede interna rende de 8 a 12 m² por litro em cada demão. O valor exato está na lata.",
      },
      {
        pregunta: "Quantas demãos preciso dar?",
        respuesta: "O normal são duas demãos. Reboco novo, paredes muito porosas ou uma mudança forte de cor podem pedir uma terceira.",
      },
      {
        pregunta: "Devo descontar as portas e janelas?",
        respuesta: "Sim, se forem grandes. As pequenas é melhor não descontar: a sobra cobre os cantos e os acabamentos.",
      },
    ],
    glosario: [
      { termino: "Rendimento", definicion: "Quanta área um litro ou galão de tinta cobre numa demão." },
      { termino: "Demão", definicion: "Cada camada de tinta aplicada na parede." },
    ],
  };
};
