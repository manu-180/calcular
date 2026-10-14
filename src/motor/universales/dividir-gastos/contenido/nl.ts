import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoNl: ContenidoUniversal = (ctx) => {
  const a = montoEjemplo(ctx, 90);
  const b = montoEjemplo(ctx, 30);
  const cuota = (a + b) / 3;
  const m = (n: number) => formatearMonto(ctx, n);
  return {
    h1: "Kosten verdelen",
    title: tituloQueEntre(`Kosten verdelen in ${ctx.nombrePais}`, "Kosten verdelen"),
    description: "Verdeel gedeelde kosten over maximaal 8 mensen. Je ziet ieders deel en wie wie moet betalen, met zo min mogelijk overboekingen.",
    intro: [
      "Handig na een weekendje weg, een etentje, een feest of een vakantiehuis waarvoor iedereen iets anders heeft betaald.",
      "Vul in wat ieder betaald heeft. Je krijgt ieders deel en de betalingen waarmee jullie quitte staan.",
    ],
    comoSeCalcula: [
      "Ieders deel = totaal uitgegeven ÷ aantal mensen.",
      "Wie minder betaalde dan zijn deel, betaalt het verschil bij. Wie meer betaalde, krijgt het terug.",
      "De grootste schuld gaat eerst naar wie het meest tegoed heeft. Zo maakt niemand onnodige overboekingen.",
    ],
    ejemplo: [
      `Anna betaalde ${m(a)}, Bram ${m(b)} en Sanne niets. Het totaal is ${m(a + b)}, dus ieders deel is ${m(cuota)}.`,
      `Sanne betaalt Anna ${m(cuota)} en Bram betaalt Anna ${m(cuota - b)}.`,
    ],
    faq: [
      {
        pregunta: "Hoe verdeel je kosten als iedereen iets anders betaalde?",
        respuesta: "Tel alles op, deel door het aantal mensen en vergelijk dat met wat ieder betaald heeft. Het verschil is wat iemand moet bijbetalen of terugkrijgt.",
      },
      {
        pregunta: "En als iemand niets betaald heeft?",
        respuesta: "Vul voor die persoon 0 in, dan telt hij mee in de verdeling. Laat je het vak leeg, dan doet hij niet mee.",
      },
      {
        pregunta: "Waarom zijn er minder betalingen dan mensen?",
        respuesta: "De schulden worden slim samengevoegd: wie het meest moet, betaalt wie het meest voorschoot, en zo verder. Je hebt nooit meer betalingen nodig dan het aantal mensen min één.",
      },
    ],
    glosario: [
      { termino: "Ieders deel", definicion: "Wat ieder van het totaal hoort te betalen." },
      { termino: "Saldo", definicion: "Het verschil tussen wat iemand betaalde en zijn deel." },
    ],
  };
};
