import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoDe: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const anual = montoEjemplo(ctx, 50000);
  const hora = montoEjemplo(ctx, 20);
  const horasAnio = 40 * 52;
  const c = {
    h1: "Stundenlohn und Gehalt umrechnen",
    title: tituloQueEntre(
      `Stundenlohn-Rechner: Stundenlohn in Monatsgehalt | ${ctx.nombrePais}`,
      `Stundenlohn-Rechner | ${ctx.nombrePais}`,
      "Stundenlohn-Rechner",
    ),
    description:
      "Rechnen Sie Ihren Lohn zwischen Stunde, Tag, Woche, Monat und Jahr um, mit Ihren tatsächlichen Arbeitsstunden und bezahlten Wochen.",
    intro: [
      "Wie viel ist Ihr Monatsgehalt pro Stunde wert? Was ergibt ein Stundenlohn aufs Jahr gerechnet? Geben Sie einen Betrag ein, wählen Sie den Zeitraum, und Sie sehen alle anderen.",
      "So vergleichen Sie Jobangebote, kalkulieren Überstunden oder sehen, was Ihre Zeit wert ist.",
    ],
    comoSeCalcula: [
      "Zuerst wird alles in einen Jahresbetrag umgerechnet.",
      "Pro Stunde = Jahresbetrag ÷ (Wochenstunden × bezahlte Wochen).",
      "Pro Tag = Jahresbetrag ÷ (Arbeitstage pro Woche × bezahlte Wochen). Pro Woche = Jahresbetrag ÷ bezahlte Wochen.",
      "Pro Monat = Jahresbetrag ÷ 12. Pro Halbmonat = Jahresbetrag ÷ 24.",
    ],
    ejemplo: [
      `Ein Jahresgehalt von ${m(anual)} bei 40 Wochenstunden entspricht ${m(anual / horasAnio)} pro Stunde und ${m(anual / 12)} im Monat.`,
      `Ein Angebot von ${m(hora)} pro Stunde in Vollzeit ergibt ${m(hora * horasAnio)} im Jahr.`,
    ],
    faq: [
      {
        pregunta: "Wie viele Arbeitsstunden hat ein Jahr?",
        respuesta: `Bei 40 Stunden pro Woche und 52 bezahlten Wochen sind es ${formatearNumero(ctx, horasAnio)} Stunden. Als Faustregel können Sie den Stundenlohn mal ${formatearNumero(ctx, 2000)} nehmen.`,
      },
      {
        pregunta: "Wie rechne ich ein Monatsgehalt in einen Stundenlohn um?",
        respuesta: `Teilen Sie das Monatsgehalt durch die Stunden im Monat. Bei 40 Wochenstunden sind das im Schnitt ${formatearNumero(ctx, (40 * 52) / 12, 2)} Stunden.`,
      },
      {
        pregunta: "Warum ergibt Wochenlohn mal 4 nicht das Monatsgehalt?",
        respuesta: `Weil ein Monat im Schnitt ${formatearNumero(ctx, 52 / 12, 2)} Wochen hat, nicht 4. Von der Woche zum Monat rechnen Sie mal 52 und geteilt durch 12.`,
      },
      {
        pregunta: "Sind Sonderzahlungen oder Steuern berücksichtigt?",
        respuesta: "Nein. Der Rechner rechnet denselben Betrag auf andere Zeiträume um. Weihnachts- oder Urlaubsgeld rechnen Sie beim Vergleich von Angeboten bitte extra dazu.",
      },
    ],
    glosario: [
      { termino: "Bruttolohn", definicion: "Der Lohn vor Steuern und Sozialabgaben." },
      { termino: "Vollzeit", definicion: "Meist 38 bis 40 Wochenstunden, je nach Branche und Vertrag." },
    ],
  };
  return ctx.locale === "de-CH" ? JSON.parse(JSON.stringify(c).replace(/ß/g, "ss")) : c;
};
