import { esPortuguesEuropeo } from "../../comun/locales";
import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { MEZCLA } from "../definicion";

export const contenidoPt: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 2) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const pt = esPortuguesEuropeo(ctx.locale);
  const material = pt ? "betão" : "concreto";
  const ejemplo = imperial
    ? (() => {
        const ft3 = 10 * 10 * (4 / 12);
        return [
          `Um piso de 10 × 10 ft, com 4 in de espessura, precisa de ${n(ft3)} ft³ de ${material}: ${n(ft3 / 27)} jardas cúbicas.`,
          `Com o traço de referência, são cerca de ${n((MEZCLA.cementoKg * ft3 * 0.0283168466) / 0.45359237, 0)} lb de cimento.`,
        ];
      })()
    : (() => {
        const volumen = 4 * 3 * 0.1;
        return [
          `Uma laje de 4 × 3 m, com 10 cm de espessura, precisa de ${n(volumen, 1)} m³ de ${material}.`,
          `Com o traço de referência, são cerca de ${n(MEZCLA.cementoKg * volumen, 0)} kg de cimento, ${n(MEZCLA.arenaM3 * volumen)} m³ de areia e ${n(MEZCLA.piedraM3 * volumen)} m³ de brita.`,
        ];
      })();
  return {
    h1: `Calculadora de ${material}`,
    title: tituloQueEntre(`Calculadora de ${material} (${ctx.nombrePais})`, `Calculadora de ${material}`),
    description: `Calcule quanto ${material} precisa para uma laje, em ${imperial ? "jardas cúbicas" : "metros cúbicos"}, e quanto cimento, areia e brita comprar, aproximadamente.`,
    intro: [
      `Coloque o comprimento, a largura e a espessura. Você vê o volume de ${material} e os materiais aproximados para preparar a mistura.`,
      "Os materiais dependem do traço. Esta calculadora usa como referência um traço de uso geral 1:2:3.",
    ],
    comoSeCalcula: [
      imperial ? "Volume = comprimento × largura × espessura, com a espessura em pés. Divida os pés cúbicos por 27 para ter jardas cúbicas." : "Volume = comprimento × largura × espessura, com a espessura em metros.",
      "Depois soma a margem para desníveis e perdas.",
      `Por m³: cerca de ${MEZCLA.cementoKg} kg de cimento, ${n(MEZCLA.arenaM3)} m³ de areia, ${n(MEZCLA.piedraM3, 1)} m³ de brita e ${MEZCLA.aguaL} litros de água.`,
    ],
    ejemplo,
    faq: [
      {
        pregunta: `Quantos sacos de cimento vão num metro cúbico de ${material}?`,
        respuesta: `Com um traço 1:2:3, cerca de ${MEZCLA.cementoKg} kg de cimento. Em sacos de 50 kg, são ${n(MEZCLA.cementoKg / 50, 0)} sacos.`,
      },
      {
        pregunta: "O que quer dizer o traço 1:2:3?",
        respuesta: "É a proporção da mistura: uma parte de cimento, duas de areia e três de brita. Um traço com mais cimento dá um material mais resistente.",
      },
      {
        pregunta: pt ? "Vale a pena encomendar betão pronto?" : "Vale a pena pedir concreto usinado?",
        respuesta: "Para volumes grandes costuma sair mais uniforme e mais rápido. Para obras pequenas, é comum misturar na obra com estas quantidades.",
      },
    ],
    glosario: [
      { termino: "Traço", definicion: "A proporção de cimento, areia, brita e água de uma mistura." },
      { termino: "Metro cúbico (m³)", definicion: "O volume de um cubo de 1 metro de cada lado: 1000 litros." },
    ],
  };
};
