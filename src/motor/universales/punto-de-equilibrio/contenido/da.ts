import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { equilibrio } from "../definicion";

export const contenidoDa: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const fijos = montoEjemplo(ctx, 5000);
  const precio = montoEjemplo(ctx, 50);
  const variable = montoEjemplo(ctx, 30);
  const objetivo = montoEjemplo(ctx, 2000);
  const base = equilibrio(fijos, precio, variable);
  const meta = equilibrio(fijos + objetivo, precio, variable);
  return {
    h1: "Nulpunktsberegner: beregn din nulpunktsomsætning",
    title: tituloQueEntre(
      `Nulpunktsberegner: beregn nulpunktsomsætningen | ${ctx.nombrePais}`,
      `Nulpunktsberegner | ${ctx.nombrePais}`,
      "Nulpunktsberegner",
    ),
    description: "Beregn, hvor mange enheder du skal sælge, og hvilken omsætning du skal have hver måned for at dække omkostningerne og nå dit overskud.",
    intro: [
      "Nulpunktet (break even) er det salg, hvor virksomheden hverken giver overskud eller underskud. Under det taber du penge, over det begynder du at tjene.",
      "Skriv dine faste omkostninger, prisen og omkostningen for hver enhed. Du får at vide, hvor meget du skal sælge for at dække omkostningerne og nå dit mål.",
    ],
    comoSeCalcula: [
      "Dækningsbidrag = salgspris − variable omkostninger pr. stk.",
      "Antal enheder til nulpunktet = faste omkostninger ÷ dækningsbidrag, rundet op.",
      "Nulpunktsomsætning = faste omkostninger ÷ (dækningsbidrag ÷ salgspris).",
      "For et ønsket overskud lægger du det til de faste omkostninger og regner på samme måde.",
    ],
    ejemplo: [
      `Med ${m(fijos)} i faste omkostninger, en pris på ${m(precio)} og variable omkostninger på ${m(variable)} giver hvert salg et dækningsbidrag på ${m(precio - variable)}.`,
      `Du skal sælge ${formatearNumero(ctx, base.unidades)} enheder (${m(base.facturacion)}) for at dække omkostningerne og ${formatearNumero(ctx, meta.unidades)} for at tjene ${m(objetivo)} om måneden.`,
    ],
    faq: [
      {
        pregunta: "Hvad er faste og variable omkostninger?",
        respuesta: "Faste omkostninger er de samme, selv om du ikke sælger noget: husleje, faste lønninger, el. Variable omkostninger stiger med hvert salg: indkøb, materialer, provision og fragt.",
      },
      {
        pregunta: "Hvordan sænker jeg mit nulpunkt?",
        respuesta: "Der er tre måder: hæve prisen, sænke de variable omkostninger pr. stk. eller skære i de faste omkostninger. Prisen gør som regel den største forskel.",
      },
      {
        pregunta: "Virker det også for en servicevirksomhed?",
        respuesta: "Ja. En enhed kan være en time, en opgave eller en kunde om måneden. Brug det, det koster dig at levere hver enhed, som variabel omkostning.",
      },
    ],
    glosario: [
      { termino: "Nulpunkt", definicion: "Det salgsniveau, hvor indtægterne er lige så store som omkostningerne." },
      { termino: "Dækningsbidrag", definicion: "Det, hvert salg bidrager med til at betale de faste omkostninger." },
    ],
  };
};
