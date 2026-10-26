import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoDa: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const n = (x: number) => formatearNumero(ctx, x);
  const precio = montoEjemplo(ctx, 0.15);
  const kwhDia = (1000 * 4) / 1000;
  const kwhMes = kwhDia * 30;
  return {
    h1: "Beregn elforbruget for et apparat",
    title: tituloQueEntre(
      `Beregn elforbrug: kWh og pris for et apparat | ${ctx.nombrePais}`,
      `Beregn elforbrug | ${ctx.nombrePais}`,
      "Beregn elforbrug",
    ),
    description: "Beregn, hvor meget strøm et apparat bruger, og hvad det koster pr. dag, måned og år, ud fra effekt, brugstid og elprisen pr. kWh.",
    intro: [
      "Skriv apparatets effekt, hvor mange timer det er i brug, og elprisen pr. kWh fra din regning. Du ser elforbruget og udgiften.",
      "Brug det til at se, hvilket apparat der fylder mest på elregningen: varmepumpe, elradiator, fryser eller computer.",
    ],
    comoSeCalcula: [
      `kWh pr. dag = watt × timer i brug ÷ ${n(1000)}.`,
      "kWh pr. måned = kWh pr. dag × antal dage. For et år ganges måneden med 12.",
      "Udgift = kWh × elpris pr. kWh.",
    ],
    ejemplo: [
      `Et apparat på ${n(1000)} W, der er i brug 4 timer om dagen, bruger ${n(kwhDia)} kWh om dagen og ${n(kwhMes)} kWh om måneden.`,
      `Med en elpris på ${m(precio)} pr. kWh koster det ${m(kwhMes * precio)} om måneden.`,
    ],
    faq: [
      {
        pregunta: "Hvad er en kWh?",
        respuesta: `En kilowatttime er den energi, et apparat på ${n(1000)} W bruger på en time. Det er enheden på din elregning.`,
      },
      {
        pregunta: "Kører køleskabet med fuld effekt hele døgnet?",
        respuesta: "Nej. Kompressoren slår til og fra. For den slags apparater er det mere rimeligt at regne med 8 til 10 timer om dagen end 24.",
      },
      {
        pregunta: "Hvorfor passer det ikke præcis med elregningen?",
        respuesta: "På regningen kommer faste gebyrer, nettarif, afgifter og ofte timepriser, der svinger. Her ser du kun, hvad apparatet bruger.",
      },
    ],
    glosario: [
      { termino: "Watt (W)", definicion: "Enhed for effekt, altså hvor meget energi et apparat bruger hvert sekund." },
      { termino: "Kilowatttime (kWh)", definicion: `${n(1000)} W i en time. Det er det, du betaler for på elregningen.` },
    ],
  };
};
