import { formatearCifra, formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { aumentoReal } from "../definicion";

export const contenidoIs: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const p = (n: number) => `${formatearNumero(ctx, n, 2)}%`;
  const sueldo = montoEjemplo(ctx, 4000);
  return {
    h1: "Reiknaðu launahækkun",
    title: tituloQueEntre(
      `Launahækkun: reiknaðu ný laun og raunhækkun | ${ctx.nombrePais}`,
      `Launahækkun | ${ctx.nombrePais}`,
      "Launahækkun",
    ),
    description: "Reiknaðu nýju launin eftir launahækkun, muninn á mánuði og á ári og hvort hækkunin er umfram verðbólgu.",
    intro: [
      "Þú hefur fengið tilboð um hækkun eða ert á leið í launaviðtal. Sláðu inn launin og hækkunina, í prósentum eða sem upphæð, og sjáðu hve miklu munar á mánuði og á ári.",
      "Bættu verðbólgu tímabilsins við og þá sérðu hvort kaupmátturinn eykst í raun eða hvort þú ert bara að ná verðbólgunni.",
    ],
    comoSeCalcula: [
      "Ný laun = núverandi laun × (1 + launahækkun ÷ 100).",
      "Munur á ári = munur á mánuði × fjöldi launagreiðslna á ári.",
      "Raunhækkun = (1 + launahækkun) ÷ (1 + verðbólga) − 1.",
    ],
    ejemplo: [
      `Mánaðarlaun upp á ${m(sueldo)} með 5% hækkun verða ${m(sueldo * 1.05)}. Það eru ${m(sueldo * 0.05)} meira á mánuði og ${m(sueldo * 0.05 * 12)} meira á ári.`,
      `Ef verðbólgan var 3% á tímabilinu er raunhækkunin ${p(aumentoReal(5, 3))}. Með 6% verðbólgu er hún ${p(aumentoReal(5, 6))}.`,
    ],
    faq: [
      {
        pregunta: "Hvað er raunhækkun launa?",
        respuesta: "Launahækkunin eftir verðbólgu. Hún sýnir hvort nýju launin duga fyrir meira eða minna en áður.",
      },
      {
        pregunta: "Af hverju get ég ekki bara dregið verðbólguna frá hækkuninni?",
        respuesta: `Af því að prósenturnar margfaldast, þær leggjast ekki saman. Með 5% launahækkun og 3% verðbólgu er raunhækkunin ${p(aumentoReal(5, 3))}, ekki ${formatearCifra(ctx, 5 - 3)}%. Þegar verðbólgan er mikil verður munurinn mun meiri.`,
      },
      {
        pregunta: "Hve mikla launahækkun ætti ég að biðja um?",
        respuesta: "Að minnsta kosti verðbólguna frá síðustu hækkun, svo að þú dragist ekki aftur úr. Umfram það geturðu miðað við hvað aðrir vinnuveitendur greiða fyrir sambærileg störf og hvernig starf þitt hefur þróast.",
      },
    ],
    glosario: [
      { termino: "Nafnhækkun launa", definicion: "Launahækkunin eins og hún birtist á launaseðlinum, fyrir verðbólgu." },
      { termino: "Kaupmáttur", definicion: "Hvað launin þín duga fyrir." },
    ],
  };
};
