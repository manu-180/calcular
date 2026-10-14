import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoNl: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const precio = montoEjemplo(ctx, 0.15);
  const kwhDia = (1000 * 4) / 1000;
  const kwhMes = kwhDia * 30;
  const belgie = ctx.locale.endsWith("BE");
  const naam = belgie ? "Elektriciteitsverbruik berekenen" : "Stroomverbruik berekenen";
  const rekening = belgie ? "energiefactuur" : "energierekening";
  return {
    h1: naam,
    title: tituloQueEntre(`${naam} in ${ctx.nombrePais}`, naam),
    description: "Bereken hoeveel stroom een apparaat verbruikt en wat het kost per dag, maand en jaar. Met het vermogen, de uren gebruik en je prijs per kWh.",
    intro: [
      `Vul het vermogen van het apparaat in, hoeveel uur je het gebruikt en de prijs per kWh van je ${rekening}. Je ziet het verbruik en de kosten.`,
      `Zo zie je welk apparaat het zwaarst weegt op je ${rekening}: de airco, een elektrische kachel, de koelkast of je computer.`,
    ],
    comoSeCalcula: [
      "kWh per dag = watt × uren gebruik ÷ 1000.",
      "kWh per maand = kWh per dag × dagen gebruik. Voor een jaar is het de maand keer 12.",
      "Kosten = kWh × prijs per kWh.",
    ],
    ejemplo: [
      `Een apparaat van 1000 W dat je 4 uur per dag gebruikt, verbruikt ${formatearNumero(ctx, kwhDia)} kWh per dag en ${formatearNumero(ctx, kwhMes)} kWh per maand.`,
      `Bij ${m(precio)} per kWh kost dat ${m(kwhMes * precio)} per maand.`,
    ],
    faq: [
      {
        pregunta: "Wat is een kWh?",
        respuesta: "Een kilowattuur is de energie die een apparaat van 1000 W in één uur verbruikt. Het is de eenheid op je energierekening.",
      },
      {
        pregunta: "Draait een koelkast de hele dag op vol vermogen?",
        respuesta: "Nee. De compressor slaat aan en af. Reken bij zulke apparaten met ongeveer 8 tot 10 uur per dag in plaats van 24.",
      },
      {
        pregunta: "Waarom klopt het niet precies met mijn rekening?",
        respuesta: "Op je rekening staan ook vaste kosten, netbeheerkosten en belastingen. Deze rekenhulp laat alleen zien wat het apparaat zelf verbruikt.",
      },
    ],
    glosario: [
      { termino: "Watt (W)", definicion: "De eenheid van vermogen: hoeveel energie een apparaat per seconde gebruikt." },
      { termino: "Kilowattuur (kWh)", definicion: "1000 W gedurende één uur. Daarvoor betaal je op je energierekening." },
    ],
  };
};
