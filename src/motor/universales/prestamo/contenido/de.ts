import { paraSuiza } from "../../comun/locales";
import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { cuotaFrancesa, interesesTotales } from "../definicion";

const contenido: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const monto = montoEjemplo(ctx, 10000);
  const cuota36 = cuotaFrancesa(monto, 6, 36);
  const cuota60 = cuotaFrancesa(monto, 6, 60);
  const c = {
    h1: "Kreditrechner",
    title: tituloQueEntre(
      `Kreditrechner: Monatsrate und Tilgungsplan | ${ctx.nombrePais}`,
      `Kreditrechner | ${ctx.nombrePais}`,
      "Kreditrechner",
    ),
    description:
      "Berechnen Sie die Monatsrate Ihres Kredits, die Zinsen insgesamt und den kompletten Tilgungsplan. Und wie viel eine Sondertilgung spart.",
    intro: [
      "Bevor Sie einen Kredit unterschreiben, zählen zwei Zahlen: was Sie jeden Monat zahlen und was Sie der Kredit insgesamt an Zinsen kostet.",
      "Geben Sie Betrag, Zinssatz und Laufzeit ein. Wenn Sie jeden Monat etwas mehr zahlen möchten, tragen Sie es ein und sehen, wie viel früher Sie fertig sind.",
    ],
    comoSeCalcula: [
      "Der Rechner geht von einer gleichbleibenden Monatsrate aus (Annuitätendarlehen). So funktionieren die meisten Raten-, Auto- und Immobilienkredite.",
      "Monatszins = Jahreszins ÷ 12.",
      "Rate = Kreditbetrag × Monatszins ÷ (1 − (1 + Monatszins) hoch minus Anzahl der Raten).",
      "Jeden Monat fallen Zinsen auf die Restschuld an. Der Rest der Rate tilgt den Kredit.",
    ],
    ejemplo: [
      `Ein Kredit über ${m(monto)} mit 6 % Zinsen und 36 Monaten Laufzeit hat eine Rate von ${m(cuota36)}. Insgesamt zahlen Sie ${m(interesesTotales(monto, 6, 36))} Zinsen.`,
      `Bei 60 Monaten sinkt die Rate auf ${m(cuota60)}, aber die Zinsen steigen auf ${m(interesesTotales(monto, 6, 60))}.`,
    ],
    faq: [
      {
        pregunta: "Wie wird die Kreditrate berechnet?",
        respuesta:
          "Mit der Annuitätenformel. Jede Rate ist gleich hoch, aber anfangs besteht sie vor allem aus Zinsen und später vor allem aus Tilgung. Deshalb sinkt die Restschuld am Anfang nur langsam.",
      },
      {
        pregunta: "Lohnt es sich, einen Kredit früher zurückzuzahlen?",
        respuesta:
          "Meist ja, solange keine hohe Vorfälligkeitsentschädigung anfällt. Jede Sondertilgung senkt direkt die Restschuld, auf die keine Zinsen mehr anfallen. Je früher, desto mehr sparen Sie.",
      },
      {
        pregunta: "Ist eine lange Laufzeit besser?",
        respuesta: "Die Rate ist niedriger, aber Sie zahlen insgesamt deutlich mehr Zinsen. Vergleichen Sie beide Zahlen, bevor Sie sich entscheiden.",
      },
      {
        pregunta: "Was ist der Unterschied zwischen Sollzins und effektivem Jahreszins?",
        respuesta:
          "Der Sollzins ist der reine Zins auf das geliehene Geld. Der effektive Jahreszins rechnet auch Kosten wie Bearbeitungsgebühren ein. Für den Vergleich von Angeboten ist der effektive Jahreszins die bessere Zahl.",
      },
    ],
    glosario: [
      { termino: "Restschuld", definicion: "Der Teil des Kredits, den Sie noch nicht zurückgezahlt haben." },
      { termino: "Sollzins", definicion: "Der Jahreszins auf das geliehene Geld. Geteilt durch 12 ergibt er den Zins für jeden Monat." },
      { termino: "Tilgung", definicion: "Der Teil jeder Rate, der die Schuld verringert." },
    ],
  };
  return ctx.locale === "de-CH" ? JSON.parse(JSON.stringify(c).replace(/ß/g, "ss")) : c;
};

export const contenidoDe: ContenidoUniversal = (ctx) => paraSuiza(ctx.locale, contenido(ctx));
