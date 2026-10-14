import { paraSuiza } from "../../comun/locales";
import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { saldar } from "../definicion";

const r2 = (n: number) => Math.round(n * 100) / 100;

const contenido: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const saldo = montoEjemplo(ctx, 2000);
  const fijo = montoEjemplo(ctx, 100);
  const conFijo = saldar(saldo, 18, { modo: "fijo", fijo, porcentaje: 0, piso: 0 }, r2);
  const conMinimo = saldar(saldo, 18, { modo: "minimo", fijo: 0, porcentaje: 3, piso: montoEjemplo(ctx, 25) }, r2);
  const c = {
    h1: "Kreditkartenschulden abbezahlen",
    title: tituloQueEntre(
      `Kreditkarte abbezahlen: Rechner für Teilzahlung | ${ctx.nombrePais}`,
      `Kreditkarte abbezahlen | ${ctx.nombrePais}`,
      "Kreditkarte abbezahlen: Rechner",
    ),
    description:
      "Berechnen Sie, wie viele Monate Sie brauchen, um Ihre Kreditkarte abzubezahlen, und wie viel Zinsen anfallen, mit festem Betrag oder Mindestrate.",
    intro: [
      "Die Teilzahlung bei der Kreditkarte ist meist die teuerste Schuld, die man hat. Wer nur die Mindestrate zahlt, zieht die Rückzahlung über Jahre und zahlt viel Zinsen.",
      "Geben Sie den offenen Betrag, den Zinssatz und Ihre monatliche Zahlung ein. Sie sehen, wann Sie fertig sind, wie viel Zinsen Sie zahlen und den Plan Monat für Monat.",
    ],
    comoSeCalcula: [
      "Jeden Monat kommen Zinsen dazu: offener Betrag × Jahreszins ÷ 12.",
      "Dann wird die Zahlung abgezogen. Bei der Mindestrate ist das ein Prozentsatz des offenen Betrags, mit einer Untergrenze.",
      "Das wiederholt sich, bis nichts mehr offen ist. Ist die Zahlung nicht höher als die Zinsen, sinkt die Schuld nie.",
    ],
    ejemplo: [
      `Ein offener Betrag von ${m(saldo)} mit 18 % Zinsen ist bei ${m(fijo)} im Monat nach ${conFijo.meses} Monaten abbezahlt, mit ${m(conFijo.intereses)} Zinsen.`,
      `Zahlen Sie nur eine Mindestrate von 3 %, dauert es ${conMinimo.meses} Monate, und die Zinsen steigen auf ${m(conMinimo.intereses)}.`,
    ],
    faq: [
      {
        pregunta: "Was passiert, wenn ich nur die Mindestrate zahle?",
        respuesta:
          "Die Mindestrate sinkt mit dem offenen Betrag. Sie zahlen also jeden Monat weniger, und die Schuld zieht sich über Jahre. Zahlen Sie wenn möglich einen festen, höheren Betrag, auch wenn es nur etwas mehr ist.",
      },
      {
        pregunta: "Lohnt sich ein Ratenkredit zur Ablösung?",
        respuesta: "Wenn der Kreditzins deutlich unter dem Kartenzins liegt, meistens ja. Vergleichen Sie die Zinsen insgesamt, Gebühren eingeschlossen.",
      },
      {
        pregunta: "Welche Karte zahle ich zuerst ab?",
        respuesta: "Zahlen Sie bei allen die Mindestrate und stecken Sie den Rest in die Karte mit dem höchsten Zins. So zahlen Sie insgesamt am wenigsten Zinsen.",
      },
    ],
    glosario: [
      { termino: "Mindestrate", definicion: "Der kleinste Betrag, den Sie im Monat zahlen müssen. Er tilgt die Schuld nur langsam." },
      { termino: "Teilzahlung", definicion: "Wenn Sie die Abrechnung nicht ganz begleichen und der Rest mit Zinsen weiterläuft." },
    ],
  };
  return ctx.locale === "de-CH" ? JSON.parse(JSON.stringify(c).replace(/ß/g, "ss")) : c;
};

export const contenidoDe: ContenidoUniversal = (ctx) => paraSuiza(ctx.locale, contenido(ctx));
