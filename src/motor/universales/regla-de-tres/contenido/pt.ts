import { esPortuguesEuropeo } from "../../comun/locales";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoPt: ContenidoUniversal = (ctx) => {
  const precio3 = montoEjemplo(ctx, 6);
  const m = (n: number) => formatearMonto(ctx, n);
  const pt = esPortuguesEuropeo(ctx.locale);
  return {
    h1: "Calculadora de regra de três",
    title: tituloQueEntre(`Regra de três: calculadora online (${ctx.nombrePais})`, `Regra de três (${ctx.nombrePais})`, "Calculadora de regra de três"),
    description: "Resolva uma regra de três simples, direta ou inversa, em um segundo. Coloque três valores e veja o quarto, com a conta.",
    intro: [
      "A regra de três serve quando duas grandezas variam juntas e você conhece três dos quatro valores.",
      "Escolha direta ou inversa, preencha A, B e C, e a calculadora mostra X.",
    ],
    comoSeCalcula: [
      "Direta: X = B × C ÷ A. Use quando as duas grandezas crescem juntas (mais quilos, preço maior).",
      "Inversa: X = A × B ÷ C. Use quando uma cresce e a outra diminui (mais pessoas, menos dias).",
    ],
    ejemplo: [
      `Se 3 quilos custam ${m(precio3)}, 5 quilos custam ${m((precio3 * 5) / 3)}.`,
      "Se 4 pessoas pintam uma casa em 12 dias, 6 pessoas pintam em 8 dias.",
    ],
    faq: [
      {
        pregunta: "Como saber se a regra de três é direta ou inversa?",
        respuesta: "Se uma grandeza aumenta quando a outra aumenta, é direta. Se uma diminui quando a outra aumenta, é inversa.",
      },
      {
        pregunta: "Como fazer a regra de três simples à mão?",
        respuesta: `Multiplique em cruz os dois valores conhecidos da diagonal e divida pelo que sobra. Se 3 está para 600, 5 está para 600 × 5 ÷ 3 = ${formatearNumero(ctx, 1000)}.`,
      },
      {
        pregunta: pt ? "Serve para calcular percentagens?" : "Dá para usar com porcentagem?",
        respuesta: "Sim. Se 200 é 100%, 50 é 25%: é uma regra de três direta com A = 200, B = 100 e C = 50.",
      },
    ],
    glosario: [
      { termino: "Grandezas diretamente proporcionais", definicion: "As duas aumentam ou diminuem juntas." },
      { termino: "Grandezas inversamente proporcionais", definicion: "Quando uma aumenta, a outra diminui." },
    ],
  };
};
