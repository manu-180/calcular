import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoHr: ContenidoUniversal = (ctx) => {
  const antes = montoEjemplo(ctx, 40);
  const despues = antes * 1.25;
  const m = (n: number) => formatearMonto(ctx, n);
  return {
    h1: "Kalkulator postotne promjene",
    title: tituloQueEntre(
      `Postotna promjena: kalkulator ${GRAMATICA.hr.para(ctx.nombrePais)}`,
      "Za koliko posto: postotna promjena",
      "Kalkulator postotne promjene",
    ),
    description: "Izračunajte za koliko je posto vrijednost porasla ili pala: cijene, plaće, prihodi ili bilo koji broj koji se promijenio tijekom vremena.",
    intro: [
      "Unesite početnu i novu vrijednost. Dobivate postotni rast ili pad i razliku između njih.",
      "Kalkulator pokazuje i za koliko bi se vrijednost morala promijeniti da bi se vratila na početnu. To gotovo nikad nije isti postotak.",
    ],
    comoSeCalcula: [
      "Postotna promjena = (nova vrijednost − početna vrijednost) ÷ početna vrijednost × 100.",
      "Pozitivan rezultat znači rast, a negativan pad.",
      "Ako je početna vrijednost negativna, dijeli se njezinom apsolutnom vrijednošću, kako bi predznak i dalje pokazivao je li se stanje popravilo.",
    ],
    ejemplo: [
      `Ono što je koštalo ${m(antes)}, a sada košta ${m(despues)}, poskupjelo je za 25 %.`,
      "Da bi se cijena vratila na početnu, morala bi pasti za 20 %, a ne za 25 %.",
    ],
    faq: [
      {
        pregunta: "Kako se računa postotni rast?",
        respuesta: "Od nove vrijednosti oduzmite početnu, razliku podijelite početnom vrijednošću i pomnožite brojem 100. S 80 na 100: 20 ÷ 80 × 100 = 25 %.",
      },
      {
        pregunta: "Kako se računa postotni pad?",
        respuesta: "Na isti način. Sa 100 na 80: −20 ÷ 100 × 100 = −20 %, dakle vrijednost je pala za 20 %.",
      },
      {
        pregunta: "Zašto se rast od 25 % i pad od 25 % ne poništavaju?",
        respuesta: "Svaki se postotak računa od druge osnovice. 80 uvećano za 25 % iznosi 100, ali 100 umanjeno za 25 % iznosi 75.",
      },
      {
        pregunta: "Koja je razlika između postotka i postotnog boda?",
        respuesta: "Kada stopa poraste s 10 % na 12 %, porasla je za 2 postotna boda. Postotno je porasla za 20 %.",
      },
    ],
    glosario: [
      { termino: "Postotna promjena", definicion: "Za koliko se vrijednost promijenila, izraženo u postocima početne vrijednosti." },
      { termino: "Postotni bod", definicion: "Obična razlika između dva postotka." },
    ],
  };
};
