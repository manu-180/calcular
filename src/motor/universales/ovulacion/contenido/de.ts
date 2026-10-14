import { paraSuiza } from "../../comun/locales";
import { aDia, aFecha, fechaLarga } from "../../comun/fechas";
import { tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { FASE_LUTEA, ventana } from "../definicion";

const contenido: ContenidoUniversal = (ctx) => {
  const f = (iso: string) => fechaLarga(ctx.locale, iso);
  const fum = "2026-03-05";
  const v = ventana(aDia(fum), 28);
  const c = {
    h1: "Eisprung berechnen",
    title: tituloQueEntre(
      `Eisprungrechner: fruchtbare Tage berechnen | ${ctx.nombrePais}`,
      `Eisprungrechner | ${ctx.nombrePais}`,
      "Eisprungrechner",
    ),
    description:
      "Berechnen Sie Ihren Eisprung, Ihre fruchtbaren Tage und den Beginn der nächsten Periode, dazu die nächsten drei Zyklen.",
    intro: [
      "Tragen Sie den ersten Tag Ihrer letzten Periode und Ihre Zykluslänge ein. Sie sehen den voraussichtlichen Eisprung, die fruchtbaren Tage und die nächste Periode.",
      "Das Ergebnis ist eine Schätzung für regelmäßige Zyklen. Es ist keine Verhütungsmethode und ersetzt keine ärztliche Beratung.",
    ],
    comoSeCalcula: [
      `Der Eisprung liegt meist ${FASE_LUTEA} Tage vor der nächsten Periode: erster Tag der letzten Periode + Zykluslänge − ${FASE_LUTEA}.`,
      "Die fruchtbaren Tage reichen von 5 Tagen vor dem Eisprung bis zum Tag danach, weil Spermien bis zu 5 Tage überleben können.",
      "Die nächste Periode beginnt voraussichtlich eine Zykluslänge nach der letzten.",
    ],
    ejemplo: [
      `War der erste Tag der letzten Periode der ${f(fum)} und dauert der Zyklus 28 Tage, ist der Eisprung voraussichtlich am ${f(aFecha(v.ovulacion))}.`,
      `Die fruchtbaren Tage reichen vom ${f(aFecha(v.desde))} bis zum ${f(aFecha(v.hasta))}. Die nächste Periode ist am ${f(aFecha(v.proxima))} zu erwarten.`,
    ],
    faq: [
      {
        pregunta: "Welche Tage sind am fruchtbarsten?",
        respuesta: "Die zwei bis drei Tage vor dem Eisprung und der Tag des Eisprungs selbst. Das ganze fruchtbare Fenster dauert etwa 6 Tage.",
      },
      {
        pregunta: "Funktioniert der Rechner bei unregelmäßigem Zyklus?",
        respuesta: "Er gibt eine Orientierung, aber eine ungenauere. Bei unregelmäßigen Zyklen kann sich der Eisprung von Monat zu Monat um mehrere Tage verschieben.",
      },
      {
        pregunta: "Kann ich damit verhüten?",
        respuesta: "Nein. Die Schätzung ist ungefähr, und der Eisprung kann früher oder später kommen. Um eine Schwangerschaft zu verhindern, nutzen Sie bitte eine Verhütungsmethode.",
      },
    ],
    glosario: [
      { termino: "Eisprung", definicion: "Der Moment, in dem ein Eierstock eine Eizelle freigibt. Fachbegriff: Ovulation." },
      { termino: "Fruchtbare Tage", definicion: "Die Tage im Zyklus, an denen eine Schwangerschaft möglich ist." },
    ],
  };
  return ctx.locale === "de-CH" ? JSON.parse(JSON.stringify(c).replace(/ß/g, "ss")) : c;
};

export const contenidoDe: ContenidoUniversal = (ctx) => paraSuiza(ctx.locale, contenido(ctx));
