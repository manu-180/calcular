import { paraSuiza } from "../../comun/locales";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

const contenido: ContenidoUniversal = (ctx) => {
  const preis3 = montoEjemplo(ctx, 6);
  const m = (n: number) => formatearMonto(ctx, n);
  const c = {
    h1: "Dreisatz-Rechner",
    title: tituloQueEntre(
      `Dreisatz-Rechner: proportional und antiproportional | ${ctx.nombrePais}`,
      `Dreisatz-Rechner | ${ctx.nombrePais}`,
      "Dreisatz-Rechner",
    ),
    description:
      "Lösen Sie einen proportionalen oder antiproportionalen Dreisatz in Sekunden. Drei Werte eingeben, den vierten mit Rechenweg erhalten.",
    intro: [
      "Der Dreisatz hilft, wenn zwei Größen zusammenhängen und Sie drei der vier Werte kennen.",
      "Wählen Sie proportional oder antiproportional, tragen Sie A, B und C ein, und der Rechner liefert X.",
    ],
    comoSeCalcula: [
      "Proportional: X = B × C ÷ A. Das gilt, wenn beide Größen gemeinsam steigen (mehr Kilo, höherer Preis).",
      "Antiproportional: X = A × B ÷ C. Das gilt, wenn eine Größe steigt und die andere sinkt (mehr Leute, weniger Tage).",
    ],
    ejemplo: [
      `Wenn 3 Kilo ${m(preis3)} kosten, kosten 5 Kilo ${m((preis3 * 5) / 3)}.`,
      "Wenn 4 Personen ein Haus in 12 Tagen streichen, schaffen es 6 Personen in 8 Tagen.",
    ],
    faq: [
      {
        pregunta: "Woran erkenne ich, ob der Dreisatz proportional oder antiproportional ist?",
        respuesta: "Steigt die eine Größe, wenn die andere steigt, ist er proportional. Sinkt sie, wenn die andere steigt, ist er antiproportional.",
      },
      {
        pregunta: "Wie rechne ich einen Dreisatz von Hand?",
        respuesta: `Schließen Sie zuerst auf eine Einheit und dann auf die gesuchte Menge. Gehören 600 zu 3, gehören zu 1 genau 200 und zu 5 dann 200 × 5 = ${formatearNumero(ctx, 1000)}.`,
      },
      {
        pregunta: "Kann ich den Dreisatz für Prozente nutzen?",
        respuesta: "Ja. Wenn 200 genau 100 % sind, sind 50 dann 25 %. Das ist ein proportionaler Dreisatz mit A = 200, B = 100 und C = 50.",
      },
    ],
    glosario: [
      { termino: "Proportional", definicion: "Beide Größen steigen oder sinken gemeinsam." },
      { termino: "Antiproportional", definicion: "Die eine Größe steigt, während die andere sinkt. Auch umgekehrter Dreisatz genannt." },
    ],
  };
  return ctx.locale === "de-CH" ? JSON.parse(JSON.stringify(c).replace(/ß/g, "ss")) : c;
};

export const contenidoDe: ContenidoUniversal = (ctx) => paraSuiza(ctx.locale, contenido(ctx));
