import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoNl: ContenidoUniversal = (ctx) => {
  const cuenta = montoEjemplo(ctx, 60);
  const propina = cuenta * 0.15;
  const m = (n: number) => formatearMonto(ctx, n);
  return {
    h1: "Fooi berekenen",
    title: tituloQueEntre(`Fooi berekenen in ${ctx.nombrePais}`, "Fooi berekenen"),
    description: "Reken uit hoeveel fooi je geeft, wat de rekening in totaal wordt en wat ieder betaalt als je deelt. Ook met afronden naar een rond bedrag.",
    intro: [
      "Vul de rekening in, het percentage fooi en met hoeveel mensen je betaalt. Je ziet de fooi, het totaal en ieders deel.",
      "Hou je van ronde bedragen? Dan rondt de rekenhulp ieders deel naar boven af en gaat het verschil naar de fooi.",
    ],
    comoSeCalcula: [
      "Fooi = rekening × percentage fooi ÷ 100.",
      "Totaal = rekening + fooi.",
      "Ieders deel is het totaal gedeeld door het aantal mensen.",
    ],
    ejemplo: [
      `Bij een rekening van ${m(cuenta)} met 15% fooi komt er ${m(propina)} bij. Het totaal wordt ${m(cuenta + propina)}.`,
      `Deel je met 3 mensen, dan betaalt ieder ${m((cuenta + propina) / 3)}.`,
    ],
    faq: [
      {
        pregunta: "Hoeveel fooi geef je?",
        respuesta: `Dat hangt af van wat gebruikelijk is. Kijk wat normaal is in ${ctx.nombrePais} en of er al servicekosten op de rekening staan.`,
      },
      {
        pregunta: "Reken je fooi over het bedrag met of zonder btw?",
        respuesta: "De meeste mensen nemen het totaal dat op de rekening staat. Wil je liever het bedrag zonder btw nemen, vul dan dat bedrag in.",
      },
      {
        pregunta: "Hoe reken je snel 15% fooi uit?",
        respuesta: "Deel de rekening door 10, dan heb je 10%. Tel daar de helft van op. Bij 40 is dat 4 plus 2, dus 6.",
      },
    ],
    glosario: [
      { termino: "Fooi", definicion: "Een extra bedrag dat je bovenop de prijs geeft voor de bediening." },
      { termino: "Servicekosten", definicion: "Een bedrag voor de bediening dat de zaak zelf al op de rekening heeft gezet." },
    ],
  };
};
