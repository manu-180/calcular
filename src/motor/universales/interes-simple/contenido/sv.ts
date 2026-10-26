import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoSv: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const capital = montoEjemplo(ctx, 1000);
  return {
    h1: "Räntekalkylator",
    title: tituloQueEntre(
      `Räntekalkylator: räkna ut ränta på ett belopp | ${ctx.nombrePais}`,
      `Räntekalkylator | ${ctx.nombrePais}`,
      "Räntekalkylator",
    ),
    description: "Räkna ut enkel ränta på ett belopp med en årsränta under dagar, månader eller år. Välj år med 365 eller 360 dagar och se summan.",
    intro: [
      "Enkel ränta räknas alltid på det ursprungliga beloppet. Räntan läggs inte till saldot under perioden.",
      "Den används för korta placeringar, lån mellan privatpersoner och många skoluppgifter.",
    ],
    comoSeCalcula: [
      "Ränta = belopp × årsränta × tid i år.",
      "Vid månader delar du med 12. Vid dagar delar du med 365 eller 360, beroende på vilket år banken räknar med.",
      "Summa = belopp + ränta.",
    ],
    ejemplo: [
      `${m(capital)} med 10 % årsränta i 6 månader ger ${m(capital * 0.1 * 0.5)} i ränta.`,
      `Samma belopp i 90 dagar ger ${m((capital * 0.1 * 90) / 365)} med 365 dagar per år och ${m((capital * 0.1 * 90) / 360)} med 360 dagar per år.`,
    ],
    faq: [
      {
        pregunta: "Hur räknar man ut ränta på ett belopp?",
        respuesta: `Ränta = K × r × t. K är beloppet, r är årsräntan i decimalform (10 % är ${formatearNumero(ctx, 0.1, 2)}) och t är tiden i år.`,
      },
      {
        pregunta: "Vad är skillnaden mot ränta på ränta?",
        respuesta: "Enkel ränta räknas alltid på samma belopp. Med ränta på ränta läggs räntan till saldot och ger själv ränta.",
      },
      {
        pregunta: "Varför räknar vissa banker med 360 dagar?",
        respuesta: "Det är en konvention inom bankvärlden som gör räkningen enklare. Med 360 dagar blir räntan lite högre. Kontrollera vad din bank använder.",
      },
    ],
    glosario: [
      { termino: "Belopp", definicion: "Pengarna som lånas ut eller placeras, även kallat kapital." },
      { termino: "Bankår", definicion: "Ett år som räknas som 360 dagar, med månader på 30 dagar." },
    ],
  };
};
