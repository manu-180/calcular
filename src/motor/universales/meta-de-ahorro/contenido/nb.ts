import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { aporteNecesario } from "../definicion";

export const contenidoNb: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const meta = montoEjemplo(ctx, 10000);
  const actual = montoEjemplo(ctx, 1000);
  const hundre = montoEjemplo(ctx, 100);
  return {
    h1: "Sparekalkulator for sparemålet ditt",
    title: tituloQueEntre(
      `Sparekalkulator: hvor mye må jeg spare i måneden | ${ctx.nombrePais}`,
      `Sparekalkulator: hvor mye må jeg spare | ${ctx.nombrePais}`,
      `Sparekalkulator | ${ctx.nombrePais}`,
      "Sparekalkulator",
    ),
    description: "Regn ut hvor mye du må spare hver måned for å nå sparemålet i tide, med det du allerede har og det sparingen gir i renter.",
    intro: [
      "En reise, en bil, egenkapital til bolig eller en buffer for uventede utgifter. Et mål med beløp og dato er mye lettere å nå.",
      "Fyll inn hvor mye du vil spare og over hvor mange måneder. Du ser hvor mye du må sette av hver måned og hver uke.",
    ],
    comoSeCalcula: [
      "Først regnes det ut hvor mye det du allerede har spart, rekker å vokse til slutten av perioden.",
      "Det som mangler, deles opp i like store innskudd hver måned.",
      "Gir sparingen renter, vokser hvert innskudd også, så du trenger å sette inn litt mindre.",
    ],
    ejemplo: [
      `For å spare ${m(meta)} på 24 måneder uten renter må du sette av ${m(meta / 24)} i måneden.`,
      `Har du allerede ${m(actual)} og får 5 % avkastning per år, holder det med ${m(aporteNecesario(meta, actual, 24, 5))} i måneden.`,
    ],
    faq: [
      {
        pregunta: "Hvordan holder jeg meg til sparemålet?",
        respuesta: "Flytt pengene med en gang lønnen kommer, før du rekker å bruke dem. Sett gjerne opp et fast trekk til en egen sparekonto.",
      },
      {
        pregunta: "Hva gjør jeg hvis månedsbeløpet blir for høyt?",
        respuesta: "Gi deg selv mer tid, eller senk målet. Du kan også begynne med det du har råd til og øke beløpet når inntekten stiger.",
      },
      {
        pregunta: "Bør jeg regne med prisvekst?",
        respuesta: `Ligger målet flere år frem i tid, legger du til den prisveksten du regner med. Det som koster ${m(hundre)} i dag, kan koste en god del mer når du kommer dit.`,
      },
    ],
    glosario: [
      { termino: "Innskudd", definicion: "Pengene du setter av hver måned til målet." },
      { termino: "Avkastning", definicion: "Det sparingen din gir på en konto eller i fond." },
    ],
  };
};
