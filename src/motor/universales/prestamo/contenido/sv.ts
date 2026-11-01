import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { cuotaFrancesa, interesesTotales } from "../definicion";

export const contenidoSv: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const monto = montoEjemplo(ctx, 10000);
  const cuota36 = cuotaFrancesa(monto, 12, 36);
  const cuota60 = cuotaFrancesa(monto, 12, 60);
  return {
    h1: "Lånekalkyl",
    title: tituloQueEntre(
      `Lånekalkyl: räkna ut månadskostnad och ränta | ${ctx.nombrePais}`,
      `Lånekalkyl | ${ctx.nombrePais}`,
      "Lånekalkyl",
    ),
    description: "Räkna ut månadskostnaden för ett lån, den totala räntan och hela amorteringsplanen. Se hur mycket extra inbetalningar sparar dig.",
    intro: [
      "Innan du tar ett lån är två siffror viktiga. Vad du betalar varje månad och vad lånet kostar dig i ränta.",
      "Fyll i belopp, årsränta och löptid. Tänker du betala lite extra varje månad, fyll i det också så ser du hur mycket tidigare du blir klar.",
    ],
    comoSeCalcula: [
      "Kalkylen använder annuitet, alltså samma betalning varje månad. Det är vanligt för privatlån, billån och bolån.",
      "Månadsränta = årsränta ÷ 12.",
      "Månadskostnad = belopp × månadsränta ÷ (1 − (1 + månadsränta) upphöjt till minus antalet betalningar).",
      "Varje månad räknas räntan på det du har kvar att betala. Resten av betalningen är amortering och minskar skulden.",
    ],
    ejemplo: [
      `Ett lån på ${m(monto)} med 12 % årsränta och 36 månaders löptid kostar ${m(cuota36)} i månaden. Totalt betalar du ${m(interesesTotales(monto, 12, 36))} i ränta.`,
      `Förlänger du löptiden till 60 månader sjunker månadskostnaden till ${m(cuota60)}, men räntan stiger till ${m(interesesTotales(monto, 12, 60))}.`,
    ],
    faq: [
      {
        pregunta: "Hur räknas månadskostnaden på ett lån ut?",
        respuesta:
          "Med annuitetsformeln. Alla betalningar är lika stora, men i början består de mest av ränta och mot slutet mest av amortering. Därför minskar skulden långsamt i början.",
      },
      {
        pregunta: "Lönar det sig att lösa lånet i förtid?",
        respuesta:
          "Oftast ja, så länge avgiften för att lösa lånet i förtid inte är hög. Extra pengar går direkt till skulden, och den delen kostar ingen ränta längre. Ju tidigare du betalar, desto mer sparar du.",
      },
      {
        pregunta: "Är en längre löptid bättre?",
        respuesta: "Månadskostnaden blir lägre, men du betalar betydligt mer ränta totalt. Jämför båda siffrorna innan du bestämmer dig.",
      },
      {
        pregunta: "Varför räknar banken fram en annan månadskostnad?",
        respuesta:
          "Långivare lägger ofta till avgifter, försäkringar eller skatter, eller använder en annan ränta än den som annonseras. Jämför erbjudanden på den effektiva räntan och den totala kostnaden, inte bara på den nominella räntan.",
      },
    ],
    glosario: [
      { termino: "Skuld", definicion: "Den del av lånet som du inte har betalat tillbaka än." },
      { termino: "Nominell ränta", definicion: "Årsräntan som delas med 12 för att få fram räntan för varje månad." },
      { termino: "Amortering", definicion: "Den del av betalningen som minskar skulden." },
    ],
  };
};
