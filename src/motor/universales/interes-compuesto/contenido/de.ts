import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { proyectar } from "../definicion";

export const contenidoDe: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const capital = montoEjemplo(ctx, 1000);
  const aporte = montoEjemplo(ctx, 100);
  const a10 = proyectar(capital, aporte, 5, 10, "mensual")[9].saldo;
  const a20 = proyectar(capital, aporte, 5, 20, "mensual")[19].saldo;
  const c = {
    h1: "Zinseszinsrechner",
    title: tituloQueEntre(
      `Zinseszinsrechner mit Sparrate | ${ctx.nombrePais}`,
      `Zinseszinsrechner | ${ctx.nombrePais}`,
      "Zinseszinsrechner",
    ),
    description:
      "Sehen Sie, wie Ihr Geld mit Zinseszins und monatlicher Sparrate wächst. Mit Endkapital, erhaltenen Zinsen und einer Tabelle Jahr für Jahr.",
    intro: [
      "Beim Zinseszins kommen die Zinsen zu Ihrem Guthaben dazu und bringen selbst wieder Zinsen. Deshalb wächst Erspartes mit der Zeit immer schneller.",
      "Geben Sie ein, was Sie heute haben, was Sie monatlich sparen können, den Zinssatz und die Zahl der Jahre. Sie sehen das Endkapital und wie viel davon Zinsen sind.",
    ],
    comoSeCalcula: [
      "Endkapital = Startkapital × (1 + i) hoch n + Sparrate × ((1 + i) hoch n − 1) ÷ i.",
      "Dabei ist i der Monatszins, der zur gewählten Zinsgutschrift passt, und n die Zahl der Monate.",
      "Die Sparrate kommt jeweils am Monatsende dazu.",
    ],
    ejemplo: [
      `Mit ${m(capital)} Startkapital und ${m(aporte)} Sparrate im Monat kommen Sie bei 5 % Zinsen in 10 Jahren auf ${m(a10)}.`,
      `Sparen Sie 10 Jahre weiter, wächst das Kapital auf ${m(a20)}. Das zweite Jahrzehnt bringt deutlich mehr als das erste.`,
    ],
    faq: [
      {
        pregunta: "Was ist der Unterschied zwischen einfachen Zinsen und Zinseszins?",
        respuesta:
          "Einfache Zinsen werden immer auf das ursprüngliche Kapital berechnet. Beim Zinseszins zählen auch die schon erhaltenen Zinsen mit.",
      },
      {
        pregunta: "Was ist die 72er-Regel?",
        respuesta: "Eine Faustregel, wann sich Geld verdoppelt: Teilen Sie 72 durch den Zinssatz. Bei 6 % verdoppelt es sich in etwa 12 Jahren.",
      },
      {
        pregunta: "Welchen Zinssatz soll ich ansetzen?",
        respuesta:
          "Einen, der zu Ihrer Anlage realistisch passt. Wenn Sie das Ergebnis in heutiger Kaufkraft sehen möchten, ziehen Sie die erwartete Inflation vom Zinssatz ab.",
      },
    ],
    glosario: [
      { termino: "Zinsgutschrift", definicion: "Der Zeitpunkt, an dem die Zinsen Ihrem Guthaben zugeschlagen werden." },
      { termino: "Zinseszins", definicion: "Zinsen auf das Kapital plus die bereits erhaltenen Zinsen." },
    ],
  };
  return ctx.locale === "de-CH" ? JSON.parse(JSON.stringify(c).replace(/ß/g, "ss")) : c;
};
