import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoNl: ContenidoUniversal = (ctx) => {
  const precio = montoEjemplo(ctx, 80);
  const m = (n: number) => formatearMonto(ctx, n);
  return {
    h1: "Korting berekenen",
    title: tituloQueEntre(`Korting berekenen in ${ctx.nombrePais}`, "Korting berekenen"),
    description: "Bereken snel wat je betaalt na korting en hoeveel je bespaart. Ook voor stapelkorting, zoals 30% plus 10% extra.",
    intro: [
      "Vul de prijs en de korting in en je ziet meteen wat je betaalt en hoeveel je bespaart.",
      "Krijg je nog een extra korting bovenop de eerste? Vul die ook in. Twee kortingen na elkaar tel je namelijk nooit gewoon op.",
    ],
    comoSeCalcula: [
      "Prijs na korting = oorspronkelijke prijs × (1 − korting ÷ 100).",
      "Een extra korting gaat af van de prijs waar de eerste korting al vanaf is.",
      "Je besparing is de oorspronkelijke prijs min de prijs na korting.",
    ],
    ejemplo: [
      `Een artikel van ${m(precio)} met 25% korting kost nog ${m(precio * 0.75)}.`,
      `Met 30% korting en daarna nog 10% extra betaal je ${m(precio * 0.7 * 0.9)}. Dat is in totaal 37% korting, geen 40%.`,
    ],
    faq: [
      {
        pregunta: "Hoe reken je korting uit?",
        respuesta: "Vermenigvuldig de prijs met het percentage en deel door 100. Dat is je korting. Trek die af van de prijs en je weet wat je betaalt.",
      },
      {
        pregunta: "Is 30% plus 10% korting hetzelfde als 40%?",
        respuesta: "Nee. De tweede korting gaat af van de prijs die al verlaagd is. Samen is dat 37% korting.",
      },
      {
        pregunta: "Hoe reken je terug naar de prijs zonder korting?",
        respuesta: `Deel de prijs na korting door (1 − korting ÷ 100). Bij 25% korting deel je door ${formatearNumero(ctx, 0.75, 2)}.`,
      },
    ],
    glosario: [
      { termino: "Korting", definicion: "Het percentage dat van de oorspronkelijke prijs af gaat." },
      { termino: "Stapelkorting", definicion: "Twee of meer kortingen die na elkaar gelden. Samen zijn ze minder dan de optelsom." },
    ],
  };
};
