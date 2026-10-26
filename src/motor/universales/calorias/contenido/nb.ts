import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { DEFICIT, FACTORES, mifflin, SUPERAVIT } from "../definicion";

export const contenidoNb: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 0) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const ejemplo = imperial
    ? (() => {
        const basal = mifflin("hombre", 35, 180 * 0.45359237, 70 * 2.54);
        return [
          `En mann på 35 år som veier 180 lb og er 5 fot og 10 tommer høy, har et hvilestoffskifte på omtrent ${n(basal)} kcal.`,
          `Med lite trening holder han vekten på omtrent ${n(basal * FACTORES.sedentaria)} kcal per dag.`,
        ];
      })()
    : (() => {
        const basal = mifflin("mujer", 30, 60, 165);
        return [
          `En kvinne på 30 år som veier 60 kg og er 165 cm høy, har et hvilestoffskifte på omtrent ${n(basal)} kcal.`,
          `Med moderat trening holder hun vekten på omtrent ${n(basal * FACTORES.moderada)} kcal per dag.`,
        ];
      })();
  return {
    h1: "Regn ut kaloribehovet ditt",
    title: tituloQueEntre(
      `Kaloribehov: regn ut hvor mange kalorier du trenger | ${ctx.nombrePais}`,
      `Kaloribehov: kalkulator | ${ctx.nombrePais}`,
      `Kaloribehov | ${ctx.nombrePais}`,
      "Kaloribehov",
    ),
    description: "Regn ut hvor mange kalorier du forbrenner per dag ut fra alder, vekt, høyde og aktivitet, og hvor mye du bør spise for å nå vektmålet ditt.",
    intro: [
      "Fyll inn opplysningene dine og hvor aktiv du er. Du ser hvilestoffskiftet ditt og energibehovet ditt en vanlig dag.",
      "Dette er et anslag. Kalkulatoren er veiledende og erstatter ikke en samtale med lege eller klinisk ernæringsfysiolog.",
    ],
    comoSeCalcula: [
      `Hvilestoffskifte (Mifflin-St Jeor): 10 × vekt i kg + ${n(6.25, 2)} × høyde i cm − 5 × alder, pluss 5 for menn eller minus 161 for kvinner.`,
      `Energibehov = hvilestoffskifte × aktivitetsfaktor, fra ${n(1.2, 1)} (lite trening) til ${n(1.9, 1)} (svært høyt).`,
      `For å gå ned i vekt trekkes ${DEFICIT} kcal fra per dag, og for å gå opp legges ${SUPERAVIT} til. Det er en moderat endring som er mulig å holde over tid.`,
    ],
    ejemplo,
    faq: [
      {
        pregunta: "Hva er hvilestoffskifte?",
        respuesta: "Det er energien kroppen bruker i fullstendig hvile for å puste, holde varmen og holde organene i gang.",
      },
      {
        pregunta: "Hvor mange kalorier bør jeg spise for å gå ned i vekt?",
        respuesta: `Et vanlig utgangspunkt er omtrent ${DEFICIT} kcal mindre per dag enn energibehovet ditt. Det er best å avtale det med lege eller klinisk ernæringsfysiolog.`,
      },
      {
        pregunta: "Hvor nøyaktig er formelen?",
        respuesta: "Mifflin-St Jeor er en av de mest brukte formlene, men den gir et gjennomsnitt. Gener, muskelmasse og helse påvirker hva du faktisk forbrenner.",
      },
    ],
    glosario: [
      { termino: "Kalori (kcal)", definicion: "Enheten for energien i maten og for det kroppen forbrenner." },
      { termino: "Hvilestoffskifte", definicion: "Kaloriene kroppen forbrenner i fullstendig hvile." },
    ],
  };
};
