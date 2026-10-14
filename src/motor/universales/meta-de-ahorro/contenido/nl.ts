import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { aporteNecesario } from "../definicion";

export const contenidoNl: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const meta = montoEjemplo(ctx, 10000);
  const actual = montoEjemplo(ctx, 1000);
  return {
    h1: "Spaardoel berekenen",
    title: tituloQueEntre(`Spaardoel berekenen in ${ctx.nombrePais}`, "Spaardoel berekenen"),
    description: "Bereken hoeveel je per maand moet sparen om je doelbedrag op tijd te halen. Met wat je al hebt en wat je spaargeld oplevert.",
    intro: [
      "Een reis, een auto, eigen geld voor een huis of een buffer voor tegenvallers. Een doel met een bedrag en een datum haal je veel makkelijker.",
      "Vul in hoeveel je wilt sparen en in hoeveel maanden. Je ziet hoeveel je per maand en per week opzij moet zetten.",
    ],
    comoSeCalcula: [
      "Eerst rekent de rekenhulp uit hoeveel je huidige spaargeld aan het eind van de periode gegroeid is.",
      "Wat dan nog ontbreekt, wordt verdeeld over gelijke bedragen per maand.",
      "Levert je spaargeld rente op, dan groeit elke inleg ook mee. Je hoeft dan iets minder in te leggen.",
    ],
    ejemplo: [
      `Om ${m(meta)} te sparen in 24 maanden zonder rente heb je ${m(meta / 24)} per maand nodig.`,
      `Heb je al ${m(actual)} gespaard en levert je spaargeld 5% per jaar op, dan is ${m(aporteNecesario(meta, actual, 24, 5))} per maand genoeg.`,
    ],
    faq: [
      {
        pregunta: "Hoe hou je je spaardoel vol?",
        respuesta: "Zet het geld apart zodra je salaris binnen is, voordat je iets anders uitgeeft. Stel als het kan een automatische overboeking in naar een aparte spaarrekening.",
      },
      {
        pregunta: "Wat als het bedrag per maand te hoog is?",
        respuesta: "Geef jezelf meer tijd of verlaag je doel. Je kunt ook beginnen met wat je nu kunt missen en dat verhogen als je meer gaat verdienen.",
      },
      {
        pregunta: "Moet je rekening houden met inflatie?",
        respuesta: "Ligt je doel een paar jaar weg, tel de verwachte inflatie dan bij het bedrag op. Wat vandaag 100 kost, kan tegen die tijd een stuk duurder zijn.",
      },
    ],
    glosario: [
      { termino: "Inleg", definicion: "Het geld dat je elke maand voor je doel opzij zet." },
      { termino: "Rendement", definicion: "Wat je spaargeld oplevert op een spaarrekening of in een belegging." },
    ],
  };
};
