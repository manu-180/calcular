import { formatearCifra, formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoNb: ContenidoUniversal = (ctx) => {
  const antes = montoEjemplo(ctx, 40);
  const despues = antes * 1.25;
  const m = (n: number) => formatearMonto(ctx, n);
  const c = (n: number) => formatearCifra(ctx, n);
  const subida = ((despues - antes) / antes) * 100;
  const vuelta = ((despues - antes) / despues) * 100;
  return {
    h1: "Regn ut prosentvis endring",
    title: tituloQueEntre(
      `Prosentvis endring: regn ut økning i prosent | ${ctx.nombrePais}`,
      `Prosentvis endring | ${ctx.nombrePais}`,
      "Prosentvis endring",
    ),
    description: "Regn ut hvor mange prosent en verdi har økt eller gått ned. Passer for priser, lønn, salg og alle tall som har endret seg.",
    intro: [
      "Fyll inn den gamle og den nye verdien. Du ser økningen eller nedgangen i prosent og differansen.",
      "Du ser også hvor mye verdien må endres for å komme tilbake. Det er nesten aldri den samme prosentsatsen.",
    ],
    comoSeCalcula: [
      "Prosentvis endring = (ny verdi − gammel verdi) ÷ gammel verdi × 100.",
      "Et positivt resultat betyr en økning. Et negativt betyr en nedgang.",
      "Er den gamle verdien negativ, deler vi på tallverdien, slik at fortegnet fortsatt viser om det ble bedre.",
    ],
    ejemplo: [
      `Noe som kostet ${m(antes)} og nå koster ${m(despues)}, har blitt ${c(subida)} % dyrere.`,
      `For å komme tilbake til den gamle prisen må den ned ${c(vuelta)} %, ikke ${c(subida)} %.`,
    ],
    faq: [
      {
        pregunta: "Hvordan regner jeg ut en økning i prosent?",
        respuesta: `Trekk den gamle verdien fra den nye, del på den gamle og gang med 100. Fra 80 til 100 blir det 20 ÷ 80 × 100 = ${c((20 / 80) * 100)} %.`,
      },
      {
        pregunta: "Hvordan regner jeg ut en nedgang i prosent?",
        respuesta: `Det er det samme regnestykket. Fra 100 til 80 blir det −20 ÷ 100 × 100 = −${c(20)} %, altså en nedgang på ${c(20)} %.`,
      },
      {
        pregunta: "Hvorfor opphever ikke en økning og en nedgang på 25 % hverandre?",
        respuesta: `Prosenten regnes av ulike grunntall. 80 pluss 25 % er ${c(80 * 1.25)}, men 100 minus 25 % er ${c(100 * 0.75)}.`,
      },
      {
        pregunta: "Hva er forskjellen på prosent og prosentpoeng?",
        respuesta: `Går en rente fra 10 % til 12 %, har den steget med ${c(12 - 10)} prosentpoeng. Som prosentvis endring har den økt med ${c(((12 - 10) / 10) * 100)} %.`,
      },
    ],
    glosario: [
      { termino: "Prosentvis endring", definicion: "Hvor mye en verdi har endret seg, i prosent av utgangsverdien." },
      { termino: "Prosentpoeng", definicion: "Den direkte forskjellen mellom to prosentsatser." },
    ],
  };
};
