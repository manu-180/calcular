import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoNb: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const n = (x: number) => formatearNumero(ctx, x);
  const precio = montoEjemplo(ctx, 0.15);
  const kwhDia = (1000 * 4) / 1000;
  const kwhMes = kwhDia * 30;
  return {
    h1: "Regn ut strømforbruket til et apparat",
    title: tituloQueEntre(
      `Strømforbruk: kWh og pris for et apparat | ${ctx.nombrePais}`,
      `Strømforbruk: kalkulator | ${ctx.nombrePais}`,
      `Strømforbruk | ${ctx.nombrePais}`,
      "Strømforbruk",
    ),
    description: "Regn ut hvor mye strøm et apparat bruker og hva det koster per dag, måned og år, ut fra effekt, brukstid og strømprisen per kWh.",
    intro: [
      "Fyll inn effekten til apparatet, hvor mange timer det er i bruk og strømprisen per kWh fra regningen. Du ser strømforbruket og kostnaden.",
      "Bruk det til å se hvilket apparat som tar mest av strømregningen: varmepumpe, panelovn, fryser eller PC.",
    ],
    comoSeCalcula: [
      `kWh per dag = watt × timer i bruk ÷ ${n(1000)}.`,
      "kWh per måned = kWh per dag × antall dager. For et år ganges måneden med 12.",
      "Kostnad = kWh × strømpris per kWh.",
    ],
    ejemplo: [
      `Et apparat på ${n(1000)} W som er i bruk 4 timer om dagen, bruker ${n(kwhDia)} kWh per dag og ${n(kwhMes)} kWh per måned.`,
      `Med en strømpris på ${m(precio)} per kWh koster det ${m(kwhMes * precio)} i måneden.`,
    ],
    faq: [
      {
        pregunta: "Hva er en kWh?",
        respuesta: `En kilowattime er energien et apparat på ${n(1000)} W bruker på én time. Det er enheten på strømregningen.`,
      },
      {
        pregunta: "Går kjøleskapet på full effekt hele døgnet?",
        respuesta: "Nei. Kompressoren slår seg av og på. For slike apparater er det mer rimelig å regne med 8 til 10 timer om dagen enn 24.",
      },
      {
        pregunta: "Hvorfor stemmer det ikke helt med strømregningen?",
        respuesta: "På regningen kommer faste gebyrer, nettleie, avgifter og ofte timepriser som svinger. Her ser du bare hva apparatet bruker.",
      },
    ],
    glosario: [
      { termino: "Watt (W)", definicion: "Enhet for effekt, altså hvor mye energi et apparat bruker hvert sekund." },
      { termino: "Kilowattime (kWh)", definicion: `${n(1000)} W i én time. Det er det du betaler for på strømregningen.` },
    ],
  };
};
