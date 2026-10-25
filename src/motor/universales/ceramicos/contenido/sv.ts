import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoSv: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 2) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const ejemplo = imperial
    ? (() => {
        const piezas = Math.ceil((150 * 1.1) / 1 - 1e-9);
        return [
          `Till 150 ft² med plattor på 12 × 12 in (1 ft² var) och 10 % spill behöver du ${n(piezas, 0)} plattor.`,
          `Rymmer en kartong 10 plattor blir det ${n(Math.ceil(piezas / 10), 0)} kartonger.`,
        ];
      })()
    : (() => {
        const pieza = 0.6 * 0.6;
        const piezas = Math.ceil((20 * 1.1) / pieza - 1e-9);
        return [
          `Till 20 m² med plattor på 60 × 60 cm (${n(pieza)} m² var) och 10 % spill behöver du ${n(piezas, 0)} plattor.`,
          `Rymmer en kartong 4 plattor blir det ${n(Math.ceil(piezas / 4), 0)} kartonger.`,
        ];
      })();
  return {
    h1: "Hur mycket kakel behöver jag?",
    title: tituloQueEntre(
      `Hur mycket kakel och klinker behöver jag? | ${ctx.nombrePais}`,
      `Hur mycket kakel behöver jag? | ${ctx.nombrePais}`,
      "Hur mycket kakel behöver jag?",
    ),
    description: "Räkna ut hur många plattor kakel eller klinker du behöver till golv eller vägg, med spill inräknat, och hur många kartonger du ska köpa.",
    intro: [
      "Fyll i ytan, plattornas storlek och hur många som ligger i en kartong. Du ser hur många plattor och kartonger du ska köpa.",
      "Spillet täcker kapning längs kanterna och någon enstaka platta som går sönder.",
    ],
    comoSeCalcula: [
      `En plattas yta = längd × bredd, omräknat till ${imperial ? "kvadratfot" : "kvadratmeter"}.`,
      "Plattor = yta × (1 + spill ÷ 100) ÷ en plattas yta, avrundat uppåt.",
      "Kartonger = plattor ÷ plattor per kartong, avrundat uppåt.",
    ],
    ejemplo,
    faq: [
      {
        pregunta: "Hur mycket spill ska jag räkna med?",
        respuesta: "10 % vid rak läggning. Vid diagonal läggning, fiskbensmönster eller rum med många kapningar räknar du med 15 till 20 %.",
      },
      {
        pregunta: "Behöver jag räkna med fogarna?",
        respuesta: "Nej. Fogarna är bara några millimeter breda och skillnaden täcks redan av spillet.",
      },
      {
        pregunta: "Ska jag köpa några extra plattor?",
        respuesta: "Ja, några stycken från samma tillverkningsomgång. Går en platta sönder senare kan det vara svårt att hitta exakt samma nyans.",
      },
    ],
    glosario: [
      { termino: "Spill", definicion: "Den extra procentandel du köper för kapning och plattor som går sönder." },
      { termino: "Kakel och klinker", definicion: "Kakel är plattor för väggar och klinker plattor för golv." },
    ],
  };
};
