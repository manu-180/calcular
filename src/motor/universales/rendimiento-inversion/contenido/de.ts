import { paraSuiza } from "../../comun/locales";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { cagr, roi } from "../definicion";

const contenido: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const p = (n: number) => `${formatearNumero(ctx, n, 2)} %`;
  const inicial = montoEjemplo(ctx, 10000);
  const final = montoEjemplo(ctx, 15000);
  const c = {
    h1: "Rendite berechnen",
    title: tituloQueEntre(
      `Renditerechner: ROI und Rendite pro Jahr (CAGR) | ${ctx.nombrePais}`,
      `Renditerechner | ${ctx.nombrePais}`,
      "Renditerechner",
    ),
    description:
      "Berechnen Sie die Gesamtrendite (ROI) und die Rendite pro Jahr (CAGR) einer Geldanlage aus Einsatz, heutigem Wert und Anlagedauer.",
    intro: [
      "50 % Gewinn klingen gut, aber über 2 Jahre ist das etwas ganz anderes als über 10. Um Anlagen zu vergleichen, brauchen Sie die Rendite pro Jahr.",
      "Geben Sie ein, was Sie angelegt haben, was es heute wert ist und wie viele Jahre vergangen sind. Sie sehen die Gesamtrendite und die durchschnittliche Rendite pro Jahr mit Zinseszins.",
    ],
    comoSeCalcula: [
      "ROI = (Endwert + erhaltene Erträge − angelegter Betrag) ÷ angelegter Betrag × 100.",
      "CAGR = ((Endwert + erhaltene Erträge) ÷ angelegter Betrag) hoch (1 ÷ Jahre), minus 1.",
      "Die CAGR ist die jährliche Rendite mit Zinseszins: der Satz, der zum selben Ergebnis führt, wenn er sich jedes Jahr wiederholt.",
    ],
    ejemplo: [
      `Wer ${m(inicial)} anlegt und am Ende ${m(final)} hat, macht ${m(final - inicial)} Gewinn. Das ist ein ROI von ${p(roi(inicial, final))}.`,
      `Hat das 5 Jahre gedauert, beträgt die Rendite pro Jahr ${p(cagr(inicial, final, 5))}. Bei 2 Jahren sind es ${p(cagr(inicial, final, 2))}.`,
    ],
    faq: [
      {
        pregunta: "Was ist der Unterschied zwischen ROI und CAGR?",
        respuesta: "Der ROI ist der Gesamtgewinn im Verhältnis zum Einsatz, egal wie lange es gedauert hat. Die CAGR verteilt ihn auf die Jahre. So lassen sich Anlagen mit unterschiedlicher Dauer vergleichen.",
      },
      {
        pregunta: "Warum ist die Jahresrendite nicht einfach die Gesamtrendite geteilt durch die Jahre?",
        respuesta: `Weil die Gewinne jedes Jahres zum Kapital dazukommen und selbst wieder Rendite bringen. 50 % in 5 Jahren entsprechen ${p(cagr(1, 1.5, 5))} pro Jahr, nicht 10 %.`,
      },
      {
        pregunta: "Wie berücksichtige ich Dividenden oder Zinsen?",
        respuesta: "Wenn Sie sie ausgezahlt bekommen haben, tragen Sie sie unter erhaltene Erträge ein. Haben Sie sie wieder angelegt, stecken sie schon im Endwert.",
      },
    ],
    glosario: [
      { termino: "ROI", definicion: "Return on Investment: der Gesamtgewinn in Prozent des eingesetzten Geldes." },
      { termino: "CAGR", definicion: "Compound Annual Growth Rate: die durchschnittliche jährliche Rendite mit Zinseszins." },
    ],
  };
  return ctx.locale === "de-CH" ? JSON.parse(JSON.stringify(c).replace(/ß/g, "ss")) : c;
};

export const contenidoDe: ContenidoUniversal = (ctx) => paraSuiza(ctx.locale, contenido(ctx));
