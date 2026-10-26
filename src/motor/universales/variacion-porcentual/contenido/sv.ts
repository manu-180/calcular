import { formatearCifra, formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoSv: ContenidoUniversal = (ctx) => {
  const antes = montoEjemplo(ctx, 40);
  const despues = antes * 1.25;
  const m = (n: number) => formatearMonto(ctx, n);
  const c = (n: number) => formatearCifra(ctx, n);
  const subida = ((despues - antes) / antes) * 100;
  const vuelta = ((despues - antes) / despues) * 100;
  return {
    h1: "Räkna ut procentuell förändring",
    title: tituloQueEntre(
      `Procentuell förändring: räkna ut ökning i procent | ${ctx.nombrePais}`,
      `Procentuell förändring | ${ctx.nombrePais}`,
      "Procentuell förändring",
    ),
    description: "Räkna ut hur många procent ett värde har ökat eller minskat. Fungerar för priser, lön, försäljning och alla tal som har förändrats.",
    intro: [
      "Fyll i det gamla och det nya värdet. Du ser ökningen eller minskningen i procent och skillnaden.",
      "Du ser också hur mycket värdet måste ändras för att komma tillbaka. Det är nästan aldrig samma procentsats.",
    ],
    comoSeCalcula: [
      "Procentuell förändring = (nytt värde − gammalt värde) ÷ gammalt värde × 100.",
      "Ett positivt resultat betyder en ökning. Ett negativt betyder en minskning.",
      "Är det gamla värdet negativt delar vi med dess absolutbelopp, så att tecknet fortfarande visar om det blev bättre.",
    ],
    ejemplo: [
      `Något som kostade ${m(antes)} och nu kostar ${m(despues)} har blivit ${c(subida)} % dyrare.`,
      `För att komma tillbaka till det gamla priset måste det sjunka med ${c(vuelta)} %, inte ${c(subida)} %.`,
    ],
    faq: [
      {
        pregunta: "Hur räknar jag ut en ökning i procent?",
        respuesta: `Dra det gamla värdet från det nya, dela med det gamla och multiplicera med 100. Från 80 till 100 blir det 20 ÷ 80 × 100 = ${c((20 / 80) * 100)} %.`,
      },
      {
        pregunta: "Hur räknar jag ut en minskning i procent?",
        respuesta: `Det är samma räkning. Från 100 till 80 blir det −20 ÷ 100 × 100 = −${c(20)} %, alltså en minskning med ${c(20)} %.`,
      },
      {
        pregunta: "Varför tar en ökning och en minskning på 25 % inte ut varandra?",
        respuesta: `Procenten räknas på olika baser. 80 plus 25 % är ${c(80 * 1.25)}, men 100 minus 25 % är ${c(100 * 0.75)}.`,
      },
      {
        pregunta: "Vad är skillnaden mellan procent och procentenheter?",
        respuesta: `Om en ränta går från 10 % till 12 % har den stigit med ${c(12 - 10)} procentenheter. Som procentuell förändring har den ökat med ${c(((12 - 10) / 10) * 100)} %.`,
      },
    ],
    glosario: [
      { termino: "Procentuell förändring", definicion: "Hur mycket ett värde har ändrats, i procent av utgångsvärdet." },
      { termino: "Procentenhet", definicion: "Den raka skillnaden mellan två procentsatser." },
    ],
  };
};
