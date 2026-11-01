import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoDa: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const imperial = ctx.unidades === "imperial";
  const ejemplo = imperial
    ? (() => {
        const precio = montoEjemplo(ctx, 3.5);
        const galones = 300 / 30;
        return [
          `En tur på 150 miles hver vej med en bil, der kører 30 mpg, bruger ${formatearNumero(ctx, galones)} gallon.`,
          `Med ${m(precio)} pr. gallon bliver det ${m(galones * precio)}. Deler 2 personer, betaler hver ${m((galones * precio) / 2)}.`,
        ];
      })()
    : (() => {
        const precio = montoEjemplo(ctx, 1.2);
        const kml = 12.5;
        const litros = 600 / kml;
        return [
          `En tur på 300 km hver vej med en bil, der kører ${formatearNumero(ctx, kml, 1)} km/l (8 liter pr. 100 km), bruger ${formatearNumero(ctx, litros)} liter.`,
          `Med ${m(precio)} pr. liter bliver det ${m(litros * precio)}. Deler 2 personer, betaler hver ${m((litros * precio) / 2)}.`,
        ];
      })();
  return {
    h1: "Beregn brændstofudgiften til turen",
    title: tituloQueEntre(
      `Brændstofberegner: hvad koster turen i benzin | ${ctx.nombrePais}`,
      `Brændstofberegner | ${ctx.nombrePais}`,
      "Brændstofberegner",
    ),
    description: "Beregn, hvad en tur koster i benzin eller diesel ud fra strækningen, bilens forbrug og literprisen, og hvad hver person skal betale.",
    intro: [
      `Skriv strækningen, bilens forbrug og prisen pr. ${imperial ? "gallon" : "liter"}. Du ser, hvor meget brændstof der går til, og hvad turen koster.`,
      imperial
        ? "Forbruget angives i miles per gallon, som på bilens mærkat."
        : "Forbruget kan angives i km/l, som er det mest brugte i Danmark, eller i liter pr. 100 km.",
    ],
    comoSeCalcula: imperial
      ? ["Gallon = strækning ÷ miles per gallon.", "Udgift = gallon × pris pr. gallon. Tur retur fordobler strækningen."]
      : [
          "Med kilometer pr. liter: liter = strækning ÷ forbrug.",
          "Med liter pr. 100 km: liter = strækning × forbrug ÷ 100.",
          "Udgift = liter × pris pr. liter. Tur retur fordobler strækningen.",
        ],
    ejemplo,
    faq: [
      {
        pregunta: "Hvordan regner jeg km/l om til liter pr. 100 km?",
        respuesta: `Del 100 med antallet af km/l. En bil, der kører 20 km/l, bruger ${formatearNumero(ctx, 100 / 20)} liter pr. 100 km.`,
      },
      {
        pregunta: "Er bro, færge og parkering med?",
        respuesta: "Nej. Beregningen gælder kun brændstoffet. Læg broafgift, færge og parkering til for sig.",
      },
      {
        pregunta: "Hvorfor bruger bilen mere i byen?",
        respuesta: "Det kræver mere energi at stoppe og sætte i gang end at køre med jævn fart på landevejen, så forbruget i bytrafik er som regel højere.",
      },
    ],
    glosario: [
      { termino: "Brændstofforbrug", definicion: "Hvor meget brændstof bilen bruger på en bestemt strækning." },
      { termino: "km/l", definicion: "Kilometer pr. liter, hvor langt bilen kører på en liter. Jo højere tal, jo mindre bruger den." },
    ],
  };
};
