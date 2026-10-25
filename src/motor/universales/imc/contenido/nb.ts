import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { KG_POR_LB, M_POR_PULGADA } from "../definicion";

export const contenidoNb: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 1) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const m = 69 * M_POR_PULGADA;
  const ejemplo = imperial
    ? [
        `Veier du 160 lb og er 5 fot og 9 tommer høy, er KMI-en din ${n((160 * KG_POR_LB) / (m * m))}. Det er normalvekt.`,
        `Med den høyden ligger normalvekten mellom ${n((18.5 * m * m) / KG_POR_LB)} og ${n((24.9 * m * m) / KG_POR_LB)} lb.`,
      ]
    : [
        `Veier du 70 kg og er ${n(1.75, 2)} m høy, er KMI-en din ${n(70 / (1.75 * 1.75))}. Det er normalvekt.`,
        `Med den høyden ligger normalvekten mellom ${n(18.5 * 1.75 * 1.75)} og ${n(24.9 * 1.75 * 1.75)} kg.`,
      ];
  return {
    h1: "BMI-kalkulator",
    title: tituloQueEntre(
      `BMI-kalkulator: regn ut KMI-en din | ${ctx.nombrePais}`,
      `BMI-kalkulator | ${ctx.nombrePais}`,
      "BMI-kalkulator",
    ),
    description: "Regn ut kroppsmasseindeksen (KMI/BMI) fra vekt og høyde. Du ser kategorien etter WHO og hvilken vekt som er normal for høyden din.",
    intro: [
      "Fyll inn vekt og høyde. Du ser KMI-en din, kategorien etter Verdens helseorganisasjon (WHO) og normalvekten for høyden din.",
      "Kalkulatoren er veiledende og gjelder for voksne. Den erstatter ikke en samtale med legen din.",
    ],
    comoSeCalcula: [
      imperial ? "KMI = vekt i pund × 703 ÷ (høyde i tommer × høyde i tommer)." : "KMI = vekt i kilo ÷ (høyde i meter × høyde i meter).",
      `Under ${n(18.5)} er undervekt. ${n(18.5)} til ${n(24.9)} er normalvekt. 25 til ${n(29.9)} er overvekt. 30 og over regnes som fedme.`,
      `Normalvekten er vekten som gir en KMI mellom ${n(18.5)} og ${n(24.9)} med høyden din.`,
    ],
    ejemplo,
    faq: [
      {
        pregunta: "Hva er normal KMI?",
        respuesta: `Etter WHO er det en KMI mellom ${n(18.5)} og ${n(24.9)} for voksne. Grensene er de samme for kvinner og menn.`,
      },
      {
        pregunta: "Passer KMI for alle?",
        respuesta: "Nei. Den skiller ikke mellom muskler og fett, så en godt trent person kan få en høy verdi. For gravide, barn og unge brukes andre mål.",
      },
      {
        pregunta: "Hvordan regner jeg ut KMI-en min?",
        respuesta: imperial
          ? "Gang vekten i pund med 703, og del på høyden i tommer i andre. Med 5 fot og 9 tommer er det 69 × 69."
          : `Del vekten i kilo på høyden i meter i andre. Er du ${n(1.75, 2)} m høy, deler du på ${n(1.75 * 1.75, 4)}.`,
      },
    ],
    glosario: [
      { termino: "KMI (BMI)", definicion: "Kroppsmasseindeks, et mål på hvordan vekten passer til høyden." },
      { termino: "WHO", definicion: "Verdens helseorganisasjon, som setter KMI-kategoriene for voksne." },
    ],
  };
};
