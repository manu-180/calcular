import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoDe: ContenidoUniversal = (ctx) => {
  const tasa = `{{${ctx.datos.tasa}}}`;
  const precio = formatearMonto(ctx, montoEjemplo(ctx, 100));
  const c = {
    h1: `Mehrwertsteuer-Rechner für ${ctx.nombrePais}`,
    title: tituloQueEntre(
      `MwSt.-Rechner (${tasa}): Netto und Brutto | ${ctx.nombrePais}`,
      `MwSt.-Rechner (${tasa}) | ${ctx.nombrePais}`,
      `MwSt.-Rechner (${tasa})`,
    ),
    description: `Schlagen Sie ${tasa} Mehrwertsteuer auf einen Betrag auf oder rechnen Sie sie heraus. Netto, Steuer und Brutto auf den Cent genau.`,
    intro: [
      `Der Rechner verwendet für ${ctx.nombrePais} den Normalsatz von ${tasa}.`,
      "Wählen Sie, ob Sie die Mehrwertsteuer (MwSt.) auf einen Nettobetrag aufschlagen oder aus einem Bruttobetrag herausrechnen möchten, und geben Sie den Betrag ein.",
    ],
    comoSeCalcula: [
      "Aufschlagen: MwSt. = Nettobetrag × Steuersatz ÷ 100. Brutto = Netto + MwSt.",
      "Herausrechnen: Netto = Bruttobetrag ÷ (1 + Steuersatz ÷ 100). Die Differenz ist die MwSt.",
      "Gilt für einen Artikel ein reduzierter Satz, tragen Sie ihn unter „Anderer Steuersatz“ ein.",
    ],
    ejemplo: [
      `Bei ${precio} netto multiplizieren Sie den Betrag mit ${tasa} und addieren das Ergebnis. So erhalten Sie den Bruttobetrag.`,
      `Bei ${precio} brutto teilen Sie den Betrag durch 1 plus den Steuersatz. Das ist der Nettobetrag, die Differenz ist die Steuer.`,
    ],
    faq: [
      {
        pregunta: "Wie rechne ich die Mehrwertsteuer aus einem Bruttobetrag heraus?",
        respuesta: "Teilen Sie den Bruttobetrag durch 1 plus den Steuersatz als Dezimalzahl. Das Ergebnis ist der Nettobetrag, die Differenz ist die Steuer.",
      },
      {
        pregunta: "Warum kann ich den Prozentsatz nicht einfach vom Bruttobetrag abziehen?",
        respuesta: "Weil die Steuer auf den kleineren Nettobetrag berechnet wurde. Ziehen Sie den Prozentsatz vom Bruttobetrag ab, nehmen Sie zu viel weg.",
      },
      {
        pregunta: `Gilt für alles ein Satz von ${tasa}?`,
        respuesta: "Nicht immer. Für manche Lebensmittel, Bücher oder Leistungen gilt ein reduzierter Satz oder gar keine Steuer. Nutzen Sie dann „Anderer Steuersatz“.",
      },
    ],
    glosario: [
      {
        termino: "Mehrwertsteuer (MwSt.)",
        definicion:
          ctx.locale === "de-CH"
            ? "Die Steuer, die auf den Preis von Waren und Dienstleistungen aufgeschlagen wird."
            : "Die Steuer, die auf den Preis von Waren und Dienstleistungen aufgeschlagen wird. Im Steuerrecht heißt sie Umsatzsteuer.",
      },
      { termino: "Nettobetrag", definicion: "Der Preis ohne Mehrwertsteuer." },
      { termino: "Bruttobetrag", definicion: "Der Preis mit Mehrwertsteuer, also das, was Sie an der Kasse zahlen." },
    ],
  };
  if (ctx.locale !== "de-CH") return c;
  return JSON.parse(JSON.stringify(c).replace(/ß/g, "ss").replace(/MwSt\.-Rechner/g, "MWST-Rechner").replace(/MwSt\./g, "MWST"));
};
