import { formatearCifra, formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoDa: ContenidoUniversal = (ctx) => {
  const precio = montoEjemplo(ctx, 50);
  const m = (n: number) => formatearMonto(ctx, n);
  const c = (n: number) => formatearCifra(ctx, n);
  return {
    h1: "Procentberegner",
    title: tituloQueEntre(
      `Procentberegner: regn procent ud på sekunder | ${ctx.nombrePais}`,
      `Procentberegner | ${ctx.nombrePais}`,
      "Procentberegner",
    ),
    description: "Beregn hvor meget X procent af et tal er, hvor mange procent et tal er af et andet, og hvad der sker, når du lægger procent til eller trækker fra.",
    intro: [
      "Vælg, hvad du vil vide, skriv de to tal, og få svaret med det samme.",
      "Her er de fire procentregnestykker, man oftest møder i hverdagen: en del, en andel, en stigning og et fald.",
    ],
    comoSeCalcula: [
      "X % af Y = X × Y ÷ 100.",
      "Hvor mange procent X er af Y = X ÷ Y × 100.",
      "Y plus X % = Y × (1 + X ÷ 100). Y minus X % = Y × (1 − X ÷ 100).",
    ],
    ejemplo: [
      `15 % af 200 er ${c((15 * 200) / 100)}.`,
      `30 er ${c((30 / 120) * 100)} % af 120.`,
      `En pris på ${m(precio)}, der stiger med 10 %, bliver til ${m(precio * 1.1)}.`,
    ],
    faq: [
      {
        pregunta: "Hvordan regner jeg procent af et tal ud?",
        respuesta: `Gang tallet med procentsatsen, og del med 100. 20 % af 350 er 350 × 20 ÷ 100 = ${c((350 * 20) / 100)}.`,
      },
      {
        pregunta: "Hvordan finder jeg ud af, hvor mange procent et tal er af et andet?",
        respuesta: `Del delen med det hele, og gang med 100. Har du 45 rigtige ud af 60, er det 45 ÷ 60 × 100 = ${c((45 / 60) * 100)} %.`,
      },
      {
        pregunta: "Hvordan lægger jeg procent oven i en pris?",
        respuesta: `Gang prisen med 1 plus procentsatsen som decimaltal. Skal der lægges 10 % til, ganger du med ${formatearNumero(ctx, 1.1, 2)}.`,
      },
      {
        pregunta: "Ender jeg samme sted, hvis noget først stiger 10 % og så falder 10 %?",
        respuesta: `Nej. 100 plus 10 % er ${c(110)}, og ${c(110)} minus 10 % er ${c(110 * 0.9)}. Faldet regnes af et større tal.`,
      },
    ],
    glosario: [
      { termino: "Procent", definicion: "En andel udtrykt i hundrededele." },
      { termino: "Grundtal", definicion: "Det tal, procenten regnes af (Y i denne beregner)." },
    ],
  };
};
