import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { KG_POR_LB, M_POR_PULGADA } from "../definicion";

export const contenidoDa: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 1) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const m = 69 * M_POR_PULGADA;
  const ejemplo = imperial
    ? [
        `Vejer du 160 lb og er 5 fod og 9 tommer høj, er dit BMI ${n((160 * KG_POR_LB) / (m * m))}. Det er normalvægt.`,
        `Ved den højde ligger normalvægten mellem ${n((18.5 * m * m) / KG_POR_LB)} og ${n((24.9 * m * m) / KG_POR_LB)} lb.`,
      ]
    : [
        `Vejer du 70 kg og er ${n(1.75, 2)} m høj, er dit BMI ${n(70 / (1.75 * 1.75))}. Det er normalvægt.`,
        `Ved den højde ligger normalvægten mellem ${n(18.5 * 1.75 * 1.75)} og ${n(24.9 * 1.75 * 1.75)} kg.`,
      ];
  return {
    h1: "BMI-beregner",
    title: tituloQueEntre(
      `BMI-beregner: beregn dit BMI | ${ctx.nombrePais}`,
      `BMI-beregner | ${ctx.nombrePais}`,
      "BMI-beregner",
    ),
    description: "Beregn dit BMI ud fra vægt og højde. Du ser din kategori efter WHO, og hvilket vægtinterval der er normalt for din højde.",
    intro: [
      "Skriv din vægt og højde. Du ser dit BMI, kategorien efter Verdenssundhedsorganisationen (WHO) og normalvægten for din højde.",
      "Beregneren er vejledende og gælder for voksne. Den erstatter ikke en samtale med din læge.",
    ],
    comoSeCalcula: [
      imperial ? "BMI = vægt i pund × 703 ÷ (højde i tommer × højde i tommer)." : "BMI = vægt i kilo ÷ (højde i meter × højde i meter).",
      `Under ${n(18.5)} er undervægt. ${n(18.5)} til ${n(24.9)} er normalvægt. 25 til ${n(29.9)} er overvægt. 30 og derover regnes som svær overvægt.`,
      `Normalvægten er den vægt, der giver et BMI mellem ${n(18.5)} og ${n(24.9)} ved din højde.`,
    ],
    ejemplo,
    faq: [
      {
        pregunta: "Hvad er et normalt BMI?",
        respuesta: `Ifølge WHO et BMI mellem ${n(18.5)} og ${n(24.9)} for voksne. Grænserne er de samme for kvinder og mænd.`,
      },
      {
        pregunta: "Passer BMI på alle?",
        respuesta: "Nej. Det skelner ikke mellem muskler og fedt, så en meget veltrænet person kan få en høj værdi. Under graviditet og for børn og unge bruger man andre mål.",
      },
      {
        pregunta: "Hvordan regner jeg mit BMI ud?",
        respuesta: imperial
          ? "Gang vægten i pund med 703, og del med højden i tommer i anden. Ved 5 fod og 9 tommer er det 69 × 69."
          : `Del vægten i kilo med højden i meter i anden. Er du ${n(1.75, 2)} m høj, deler du med ${n(1.75 * 1.75, 4)}.`,
      },
    ],
    glosario: [
      { termino: "BMI", definicion: "Body mass index, et mål for, hvordan vægten passer til højden." },
      { termino: "WHO", definicion: "Verdenssundhedsorganisationen, der fastsætter BMI-kategorierne for voksne." },
    ],
  };
};
