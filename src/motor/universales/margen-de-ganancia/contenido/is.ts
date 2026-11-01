import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { precioConMargen } from "../definicion";

export const contenidoIs: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const p = (n: number) => `${formatearNumero(ctx, n, 2)}%`;
  const costo = montoEjemplo(ctx, 60);
  const precio = montoEjemplo(ctx, 100);
  const margenDePaslag50 = ((costo * 1.5 - costo) / (costo * 1.5)) * 100;
  return {
    h1: "Reiknivél fyrir álagningu og framlegð",
    title: tituloQueEntre(
      `Reiknivél fyrir álagningu og framlegð | ${ctx.nombrePais}`,
      `Álagning og framlegð | ${ctx.nombrePais}`,
      "Álagning og framlegð",
    ),
    description: "Reiknaðu framlegð og álagningu út frá kostnaði og verði, eða finndu söluverðið sem þú þarft til að ná þeirri framlegð sem þú vilt.",
    intro: [
      "Framlegð og álagningu er oft ruglað saman og sá munur getur kostað þig peninga. Hvort tveggja mælir sama hagnað, en miðað við ólíkar upphæðir.",
      "Sláðu inn kostnað og verð og þú sérð bæði. Eða veldu framlegð og þú sérð hvað þú þarft að rukka.",
    ],
    comoSeCalcula: [
      "Hagnaður = verð − kostnaður.",
      "Framlegð = hagnaður ÷ verð × 100.",
      "Álagning = hagnaður ÷ kostnaður × 100.",
      "Verð fyrir tiltekna framlegð = kostnaður ÷ (1 − framlegð ÷ 100).",
    ],
    ejemplo: [
      `Vara sem kostar ${m(costo)} og selst á ${m(precio)} skilar ${m(precio - costo)} í hagnað. Það er ${p(((precio - costo) / precio) * 100)} framlegð og ${p(((precio - costo) / costo) * 100)} álagning.`,
      `Til að fá 50% framlegð af þessum kostnaði þarftu að selja á ${m(precioConMargen(costo, 50))}. Ef þú leggur bara 50% ofan á kostnaðinn verður framlegðin ${p(margenDePaslag50)}.`,
    ],
    faq: [
      {
        pregunta: "Hver er munurinn á framlegð og álagningu?",
        respuesta: "Framlegð er hagnaðurinn miðað við söluverð. Álagning er hagnaðurinn miðað við kostnað. Af sama hagnaði er álagningin alltaf hærri talan.",
      },
      {
        pregunta: "Hvernig finn ég verð fyrir tiltekna framlegð?",
        respuesta: `Deildu í kostnaðinn með (1 − framlegð). Fyrir 30% framlegð deilirðu í kostnaðinn með ${formatearNumero(ctx, 0.7, 2)}. Ekki bara leggja 30% ofan á kostnaðinn, þá færðu minna en þú heldur.`,
      },
      {
        pregunta: "Á kostnaðurinn að vera með eða án VSK?",
        respuesta: "Reiknaðu bæði kostnað og verð án VSK. Annars sýnist framlegðin meiri en hún er.",
      },
    ],
    glosario: [
      { termino: "Framlegð", definicion: "Hagnaðurinn sem hlutfall af söluverði. Þegar kostnaðurinn er breytilegur kallast hún líka framlegðarhlutfall." },
      { termino: "Álagning", definicion: "Hagnaðurinn sem hlutfall af kostnaði." },
    ],
  };
};
