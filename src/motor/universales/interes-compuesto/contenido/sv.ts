import { formatearCifra, formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { proyectar } from "../definicion";

export const contenidoSv: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const capital = montoEjemplo(ctx, 1000);
  const aporte = montoEjemplo(ctx, 100);
  const a10 = proyectar(capital, aporte, 7, 10, "mensual")[9].saldo;
  const a20 = proyectar(capital, aporte, 7, 20, "mensual")[19].saldo;
  return {
    h1: "Ränta på ränta-kalkylator",
    title: tituloQueEntre(
      `Ränta på ränta: räkna ut hur ditt sparande växer | ${ctx.nombrePais}`,
      `Ränta på ränta | ${ctx.nombrePais}`,
      "Ränta på ränta",
    ),
    description: "Se hur dina pengar växer med ränta på ränta och månadssparande. Du får slutbeloppet, hur mycket som är avkastning och en tabell år för år.",
    intro: [
      "Med ränta på ränta läggs räntan till ditt saldo och börjar själv ge ränta. Därför växer sparandet allt snabbare ju längre tid det får.",
      "Fyll i vad du har i dag, hur mycket du kan spara varje månad, räntan och antalet år. Du ser slutbeloppet och hur stor del av det som är avkastning.",
    ],
    comoSeCalcula: [
      "Slutbelopp = startbelopp × (1 + i) upphöjt till n + månadssparande × ((1 + i) upphöjt till n − 1) ÷ i.",
      "Här är i månadsräntan som motsvarar den ränteberäkning du har valt, och n är antalet månader.",
      "Månadssparandet sätts in i slutet av varje månad.",
    ],
    ejemplo: [
      `Börjar du med ${m(capital)} och sparar ${m(aporte)} i månaden med 7 % per år har du ${m(a10)} efter 10 år.`,
      `Fortsätter du i 10 år till växer saldot till ${m(a20)}. Det andra decenniet ger betydligt mer än det första.`,
    ],
    faq: [
      {
        pregunta: "Vad är skillnaden mellan enkel ränta och ränta på ränta?",
        respuesta:
          "Enkel ränta räknas alltid på det ursprungliga beloppet. Ränta på ränta räknas på beloppet plus den ränta du redan har fått.",
      },
      {
        pregunta: "Vad är 72-regeln?",
        respuesta: `Ett snabbt sätt att se hur lång tid det tar för pengarna att fördubblas. Dela 72 med årsräntan. Med 6 % fördubblas de på ungefär ${formatearCifra(ctx, 72 / 6, 0)} år.`,
      },
      {
        pregunta: "Vilken ränta ska jag räkna med?",
        respuesta:
          "En som är rimlig för det du tänker göra med pengarna. Vill du se resultatet i dagens penningvärde, använd räntan minus den inflation du räknar med.",
      },
    ],
    glosario: [
      { termino: "Ränteberäkning", definicion: "Hur ofta räntan läggs till saldot." },
      { termino: "Ränta på ränta", definicion: "Ränta som räknas på saldot plus den ränta som redan har lagts till." },
    ],
  };
};
