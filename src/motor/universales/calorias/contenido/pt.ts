import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { DEFICIT, FACTORES, mifflin, SUPERAVIT } from "../definicion";

export const contenidoPt: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 0) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const ejemplo = imperial
    ? (() => {
        const basal = mifflin("hombre", 35, 180 * 0.45359237, 70 * 2.54);
        return [
          `Um homem de 35 anos, com 180 lb e 5 ft 10 in de altura, tem uma taxa metabólica basal de cerca de ${n(basal)} kcal.`,
          `Com pouca atividade, ele mantém o peso com cerca de ${n(basal * FACTORES.sedentaria)} kcal por dia.`,
        ];
      })()
    : (() => {
        const basal = mifflin("mujer", 30, 60, 165);
        return [
          `Uma mulher de 30 anos, com 60 kg e 165 cm de altura, tem uma taxa metabólica basal de cerca de ${n(basal)} kcal.`,
          `Com atividade moderada, ela mantém o peso com cerca de ${n(basal * FACTORES.moderada)} kcal por dia.`,
        ];
      })();
  return {
    h1: "Calculadora de calorias diárias",
    title: tituloQueEntre(`Calculadora de calorias diárias (${ctx.nombrePais})`, "Calculadora de calorias diárias", "Calculadora de calorias"),
    description: "Calcule quantas calorias você gasta por dia com a idade, o peso, a altura e a atividade, e quanto comer para manter, perder ou ganhar peso.",
    intro: [
      "Preencha os seus dados e o seu nível de atividade. Você vê a sua taxa metabólica basal e as calorias que gasta num dia normal.",
      "É uma estimativa aproximada. Não substitui a consulta com um profissional de saúde ou nutrição.",
    ],
    comoSeCalcula: [
      `Taxa metabólica basal (Mifflin-St Jeor): 10 × peso em kg + ${n(6.25, 2)} × altura em cm − 5 × idade, mais 5 para homens ou menos 161 para mulheres.`,
      `Calorias de manutenção = taxa basal × fator de atividade, de ${n(1.2, 1)} (pouca atividade) a ${n(1.9, 1)} (muito alta).`,
      `Para perder peso, tira ${DEFICIT} kcal por dia, e para ganhar, soma ${SUPERAVIT}: uma mudança moderada e possível de manter.`,
    ],
    ejemplo,
    faq: [
      {
        pregunta: "O que é a taxa metabólica basal?",
        respuesta: "É a energia que o corpo usa em repouso total para respirar, manter a temperatura e fazer os órgãos funcionarem.",
      },
      {
        pregunta: "Quantas calorias devo comer para emagrecer?",
        respuesta: `Um ponto de partida comum é cerca de ${DEFICIT} kcal por dia abaixo da manutenção. O ideal é definir isso com um profissional.`,
      },
      {
        pregunta: "A fórmula é precisa?",
        respuesta: "A de Mifflin-St Jeor é uma das mais usadas, mas dá uma média. Genética, massa muscular e saúde mudam o que você gasta de verdade.",
      },
    ],
    glosario: [
      { termino: "Caloria (kcal)", definicion: "A unidade de energia dos alimentos e do que o corpo gasta." },
      { termino: "Taxa metabólica basal", definicion: "As calorias que o corpo gasta em repouso total." },
    ],
  };
};
