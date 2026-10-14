import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoDe: ContenidoUniversal = (ctx) => {
  const precio = montoEjemplo(ctx, 80);
  const m = (n: number) => formatearMonto(ctx, n);
  const c = {
    h1: "Rabattrechner",
    title: tituloQueEntre(
      `Rabattrechner: Preis nach Rabatt berechnen | ${ctx.nombrePais}`,
      `Rabattrechner | ${ctx.nombrePais}`,
      "Rabattrechner",
    ),
    description:
      "Berechnen Sie den reduzierten Preis und Ihre Ersparnis, auch bei zwei Rabatten nacheinander wie 30 % und zusätzlich 10 %.",
    intro: [
      "Geben Sie Preis und Rabatt ein. Sie sehen sofort, was Sie zahlen und wie viel Sie sparen.",
      "Gibt es noch einen Rabatt obendrauf, tragen Sie ihn auch ein. Zwei Rabatte nacheinander ergeben nie einfach die Summe.",
    ],
    comoSeCalcula: [
      "Reduzierter Preis = ursprünglicher Preis × (1 − Rabatt ÷ 100).",
      "Ein zusätzlicher Rabatt gilt für den Preis, der schon reduziert ist.",
      "Die Ersparnis ist der ursprüngliche Preis minus der reduzierte Preis.",
    ],
    ejemplo: [
      `Ein Artikel für ${m(precio)} kostet mit 25 % Rabatt noch ${m(precio * 0.75)}.`,
      `Mit 30 % und zusätzlich 10 % Rabatt kostet er ${m(precio * 0.7 * 0.9)}. Das sind insgesamt 37 % weniger, nicht 40 %.`,
    ],
    faq: [
      {
        pregunta: "Wie berechne ich einen Rabatt?",
        respuesta: "Multiplizieren Sie den Preis mit dem Prozentsatz und teilen Sie durch 100. Das ist Ihre Ersparnis. Ziehen Sie sie vom Preis ab, dann haben Sie den Endpreis.",
      },
      {
        pregunta: "Sind 30 % plus 10 % Rabatt dasselbe wie 40 %?",
        respuesta: "Nein. Der zweite Rabatt gilt für den bereits reduzierten Preis. Insgesamt sparen Sie deshalb 37 %.",
      },
      {
        pregunta: "Wie komme ich vom reduzierten Preis auf den ursprünglichen?",
        respuesta: `Teilen Sie den reduzierten Preis durch (1 − Rabatt ÷ 100). Bei 25 % Rabatt teilen Sie durch ${formatearNumero(ctx, 0.75, 2)}.`,
      },
    ],
    glosario: [
      { termino: "Rabatt", definicion: "Der Prozentsatz, der vom ursprünglichen Preis abgezogen wird." },
      { termino: "Gesamtrabatt", definicion: "Wie viel Prozent Sie insgesamt sparen, wenn mehr als ein Rabatt gilt." },
    ],
  };
  return ctx.locale === "de-CH" ? JSON.parse(JSON.stringify(c).replace(/ß/g, "ss")) : c;
};
