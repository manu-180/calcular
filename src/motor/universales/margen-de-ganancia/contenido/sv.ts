import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { precioConMargen } from "../definicion";

export const contenidoSv: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const p = (n: number) => `${formatearNumero(ctx, n, 2)} %`;
  const costo = montoEjemplo(ctx, 60);
  const precio = montoEjemplo(ctx, 100);
  const margenDePaslag50 = ((costo * 1.5 - costo) / (costo * 1.5)) * 100;
  return {
    h1: "Marginalkalkylator",
    title: tituloQueEntre(
      `Marginalkalkylator: räkna ut marginal och påslag | ${ctx.nombrePais}`,
      `Marginalkalkylator | ${ctx.nombrePais}`,
      "Marginalkalkylator",
    ),
    description: "Räkna ut marginal och påslag utifrån kostnad och pris, eller vilket försäljningspris du behöver för att nå den marginal du vill ha.",
    intro: [
      "Marginal och påslag blandas ofta ihop, och skillnaden kan kosta dig pengar. Båda mäter samma vinst, men i förhållande till olika belopp.",
      "Fyll i kostnad och pris så ser du båda. Eller välj en marginal så får du veta vad du ska ta betalt.",
    ],
    comoSeCalcula: [
      "Vinst = pris − kostnad.",
      "Marginal = vinst ÷ pris × 100.",
      "Påslag = vinst ÷ kostnad × 100.",
      "Pris för en viss marginal = kostnad ÷ (1 − marginal ÷ 100).",
    ],
    ejemplo: [
      `En vara som kostar ${m(costo)} och säljs för ${m(precio)} ger ${m(precio - costo)} i vinst. Det är en marginal på ${p(((precio - costo) / precio) * 100)} och ett påslag på ${p(((precio - costo) / costo) * 100)}.`,
      `För att få 50 % marginal på den kostnaden behöver du sälja för ${m(precioConMargen(costo, 50))}. Lägger du bara på 50 % på kostnaden blir marginalen ${p(margenDePaslag50)}.`,
    ],
    faq: [
      {
        pregunta: "Vad är skillnaden mellan marginal och påslag?",
        respuesta: "Marginalen är vinsten i förhållande till försäljningspriset. Påslaget är vinsten i förhållande till kostnaden. För samma vinst är påslaget alltid den högre siffran.",
      },
      {
        pregunta: "Hur sätter jag ett pris för en viss marginal?",
        respuesta: `Dela kostnaden med (1 − marginalen). För 30 % marginal delar du kostnaden med ${formatearNumero(ctx, 0.7, 2)}. Lägg inte bara på 30 % på kostnaden, då tjänar du mindre än du tror.`,
      },
      {
        pregunta: "Ska kostnaden räknas med eller utan moms?",
        respuesta: "Räkna med kostnad och pris exklusive moms. Annars ser marginalen större ut än den är.",
      },
    ],
    glosario: [
      { termino: "Marginal", definicion: "Vinsten i procent av försäljningspriset. Kallas också täckningsgrad när kostnaden är rörlig." },
      { termino: "Påslag", definicion: "Vinsten i procent av kostnaden." },
    ],
  };
};
