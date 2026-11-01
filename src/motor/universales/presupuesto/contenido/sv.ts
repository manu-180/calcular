import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoSv: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const ingreso = montoEjemplo(ctx, 2000);
  return {
    h1: "Budgetkalkyl med 50/30/20-regeln",
    title: tituloQueEntre(
      `Budget 50/30/20: fördela lönen efter skatt | ${ctx.nombrePais}`,
      `Budget 50/30/20 | ${ctx.nombrePais}`,
      "Budget 50/30/20",
    ),
    description: "Fördela din lön efter skatt med 50/30/20-regeln. Se hur mycket som går till nödvändiga utgifter, nöjen och sparande, och ändra andelarna om det behövs.",
    intro: [
      "50/30/20-regeln är ett enkelt sätt att planera månaden. Hälften går till det nödvändiga, 30 % till sådant du tycker om och 20 % till sparande.",
      "Fyll i din lön efter skatt så ser du hur mycket som går till varje del. Ser din situation annorlunda ut, till exempel med hög hyra, ändra procentsatserna.",
    ],
    comoSeCalcula: [
      "Nödvändiga utgifter = inkomst × 50 %.",
      "Nöjen och annat = inkomst × 30 %.",
      "Sparande = inkomst × 20 %. De tre procentsatserna måste bli 100 % tillsammans.",
    ],
    ejemplo: [
      `Med ${m(ingreso)} i månaden går ${m(ingreso * 0.5)} till nödvändiga utgifter, ${m(ingreso * 0.3)} till nöjen och ${m(ingreso * 0.2)} till sparande.`,
      `På ett år blir de 20 procenten ${m(ingreso * 0.2 * 12)} i sparande.`,
    ],
    faq: [
      {
        pregunta: "Vad räknas som nödvändigt och vad är nöjen?",
        respuesta:
          "Nödvändiga utgifter är räkningar du måste betala, som boende, mat, el, transporter, hälsa och de lägsta betalningarna på lån. Nöjen är sådant du kan dra ner på om det behövs.",
      },
      {
        pregunta: "Vad gör jag om de nödvändiga utgifterna är mer än 50 %?",
        respuesta: "Det är vanligt, särskilt med hög hyra. Prova 60/20/20 eller 70/20/10, men undvik att sänka sparandet till noll.",
      },
      {
        pregunta: "Räknas amortering på skulder som sparande?",
        respuesta: "De lägsta betalningarna hör till de nödvändiga utgifterna. Allt du betalar extra för att bli skuldfri snabbare räknas som sparande, eftersom det förbättrar din ekonomi på samma sätt.",
      },
    ],
    glosario: [
      { termino: "Lön efter skatt", definicion: "Det du får ut efter skatt och avdrag, även kallat nettolön." },
      { termino: "50/30/20-regeln", definicion: "Ett sätt att fördela inkomsten mellan nödvändiga utgifter, nöjen och sparande." },
    ],
  };
};
