import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { comparar } from "../definicion";

export const contenidoNl: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const precio = montoEjemplo(ctx, 200000);
  const alquiler = montoEjemplo(ctx, 1000);
  const base = { precio, entrada: 20, gastosCompra: 4, tasa: 7, aniosHipoteca: 25, alquiler, aumentoAlquiler: 3, gastosPropietario: 1.5, revalorizacion: 3, rendimiento: 5 };
  const a10 = comparar({ ...base, horizonte: 10 }).anios[9];
  const a3 = comparar({ ...base, horizonte: 3 }).anios[2];
  const quien = (a: { comprar: number; alquilar: number }) => (a.comprar >= a.alquilar ? "kopen" : "huren");
  return {
    h1: "Huren of kopen?",
    title: tituloQueEntre(`Huren of kopen in ${ctx.nombrePais}: bereken het`, `Huren of kopen in ${ctx.nombrePais}`, "Huren of kopen berekenen"),
    description: "Vergelijk huren met een huis kopen over het aantal jaar dat jij kiest. Zie wat je het meeste oplevert, vanaf welk jaar en met hoeveel verschil.",
    intro: [
      "Alleen de maandlast naast de huur leggen is niet genoeg. Een koper betaalt rente, onderhoud en belastingen, maar heeft aan het eind wel een huis. Een huurder kan zijn eigen geld belegd houden.",
      "Deze rekenhulp telt dat allemaal per jaar op en laat zien bij welke keuze je het meeste vermogen overhoudt.",
    ],
    comoSeCalcula: [
      "Kopen: elke maand betaal je de hypotheek en de kosten als eigenaar. Je vermogen is de waarde van de woning min wat je nog schuldig bent.",
      "Huren: je eigen geld en de kosten koper blijven belegd tegen het rendement dat je invult, en de huur stijgt elk jaar.",
      "Wie per maand minder uitgeeft, belegt het verschil. Zo gaan beide keuzes uit van hetzelfde budget.",
      "De beste keuze is die met het meeste vermogen aan het eind.",
    ],
    ejemplo: [
      `Een woning van ${m(precio)} met 20% eigen geld en een hypotheek tegen 7% over 25 jaar, tegenover een huur van ${m(alquiler)} per maand.`,
      `Over 10 jaar is ${quien(a10)} voordeliger, met ${m(Math.abs(a10.comprar - a10.alquilar))} verschil. Over 3 jaar is ${quien(a3)} voordeliger, met ${m(Math.abs(a3.comprar - a3.alquilar))} verschil.`,
    ],
    faq: [
      {
        pregunta: "Is huren weggegooid geld?",
        respuesta:
          "Niet helemaal. Ook een koper betaalt kosten die hij nooit terugziet: rente, belastingen en onderhoud. Het gaat erom hoeveel je in elk geval aan het eind bezit.",
      },
      {
        pregunta: "Waarom verandert de uitkomst met het aantal jaar?",
        respuesta:
          "Kopen begint met hoge kosten (kosten koper en veel rente in de eerste jaren) die je pas na een tijd terugverdient. Ga je binnenkort weer verhuizen, dan is huren meestal voordeliger.",
      },
      {
        pregunta: "Welk gegeven telt het zwaarst?",
        respuesta:
          "De verhouding tussen koopsom en huur, de hypotheekrente en hoe snel huizenprijzen stijgen. Verander de waardestijging en het rendement eens om te zien hoeveel de uitkomst verschuift.",
      },
    ],
    glosario: [
      { termino: "Vermogen", definicion: "Wat je bezit min wat je schuldig bent." },
      { termino: "Waardestijging", definicion: "Hoeveel de waarde van de woning elk jaar stijgt." },
      { termino: "Kosten koper", definicion: "De bijkomende kosten bij het kopen van een woning, zoals notaris en belastingen." },
    ],
  };
};
