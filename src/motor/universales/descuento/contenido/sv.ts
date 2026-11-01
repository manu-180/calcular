import { formatearCifra, formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoSv: ContenidoUniversal = (ctx) => {
  const precio = montoEjemplo(ctx, 80);
  const m = (n: number) => formatearMonto(ctx, n);
  const total = formatearCifra(ctx, (1 - 0.7 * 0.9) * 100);
  return {
    h1: "Rabattkalkylator",
    title: tituloQueEntre(
      `Rabattkalkylator: räkna ut pris efter rabatt | ${ctx.nombrePais}`,
      `Rabattkalkylator | ${ctx.nombrePais}`,
      "Rabattkalkylator",
    ),
    description: "Räkna ut priset efter rabatt och hur mycket du sparar, även när två rabatter gäller efter varandra, som 30 % och sedan 10 % till.",
    intro: [
      "Fyll i pris och rabatt så ser du direkt vad du betalar och hur mycket du sparar.",
      "Finns det en extra rabatt ovanpå, fyll i den också. Två rabatter efter varandra blir aldrig bara summan av dem.",
    ],
    comoSeCalcula: [
      "Pris efter rabatt = ordinarie pris × (1 − rabatt ÷ 100).",
      "En extra rabatt räknas på priset som redan är nedsatt.",
      "Det du sparar är ordinarie pris minus priset efter rabatt.",
    ],
    ejemplo: [
      `En vara för ${m(precio)} kostar ${m(precio * 0.75)} med 25 % rabatt.`,
      `Med 30 % och sedan 10 % till kostar den ${m(precio * 0.7 * 0.9)}. Det är ${total} % billigare totalt, inte 40 %.`,
    ],
    faq: [
      {
        pregunta: "Hur räknar jag ut en rabatt?",
        respuesta: "Multiplicera priset med procentsatsen och dela med 100. Det är vad du sparar. Dra av det från priset så får du det du betalar.",
      },
      {
        pregunta: "Är 30 % plus 10 % rabatt samma sak som 40 %?",
        respuesta: `Nej. Den andra rabatten räknas på det redan nedsatta priset. Totalt sparar du därför ${total} %.`,
      },
      {
        pregunta: "Hur får jag fram ordinarie pris från priset efter rabatt?",
        respuesta: `Dela priset efter rabatt med (1 − rabatt ÷ 100). Vid 25 % rabatt delar du med ${formatearNumero(ctx, 0.75, 2)}.`,
      },
    ],
    glosario: [
      { termino: "Rabatt", definicion: "Den procentsats som dras av från ordinarie pris." },
      { termino: "Total rabatt", definicion: "Hur många procent du sparar sammanlagt när mer än en rabatt gäller." },
    ],
  };
};
