import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { DEFICIT, FACTORES, mifflin, SUPERAVIT } from "../definicion";

export const contenidoDa: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 0) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const ejemplo = imperial
    ? (() => {
        const basal = mifflin("hombre", 35, 180 * 0.45359237, 70 * 2.54);
        return [
          `En mand på 35 år, der vejer 180 lb og er 5 fod og 10 tommer høj, har et basalstofskifte på cirka ${n(basal)} kcal.`,
          `Med lidt motion holder han vægten på cirka ${n(basal * FACTORES.sedentaria)} kcal om dagen.`,
        ];
      })()
    : (() => {
        const basal = mifflin("mujer", 30, 60, 165);
        return [
          `En kvinde på 30 år, der vejer 60 kg og er 165 cm høj, har et basalstofskifte på cirka ${n(basal)} kcal.`,
          `Med moderat motion holder hun vægten på cirka ${n(basal * FACTORES.moderada)} kcal om dagen.`,
        ];
      })();
  return {
    h1: "Beregn dit kaloriebehov",
    title: tituloQueEntre(
      `Kalorieberegner: beregn dit kaloriebehov | ${ctx.nombrePais}`,
      `Kalorieberegner | ${ctx.nombrePais}`,
      "Kalorieberegner",
    ),
    description: "Beregn, hvor mange kalorier du forbrænder om dagen ud fra alder, vægt, højde og motion, og hvor meget du skal spise for at nå dit vægtmål.",
    intro: [
      "Skriv dine oplysninger, og hvor aktiv du er. Du ser dit basalstofskifte og dit energibehov på en almindelig dag.",
      "Det er et skøn. Beregneren er vejledende og erstatter ikke en samtale med din læge eller en diætist.",
    ],
    comoSeCalcula: [
      `Basalstofskifte (Mifflin-St Jeor): 10 × vægt i kg + ${n(6.25, 2)} × højde i cm − 5 × alder, plus 5 for mænd eller minus 161 for kvinder.`,
      `Energibehov = basalstofskifte × aktivitetsfaktor, fra ${n(1.2, 1)} (lidt motion) til ${n(1.9, 1)} (meget høj).`,
      `For at tabe dig trækkes ${DEFICIT} kcal fra om dagen, og for at tage på lægges ${SUPERAVIT} til. Det er en moderat ændring, som er til at holde.`,
    ],
    ejemplo,
    faq: [
      {
        pregunta: "Hvad er basalstofskifte?",
        respuesta: "Det er den energi, kroppen bruger i fuldstændig hvile for at trække vejret, holde varmen og holde organerne i gang.",
      },
      {
        pregunta: "Hvor mange kalorier skal jeg spise for at tabe mig?",
        respuesta: `Et almindeligt udgangspunkt er cirka ${DEFICIT} kcal mindre om dagen end dit energibehov. Det er bedst at aftale det med din læge eller en diætist.`,
      },
      {
        pregunta: "Hvor præcis er formlen?",
        respuesta: "Mifflin-St Jeor er en af de mest brugte formler, men den giver et gennemsnit. Gener, muskelmasse og helbred påvirker, hvad du faktisk forbrænder.",
      },
    ],
    glosario: [
      { termino: "Kalorie (kcal)", definicion: "Enheden for energien i maden og for det, kroppen forbrænder." },
      { termino: "Basalstofskifte", definicion: "De kalorier, kroppen forbrænder i fuldstændig hvile." },
    ],
  };
};
