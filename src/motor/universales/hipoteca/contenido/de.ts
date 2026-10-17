import { paraSuiza } from "../../comun/locales";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { cuotaFrancesa, interesesTotales } from "../../prestamo/definicion";

const contenido: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const zins = 3.5;
  const z = `${formatearNumero(ctx, zins, 1)} %`;
  const precio = montoEjemplo(ctx, 400000);
  const prestado = precio * 0.8;
  const rate30 = cuotaFrancesa(prestado, zins, 360);
  const rate20 = cuotaFrancesa(prestado, zins, 240);
  const c = {
    h1: "Hypothekenrechner",
    title: tituloQueEntre(
      `Hypothekenrechner: Monatsrate und Restschuld | ${ctx.nombrePais}`,
      `Hypothekenrechner | ${ctx.nombrePais}`,
      "Hypothekenrechner",
    ),
    description:
      "Berechnen Sie die Monatsrate Ihrer Baufinanzierung aus Kaufpreis, Eigenkapital, Zins und Laufzeit. Mit Zinsen insgesamt und Restschuld pro Jahr.",
    intro: [
      "Für die meisten Menschen ist der Immobilienkredit die größte Schuld ihres Lebens. Rechnen Sie nach, bevor Sie mit der Bank sprechen.",
      "Geben Sie Kaufpreis, Eigenkapital, Zins und Laufzeit ein. Wenn Sie Hausgeld oder Grundsteuer monatlich zahlen, tragen Sie es ein und sehen Ihre echte Monatsbelastung.",
    ],
    comoSeCalcula: [
      "Darlehensbetrag = Kaufpreis − Eigenkapital.",
      "Gleichbleibende Monatsrate (Annuität) aus dem Jahreszins geteilt durch 12 und der Laufzeit in Monaten.",
      "Für jedes Jahr zählt der Rechner Zinsen und Tilgung zusammen und zeigt die verbleibende Restschuld.",
    ],
    ejemplo: [
      `Eine Immobilie für ${m(precio)} mit 20 % Eigenkapital braucht ein Darlehen von ${m(prestado)}. Bei ${z} Zinsen und 30 Jahren Laufzeit beträgt die Rate ${m(rate30)}.`,
      `In 30 Jahren zahlen Sie ${m(interesesTotales(prestado, zins, 360))} Zinsen. Bei 20 Jahren steigt die Rate auf ${m(rate20)}, die Zinsen sinken aber auf ${m(interesesTotales(prestado, zins, 240))}.`,
    ],
    faq: [
      {
        pregunta: "Wie viel Eigenkapital brauche ich?",
        respuesta:
          "Das hängt von Bank und Land ab. Oft wird empfohlen, mindestens die Kaufnebenkosten selbst zu zahlen, besser auch 20 % des Kaufpreises. Je mehr Eigenkapital, desto kleiner das Darlehen und desto günstiger meist der Zins.",
      },
      {
        pregunta: "Warum sinkt die Restschuld in den ersten Jahren so langsam?",
        respuesta:
          "Die Zinsen fallen auf die Restschuld an. Am Anfang ist sie hoch, also geht der größte Teil der Rate in die Zinsen. Mit der Zeit kehrt sich das um.",
      },
      {
        pregunta: "Ist eine kürzere Laufzeit besser?",
        respuesta:
          "Wenn Sie sich die höhere Rate leisten können, ja: Sie zahlen deutlich weniger Zinsen. Sonst ist eine längere Laufzeit mit Sondertilgungen, wann immer möglich, ein guter Weg.",
      },
      {
        pregunta: "Kann sich meine Rate ändern?",
        respuesta:
          "Während der Zinsbindung bleibt die Rate gleich. Danach wird der Zins für die Restschuld neu vereinbart. Dieser Rechner geht davon aus, dass der Zins über die ganze Laufzeit gleich bleibt.",
      },
    ],
    glosario: [
      { termino: "Eigenkapital", definicion: "Der Teil des Kaufpreises, den Sie aus eigenen Ersparnissen zahlen." },
      { termino: "Zinsbindung", definicion: "Der Zeitraum, für den der Zins fest vereinbart ist." },
      { termino: "Restschuld", definicion: "Was Sie der Bank noch zurückzahlen müssen." },
    ],
  };
  return ctx.locale === "de-CH" ? JSON.parse(JSON.stringify(c).replace(/ß/g, "ss")) : c;
};

export const contenidoDe: ContenidoUniversal = (ctx) => paraSuiza(ctx.locale, contenido(ctx));
