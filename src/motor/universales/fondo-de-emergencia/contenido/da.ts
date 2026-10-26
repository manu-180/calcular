import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoDa: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const gastos = montoEjemplo(ctx, 1500);
  const aporte = montoEjemplo(ctx, 300);
  return {
    h1: "Bufferopsparing: hvor stor en buffer har du brug for?",
    title: tituloQueEntre(
      `Bufferopsparing: beregn din økonomiske buffer | ${ctx.nombrePais}`,
      `Bufferopsparing | ${ctx.nombrePais}`,
      "Bufferopsparing",
    ),
    description: "Beregn, hvor stor en økonomisk buffer du har brug for ud fra dine nødvendige udgifter, og hvor mange måneder det tager at spare den op.",
    intro: [
      "En buffer er penge sat til side til det, du ikke kan planlægge: at miste jobbet, at blive syg eller en akut reparation i hjemmet.",
      "Med en buffer slipper du for at låne penge, lige når det er sværest. Skriv dine nødvendige udgifter, og hvor mange måneder du vil kunne klare dig.",
    ],
    comoSeCalcula: [
      "Anbefalet buffer = nødvendige udgifter om måneden × antal måneder.",
      "Mangler at spare op = anbefalet buffer − det, du allerede har.",
      "Måneder til bufferen er på plads = det, der mangler ÷ det, du sparer op om måneden, rundet op.",
    ],
    ejemplo: [
      `Med ${m(gastos)} i nødvendige udgifter om måneden er en buffer til 6 måneder på ${m(gastos * 6)}.`,
      `Sparer du ${m(aporte)} op om måneden, er bufferen på plads efter ${Math.ceil((gastos * 6) / aporte)} måneder.`,
    ],
    faq: [
      {
        pregunta: "Hvor mange måneder skal bufferen række?",
        respuesta:
          "En almindelig tommelfingerregel er 3 til 6 måneders nødvendige udgifter. Har du svingende indkomst, egen virksomhed eller kun én indkomst i husstanden, er 6 til 12 måneder mere sikkert.",
      },
      {
        pregunta: "Hvor skal jeg have min buffer?",
        respuesta: "På en sikker konto, som du kan bruge samme dag, adskilt fra den konto, du handler fra. Bufferen skal ikke investeres i aktier. Den skal være der, når du har brug for den.",
      },
      {
        pregunta: "Skal jeg spare op til en buffer eller betale gæld af først?",
        respuesta: "En almindelig plan er først at spare en måneds udgifter op, derefter betale dyr gæld af som kreditkort og forbrugslån og til sidst gøre bufferen færdig.",
      },
    ],
    glosario: [
      { termino: "Nødvendige udgifter", definicion: "Regninger, du skal betale, selv om indkomsten forsvinder: bolig, mad, el og medicin." },
      { termino: "Likviditet", definicion: "Hvor hurtigt pengene kan bruges uden at tabe værdi." },
    ],
  };
};
