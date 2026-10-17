import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { cuotaFrancesa, interesesTotales } from "../../prestamo/definicion";

export const contenidoNl: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const precio = montoEjemplo(ctx, 200000);
  const prestado = precio * 0.8;
  const cuota30 = cuotaFrancesa(prestado, 7, 360);
  const cuota15 = cuotaFrancesa(prestado, 7, 180);
  const belgie = ctx.locale.endsWith("BE");
  const lening = belgie ? "woonkrediet" : "hypotheek";
  return {
    h1: "Hypotheek berekenen",
    title: tituloQueEntre(`Hypotheek berekenen in ${ctx.nombrePais}`, "Hypotheek berekenen"),
    description: "Bereken je maandlast met de koopsom, je eigen geld, de rente en de looptijd. Zie de totale rente en hoe je restschuld elk jaar daalt.",
    intro: [
      `Een ${lening} is voor de meeste mensen de grootste schuld die ze ooit aangaan. Het loont om alle bedragen te zien voordat je met een geldverstrekker praat.`,
      "Vul de koopsom in, je eigen geld, de rente en de looptijd. Betaal je ook belastingen of verzekeringen voor je woning? Tel die erbij op, dan zie je je echte maandlast.",
    ],
    comoSeCalcula: [
      "Hypotheekbedrag = koopsom − eigen geld.",
      "De rekenhulp gaat uit van een annuïteitenhypotheek: elke maand hetzelfde bedrag, berekend met de jaarrente gedeeld door 12 en de looptijd in maanden.",
      "Per jaar telt de rekenhulp de betaalde rente en aflossing op en laat zien wat je nog schuldig bent.",
    ],
    ejemplo: [
      `Bij een woning van ${m(precio)} met 20% eigen geld leen je ${m(prestado)}. Tegen 7% rente over 30 jaar is je bruto maandlast ${m(cuota30)}.`,
      `Over 30 jaar betaal je ${m(interesesTotales(prestado, 7, 360))} aan rente. Over 15 jaar stijgt je maandlast naar ${m(cuota15)}, maar zakt de rente naar ${m(interesesTotales(prestado, 7, 180))}.`,
    ],
    faq: [
      {
        pregunta: "Hoeveel eigen geld heb je nodig?",
        respuesta:
          "Dat hangt af van de geldverstrekker en het land. Hoe meer eigen geld je inbrengt, hoe minder je leent, hoe lager je maandlast en hoe minder rente je betaalt. Hou ook geld achter de hand voor de bijkomende kosten.",
      },
      {
        pregunta: "Waarom daalt je restschuld de eerste jaren zo weinig?",
        respuesta:
          "Je betaalt rente over wat je nog schuldig bent. In het begin is dat veel, dus gaat het grootste deel van je maandlast naar rente. Later draait dat om.",
      },
      {
        pregunta: "Is een kortere looptijd beter?",
        respuesta:
          "Als je de hogere maandlast kunt betalen, wel: je betaalt veel minder rente. Lukt dat niet, dan werkt een langere looptijd met af en toe extra aflossen ook.",
      },
      {
        pregunta: "Is dit mijn netto maandlast?",
        respuesta:
          "Nee, het is de bruto maandlast. Een belastingvoordeel, zoals aftrek van de hypotheekrente, zit er niet in. De rekenhulp gaat er ook van uit dat de rente de hele looptijd gelijk blijft.",
      },
    ],
    glosario: [
      { termino: "Eigen geld", definicion: "Het deel van de koopsom dat je zelf betaalt uit je spaargeld." },
      { termino: "Annuïteitenhypotheek", definicion: "Een hypotheek met elke maand hetzelfde bruto bedrag. In het begin betaal je vooral rente, later vooral aflossing." },
      { termino: "Restschuld", definicion: "Wat je nog schuldig bent op de hypotheek." },
    ],
  };
};
