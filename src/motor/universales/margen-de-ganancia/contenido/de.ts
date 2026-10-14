import { paraSuiza } from "../../comun/locales";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { precioConMargen } from "../definicion";

const contenido: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const p = (n: number) => `${formatearNumero(ctx, n, 2)} %`;
  const costo = montoEjemplo(ctx, 60);
  const precio = montoEjemplo(ctx, 100);
  const c = {
    h1: "Marge berechnen",
    title: tituloQueEntre(
      `Margenrechner: Marge und Aufschlag berechnen | ${ctx.nombrePais}`,
      `Margenrechner | ${ctx.nombrePais}`,
      "Margenrechner",
    ),
    description:
      "Berechnen Sie Marge und Aufschlag aus Kosten und Verkaufspreis, oder den Verkaufspreis, den Sie für Ihre Wunschmarge brauchen.",
    intro: [
      "Marge und Aufschlag werden ständig verwechselt, und das kann Geld kosten. Beide messen denselben Gewinn, aber auf einer anderen Grundlage.",
      "Geben Sie Kosten und Preis ein, dann sehen Sie beide Werte. Oder wählen Sie eine Marge, und der Rechner sagt Ihnen, was Sie verlangen müssen.",
    ],
    comoSeCalcula: [
      "Gewinn = Verkaufspreis − Kosten.",
      "Marge = Gewinn ÷ Verkaufspreis × 100.",
      "Aufschlag = Gewinn ÷ Kosten × 100.",
      "Preis für eine Zielmarge = Kosten ÷ (1 − Marge ÷ 100).",
    ],
    ejemplo: [
      `Ein Produkt, das ${m(costo)} kostet und für ${m(precio)} verkauft wird, bringt ${m(precio - costo)} Gewinn. Das ist eine Marge von ${p(((precio - costo) / precio) * 100)} und ein Aufschlag von ${p(((precio - costo) / costo) * 100)}.`,
      `Für 50 % Marge bei diesen Kosten müssen Sie für ${m(precioConMargen(costo, 50))} verkaufen. Schlagen Sie nur 50 % auf die Kosten auf, liegt die Marge bei ${p(100 / 3)}.`,
    ],
    faq: [
      {
        pregunta: "Was ist der Unterschied zwischen Marge und Aufschlag?",
        respuesta: "Die Marge bezieht den Gewinn auf den Verkaufspreis, der Aufschlag auf die Kosten. Bei gleichem Gewinn ist der Aufschlag immer die größere Zahl.",
      },
      {
        pregunta: "Wie lege ich einen Preis für eine Zielmarge fest?",
        respuesta: `Teilen Sie die Kosten durch (1 − Marge). Für 30 % Marge teilen Sie durch ${formatearNumero(ctx, 0.7, 2)}. Schlagen Sie nicht einfach 30 % auf die Kosten auf, sonst verdienen Sie weniger als gedacht.`,
      },
      {
        pregunta: "Rechne ich mit oder ohne Mehrwertsteuer?",
        respuesta: "Ohne. Rechnen Sie mit Nettopreisen, denn die Mehrwertsteuer geben Sie nur weiter. Sonst sieht die Marge größer aus, als sie ist.",
      },
    ],
    glosario: [
      { termino: "Marge", definicion: "Der Gewinn in Prozent des Verkaufspreises. Im Handel auch Handelsspanne." },
      { termino: "Aufschlag", definicion: "Der Gewinn in Prozent der Kosten. Auch Kalkulationsaufschlag genannt." },
    ],
  };
  return ctx.locale === "de-CH" ? JSON.parse(JSON.stringify(c).replace(/ß/g, "ss")) : c;
};

export const contenidoDe: ContenidoUniversal = (ctx) => paraSuiza(ctx.locale, contenido(ctx));
