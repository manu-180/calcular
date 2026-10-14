import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoNl: ContenidoUniversal = (ctx) => {
  const precio3 = montoEjemplo(ctx, 6);
  const m = (n: number) => formatearMonto(ctx, n);
  const n = (x: number) => formatearNumero(ctx, x);
  const belgie = ctx.locale.endsWith("BE");
  const naam = belgie ? "Regel van drie" : "Verhoudingen berekenen";
  return {
    h1: naam,
    title: tituloQueEntre(`${naam} in ${ctx.nombrePais}`, naam),
    description: "Reken een verhouding uit in een paar tellen. Vul drie getallen in en je krijgt het vierde, met de som erbij. Recht of omgekeerd evenredig.",
    intro: [
      belgie
        ? "De regel van drie werkt als twee grootheden samen veranderen en je drie van de vier getallen kent."
        : "Een verhouding uitrekenen werkt als twee grootheden samen veranderen en je drie van de vier getallen kent. Op school heet dat vaak de verhoudingstabel of het kruisproduct.",
      "Kies recht of omgekeerd evenredig, vul A, B en C in en je krijgt X.",
    ],
    comoSeCalcula: [
      "Recht evenredig: X = B × C ÷ A. Dat gebruik je als beide samen groeien (meer kilo, hogere prijs).",
      "Omgekeerd evenredig: X = A × B ÷ C. Dat gebruik je als de ene groeit en de andere krimpt (meer mensen, minder dagen).",
    ],
    ejemplo: [
      `Kost 3 kilo ${m(precio3)}, dan kost 5 kilo ${m((precio3 * 5) / 3)}.`,
      `Doen 4 schilders 12 dagen over een huis, dan zijn 6 schilders in ${n((4 * 12) / 6)} dagen klaar.`,
    ],
    faq: [
      {
        pregunta: "Hoe weet je of het recht of omgekeerd evenredig is?",
        respuesta: "Gaat de ene omhoog als de andere omhoog gaat, dan is het recht evenredig. Gaat de ene omlaag als de andere omhoog gaat, dan is het omgekeerd evenredig.",
      },
      {
        pregunta: "Hoe reken je een verhouding met de hand uit?",
        respuesta: `Vermenigvuldig kruislings de twee bekende getallen die schuin tegenover elkaar staan en deel door het getal dat overblijft. Hoort 600 bij 3, dan hoort bij 5 het getal 600 × 5 ÷ 3 =${n((600 * 5) / 3)}.`,
      },
      {
        pregunta: "Kan ik dit ook voor procenten gebruiken?",
        respuesta: `Ja. Is 200 gelijk aan 100%, dan is 50 gelijk aan ${n((100 * 50) / 200)}%. Dat is recht evenredig met A = 200, B = 100 en C = 50.`,
      },
    ],
    glosario: [
      { termino: "Recht evenredig", definicion: "Beide grootheden gaan samen omhoog of samen omlaag." },
      { termino: "Omgekeerd evenredig", definicion: "De ene gaat omhoog als de andere omlaag gaat." },
      { termino: "Kruisproduct", definicion: "De twee getallen die schuin tegenover elkaar staan met elkaar vermenigvuldigen." },
    ],
  };
};
