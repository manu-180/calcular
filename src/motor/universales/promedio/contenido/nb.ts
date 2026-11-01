import { formatearCifra, formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoNb: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 1) => formatearNumero(ctx, x, d);
  const c = (x: number) => formatearCifra(ctx, x);
  const ponderado = (4 * 20 + 5 * 30 + 6 * 50) / (20 + 30 + 50);
  const simple = (4 + 5 + 6) / 3;
  return {
    h1: "Regn ut vektet gjennomsnitt",
    title: tituloQueEntre(
      `Vektet gjennomsnitt: regn ut snitt med vekter | ${ctx.nombrePais}`,
      `Vektet gjennomsnitt | ${ctx.nombrePais}`,
      "Vektet gjennomsnitt",
    ),
    description: "Regn ut et vanlig eller vektet gjennomsnitt med opptil 10 verdier og vekten til hver verdi, i prosent, studiepoeng eller antall ganger.",
    intro: [
      "Fyll inn hver karakter eller verdi og hvor mye den teller. Du ser det vektede gjennomsnittet og det vanlige ved siden av.",
      "Den fungerer for karaktersnitt på skolen eller studiet, og for alle gjennomsnitt der noen verdier teller mer enn andre.",
    ],
    comoSeCalcula: [
      "Vanlig gjennomsnitt = summen av verdiene ÷ antall verdier.",
      "Vektet gjennomsnitt = summen av (verdi × vekt) ÷ summen av vektene.",
      "Vektene trenger ikke å bli 100 til sammen, fordi regnestykket deler på summen av dem.",
    ],
    ejemplo: [
      `Med 4 som teller 20 %, 5 som teller 30 % og 6 som teller 50 %, blir det vektede gjennomsnittet ${n(ponderado)}.`,
      `Det vanlige gjennomsnittet av de samme tre verdiene er ${n(simple)}. Sekseren teller mest og trekker det vektede opp.`,
    ],
    faq: [
      {
        pregunta: "Hvordan regner jeg ut et vektet gjennomsnitt?",
        respuesta: "Gang hver verdi med vekten sin, legg sammen resultatene og del på summen av vektene.",
      },
      {
        pregunta: "Hva skjer hvis vektene ikke blir 100 %?",
        respuesta: `Det gjør ingenting. Gir ett emne 10 studiepoeng og et annet 5, bruker du 10 og 5. Regnestykket deler på den samlede vekten, her ${c(10 + 5)}.`,
      },
      {
        pregunta: "Hva er forskjellen på vanlig og vektet gjennomsnitt?",
        respuesta: "I et vanlig gjennomsnitt teller alle verdiene like mye. I et vektet gjennomsnitt teller hver verdi etter vekten sin.",
      },
    ],
    glosario: [
      { termino: "Vekt", definicion: "Hvor mye en verdi påvirker det endelige gjennomsnittet." },
      { termino: "Vektet gjennomsnitt", definicion: "Et gjennomsnitt der hver verdi ganges med vekten sin." },
    ],
  };
};
