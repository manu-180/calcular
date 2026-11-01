import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoSv: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const n = (x: number) => formatearNumero(ctx, x);
  const precio = montoEjemplo(ctx, 0.15);
  const kwhDia = (1000 * 4) / 1000;
  const kwhMes = kwhDia * 30;
  return {
    h1: "Räkna ut elkostnaden för en apparat",
    title: tituloQueEntre(
      `Elkostnad: räkna ut elförbrukning och kostnad | ${ctx.nombrePais}`,
      `Elkostnad | ${ctx.nombrePais}`,
      "Elkostnad",
    ),
    description: "Räkna ut hur mycket el en apparat drar och vad den kostar per dag, månad och år, utifrån effekt, användningstid och elpris per kWh.",
    intro: [
      "Fyll i apparatens effekt, hur många timmar den används och elpriset per kWh från din räkning. Du ser elförbrukningen och kostnaden.",
      "Använd det för att se vilken apparat som väger tyngst på elräkningen: värmepump, element, frys eller dator.",
    ],
    comoSeCalcula: [
      `kWh per dag = watt × timmar i bruk ÷ ${n(1000)}.`,
      "kWh per månad = kWh per dag × antal dagar. För ett år tas månaden gånger 12.",
      "Kostnad = kWh × elpris per kWh.",
    ],
    ejemplo: [
      `En apparat på ${n(1000)} W som används 4 timmar per dag drar ${n(kwhDia)} kWh per dag och ${n(kwhMes)} kWh per månad.`,
      `Med ett elpris på ${m(precio)} per kWh kostar den ${m(kwhMes * precio)} per månad.`,
    ],
    faq: [
      {
        pregunta: "Vad är en kWh?",
        respuesta: `En kilowattimme är den energi en apparat på ${n(1000)} W använder på en timme. Det är enheten på din elräkning.`,
      },
      {
        pregunta: "Går kylskåpet på full effekt hela dygnet?",
        respuesta: "Nej. Kompressorn slås av och på. För sådana apparater är det rimligare att räkna med 8 till 10 timmar per dag än 24.",
      },
      {
        pregunta: "Varför stämmer det inte exakt med elräkningen?",
        respuesta: "På räkningen tillkommer fasta avgifter, nätavgift, skatter och ibland timpriser som varierar. Här ser du bara vad apparaten drar.",
      },
    ],
    glosario: [
      { termino: "Watt (W)", definicion: "Enhet för effekt, alltså hur mycket energi en apparat använder varje sekund." },
      { termino: "Kilowattimme (kWh)", definicion: `${n(1000)} W under en timme. Det är det du betalar för på elräkningen.` },
    ],
  };
};
