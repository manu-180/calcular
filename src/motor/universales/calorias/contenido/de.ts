import { paraSuiza } from "../../comun/locales";
import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { DEFICIT, FACTORES, mifflin, SUPERAVIT } from "../definicion";

const contenido: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 0) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const ejemplo = imperial
    ? (() => {
        const basal = mifflin("hombre", 35, 180 * 0.45359237, 70 * 2.54);
        return [
          `Ein 35-jähriger Mann mit 180 lb und 5 ft 10 in hat einen Grundumsatz von etwa ${n(basal)} kcal.`,
          `Bei wenig Bewegung hält er sein Gewicht mit etwa ${n(basal * FACTORES.sedentaria)} kcal pro Tag.`,
        ];
      })()
    : (() => {
        const basal = mifflin("mujer", 30, 60, 165);
        return [
          `Eine 30-jährige Frau mit 60 kg und 165 cm hat einen Grundumsatz von etwa ${n(basal)} kcal.`,
          `Bei moderater Aktivität hält sie ihr Gewicht mit etwa ${n(basal * FACTORES.moderada)} kcal pro Tag.`,
        ];
      })();
  const c = {
    h1: "Kalorienbedarf berechnen",
    title: tituloQueEntre(
      `Kalorienbedarf berechnen: Grundumsatz und Ziel | ${ctx.nombrePais}`,
      `Kalorienbedarf berechnen | ${ctx.nombrePais}`,
      "Kalorienbedarf berechnen",
    ),
    description:
      "Berechnen Sie Ihren Grundumsatz und Ihren täglichen Kalorienbedarf aus Alter, Gewicht, Größe und Aktivität. Zum Halten, Ab- oder Zunehmen.",
    intro: [
      "Tragen Sie Ihre Daten und Ihre Aktivität ein. Sie sehen Ihren Grundumsatz und wie viele Kalorien Sie an einem normalen Tag verbrauchen.",
      "Das Ergebnis ist eine grobe Schätzung. Es ersetzt keine Beratung durch Ärztin, Arzt oder Ernährungsfachkraft.",
    ],
    comoSeCalcula: [
      `Grundumsatz (Mifflin-St.-Jeor): 10 × Gewicht in kg + ${n(6.25, 2)} × Größe in cm − 5 × Alter, plus 5 bei Männern oder minus 161 bei Frauen.`,
      `Kalorienbedarf = Grundumsatz × Aktivitätsfaktor (PAL-Wert), von ${n(1.2, 1)} (kaum Bewegung) bis ${n(1.9, 1)} (sehr hoch).`,
      `Zum Abnehmen zieht der Rechner ${DEFICIT} kcal pro Tag ab, zum Zunehmen rechnet er ${SUPERAVIT} kcal dazu. Das ist eine moderate Änderung, die sich durchhalten lässt.`,
    ],
    ejemplo,
    faq: [
      {
        pregunta: "Was ist der Grundumsatz?",
        respuesta: "Die Energie, die Ihr Körper in völliger Ruhe braucht: zum Atmen, für die Körperwärme und damit die Organe arbeiten.",
      },
      {
        pregunta: "Wie viele Kalorien sollte ich zum Abnehmen essen?",
        respuesta: `Ein üblicher Ausgangspunkt sind etwa ${DEFICIT} kcal pro Tag unter Ihrem Bedarf. Am besten legen Sie das Ziel mit fachlicher Begleitung fest.`,
      },
      {
        pregunta: "Wie genau ist die Formel?",
        respuesta: "Die Mifflin-St.-Jeor-Formel gehört zu den gebräuchlichsten, liefert aber einen Durchschnitt. Veranlagung, Muskelmasse und Gesundheit beeinflussen, was Sie wirklich verbrauchen.",
      },
      {
        pregunta: "Was ist der PAL-Wert?",
        respuesta: "PAL steht für Physical Activity Level. Er gibt an, um welchen Faktor Ihr Tagesbedarf über dem Grundumsatz liegt, je nachdem wie aktiv Sie sind.",
      },
    ],
    glosario: [
      { termino: "Kalorie (kcal)", definicion: "Die Einheit für die Energie in Lebensmitteln und für das, was der Körper verbraucht." },
      { termino: "Grundumsatz", definicion: "Die Kalorien, die Ihr Körper in völliger Ruhe verbraucht." },
      { termino: "Leistungsumsatz", definicion: "Die Energie, die zusätzlich für Bewegung und Arbeit anfällt." },
    ],
  };
  return ctx.locale === "de-CH" ? JSON.parse(JSON.stringify(c).replace(/ß/g, "ss")) : c;
};

export const contenidoDe: ContenidoUniversal = (ctx) => paraSuiza(ctx.locale, contenido(ctx));
