import { formatearCifra, formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoDa: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 1) => formatearNumero(ctx, x, d);
  const c = (x: number) => formatearCifra(ctx, x);
  const ponderado = (7 * 20 + 10 * 30 + 12 * 50) / (20 + 30 + 50);
  const simple = (7 + 10 + 12) / 3;
  const ects = (10 * 15 + 7 * 5) / (15 + 5);
  return {
    h1: "Beregn vægtet gennemsnit",
    title: tituloQueEntre(
      `Vægtet gennemsnit: beregn karaktergennemsnit | ${ctx.nombrePais}`,
      `Vægtet gennemsnit | ${ctx.nombrePais}`,
      "Vægtet gennemsnit",
    ),
    description: "Beregn et almindeligt eller vægtet gennemsnit med op til 10 værdier og en vægt til hver, i procent, ECTS-point eller antal gange.",
    intro: [
      "Skriv hver karakter eller værdi, og hvor meget den vægter. Du ser det vægtede gennemsnit med det almindelige ved siden af.",
      "Den virker til karaktergennemsnit i skolen eller på studiet og til alle gennemsnit, hvor nogle værdier tæller mere end andre.",
    ],
    comoSeCalcula: [
      "Almindeligt gennemsnit = summen af værdierne ÷ antallet af værdier.",
      "Vægtet gennemsnit = summen af (værdi × vægt) ÷ summen af vægtene.",
      "Vægtene behøver ikke give 100 tilsammen, fordi regnestykket deler med deres sum.",
    ],
    ejemplo: [
      `Med 7, der vægter 20 %, 10, der vægter 30 %, og 12, der vægter 50 %, bliver det vægtede gennemsnit ${n(ponderado)}.`,
      `Det almindelige gennemsnit af de samme tre karakterer er ${n(simple)}. Tolvtallet vægter mest og trækker det vægtede op.`,
    ],
    faq: [
      {
        pregunta: "Hvordan beregner jeg et vægtet gennemsnit?",
        respuesta: "Gang hver værdi med dens vægt, læg resultaterne sammen, og del med summen af vægtene.",
      },
      {
        pregunta: "Hvad hvis vægtene ikke giver 100 %?",
        respuesta: `Det gør ikke noget. Har et fag 15 ECTS-point og et andet 5, bruger du 15 og 5. Regnestykket deler med den samlede vægt, her ${c(15 + 5)}. Med 10 og 7 giver det ${n(ects, 2)}.`,
      },
      {
        pregunta: "Hvad er forskellen på et almindeligt og et vægtet gennemsnit?",
        respuesta: "I et almindeligt gennemsnit tæller alle værdier lige meget. I et vægtet gennemsnit tæller hver værdi efter sin vægt.",
      },
    ],
    glosario: [
      { termino: "Vægt", definicion: "Hvor meget en værdi påvirker det endelige gennemsnit." },
      { termino: "Vægtet gennemsnit", definicion: "Et gennemsnit, hvor hver værdi ganges med sin vægt." },
    ],
  };
};
