import { formatearCifra, formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoNb: ContenidoUniversal = (ctx) => {
  const precio = montoEjemplo(ctx, 50);
  const m = (n: number) => formatearMonto(ctx, n);
  const c = (n: number) => formatearCifra(ctx, n);
  return {
    h1: "Prosentkalkulator",
    title: tituloQueEntre(
      `Prosentkalkulator: regn ut prosent enkelt | ${ctx.nombrePais}`,
      `Prosentkalkulator | ${ctx.nombrePais}`,
      "Prosentkalkulator",
    ),
    description: "Regn ut hvor mye X prosent av et tall er, hvor mange prosent et tall er av et annet, og hva som skjer når du legger til eller trekker fra prosent.",
    intro: [
      "Velg hva du vil finne ut, fyll inn de to tallene og få svaret med en gang.",
      "Her finner du de fire prosentregnestykkene du møter oftest i hverdagen: en del, en andel, en økning og en nedgang.",
    ],
    comoSeCalcula: [
      "X % av Y = X × Y ÷ 100.",
      "Hvor mange prosent X er av Y = X ÷ Y × 100.",
      "Y pluss X % = Y × (1 + X ÷ 100). Y minus X % = Y × (1 − X ÷ 100).",
    ],
    ejemplo: [
      `15 % av 200 er ${c((15 * 200) / 100)}.`,
      `30 er ${c((30 / 120) * 100)} % av 120.`,
      `En pris på ${m(precio)} som øker med 10 %, blir ${m(precio * 1.1)}.`,
    ],
    faq: [
      {
        pregunta: "Hvordan regner jeg ut prosent av et tall?",
        respuesta: `Gang tallet med prosentsatsen og del på 100. 20 % av 350 er 350 × 20 ÷ 100 = ${c((350 * 20) / 100)}.`,
      },
      {
        pregunta: "Hvordan finner jeg ut hvor mange prosent et tall er av et annet?",
        respuesta: `Del delen på det hele og gang med 100. Har du 45 riktige av 60, er det 45 ÷ 60 × 100 = ${c((45 / 60) * 100)} %.`,
      },
      {
        pregunta: "Hvordan legger jeg prosent på en pris?",
        respuesta: `Gang prisen med 1 pluss prosentsatsen som desimaltall. Skal du legge på 10 %, ganger du med ${formatearNumero(ctx, 1.1, 2)}.`,
      },
      {
        pregunta: "Kommer jeg tilbake til samme tall hvis noe først øker 10 % og så synker 10 %?",
        respuesta: `Nei. 100 pluss 10 % er ${c(110)}, og ${c(110)} minus 10 % er ${c(110 * 0.9)}. Nedgangen regnes av et større tall.`,
      },
    ],
    glosario: [
      { termino: "Prosent", definicion: "En andel uttrykt i hundredeler." },
      { termino: "Grunntall", definicion: "Tallet prosenten regnes av (Y i denne kalkulatoren)." },
    ],
  };
};
