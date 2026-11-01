import { formatearCifra, formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoDa: ContenidoUniversal = (ctx) => {
  const antes = montoEjemplo(ctx, 40);
  const despues = antes * 1.25;
  const m = (n: number) => formatearMonto(ctx, n);
  const c = (n: number) => formatearCifra(ctx, n);
  const subida = ((despues - antes) / antes) * 100;
  const vuelta = ((despues - antes) / despues) * 100;
  return {
    h1: "Beregn procentvis ændring",
    title: tituloQueEntre(
      `Procentvis ændring: beregn stigning i procent | ${ctx.nombrePais}`,
      `Procentvis ændring | ${ctx.nombrePais}`,
      "Procentvis ændring",
    ),
    description: "Beregn hvor mange procent en værdi er steget eller faldet. Det virker for priser, løn, salg og alle andre tal, der har ændret sig.",
    intro: [
      "Skriv den gamle og den nye værdi. Du ser stigningen eller faldet i procent og forskellen i tal.",
      "Du ser også, hvor meget værdien skal ændre sig for at komme tilbage. Det er næsten aldrig den samme procentsats.",
    ],
    comoSeCalcula: [
      "Procentvis ændring = (ny værdi − gammel værdi) ÷ gammel værdi × 100.",
      "Et positivt resultat betyder en stigning. Et negativt betyder et fald.",
      "Er den gamle værdi negativ, deler vi med dens numeriske værdi, så fortegnet stadig viser, om det gik den rigtige vej.",
    ],
    ejemplo: [
      `Noget, der kostede ${m(antes)} og nu koster ${m(despues)}, er blevet ${c(subida)} % dyrere.`,
      `For at komme tilbage til den gamle pris skal den falde med ${c(vuelta)} %, ikke ${c(subida)} %.`,
    ],
    faq: [
      {
        pregunta: "Hvordan beregner jeg en stigning i procent?",
        respuesta: `Træk den gamle værdi fra den nye, del med den gamle, og gang med 100. Fra 80 til 100 er det 20 ÷ 80 × 100 = ${c((20 / 80) * 100)} %.`,
      },
      {
        pregunta: "Hvordan beregner jeg et fald i procent?",
        respuesta: `Det er samme regnestykke. Fra 100 til 80 er det −20 ÷ 100 × 100 = −${c(20)} %, altså et fald på ${c(20)} %.`,
      },
      {
        pregunta: "Hvorfor ophæver en stigning og et fald på 25 % ikke hinanden?",
        respuesta: `Procenten regnes af forskellige grundtal. 80 plus 25 % er ${c(80 * 1.25)}, men 100 minus 25 % er ${c(100 * 0.75)}.`,
      },
      {
        pregunta: "Hvad er forskellen på procent og procentpoint?",
        respuesta: `Går en rente fra 10 % til 12 %, er den steget med ${c(12 - 10)} procentpoint. Som procentvis ændring er den steget med ${c(((12 - 10) / 10) * 100)} %.`,
      },
    ],
    glosario: [
      { termino: "Procentvis ændring", definicion: "Hvor meget en værdi har ændret sig, i procent af udgangsværdien." },
      { termino: "Procentpoint", definicion: "Den direkte forskel mellem to procentsatser." },
    ],
  };
};
