import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoNl: ContenidoUniversal = (ctx) => {
  const antes = montoEjemplo(ctx, 40);
  const despues = antes * 1.25;
  const terug = ((antes - despues) / despues) * -100;
  const m = (n: number) => formatearMonto(ctx, n);
  const n = (x: number) => formatearNumero(ctx, x);
  return {
    h1: "Procentuele verandering berekenen",
    title: tituloQueEntre(
      `Procentuele verandering berekenen in ${ctx.nombrePais}`,
      `Procentuele verandering in ${ctx.nombrePais}`,
      "Procentuele verandering berekenen",
    ),
    description: "Reken uit met hoeveel procent iets gestegen of gedaald is: prijzen, salaris, omzet of elk ander getal dat in de loop van de tijd veranderde.",
    intro: [
      "Vul de oude en de nieuwe waarde in. Je ziet de procentuele stijging of daling en het verschil.",
      "Je ziet ook hoeveel het moet veranderen om weer bij het begin uit te komen. Dat is bijna nooit hetzelfde percentage.",
    ],
    comoSeCalcula: [
      "Procentuele verandering = (nieuwe waarde − oude waarde) ÷ oude waarde × 100.",
      "Een positieve uitkomst is een stijging. Een negatieve uitkomst is een daling.",
      "Is de oude waarde negatief, dan deel je door de absolute waarde. Zo zegt het teken nog steeds of het beter of slechter werd.",
    ],
    ejemplo: [
      `Kostte iets eerst ${m(antes)} en nu ${m(despues)}, dan is het 25% duurder geworden.`,
      `Om terug te gaan naar de oude prijs moet het ${n(terug)}% omlaag, geen 25%.`,
    ],
    faq: [
      {
        pregunta: "Hoe bereken je een procentuele stijging?",
        respuesta: `Trek de oude waarde af van de nieuwe, deel door de oude waarde en vermenigvuldig met 100. Van 80 naar 100: 20 ÷ 80 × 100 = ${n((20 / 80) * 100)}%.`,
      },
      {
        pregunta: "Hoe bereken je een procentuele daling?",
        respuesta: `Met dezelfde som. Van 100 naar 80: −20 ÷ 100 × 100 = ${n((-20 / 100) * 100)}%. Het is dus 20% gedaald.`,
      },
      {
        pregunta: "Waarom heffen 25% erbij en 25% eraf elkaar niet op?",
        respuesta: `Elk percentage gaat over een ander getal. 80 plus 25% is 100, maar 100 min 25% is ${n(100 * 0.75)}.`,
      },
      {
        pregunta: "Wat is het verschil tussen procent en procentpunt?",
        respuesta: "Gaat een rente van 10% naar 12%, dan is die 2 procentpunt gestegen. Als procentuele verandering is dat 20%.",
      },
    ],
    glosario: [
      { termino: "Procentuele verandering", definicion: "Hoeveel een waarde veranderde, als percentage van waar ze begon." },
      { termino: "Procentpunt", definicion: "Het gewone verschil tussen twee percentages." },
    ],
  };
};
