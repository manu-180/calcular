import { formatearCifra, formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoNb: ContenidoUniversal = (ctx) => {
  const precio = montoEjemplo(ctx, 80);
  const m = (n: number) => formatearMonto(ctx, n);
  const total = formatearCifra(ctx, (1 - 0.7 * 0.9) * 100);
  return {
    h1: "Rabattkalkulator",
    title: tituloQueEntre(
      `Rabattkalkulator: regn ut pris etter rabatt | ${ctx.nombrePais}`,
      `Rabattkalkulator | ${ctx.nombrePais}`,
      "Rabattkalkulator",
    ),
    description: "Regn ut prisen etter rabatt og hvor mye du sparer, også når to rabatter gjelder etter hverandre, som 30 % og så 10 % i tillegg.",
    intro: [
      "Fyll inn pris og rabatt, så ser du med en gang hva du betaler og hvor mye du sparer.",
      "Får du en ekstra rabatt på toppen, fyller du inn den også. To rabatter etter hverandre blir aldri bare summen av dem.",
    ],
    comoSeCalcula: [
      "Pris etter rabatt = ordinær pris × (1 − rabatt ÷ 100).",
      "En ekstra rabatt regnes av prisen som allerede er satt ned.",
      "Det du sparer, er ordinær pris minus pris etter rabatt.",
    ],
    ejemplo: [
      `En vare til ${m(precio)} koster ${m(precio * 0.75)} med 25 % rabatt.`,
      `Med 30 % og så 10 % i tillegg koster den ${m(precio * 0.7 * 0.9)}. Det er ${total} % billigere til sammen, ikke 40 %.`,
    ],
    faq: [
      {
        pregunta: "Hvordan regner jeg ut en rabatt?",
        respuesta: "Gang prisen med prosentsatsen og del på 100. Det er det du sparer. Trekk det fra prisen, så har du det du betaler.",
      },
      {
        pregunta: "Er 30 % pluss 10 % rabatt det samme som 40 %?",
        respuesta: `Nei. Den andre rabatten regnes av prisen som allerede er satt ned. Til sammen sparer du derfor ${total} %.`,
      },
      {
        pregunta: "Hvordan finner jeg ordinær pris ut fra prisen etter rabatt?",
        respuesta: `Del prisen etter rabatt på (1 − rabatt ÷ 100). Ved 25 % rabatt deler du på ${formatearNumero(ctx, 0.75, 2)}.`,
      },
    ],
    glosario: [
      { termino: "Rabatt", definicion: "Prosentsatsen som trekkes fra den ordinære prisen." },
      { termino: "Samlet rabatt", definicion: "Hvor mange prosent du sparer til sammen når mer enn én rabatt gjelder." },
    ],
  };
};
