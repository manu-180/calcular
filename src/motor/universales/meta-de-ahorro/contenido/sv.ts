import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { aporteNecesario } from "../definicion";

export const contenidoSv: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const meta = montoEjemplo(ctx, 10000);
  const actual = montoEjemplo(ctx, 1000);
  const hundra = montoEjemplo(ctx, 100);
  return {
    h1: "Sparkalkylator för ditt sparmål",
    title: tituloQueEntre(
      `Sparkalkylator: hur mycket ska jag spara per månad | ${ctx.nombrePais}`,
      `Sparkalkylator | ${ctx.nombrePais}`,
      "Sparkalkylator",
    ),
    description: "Räkna ut hur mycket du behöver spara varje månad för att nå ditt sparmål i tid, med det du redan har och det sparandet ger i ränta.",
    intro: [
      "En resa, en bil, kontantinsatsen till en bostad eller en buffert för oväntade utgifter. Ett mål med belopp och datum är mycket lättare att nå.",
      "Fyll i hur mycket du vill spara och på hur många månader. Du ser hur mycket du behöver lägga undan varje månad och varje vecka.",
    ],
    comoSeCalcula: [
      "Först räknas ut hur mycket det du redan har sparat hinner växa till periodens slut.",
      "Det som fattas delas upp i lika stora insättningar varje månad.",
      "Ger sparandet ränta växer även varje insättning, så du behöver sätta in lite mindre.",
    ],
    ejemplo: [
      `För att spara ihop ${m(meta)} på 24 månader utan ränta behöver du spara ${m(meta / 24)} i månaden.`,
      `Har du redan ${m(actual)} och får 5 % avkastning per år räcker det med ${m(aporteNecesario(meta, actual, 24, 5))} i månaden.`,
    ],
    faq: [
      {
        pregunta: "Hur håller jag fast vid sparmålet?",
        respuesta: "Flytta pengarna direkt när lönen kommer, innan du hinner göra av med dem. Lägg gärna upp en automatisk överföring till ett eget sparkonto.",
      },
      {
        pregunta: "Vad gör jag om månadsbeloppet blir för högt?",
        respuesta: "Ge dig själv mer tid eller sänk målet. Du kan också börja med det du har råd med och höja beloppet när inkomsten ökar.",
      },
      {
        pregunta: "Ska jag räkna med inflationen?",
        respuesta: `Ligger målet flera år bort, lägg till den inflation du räknar med. Det som kostar ${m(hundra)} i dag kan kosta en hel del mer när du är framme.`,
      },
    ],
    glosario: [
      { termino: "Insättning", definicion: "Pengarna du lägger undan varje månad till målet." },
      { termino: "Avkastning", definicion: "Det ditt sparande ger på ett konto eller i en placering." },
    ],
  };
};
