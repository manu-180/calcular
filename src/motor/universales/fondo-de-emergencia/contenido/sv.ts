import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoSv: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const gastos = montoEjemplo(ctx, 1500);
  const aporte = montoEjemplo(ctx, 300);
  return {
    h1: "Buffertsparande: hur stor buffert behöver du?",
    title: tituloQueEntre(
      `Buffertsparande: räkna ut din buffert | ${ctx.nombrePais}`,
      `Buffertsparande | ${ctx.nombrePais}`,
      "Buffertsparande",
    ),
    description: "Räkna ut hur stor buffert du behöver utifrån dina nödvändiga utgifter och hur många månader det tar att spara ihop den.",
    intro: [
      "En buffert är pengar undanlagda för det du inte kan planera: att bli av med jobbet, att bli sjuk eller en akut reparation hemma.",
      "Med en buffert slipper du ta krediter just när det är som tuffast. Fyll i dina nödvändiga utgifter och hur många månader du vill klara dig.",
    ],
    comoSeCalcula: [
      "Rekommenderad buffert = nödvändiga utgifter per månad × antal månader.",
      "Kvar att spara = rekommenderad buffert − det du redan har.",
      "Månader tills bufferten är klar = kvar att spara ÷ det du sparar per månad, avrundat uppåt.",
    ],
    ejemplo: [
      `Med ${m(gastos)} i nödvändiga utgifter per månad blir en buffert för 6 månader ${m(gastos * 6)}.`,
      `Sparar du ${m(aporte)} i månaden är bufferten klar efter ${Math.ceil((gastos * 6) / aporte)} månader.`,
    ],
    faq: [
      {
        pregunta: "Hur många månader ska bufferten räcka?",
        respuesta:
          "En vanlig tumregel är 3 till 6 månaders nödvändiga utgifter. Har du varierande inkomst, egen firma eller bara en inkomst i hushållet är 6 till 12 månader säkrare.",
      },
      {
        pregunta: "Var ska jag ha min buffert?",
        respuesta: "På ett säkert konto som du kommer åt samma dag, skilt från kontot du handlar från. Bufferten ska inte placeras i aktier. Den ska finnas där när du behöver den.",
      },
      {
        pregunta: "Ska jag spara till buffert eller betala av lån först?",
        respuesta: "Ett vanligt upplägg är att först spara ihop en månads utgifter, sedan betala av dyra krediter som kreditkort och därefter göra klart bufferten.",
      },
    ],
    glosario: [
      { termino: "Nödvändiga utgifter", definicion: "Räkningar du måste betala även om inkomsten försvinner: boende, mat, el och vård." },
      { termino: "Likviditet", definicion: "Hur snabbt pengarna kan användas utan att tappa i värde." },
    ],
  };
};
