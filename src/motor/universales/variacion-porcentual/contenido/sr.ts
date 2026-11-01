import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoSr: ContenidoUniversal = (ctx) => {
  const antes = montoEjemplo(ctx, 40);
  const despues = antes * 1.25;
  const m = (n: number) => formatearMonto(ctx, n);
  return {
    h1: "Kalkulator procentualne promene",
    title: tituloQueEntre(
      `Procentualna promena: kalkulator ${GRAMATICA.sr.para(ctx.nombrePais)}`,
      "Za koliko procenata: procentualna promena",
      "Kalkulator procentualne promene",
    ),
    description: "Izračunajte za koliko procenata je vrednost porasla ili pala: cene, plate, prihodi ili bilo koji broj koji se promenio tokom vremena.",
    intro: [
      "Unesite početnu i novu vrednost. Dobijate procentualni rast ili pad i razliku između njih.",
      "Kalkulator pokazuje i za koliko bi vrednost morala da se promeni da bi se vratila na početnu. To skoro nikad nije isti procenat.",
    ],
    comoSeCalcula: [
      "Procentualna promena = (nova vrednost − početna vrednost) ÷ početna vrednost × 100.",
      "Pozitivan rezultat znači rast, a negativan pad.",
      "Ako je početna vrednost negativna, deli se njenom apsolutnom vrednošću, da bi znak i dalje pokazivao da li se stanje popravilo.",
    ],
    ejemplo: [
      `Ono što je koštalo ${m(antes)}, a sada košta ${m(despues)}, poskupelo je za 25%.`,
      "Da bi se cena vratila na početnu, morala bi da padne za 20%, a ne za 25%.",
    ],
    faq: [
      {
        pregunta: "Kako se računa procentualni rast?",
        respuesta: "Od nove vrednosti oduzmite početnu, razliku podelite početnom vrednošću i pomnožite sa 100. Sa 80 na 100: 20 ÷ 80 × 100 = 25%.",
      },
      {
        pregunta: "Kako se računa procentualni pad?",
        respuesta: "Na isti način. Sa 100 na 80: −20 ÷ 100 × 100 = −20%, dakle vrednost je pala za 20%.",
      },
      {
        pregunta: "Zašto se rast od 25% i pad od 25% ne poništavaju?",
        respuesta: "Svaki procenat se računa od druge osnovice. 80 uvećano za 25% je 100, ali 100 umanjeno za 25% je 75.",
      },
      {
        pregunta: "Koja je razlika između procenta i procentnog poena?",
        respuesta: "Kada stopa poraste sa 10% na 12%, porasla je za 2 procentna poena. Procentualno je porasla za 20%.",
      },
    ],
    glosario: [
      { termino: "Procentualna promena", definicion: "Za koliko se vrednost promenila, izraženo u procentima početne vrednosti." },
      { termino: "Procentni poen", definicion: "Obična razlika između dva procenta." },
    ],
  };
};
