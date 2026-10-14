import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoDe: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const n = (x: number, d = 0) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const ejemplo = imperial
    ? (() => {
        const precio = montoEjemplo(ctx, 3.5);
        const galones = 300 / 30;
        return [
          `Eine Fahrt über 150 Meilen hin und zurück mit 30 mpg braucht ${n(galones)} Gallonen.`,
          `Bei ${m(precio)} pro Gallone kostet das ${m(galones * precio)}. Zu zweit zahlt jede Person ${m((galones * precio) / 2)}.`,
        ];
      })()
    : (() => {
        const precio = montoEjemplo(ctx, 1.8);
        const litros = (600 * 8) / 100;
        return [
          `Eine Fahrt über 300 km hin und zurück mit einem Verbrauch von 8 Litern auf 100 km braucht ${n(litros)} Liter.`,
          `Bei ${m(precio)} pro Liter kostet das ${m(litros * precio)}. Zu zweit zahlt jede Person ${m((litros * precio) / 2)}.`,
        ];
      })();
  const c = {
    h1: "Spritkosten berechnen",
    title: tituloQueEntre(
      `Spritkostenrechner: Fahrtkosten berechnen | ${ctx.nombrePais}`,
      `Spritkostenrechner | ${ctx.nombrePais}`,
      "Spritkostenrechner",
    ),
    description:
      "Berechnen Sie die Spritkosten einer Fahrt aus Strecke, Verbrauch und Literpreis. Mit Hin- und Rückfahrt und Anteil pro Person.",
    intro: [
      `Geben Sie die Strecke, den Verbrauch Ihres Autos und den Preis pro ${imperial ? "Gallone" : "Liter"} ein. Sie sehen, wie viel Kraftstoff Sie brauchen und was die Fahrt kostet.`,
      imperial
        ? "Der Verbrauch wird in Meilen pro Gallone angegeben."
        : "Den Verbrauch können Sie in Litern pro 100 km oder in Kilometern pro Liter eingeben.",
    ],
    comoSeCalcula: imperial
      ? ["Gallonen = Strecke ÷ Meilen pro Gallone.", "Kosten = Gallonen × Preis pro Gallone. Hin und zurück verdoppelt die Strecke."]
      : [
          "Mit Litern pro 100 km: Liter = Strecke × Verbrauch ÷ 100.",
          "Mit Kilometern pro Liter: Liter = Strecke ÷ Verbrauch.",
          "Kosten = Liter × Literpreis. Hin und zurück verdoppelt die Strecke.",
        ],
    ejemplo,
    faq: [
      {
        pregunta: "Wie ermittle ich den tatsächlichen Verbrauch meines Autos?",
        respuesta: "Tanken Sie voll und stellen Sie den Tageskilometerzähler auf null. Beim nächsten Volltanken teilen Sie die getankten Liter durch die gefahrenen Kilometer und nehmen das Ergebnis mal 100.",
      },
      {
        pregunta: "Sind Maut und Vignette enthalten?",
        respuesta: "Nein. Der Rechner berücksichtigt nur den Kraftstoff. Maut, Vignette und Parkgebühren rechnen Sie bitte dazu.",
      },
      {
        pregunta: "Warum verbraucht mein Auto in der Stadt mehr?",
        respuesta: "Anfahren und Bremsen kosten mehr Energie als gleichmäßiges Fahren auf der Landstraße. Deshalb ist der Stadtverbrauch meist höher.",
      },
    ],
    glosario: [
      { termino: "Verbrauch", definicion: "Wie viel Kraftstoff ein Fahrzeug auf einer bestimmten Strecke braucht, meist in Litern pro 100 km." },
      { termino: "Literpreis", definicion: "Der Preis für einen Liter Benzin oder Diesel an der Tankstelle." },
    ],
  };
  return ctx.locale === "de-CH" ? JSON.parse(JSON.stringify(c).replace(/ß/g, "ss")) : c;
};
