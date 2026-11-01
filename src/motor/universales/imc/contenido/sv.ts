import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { KG_POR_LB, M_POR_PULGADA } from "../definicion";

export const contenidoSv: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 1) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const m = 69 * M_POR_PULGADA;
  const ejemplo = imperial
    ? [
        `Den som väger 160 lb och är 5 fot 9 tum lång har ett BMI på ${n((160 * KG_POR_LB) / (m * m))}, alltså normalvikt.`,
        `Vid den längden ligger normalvikten mellan ${n((18.5 * m * m) / KG_POR_LB)} och ${n((24.9 * m * m) / KG_POR_LB)} lb.`,
      ]
    : [
        `Den som väger 70 kg och är ${n(1.75, 2)} m lång har ett BMI på ${n(70 / (1.75 * 1.75))}, alltså normalvikt.`,
        `Vid den längden ligger normalvikten mellan ${n(18.5 * 1.75 * 1.75)} och ${n(24.9 * 1.75 * 1.75)} kg.`,
      ];
  return {
    h1: "BMI-kalkylator",
    title: tituloQueEntre(
      `BMI-kalkylator: räkna ut ditt BMI | ${ctx.nombrePais}`,
      `BMI-kalkylator | ${ctx.nombrePais}`,
      "BMI-kalkylator",
    ),
    description: "Räkna ut ditt BMI utifrån vikt och längd. Du ser din kategori enligt WHO och vilket viktintervall som är normalt för din längd.",
    intro: [
      "Fyll i vikt och längd. Du ser ditt BMI, kategorin enligt Världshälsoorganisationen (WHO) och normalviktsintervallet för din längd.",
      "Resultatet är en allmän vägledning för vuxna. Det ersätter inte en bedömning av läkare eller annan vårdpersonal.",
    ],
    comoSeCalcula: [
      imperial ? "BMI = vikt i pund × 703 ÷ (längd i tum × längd i tum)." : "BMI = vikt i kilo ÷ (längd i meter × längd i meter).",
      `Under ${n(18.5)} är undervikt. ${n(18.5)} till ${n(24.9)} är normalvikt. 25 till ${n(29.9)} är övervikt. 30 och mer räknas som fetma.`,
      `Normalviktsintervallet är den vikt som ger ett BMI mellan ${n(18.5)} och ${n(24.9)} vid din längd.`,
    ],
    ejemplo,
    faq: [
      {
        pregunta: "Vad är ett normalt BMI?",
        respuesta: `Enligt WHO ett BMI mellan ${n(18.5)} och ${n(24.9)} för vuxna. Gränserna är desamma för kvinnor och män.`,
      },
      {
        pregunta: "Stämmer BMI för alla?",
        respuesta: "Nej. Det skiljer inte på muskler och fett, så den som är mycket vältränad kan få ett högt värde. Under graviditet och för barn och ungdomar används andra mått.",
      },
      {
        pregunta: "Hur räknar jag ut BMI?",
        respuesta: imperial
          ? "Multiplicera vikten i pund med 703 och dela med längden i tum i kvadrat. Vid 5 fot 9 tum är det 69 × 69."
          : `Dela vikten i kilo med längden i meter i kvadrat. Är du ${n(1.75, 2)} m lång delar du med ${n(1.75 * 1.75, 4)}.`,
      },
    ],
    glosario: [
      { termino: "BMI", definicion: "Body mass index, ett mått på hur vikten förhåller sig till längden." },
      { termino: "WHO", definicion: "Världshälsoorganisationen, som fastställer BMI-kategorierna för vuxna." },
    ],
  };
};
