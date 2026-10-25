import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoNb: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const imperial = ctx.unidades === "imperial";
  const ejemplo = imperial
    ? (() => {
        const precio = montoEjemplo(ctx, 3.5);
        const galones = 300 / 30;
        return [
          `En tur på 150 miles hver vei med en bil som går 30 mpg, bruker ${formatearNumero(ctx, galones)} gallon.`,
          `Med ${m(precio)} per gallon blir det ${m(galones * precio)}. Deler 2 personer, betaler hver ${m((galones * precio) / 2)}.`,
        ];
      })()
    : (() => {
        const precio = montoEjemplo(ctx, 1.2);
        const l100 = 8;
        const litros = (600 * l100) / 100;
        return [
          `En tur på 300 km hver vei med en bil som bruker ${l100} liter per 100 km (${formatearNumero(ctx, l100 / 10, 1)} liter per mil), krever ${formatearNumero(ctx, litros)} liter.`,
          `Med ${m(precio)} per liter blir det ${m(litros * precio)}. Deler 2 personer, betaler hver ${m((litros * precio) / 2)}.`,
        ];
      })();
  return {
    h1: "Regn ut drivstoffkostnaden for turen",
    title: tituloQueEntre(
      `Drivstoffkalkulator: hva koster turen i bensin | ${ctx.nombrePais}`,
      `Drivstoffkalkulator | ${ctx.nombrePais}`,
      "Drivstoffkalkulator",
    ),
    description: "Regn ut hva en tur koster i bensin eller diesel ut fra strekningen, bilens forbruk og literprisen, og hva hver person skal betale.",
    intro: [
      `Fyll inn strekningen, bilens forbruk og prisen per ${imperial ? "gallon" : "liter"}. Du ser hvor mye drivstoff som går med og hva turen koster.`,
      imperial
        ? "Forbruket oppgis i miles per gallon, som på bilens merkelapp."
        : "Forbruket kan oppgis i liter per 100 km eller i km/l. Bruker du liter per mil, gang med 10.",
    ],
    comoSeCalcula: imperial
      ? ["Gallon = strekning ÷ miles per gallon.", "Kostnad = gallon × pris per gallon. Tur-retur dobler strekningen."]
      : [
          "Med liter per 100 km: liter = strekning × forbruk ÷ 100.",
          "Med kilometer per liter: liter = strekning ÷ forbruk.",
          "Kostnad = liter × pris per liter. Tur-retur dobler strekningen.",
        ],
    ejemplo,
    faq: [
      {
        pregunta: "Hvordan gjør jeg om liter per mil til liter per 100 km?",
        respuesta: `En mil er 10 km, så du ganger med 10. ${formatearNumero(ctx, 0.6, 1)} liter per mil er ${formatearNumero(ctx, 6)} liter per 100 km.`,
      },
      {
        pregunta: "Er bompenger, ferge og parkering med?",
        respuesta: "Nei. Beregningen gjelder bare drivstoffet. Legg til bompenger, ferge og parkering for seg.",
      },
      {
        pregunta: "Hvorfor bruker bilen mer i byen?",
        respuesta: "Det krever mer energi å stoppe og kjøre i gang igjen enn å holde jevn fart på landeveien, så forbruket i bytrafikk er som regel høyere.",
      },
    ],
    glosario: [
      { termino: "Drivstofforbruk", definicion: "Hvor mye drivstoff bilen bruker på en bestemt strekning." },
      { termino: "Liter per mil", definicion: "Hvor mange liter bilen bruker på 10 km. Jo lavere tall, jo mindre bruker den." },
    ],
  };
};
