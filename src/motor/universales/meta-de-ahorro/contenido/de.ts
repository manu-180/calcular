import { paraSuiza } from "../../comun/locales";
import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { aporteNecesario } from "../definicion";

const contenido: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const meta = montoEjemplo(ctx, 10000);
  const actual = montoEjemplo(ctx, 1000);
  const c = {
    h1: "Sparziel berechnen",
    title: tituloQueEntre(
      `Sparrechner: Wie viel muss ich monatlich sparen? | ${ctx.nombrePais}`,
      `Sparziel berechnen | ${ctx.nombrePais}`,
      "Sparziel berechnen",
    ),
    description:
      "Berechnen Sie, wie viel Sie jeden Monat sparen müssen, um Ihr Ziel rechtzeitig zu erreichen. Mit dem, was Sie schon haben, und den Zinsen darauf.",
    intro: [
      "Eine Reise, ein Auto, Eigenkapital für die Wohnung oder ein Polster für Unvorhergesehenes. Ein Ziel mit Betrag und Datum erreicht man viel leichter.",
      "Geben Sie ein, wie viel Sie sparen möchten und in wie vielen Monaten. Sie sehen, wie viel Sie pro Monat und pro Woche zurücklegen müssen.",
    ],
    comoSeCalcula: [
      "Zuerst rechnet der Rechner aus, wie stark Ihr bisheriges Erspartes bis zum Ende des Zeitraums wächst.",
      "Was dann noch fehlt, wird auf gleich hohe monatliche Sparraten verteilt.",
      "Bringt Ihr Erspartes Zinsen, verzinst sich auch jede Sparrate. Sie müssen also etwas weniger einzahlen.",
    ],
    ejemplo: [
      `Um ${m(meta)} in 24 Monaten ohne Zinsen zu sparen, brauchen Sie ${m(meta / 24)} im Monat.`,
      `Mit ${m(actual)} schon gespart und 5 % Zinsen im Jahr reichen ${m(aporteNecesario(meta, actual, 24, 5))} im Monat.`,
    ],
    faq: [
      {
        pregunta: "Wie halte ich mein Sparziel durch?",
        respuesta: "Überweisen Sie das Geld gleich nach dem Gehaltseingang, bevor Sie etwas anderes ausgeben. Am einfachsten mit einem Dauerauftrag auf ein eigenes Sparkonto.",
      },
      {
        pregunta: "Was, wenn die Monatsrate zu hoch ist?",
        respuesta: "Geben Sie sich mehr Zeit oder senken Sie das Ziel. Sie können auch mit dem beginnen, was gerade geht, und die Rate erhöhen, wenn Ihr Einkommen steigt.",
      },
      {
        pregunta: "Sollte ich die Inflation einrechnen?",
        respuesta: "Liegt das Ziel mehrere Jahre entfernt, schlagen Sie die erwartete Inflation auf den Betrag auf. Was heute 100 kostet, kann bis dahin spürbar teurer sein.",
      },
    ],
    glosario: [
      { termino: "Sparrate", definicion: "Der Betrag, den Sie jeden Monat für Ihr Ziel zurücklegen." },
      { termino: "Rendite", definicion: "Was Ihr Erspartes auf einem Konto oder in einer Anlage einbringt." },
    ],
  };
  return ctx.locale === "de-CH" ? JSON.parse(JSON.stringify(c).replace(/ß/g, "ss")) : c;
};

export const contenidoDe: ContenidoUniversal = (ctx) => paraSuiza(ctx.locale, contenido(ctx));
