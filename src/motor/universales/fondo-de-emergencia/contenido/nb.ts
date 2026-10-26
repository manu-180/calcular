import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoNb: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const gastos = montoEjemplo(ctx, 1500);
  const aporte = montoEjemplo(ctx, 300);
  return {
    h1: "Buffersparing: hvor stor buffer trenger du?",
    title: tituloQueEntre(
      `Buffersparing: regn ut hvor stor buffer du trenger | ${ctx.nombrePais}`,
      `Buffersparing: hvor stor buffer trenger du | ${ctx.nombrePais}`,
      `Buffersparing | ${ctx.nombrePais}`,
      "Buffersparing",
    ),
    description: "Regn ut hvor stor buffer du trenger ut fra de nødvendige utgiftene dine, og hvor mange måneder det tar å spare den opp.",
    intro: [
      "En buffer er penger satt av til det du ikke kan planlegge: å miste jobben, å bli syk eller en akutt reparasjon hjemme.",
      "Med en buffer slipper du å bruke kredittkortet når det er som tyngst. Fyll inn de nødvendige utgiftene dine og hvor mange måneder bufferen skal dekke.",
    ],
    comoSeCalcula: [
      "Anbefalt buffer = nødvendige utgifter per måned × antall måneder.",
      "Gjenstår å spare = anbefalt buffer − det du allerede har.",
      "Måneder til bufferen er på plass = det som gjenstår ÷ det du sparer per måned, rundet opp.",
    ],
    ejemplo: [
      `Med ${m(gastos)} i nødvendige utgifter per måned blir en buffer for 6 måneder ${m(gastos * 6)}.`,
      `Sparer du ${m(aporte)} i måneden, er bufferen på plass etter ${Math.ceil((gastos * 6) / aporte)} måneder.`,
    ],
    faq: [
      {
        pregunta: "Hvor mange måneder bør bufferen dekke?",
        respuesta:
          "En vanlig tommelfingerregel er 3 til 6 måneder med nødvendige utgifter. Har du varierende inntekt, eget firma eller bare én inntekt i husholdningen, er 6 til 12 måneder tryggere.",
      },
      {
        pregunta: "Hvor bør jeg ha bufferen?",
        respuesta: "På en trygg konto som du kan bruke samme dag, atskilt fra brukskontoen. Bufferen bør ikke stå i aksjer. Den skal være der når du trenger den.",
      },
      {
        pregunta: "Bør jeg spare til buffer eller betale ned gjeld først?",
        respuesta: "En vanlig plan er å spare opp én måneds utgifter først, så betale ned dyr gjeld som kredittkort og forbrukslån, og til slutt fylle opp resten av bufferen.",
      },
    ],
    glosario: [
      { termino: "Nødvendige utgifter", definicion: "Regninger du må betale selv om inntekten faller bort: bolig, mat, strøm og medisiner." },
      { termino: "Likviditet", definicion: "Hvor raskt pengene kan brukes uten å tape verdi." },
    ],
  };
};
