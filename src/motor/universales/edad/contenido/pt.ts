import { aDia, fechaLarga, mesesYDias } from "../../comun/fechas";
import { duracionPt } from "../../dias-entre-fechas/textos/pt";
import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoPt: ContenidoUniversal = (ctx) => {
  const nac = "1990-05-15";
  const ref = "2026-10-13";
  const { meses, dias } = mesesYDias(nac, ref);
  const total = aDia(ref) - aDia(nac);
  return {
    h1: "Calculadora de idade",
    title: tituloQueEntre(`Calculadora de idade (${ctx.nombrePais})`, "Calculadora de idade"),
    description: "Calcule a sua idade exata em anos, meses e dias, quantos dias você já viveu e quanto falta para o próximo aniversário.",
    intro: [
      "Coloque a sua data de nascimento e veja a sua idade exata hoje, também em meses, semanas e dias.",
      "Mude a segunda data para saber a idade de alguém num dia específico, ou quantos anos vai fazer.",
    ],
    comoSeCalcula: [
      "Conta os meses completos desde o nascimento até a data escolhida. Cada 12 meses formam um ano.",
      "Os dias que sobram depois do último mês completo são os dias da idade.",
      "Os anos bissextos contam com os seus 366 dias.",
    ],
    ejemplo: [
      `Quem nasceu em ${fechaLarga(ctx.locale, nac)} tinha ${duracionPt(Math.floor(meses / 12), meses % 12, dias)} em ${fechaLarga(ctx.locale, ref)}.`,
      `São ${formatearNumero(ctx, total)} dias de vida.`,
    ],
    faq: [
      {
        pregunta: "Como se calcula a idade exata?",
        respuesta: "Contam-se os anos completos, depois os meses inteiros desde o último aniversário e, por fim, os dias que sobram.",
      },
      {
        pregunta: "E quem nasceu em 29 de fevereiro?",
        respuesta: "Nos anos que não são bissextos, esta calculadora usa 28 de fevereiro como aniversário. Algumas leis usam 1º de março.",
      },
      {
        pregunta: "Quantos dias de vida eu tenho?",
        respuesta: "Veja a linha “Em dias”. Ela conta todos os dias desde o nascimento até a data escolhida, sem contar esse último dia.",
      },
    ],
    glosario: [
      { termino: "Idade", definicion: "O número de anos completos desde o nascimento." },
      { termino: "Ano bissexto", definicion: "Um ano de 366 dias, com 29 de fevereiro. Vem a cada quatro anos, com exceção de alguns anos de virada de século." },
    ],
  };
};
