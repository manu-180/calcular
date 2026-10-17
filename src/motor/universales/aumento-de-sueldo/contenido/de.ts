import { paraSuiza } from "../../comun/locales";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { aumentoReal } from "../definicion";

const contenido: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const p = (n: number) => `${formatearNumero(ctx, n, 2)} %`;
  const sueldo = montoEjemplo(ctx, 4000);
  const c = {
    h1: "Gehaltserhöhung berechnen",
    title: tituloQueEntre(
      `Gehaltserhöhung berechnen: neues Gehalt und Reallohn | ${ctx.nombrePais}`,
      `Gehaltserhöhung berechnen | ${ctx.nombrePais}`,
      "Gehaltserhöhung berechnen",
    ),
    description:
      "Berechnen Sie Ihr neues Gehalt nach einer Erhöhung, das Plus pro Monat und pro Jahr und ob Sie nach Abzug der Inflation real mehr haben.",
    intro: [
      "Ihnen wurde eine Gehaltserhöhung angeboten, oder Sie wollen eine verhandeln. Geben Sie Ihr Gehalt und die Erhöhung ein, in Prozent oder als Betrag, und sehen Sie, was sich im Monat und im Jahr ändert.",
      "Tragen Sie die Inflation im Zeitraum ein, dann sehen Sie, ob Sie wirklich Kaufkraft gewinnen oder nur aufholen.",
    ],
    comoSeCalcula: [
      "Neues Gehalt = aktuelles Gehalt × (1 + Erhöhung ÷ 100).",
      "Mehr pro Jahr = mehr pro Monat × Gehälter pro Jahr.",
      "Reale Erhöhung = (1 + Erhöhung) ÷ (1 + Inflation) − 1.",
    ],
    ejemplo: [
      `Ein Gehalt von ${m(sueldo)} im Monat wird mit 5 % Erhöhung zu ${m(sueldo * 1.05)}. Das sind ${m(sueldo * 0.05)} mehr im Monat und ${m(sueldo * 0.05 * 12)} mehr im Jahr.`,
      `Lag die Inflation im Zeitraum bei 3 %, beträgt die reale Erhöhung ${p(aumentoReal(5, 3))}. Bei 6 % Inflation sind es ${p(aumentoReal(5, 6))}.`,
    ],
    faq: [
      {
        pregunta: "Was ist eine reale Gehaltserhöhung?",
        respuesta: "Ihre Erhöhung nach Abzug der Inflation. Sie zeigt, ob Sie sich mit dem neuen Gehalt mehr oder weniger leisten können als vorher. Man spricht auch vom Reallohn.",
      },
      {
        pregunta: "Warum ziehe ich die Inflation nicht einfach von der Erhöhung ab?",
        respuesta: `Weil sich die beiden Prozentsätze multiplizieren, nicht addieren. Bei 5 % Erhöhung und 3 % Inflation beträgt die reale Erhöhung ${p(aumentoReal(5, 3))}, nicht 2 %. Bei hoher Inflation wird der Unterschied deutlich größer.`,
      },
      {
        pregunta: "Wie viel Gehaltserhöhung sollte ich verlangen?",
        respuesta: "Mindestens die Inflation seit der letzten Erhöhung, damit Sie nicht zurückfallen. Darüber hinaus zählt, was andere Arbeitgeber für eine vergleichbare Stelle zahlen und wie Ihre Aufgaben gewachsen sind.",
      },
    ],
    glosario: [
      { termino: "Nominale Erhöhung", definicion: "Die Erhöhung, wie sie auf der Gehaltsabrechnung steht, vor Inflation." },
      { termino: "Kaufkraft", definicion: "Was Sie sich mit Ihrem Gehalt leisten können." },
    ],
  };
  return ctx.locale === "de-CH" ? JSON.parse(JSON.stringify(c).replace(/ß/g, "ss")) : c;
};

export const contenidoDe: ContenidoUniversal = (ctx) => paraSuiza(ctx.locale, contenido(ctx));
