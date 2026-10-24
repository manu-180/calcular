import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { aEfectiva, aNominal } from "../definicion";

export const contenidoSv: ContenidoUniversal = (ctx) => {
  const p = (n: number) => `${formatearNumero(ctx, n, 2)} %`;
  return {
    h1: "Räkna om nominell ränta till effektiv ränta",
    title: tituloQueEntre(
      `Effektiv ränta: räkna om från nominell ränta | ${ctx.nombrePais}`,
      `Effektiv ränta | ${ctx.nombrePais}`,
      "Effektiv ränta",
    ),
    description: "Räkna om nominell årsränta till effektiv årsränta och tillbaka, med ränteberäkning varje månad, kvartal, halvår eller dag.",
    intro: [
      "Två erbjudanden med samma ränta kan kosta olika mycket. Skillnaden ligger i hur ofta räntan räknas.",
      "Den effektiva årsräntan gör erbjudandena jämförbara. Den visar vad du faktiskt betalar eller får på ett år. Välj vilken ränta du har så räknar vi fram den andra.",
    ],
    comoSeCalcula: [
      "Effektiv ränta = (1 + nominell ränta ÷ m) upphöjt till m, minus 1. Här är m antalet ränteperioder per år, 12 vid månadsvis och 4 vid kvartalsvis.",
      "Nominell ränta = m × ((1 + effektiv ränta) upphöjt till 1 ÷ m, minus 1).",
      "Räntan per period är den nominella räntan delad med m.",
    ],
    ejemplo: [
      `En nominell ränta på 12 % med ränteberäkning varje månad motsvarar en effektiv ränta på ${p(aEfectiva(12, 12))}.`,
      `En effektiv ränta på 10 % motsvarar en nominell ränta på ${p(aNominal(10, 12))} när räntan räknas varje månad.`,
    ],
    faq: [
      {
        pregunta: "Vad är skillnaden mellan nominell och effektiv ränta?",
        respuesta:
          "Den nominella räntan är årsräntan innan ränta på ränta räknas in. Den effektiva räntan tar med att räntan också ger ränta. Därför är den effektiva räntan alltid lika hög eller högre än den nominella.",
      },
      {
        pregunta: "Vilken ränta ska jag jämföra lån med?",
        respuesta:
          "Den effektiva räntan. I låneerbjudanden brukar även uppläggningsavgifter och aviavgifter räknas in i den, så den kan bli högre än det du ser här. Jämför även den totala kostnaden.",
      },
      {
        pregunta: "Varför blir den effektiva räntan högre när räntan räknas oftare?",
        respuesta:
          "Räntan läggs till tidigare och börjar själv ge ränta. Räknas räntan bara en gång per år är den nominella och den effektiva räntan lika stora.",
      },
    ],
    glosario: [
      { termino: "Nominell ränta", definicion: "Årsräntan utan effekten av ränta på ränta." },
      { termino: "Effektiv ränta", definicion: "Årsräntan när ränta på ränta är inräknad." },
      { termino: "Ränteperiod", definicion: "Hur ofta räntan läggs till skulden eller saldot." },
    ],
  };
};
